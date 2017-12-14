import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  updateHover,
  applyHoverPosition
} from '../actions';

import {
  SIZE,
  STROKE,
  GRID_SIZE,
  CIRCLE_RADIUS,
  LARGE_GRID,
  SMALL_GRID,
  KEY_PADDING,
  TEXT_SIZE,
  KEY_HEIGHT,
  SVG_WIDTH,
  SVG_HEIGHT,
  EPSILON,
  MORTAR_ID,
  TARGET_ID,
  GRID_VIEW_HEIGHT,

  PRECOMPUTE
} from '../const';

import { Position } from '../models';

import { epsilonEquals, cludgeLt } from '../helpers';

const style = {
  width: GRID_SIZE
};

/* titleTextHtml:
 *    returns an HTML element with classes for styling. HTML element is used
 *    because it is a lot easier to work with than SVG text elements;
 *    centering, styling, translations, etc., are much easier with HTML+CSS
 *
 *    params:
 *      position: a position object
 *      isSubKey: bool, whether or not this should be a subkey title,
 *        ex: `A2-3-4` if isSubKey=false, `555` if isSubKey=true
 */
function titleTextHtml(position, isSubKey) {
  isSubKey = !!isSubKey;

  let kpa = position.kpa,
    kpMinor
  ;

  if (!isSubKey) {
    let kpMajor = (
      kpa
        .slice(0,2)
        .map((kp,i) => (
          <span key={kp.toString()+i.toString()}>
            <span className="title-text-item title-text-dash">-</span>
            <span className="title-text-item title-text-kp-major">{kp}</span>
          </span>
        ))
    );

    return (
      <div className="title-text">
        <span className="title-text-item title-text-x">
          {position.xString()}
        </span>
        <span className="title-text-item title-text-y">
          {position.yString()}
        </span>
        {kpMajor}
      </div>
    );
  }

  if (kpa.length > 2) {
    kpMinor = (
      kpa
        .slice(2)
        .map((kp,i) => (
          <span
            key={kp.toString()+i.toString()+'m'}
            className="title-text-item title-text-kp-minor"
          >
            {kp}
          </span>
        ))
    );
  }


  return (
    <div className="title-text">
      {/*<span className="title-text-item title-text-subkey">sub:</span>*/}
      {kpMinor}
    </div>
  );
}

/* keyTextHtml:
 *    returns an HTML element for the key text (300m, 33m, etc).
 *    params:
 *      S: the error-size (the highlighted grid size; 300,100,33,11,3,1)
 *      GS: the grid-size (300 or 33)
 */
