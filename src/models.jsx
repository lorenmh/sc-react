import React from 'react';

import {
  LARGE_GRID,
  TOO_CLOSE,
  TOO_FAR,
  BOUNDS,
  MIN_ERROR,
  PRECOMPUTE,
  KPM
} from './const';

import { prettyXString, prettyYString, prettyKpsString } from './prettifiers';

import {
  parsePositionString,
  parseX,
  parseY,
  parseKpa,
  kpaDelta,
  kpaToError
} from './parsers';

import {
  interpolate,
  distanceWorstCasePositions,
  bearingWorstCasePositions
} from './calculator';

import { epsilonEquals } from './helpers';

const R2D = 180/Math.PI
;

/*  NOTES:
 *  ORIGIN IS TOP LEFT!
 *
 *  Position:
 *    The x and y values are the *top left coordinates of the grid*.
 *    This is due to legacy reasons. A grid's width is the 'error' value.
 *
 *    The actual center position of a Position is given by $x and $y.
 *
 *    If you have an exact position, you should use `fromExactPosition`,
 *    because this will convert the exact position into a valid position.
 *
 *    For ex:
 *      Let's say I have an exact position of (150,150). The whole app assumes
 *      that this is a grid somewhere on the map, if {x=150,y=150,error=0},
 *      this might break things (because there is no 'position string' (like
 *      `A1-5-5 xxx`) which would output {x=150,y=150,error=0}. Instead, $x=150
 *      $y=150 should become x=149.38,y=149.38,error=1.23 which DOES have a
 *      'position string' of `A1-5-5-5-5-5`.
 */
export class Position {
  static fromString(positionString) {
    try {
      let [xString, yString, kpString] = parsePositionString(positionString);
      return Position.fromStrings(xString, yString, kpString);
    } catch (e) {
      return null;
    }
  }

  static fromStrings(xString, yString, kpString) {
    let x = parseX(xString);
    let y = parseY(yString);
    let kpa = parseKpa(kpString);

    return Position.fromGrid(x, y, kpa);
  }

  static fromGrid(gridX, gridY, kpa) {
    let delta = kpaDelta(kpa),
      x = (gridX + delta[0]) * LARGE_GRID,
      y = (gridY + delta[1]) * LARGE_GRID,
      error = kpaToError(kpa) * LARGE_GRID
    ;

    return new Position(x, y, error, kpa);
  }

  static fromExactPosition($x, $y, prec) {
    $x = Math.max(0, $x);
    $y = Math.max(0, $y);

    // max is 'Z'; 25*300, 26characters,index@0, so 25, grid-width=300
    // otherwise people can move to Unicode character positions, like:
    // ❦2-5-3 (it looks really weird, so max char is Z, Z2-5-3)
    $x = Math.min(7500, $x);
    $y = Math.min(7500, $y);

    prec = prec === undefined ? 5 : Math.max(0, Math.min(5, prec));

    const error = prec !== 5 ? PRECOMPUTE[prec][0] : PRECOMPUTE[4][1],
      x = Math.max(0, $x - $x % error),
      y = Math.max(0, $y - $y % error),
      kpa = (
        PRECOMPUTE
          .slice(0, prec)
          .map(pc => [
            Math.floor($y % pc[0] / pc[1]),
            Math.floor($x % pc[0] / pc[1])
          ])
          .map(index => KPM[index[0]][index[1]])
      )
    ;

    return new Position(x, y, error, kpa);
  }

  constructor(x, y, error, kpa) {
    this.x = x;
    this.y = y;
    this.error = error;
    this.kpa = kpa;

    this.$x = x + error/2;
    this.$y = y + error/2;
  }

  gridX() {
    return Math.floor(this.x / LARGE_GRID);
  }

  gridY() {
    return Math.floor(this.y / LARGE_GRID);
  }

  xString() {
    return String.fromCharCode(65 + this.gridX());
  }

  yString() {
    return (this.gridY() + 1).toString();
  }

  kpaString() {
    return this.kpa.join('-');
  }

  toString() {
    let kpaMajor = this.kpa.slice(0,2).join(''),
      kpaMinor = this.kpa.slice(2).join('')
    ;

    kpaMajor = kpaMajor !== '' ? ' ' + kpaMajor : '';
    kpaMinor = kpaMinor !== '' ? ' ' + kpaMinor : '';

    return this.xString() + this.yString() + kpaMajor + kpaMinor;
  }

  toStringShort() {
    let space = this.gridY() >= 9 ? ' ' : '';
    return this.xString() + this.yString() + space + this.kpa.join('');
  }

  toStringKpaLen(len) {
    let kpaString = this.kpa.slice(0,len).join('-');

    kpaString = kpaString ? '-' + kpaString : '';

    return this.xString() + this.yString() + kpaString;
  }

  distanceTo(position) {
    let dx = this.x + (this.error / 2) - (position.x + (position.error / 2)),
      dy = this.y + (this.error / 2) - (position.y + (position.error / 2))
    ;

    return Math.hypot(dx, dy);
  }

