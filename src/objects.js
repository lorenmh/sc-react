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
  constructor(x, y, kpa) {
    let delta = kpaDelta(kpa);

    this.x = (x + delta[0]) * GRID_SIZE;
    this.y = (y + delta[1]) * GRID_SIZE;

    this.kpa = kpa;

    this.error = kpaToError(kpa) * GRID_SIZE;
  }
}
