import { prettyXString, prettyYString, prettyKpsString } from './prettifiers';
import { parseX, parseY, parseKps, parseError } from './parsers';

class Position {
  constructor(xString, yString, kpsString) {
    this.xString = prettyXString(xString);
    this.yString = prettyYString(yString);
    this.kpsString = prettyKpsString(kpsString);

    this.x = parseX(xString);
    this.y = parseY(yString);
    this.kps = parseKps(kpsString);
    this.error = parseError(kpsString);
  }
}
