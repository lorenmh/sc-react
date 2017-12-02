import React from 'react';

import {
  LARGE_GRID,
  TOO_CLOSE,
  TOO_FAR,
  MIN_ELEVATION,
  MAX_ELEVATION
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
  interpolateElevation,
  distanceWorstCasePositions,
  bearingWorstCasePositions
} from './calculator';

const R2D = 180/Math.PI
;

/* Origin is top left!
 *
 */
export class Position {
  static fromString(positionString) {
    let [xString, yString, kpString] = parsePositionString(positionString);
    return Position.fromStrings(xString, yString, kpString);
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

    return new Position(x, y, error, kpa, gridX, gridY);
  }

  // x = absolute X position in m (top-left)
  // y = absolute Y position in m (top-left)
  // kps = array of integer kps, max-len == 5
  constructor(x, y, error, kpa, gridX, gridY) {
    this.x = x;
    this.y = y;
    this.error = error;
    this.kpa = kpa;
    this.gridX = gridX;
    this.gridY = gridY;
  }

  xString() {
    return String.fromCharCode(65 + this.gridX);
  }

  yString() {
    return (this.gridY + 1).toString();
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
    let space = this.gridY >= 9 ? ' ' : '';
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
    let dx = (position.x + position.error/2) - (this.x + this.error/2),
      dy = (position.y + position.error/2) - (this.y + this.error/2),
      magnitude = Math.hypot(dx, dy),
      ux = dx / magnitude,
      uy = dy / magnitude,
      rad = Math.atan2(uy, ux),
      deg = rad * R2D
    ;

    if (magnitude === 0) return 0;

    // no clue why it's this way, probably because origin is top left?
    if (ux === 0 && uy === 1) return 180;

    if (this.x >= position.x && this.y > position.y) {
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
            <span key={i+kp}>
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
              key={i+kp+'m'}
              className="position-text-item position-text-kp-minor">{kp}</span>
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
  static fromPositions(mortarPosition, targetPosition) {
    let distance = mortarPosition.distanceTo(targetPosition),
      elevation = interpolateElevation(distance),
      bearing = mortarPosition.bearingTo(targetPosition),

      distanceWCP = distanceWorstCasePositions(mortarPosition, targetPosition),
      bearingWCP = bearingWorstCasePositions(mortarPosition, targetPosition),

      distanceRange = [
        distanceWCP[0][0].distanceTo(distanceWCP[0][1]),
        distanceWCP[1][0].distanceTo(distanceWCP[1][1])
      ],
      elevationRange = [
        interpolateElevation(distanceRange[1]),
        interpolateElevation(distanceRange[0])
      ],
      bearingRange = [
        bearingWCP[0][0].bearingTo(bearingWCP[0][1]),
        bearingWCP[1][0].bearingTo(bearingWCP[1][1])
      ],
      isCollision = mortarPosition.collides(targetPosition)
    ;

    elevationRange = (
      elevationRange
        .map((e) => {
          if (e === TOO_CLOSE) return MIN_ELEVATION;
          if (e === TOO_FAR) return MAX_ELEVATION;
          return e;
        })
    );

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