function keyTextHtml(S,GS) {
  let styleTop = {
    transform: `translate(0, ${GRID_SIZE}px)`,
    fontSize: TEXT_SIZE,
  };

  let styleBottom = {
    transform: `translate(0, ${GRID_SIZE + TEXT_SIZE}px)`,
    fontSize: TEXT_SIZE,
  };

  let secondaryKeyText;

  if (!epsilonEquals(S,1)) {
    secondaryKeyText = (
      <div className="key-text-wrap" style={styleBottom}>
        <div className="key-text">
          {`${Math.floor(S*GS)}m`}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="key-text-wrap" style={styleTop}>
        <div className="key-text">
          {`${Math.floor(GS)}m`}
        </div>
      </div>
      {secondaryKeyText}
    </div>
  );
}

/* keyLines:
 *    returns SVG elements for the key at the bottom
 *
 *    params:
 *      S: the error size (the colored-in grid)
 *      isZoomed: whether or not this is the sub-key zoomed-in SVG box
 */
function keyLines(S, isZoomed) {
  let secondaryKeyLine;

  if (!epsilonEquals(S,1)) {
    //let start = SIZE - (S * SIZE),
    //  end = SIZE
    //;

    let start = SIZE/3 - S*SIZE,
      end = SIZE/3
    ;


    secondaryKeyLine = (
      <g transform={`translate(0,${KEY_HEIGHT-4})`}>
        <line
          className="key-line"
          x1={start}
          y1="1"
          x2={end}
          y2="1"
        />
        <line
          className="key-line"
          x1={start}
          y1="0"
          x2={start}
          y2="2"
        />
        <line
          className="key-line"
          x1={end}
          y1="0"
          x2={end}
          y2="2"
        />
      </g>
    );
  }

  return (
    <g>
      <g>
        <line
          className="key-line"
          x1="0"
          y1="1"
          x2={SIZE}
          y2="1"
        />
        <line
          className="key-line"
          x1="0"
          y1="0"
          x2="0"
          y2="2"
        />
        <line
          className="key-line"
          x1={SIZE}
          y1="0"
          x2={SIZE}
          y2="2"
        />
      </g>
      {secondaryKeyLine}
    </g>
  );
}

class GridZoomed extends Component {
  render() {
    const {
      position,
      isTarget,
      mouseEnterHandler,
      mouseLeaveHandler,
      mouseMoveHandler,
      clickHandler,
    } = this.props;

    let X = (position.x % SMALL_GRID) / SMALL_GRID,
      Y = (position.y % SMALL_GRID) / SMALL_GRID,
      GS = SMALL_GRID,
      S = position.error / SMALL_GRID
    ;

    X = X > 1-EPSILON ? 0 : X;
    Y = Y > 1-EPSILON ? 0 : Y;

    let rect = SIZE > 300/243 ? (
      <rect
        x={X * SIZE}
        y={Y * SIZE}
        width={S * SIZE}
        height={S * SIZE}
        className={(() => {
          return isTarget ? 'grid-target' : 'grid-mortar';
        })()}
      />
    ) : null;

    let body = (
      <g>
        {rect}
        <circle
          cx={(X + S/2) * SIZE}
          cy={(Y + S/2) * SIZE}
          r={CIRCLE_RADIUS}
          className={(() => {
            return isTarget ? 'grid-target-circle' : 'grid-mortar-circle';
          })()}
        />
      </g>
    );

    return (
      <div className="grid-wrap">
        {(() => titleTextHtml(position,true))()}
        <div className="grid" style={style}>
          <div className="grid-render">
            {(() => keyTextHtml(S,GS))()}
            <svg
              width={SVG_WIDTH}
              height={SVG_HEIGHT}
            >
              <g
                className="mouse-active"
                transform={`translate(${STROKE}, ${STROKE})`}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
                onMouseMove={mouseMoveHandler}
                onClick={clickHandler}
              >
                <rect
                  x="0"
                  y="0"
                  width={SIZE}
                  height={SIZE}
                  className="grid-bg"
                />
                { body }
              </g>
              <g transform={`translate(${STROKE}, ${GRID_SIZE + KEY_PADDING})`}>
                {(() => keyLines(S, true))()}
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

class Grid extends Component {
  render() {
    const {
      position,
      isTarget,
      mouseEnterHandler,
      mouseLeaveHandler,
      mouseMoveHandler,
      clickHandler,
    } = this.props;

    let X = (position.x % LARGE_GRID) / LARGE_GRID,
      Y = (position.y % LARGE_GRID) / LARGE_GRID,
      GS = LARGE_GRID,
      E = Math.max(position.error, SMALL_GRID),
      RS = E / LARGE_GRID,
      fuckX = position.$x % LARGE_GRID,
      fuckY = position.$y % LARGE_GRID,
      RX = (fuckX - fuckX % E) / LARGE_GRID,
      RY = (fuckY - fuckY % E) / LARGE_GRID,
      S = position.error / LARGE_GRID
    ;

    let body = (
      <g>
        {Array(6).fill()
          .map((_,i) => {
            return (
              <line
                key={'h1' + i}
                x1="0"
                y1={(() => {
                  let j = Math.floor(i/2);
                  return (i + j + 1) / 9 * SIZE;
                })()}
                x2={SIZE}
                y2={(() => {
                  let j = Math.floor(i/2);
                  return (i + j + 1) / 9 * SIZE;
                })()}
                className="grid-ls"
              />
            );
          })
        }
        {Array(6).fill()
          .map((_,i) => {
            return (
              <line
                key={'v1' + i}
                x1={(() => {
                  let j = Math.floor(i/2);
                  return (i + j + 1) / 9 * SIZE;
                })()}
                y1="0"
                x2={(() => {
                  let j = Math.floor(i/2);
                  return (i + j + 1) / 9 * SIZE;
                })()}
                y2={SIZE}
                className="grid-ls"
              />
            );
          })
        }
        {Array(2).fill()
          .map((_,i) => {
            return (
              <line
                key={'h0' + i}
                x1="0"
                y1={(i + 1) / 3 * SIZE}
                x2={SIZE}
                y2={(i + 1) / 3 * SIZE}
                className="grid-lm"
              />
            );
          })
        }
        {Array(2).fill()
          .map((_,i) => {
            return (
              <line
                key={'v0' + i}
                x1={(i + 1) / 3 * SIZE}
                y1="0"
                x2={(i + 1) / 3 * SIZE}
                y2={SIZE}
                className="grid-lm"
              />
            );
          })
        }
        <rect
          x={RX * SIZE}
          y={RY * SIZE}
          width={RS * SIZE}
          height={RS * SIZE}
          className={(() => {
            return isTarget ? 'grid-target' : 'grid-mortar';
          })()}
        />
        <circle
          cx={(X + S/2) * SIZE}
          cy={(Y + S/2) * SIZE}
          r={CIRCLE_RADIUS}
          className={(() => {
            return isTarget ? 'grid-target-circle' : 'grid-mortar-circle';
          })()}
        />
      </g>
    );

    return (
      <div className="grid-wrap">
        {(() => titleTextHtml(position))()}
        <div className="grid" style={style}>
          <div className="grid-render">
            {(() => keyTextHtml(Math.max(S,1/9),GS))()}
            <svg
              width={SVG_WIDTH}
              height={SVG_HEIGHT}
            >
              <g
                className="mouse-active"
                transform={`translate(${STROKE}, ${STROKE})`}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
                onMouseMove={mouseMoveHandler}
                onClick={clickHandler}
              >
                <rect
                  x="0"
                  y="0"
                  width={SIZE}
                  height={SIZE}
                  className="grid-bg"
                />
                { body }
              </g>
              <g transform={`translate(${STROKE}, ${GRID_SIZE + KEY_PADDING})`}>
                {(() => keyLines(Math.max(S,1/9)))()}
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

class GridView extends Component {
  render() {
    let { positions, hover, dispatch } = this.props;

    const mouseEnterHandler = positionId => (e) => {
      // do nothing
    };

    const mouseLeaveHandler = positionId => (e) => {
      dispatch(updateHover(positionId, null));
    };

    const gridPosition = (e, position, isZoomed) => {
      const offset = e.currentTarget.getBoundingClientRect(),
        { scrollY, scrollX } = window,
        top = offset.top + scrollY,
        left = offset.left + scrollX,
        { width, height } = offset,

        gridX = Math.min(1, Math.max(0, (e.pageX-left) / width)),
        gridY = Math.min(1, Math.max(0, (e.pageY-top) / height)),

        dx = isZoomed ? gridX * SMALL_GRID : gridX * LARGE_GRID,
        dy = isZoomed ? gridY * SMALL_GRID : gridY * LARGE_GRID,

        precision = isZoomed ? 5 : 3,

        error = isZoomed ? SMALL_GRID : LARGE_GRID,

        x = Math.floor(position.$x / error) * error,
        y = Math.floor(position.$y / error) * error,

        eventPosition = Position.fromExactPosition(
          x + dx,
          y + dy,
          precision
        )
      ;

      return eventPosition;
    };

    const mouseMoveHandler = (positionId, position, isZoomed) => (e) => {
      const eventPosition = gridPosition(e, position, isZoomed);

      dispatch(updateHover(positionId, eventPosition));
    };

    const clickHandler = (positionId, position, isZoomed) => (e) => {
      const eventPosition = gridPosition(e, position, isZoomed);

      dispatch(applyHoverPosition(positionId, eventPosition));
    };

    const mortarPosition = positions[MORTAR_ID];
    const targetPosition = positions[TARGET_ID];

    const dispMortarPosition = hover[MORTAR_ID] ?
      hover[MORTAR_ID] : positions[MORTAR_ID]
    ;

    const dispTargetPosition = hover[TARGET_ID] ?
      hover[TARGET_ID] : positions[TARGET_ID]
    ;

    let mortarGrid,
      mortarGridZoomed,
      targetGrid,
      targetGridZoomed
    ;

    if (dispMortarPosition) {
      mortarGrid = (
        <Grid
          position={dispMortarPosition}
          mouseEnterHandler={mouseEnterHandler(MORTAR_ID)}
          mouseLeaveHandler={mouseLeaveHandler(MORTAR_ID)}
          mouseMoveHandler={mouseMoveHandler(MORTAR_ID, mortarPosition, false)}
          clickHandler={clickHandler(MORTAR_ID, mortarPosition, false)}
        />
      );

      if (dispMortarPosition.kpa.length >= 2) {
        mortarGridZoomed = (
          <GridZoomed
            position={dispMortarPosition}
            mouseEnterHandler={mouseEnterHandler(MORTAR_ID)}
            mouseLeaveHandler={mouseLeaveHandler(MORTAR_ID)}
            mouseMoveHandler={mouseMoveHandler(MORTAR_ID, mortarPosition, true)}
            clickHandler={clickHandler(MORTAR_ID, mortarPosition, true)}
          />
        );
      }
    }

    if (dispTargetPosition) {
      targetGrid = (
        <Grid
          position={dispTargetPosition}
          mouseEnterHandler={mouseEnterHandler(TARGET_ID)}
          mouseLeaveHandler={mouseLeaveHandler(TARGET_ID)}
          mouseMoveHandler={mouseMoveHandler(TARGET_ID, targetPosition, false)}
          clickHandler={clickHandler(TARGET_ID, targetPosition, false)}
          isTarget
        />
      );

      if (dispTargetPosition.kpa.length >= 2) {
        targetGridZoomed = (
          <GridZoomed
            position={dispTargetPosition}
            mouseEnterHandler={mouseEnterHandler(TARGET_ID)}
            mouseLeaveHandler={mouseLeaveHandler(TARGET_ID)}
            mouseMoveHandler={mouseMoveHandler(TARGET_ID, targetPosition, true)}
            clickHandler={clickHandler(TARGET_ID, targetPosition, true)}
            isTarget
          />
        );
      }
    }

    return (
      <div className="grid-view-wrap">
        <div className="grid-view">
          { mortarGrid }
          { mortarGridZoomed }
        </div>
        <div className="grid-view">
          { targetGrid }
          { targetGridZoomed }
        </div>
      </div>
    );
  }
}


export default connect(s => s)(GridView);