  bearingTo(position) {
    let dx = position.$x - this.$x,
      dy = position.$y - this.$y,
      magnitude = Math.hypot(dx, dy),
      ux = dx / magnitude,
      uy = dy / magnitude,
      rad = Math.atan2(uy, ux),
      deg = rad * R2D
    ;

    if (epsilonEquals(magnitude, 0)) return 0;

    if (ux === 0 && uy === 1) return 180;

    if (this.$x >= position.$x && this.$y > position.$y) {
      return ((180 - Math.abs(deg)) + 270) % 360;
    }

    return deg + 90 % 360;
  }

  topLeft() {
    return new Position(this.x, this.y, 0);
  }

  topRight() {
    return new Position(this.x + this.error, this.y, 0);
  }

  bottomRight() {
    return new Position(this.x + this.error, this.y + this.error, 0);
  }

  bottomLeft() {
    return new Position(this.x, this.y + this.error, 0);
  }

  // returns true if position is within this position's bounds
  // +----+
  // |    |
  // |  * |
  // +----+
  // Above, the asterisk is within the bounds of the box. The box 'contains'
  // the asterisk
  contains(p) {
    let tl = this.topLeft(),
      br = this.bottomRight()
    ;
    if (tl.x < p.x && tl.y < p.y && br.x > p.x && br.y > p.y) return true;
    return false;
  }

  // to check if there is a collision, we just need to see if the two squares
  // contain either of their bounding points:
  // +----+
  // |    |
  // |  +-|--+
  // +--|-+  |
  //    |    |
  //    +----+
  collides(p) {
    return (
      (this.x === p.x && this.y === p.y) ||

      this.contains(p.topLeft()) ||
      this.contains(p.topRight()) ||
      this.contains(p.bottomRight()) ||
      this.contains(p.bottomLeft()) ||

      p.contains(this.topLeft()) ||
      p.contains(this.topRight()) ||
      p.contains(this.bottomRight()) ||
      p.contains(this.bottomLeft())
    );
  }

  translate(vector, precision) {
    const [dx, dy] = vector;

    return Position.fromExactPosition(this.$x + dx, this.$y + dy, precision);
  }

  toElement() {
    let kpa = this.kpa,
      kpMajor,
      kpMinor
    ;

    if (kpa.length) {
      kpMajor = (
        kpa
          .slice(0,2)
          .map((kp,i) => (
            <span key={i.toString()+kp.toString()}>
              <span className="position-text-item position-text-dash">-</span>
              <span className="position-text-item position-text-kp-major">{kp}</span>
            </span>
          ))
      );
    }

    if (kpa.length > 2) {
      kpMinor = (
        kpa
          .slice(2)
          .map((kp,i) => (
            <span
              key={i.toString()+kp.toString()+'m'}
              className="position-text-item position-text-kp-minor"
            >
              {kp}
            </span>
          ))
      );
    }

    return (
      <div className="position-text">
        <span className="position-text-1">
          <span className="position-text-item position-text-x">
            {this.xString()}
          </span>
          <span className="position-text-item position-text-y">
            {this.yString()}
          </span>
        </span>
        <span className="position-text-2">
          {kpMajor}
        </span>
        <span className="position-text-3">
          {kpMinor}
        </span>
      </div>
    );
  }
}

export class Calculation {
  static fromPositions(mortarPosition, targetPosition, delta, type) {
    const bounds = BOUNDS[type];
    const [minElevation, maxElevation] = bounds.elevation;

    delta = delta !== undefined ? delta : 0;

    let distance = mortarPosition.distanceTo(targetPosition),
      correctedDistance = distance + delta,
      elevation
    ;

    elevation = interpolate(type, correctedDistance);

    let bearing = mortarPosition.bearingTo(targetPosition),

      distanceWCP = distanceWorstCasePositions(mortarPosition, targetPosition),
      bearingWCP = bearingWorstCasePositions(mortarPosition, targetPosition),

      distanceRange = [
        distanceWCP[0][0].distanceTo(distanceWCP[0][1]),
        distanceWCP[1][0].distanceTo(distanceWCP[1][1])
      ],
      elevationRange
    ;

    elevationRange = [
      interpolate(type, distanceRange[1] + delta),
      interpolate(type, distanceRange[0] + delta)
    ];

    elevationRange = (
      elevationRange
        .map((e) => {
          if (e === TOO_CLOSE) return minElevation;
          if (e === TOO_FAR) return maxElevation;
          return e;
        })
    );
    
    let bearingRange = [
        bearingWCP[0][0].bearingTo(bearingWCP[0][1]),
        bearingWCP[1][0].bearingTo(bearingWCP[1][1])
      ],
      isCollision = mortarPosition.collides(targetPosition)
    ;


    return new Calculation(
      distance, elevation, bearing,
      distanceRange, elevationRange, bearingRange,
      isCollision
    );
  }

  constructor(distance, elevation, bearing,
              distanceRange, elevationRange, bearingRange,
              isCollision) {
    this.distance = distance;
    this.elevation = elevation;
    this.bearing = bearing;

    this.distanceRange = distanceRange;
    this.elevationRange = elevationRange;
    this.bearingRange = bearingRange;

    this.isCollision = !!isCollision;
  }
}
