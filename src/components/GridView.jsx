import React, { Component } from 'react';

const SIZE = 50,
  STROKE = 1,
  GRID_SIZE = SIZE + 2*STROKE,
  LARGE_GRID = 300,
  SMALL_GRID = 300/9,
  KEY_PADDING = 10,
  KEY_HEIGHT = 20,
  SVG_WIDTH = GRID_SIZE,
  SVG_HEIGHT = GRID_SIZE + KEY_PADDING + KEY_HEIGHT,
  EPSILON = 0.001
;

export default class GridView extends Component {
  render() {
    const { position, xLabel, yLabel, isTarget } = this.props;


    let counter = 0,
        isZoomed = position[2] < SMALL_GRID
    ;

    function zoomedOut() {
      const X = (position[0] % LARGE_GRID) / LARGE_GRID,
        Y = (position[1] % LARGE_GRID) / LARGE_GRID,
        S = (position[2] % LARGE_GRID) / LARGE_GRID
      ;

      return (
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
                  className="grid-view-ls"
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
                  className="grid-view-ls"
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
                  className="grid-view-lm"
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
                  className="grid-view-lm"
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
              return isTarget ? 'grid-view-target' : 'grid-view-mortar';
            })()}
          />
        </g>
      );
    }

    function keyTextHtml() {
    }

    function keySvg() {
      return (
        <g>
          <line
            className="key-line"
            x1="0"
            y1="2"
            x2={SIZE}
            y2="2"
          />
          <line
            className="key-line"
            x1="0"
            y1="0"
            x2="0"
            y2="4"
          />
          <line
            className="key-line"
            x1={SIZE}
            y1="0"
            x2={SIZE}
            y2="4"
          />
        </g>
      );
    }

    function zoomedIn() {
      let X = (position[0] % SMALL_GRID) / SMALL_GRID,
        Y = (position[1] % SMALL_GRID) / SMALL_GRID,
        S = (position[2] % SMALL_GRID) / SMALL_GRID
      ;

      X = X > 1-EPSILON ? 0 : X;
      Y = Y > 1-EPSILON ? 0 : Y;

      console.log(X,Y,S);

      return (
        <g>
          <rect
            x={X * SIZE}
            y={Y * SIZE}
            width={S * SIZE}
            height={S * SIZE}
            className={(() => {
              return isTarget ? 'grid-view-target' : 'grid-view-mortar';
            })()}
          />
        </g>
      );
    }

    return (
      <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        <g transform={`translate(${STROKE}, ${STROKE})`}>
          <rect
            x="0"
            y="0"
            width={SIZE}
            height={SIZE}
            className="grid-view-bg"
          />
          {(() => isZoomed ? zoomedIn() : zoomedOut())()}
        </g>
        <g transform={`translate(${STROKE}, ${GRID_SIZE})`}>
        </g>
      </svg>
    );
  }
}

