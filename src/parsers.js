import { GRID_SIZE, MAX_LEN_KPA } from './const';

const KP_MAP = [
    [0,2],[1,2],[2,2],
    [0,1],[1,1],[2,1],
    [0,0],[1,0],[2,0],
  ],

  POSITION_STRING_RE = new RegExp(
    '^\\s?([a-z])([12][0-9](?=(?:[k\\s-]))|[1-9])((?:(?:\\s+|-)?(?:kp?)?[1-9])*)' +
    '(?:\\s|-)?(?:kp?)?$',
    'i'
  ),

  REPLACE_RE = /[^1-9]/g
;

export function parsePositionString(positionString) {
  return positionString.match(POSITION_STRING_RE).slice(1);
}

export function parseX(xString) {
  return (parseInt(xString, 36) - 10);
}

export function parseY(yString) {
  return (parseInt(yString) - 1);
}

// kpString is something like "-9-5-4"
export function parseKpa(kpString) {
  return (
    kpString
      .replace(REPLACE_RE, '')
      .split('')
      .map(s => parseInt(s))
      .slice(0, MAX_LEN_KPA)
  );
}

export function kpaDelta(kpa) {
  return (
    kpa
      .map(k => KP_MAP[k-1])
      .map((k,i) => {
        let e = Math.pow(1/3,i+1);
        return [k[0]*e, k[1]*e];
      })
      .reduce((a,k) => {
        a[0] += k[0];
        a[1] += k[1];
        return a;
      }, [0,0])
  );
}

export function kpaToError(kpa) {
  return Math.pow((1/3),kpa.length);
}

export function parseKps(kpsString) {
}

export function parseError(kpsString) {
}
