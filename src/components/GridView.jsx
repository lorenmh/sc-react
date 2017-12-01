import React, { Component } from 'react';

const SIZE = 60,
  STROKE = 1,
  GRID_SIZE = SIZE + 2*STROKE,
  CIRCLE_RADIUS = SIZE/50,
  LARGE_GRID = 300,
  SMALL_GRID = 300/9,
  KEY_PADDING = 4,
  TEXT_SIZE = 8,
  KEY_HEIGHT = 11,
  SVG_WIDTH = GRID_SIZE,
  SVG_HEIGHT = GRID_SIZE + KEY_PADDING + KEY_HEIGHT,
  EPSILON = 0.001
;

const epsilonEquals = (a,b) => Math.abs(a-b) < EPSILON;
const cludgeLt = (a,b) => parseFloat(a.toFixed(4)) < parseFloat(b.toFixed(4));

function titleTextHtml(position, isSubKey) {
  isSubKey = !!isSubKey;

  let kpa = position.kpa,
    kpMinor
  ;

  if (!isSubKey) {
    let kpMajor = (
      kpa
        .slice(0,2)
        .map(kp => (
          <span>
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
        .map(kp => (
          <span className="title-text-item title-text-kp-minor">{kp}</span>
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

export class GridZoomed extends Component {
  render() {
    const { position, isTarget } = this.props;


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

    let style = {
      width: GRID_SIZE
    };

    return (
      <div className="grid-wrap">
        {(() => titleTextHtml(position,true))()}
        <div className="grid" style={style}>
          <div className="grid-render">
            {(() => keyTextHtml(S,GS))()}
            <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
              <g transform={`translate(${STROKE}, ${STROKE})`}>
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

export class Grid extends Component {
  render() {
    const { position, xLabel, yLabel, isTarget } = this.props;

    let X = (position.x % LARGE_GRID) / LARGE_GRID,
      Y = (position.y % LARGE_GRID) / LARGE_GRID,
      GS = LARGE_GRID,
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
          x={X * SIZE}
          y={Y * SIZE}
          width={S * SIZE}
          height={S * SIZE}
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

    let style = {
      width: GRID_SIZE
    };

    return (
      <div className="grid-wrap">
        {(() => titleTextHtml(position))()}
        <div className="grid" style={style}>
          <div className="grid-render">
            {(() => keyTextHtml(S,GS))()}
            <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
              <g transform={`translate(${STROKE}, ${STROKE})`}>
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
                {(() => keyLines(S))()}
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export class GridView extends Component {
  render() {
    let { position, isTarget } = this.props;

    return (
      <div className="grid-view-wrap">
        <div className="grid-view">
          <Grid position={position} isTarget={isTarget} />
          <GridZoomed position={position} isTarget={isTarget} />
        </div>
      </div>
    );
  }
}
