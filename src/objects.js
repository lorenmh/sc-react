import { GRID_SIZE } from './const';

import { prettyXString, prettyYString, prettyKpsString } from './prettifiers';
import { parseX, parseY, parseKpa, kpaDelta, kpaToError } from './parsers';

export class Position {
  static fromString(positionString) {
  }

  static fromStrings(xString, yString, kpString) {
    let x = parseX(xString);
    let y = parseY(yString);
    let kpa = parseKpa(kpString);

    return new Position(x, y, kpa);
  }

  // x = absolute X position in m (top-left)
  // y = absolute Y position in m (top-left)
  // kps = array of integer kps, max-len == 5
  constructor(gridX, gridY, kpa) {
    this.gridX = gridX;
    this.gridY = gridY;

    let delta = kpaDelta(kpa);

    this.x = (gridX + delta[0]) * GRID_SIZE;
    this.y = (gridY + delta[1]) * GRID_SIZE;

    this.kpa = kpa;

    this.error = kpaToError(kpa) * GRID_SIZE;
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
}
