import { GRID_SIZE } from './const';

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
      x = (gridX + delta[0]) * GRID_SIZE,
      y = (gridY + delta[1]) * GRID_SIZE,
      error = kpaToError(kpa) * GRID_SIZE
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
    let kpaString = this.kpaString();

    kpaString = kpaString ? '-' + kpaString : '';

    return this.xString() + this.yString() + kpaString;
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
    let dx = position.x - this.x,
      dy = position.y - this.y,
      magnitude = Math.hypot(dx, dy),
      ux = dx / magnitude,
      uy = dy / magnitude,
      rad = Math.atan2(uy, ux),
      deg = rad * R2D
    ;

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
        interpolateElevation(distanceRange[0]),
        interpolateElevation(distanceRange[1])
      ],
      bearingRange = [
        bearingWCP[0][0].bearingTo(bearingWCP[0][1]),
        bearingWCP[1][0].bearingTo(bearingWCP[1][1])
      ]
    ;

    console.log(distanceWCP, bearingWCP);

    return new Calculation(
      distance, elevation, bearing,
      distanceRange, elevationRange, bearingRange
    );
  }

  constructor(distance, elevation, bearing,
              distanceRange, elevationRange, bearingRange) {
    this.distance = distance;
    this.elevation = elevation;
    this.bearing = bearing;

    this.distanceRange = distanceRange;
    this.elevationRange = elevationRange;
    this.bearingRange = bearingRange;
  }
}
