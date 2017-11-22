import { GRID_SIZE } from './const';

import { prettyXString, prettyYString, prettyKpsString } from './prettifiers';
import { parseX, parseY, parseKpa, kpaDelta, kpaToError } from './parsers';
import { interpolateElevation } from './calculator';

window.interpolateElevation = interpolateElevation;

/* Origin is top left!
 *
 */
export class Position {
  static fromString(positionString) {
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
    return Math.hypot(this.x - position.x, this.y - position.y);
  }

  topLeft() {
    return new Position(this.x, this.y);
  }

  topRight() {
    return new Position(this.x + this.error, this.y);
  }

  bottomRight() {
    return new Position(this.x + this.error, this.y + this.error);
  }

  bottomLeft() {
    return new Position(this.x, this.position + this.error);
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

class Calculation {
  static fromPositions(mortarPosition, targetPosition) {
    return new Calculation();
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
