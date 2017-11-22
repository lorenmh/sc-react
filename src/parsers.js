import { GRID_SIZE } from './const';

const KP_MAP = [
    [0,2],[1,2],[2,2],
    [0,1],[1,1],[2,1],
    [0,0],[1,0],[2,0],
  ]
;

export function parseX(xString) {
  return (parseInt(xString, 36) - 10) * GRID_SIZE;
}

export function parseY(yString) {
  return (parseInt(yString) - 1) * GRID_SIZE;
}

export function parseKp(kpString) {
  return;
}

export function parseKps(kpsString) {
}

export function parseError(kpsString) {
}
