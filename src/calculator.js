import {
  TABLES,
  ROUNDING,

  TOO_CLOSE,
  TOO_FAR
} from './const';

export function interpolate(type, distance) {
  const table = TABLES[type];
  const rounding = ROUNDING[type];

  const minDistance = table[0][0];
  const maxDistance = table[table.length-1][0];

  if (distance < minDistance) return TOO_CLOSE;
  if (distance > maxDistance) return TOO_FAR;

  for (let i = 0; i < table.length; i++) {
    let currentTableEntry = table[i],
      nextTableEntry = table[i+1],
      [currentX, currentY] = currentTableEntry
    ;

    if (distance === currentX) return currentY;

    let [nextX, nextY] = nextTableEntry;

    if (distance >= nextX) continue;

    let slope = (nextY - currentY) / (nextX - currentX),
      deltaX = distance - currentX
    ;

    // rounded to nearest .1
    return Math.round((slope * deltaX + currentY) * rounding) / rounding;
  }
}

export function bearingWorstCasePositions(p1, p2) {
  let dx = p2.x - p1.x,
    dy = p2.y - p1.y
  ;

  if (dx === 0 && dy < 0) {
    return [
      [p1.topRight(), p2.bottomLeft()],
      [p1.topLeft(), p2.bottomRight()]
    ];
  } else if (dx > 0 && dy < 0) {
    return [
      [p1.bottomRight(), p2.topLeft()],
      [p1.topLeft(), p2.bottomRight()]
    ];
  } else if (dx > 0 && dy === 0) {
    return [
      [p1.bottomRight(), p2.topLeft()],
      [p1.topRight(), p2.bottomLeft()]
    ];
  } else if (dx > 0 && dy > 0) {
    return [
      [p1.bottomLeft(), p2.topRight()],
      [p1.topRight(), p2.bottomLeft()]
    ];
  } else if (dx === 0 && dy > 0) {
    return [
      [p1.bottomLeft(), p2.topRight()],
      [p1.bottomRight(), p2.topLeft()]
    ];
  } else if (dx < 0 && dy > 0) {
    return [
      [p1.topLeft(), p2.bottomRight()],
      [p1.bottomRight(), p2.topLeft()]
    ];
  } else if (dx < 0 && dy === 0) {
    return [
      [p1.topLeft(), p2.bottomRight()],
      [p1.bottomLeft(), p2.topRight()]
    ];
  }
  return [
    [p1.topRight(), p2.bottomLeft()],
    [p1.bottomLeft(), p2.topRight()]
  ];
}

export function distanceWorstCasePositions(p1, p2) {
  let dx = p2.x - p1.x,
    dy = p2.y - p1.y
  ;

  if (dx === 0 && dy < 0) {
    return [
      [p1.topLeft(), p2.bottomLeft()],
      [p1.bottomLeft(), p2.topRight()]
    ];
  } else if (dx > 0 && dy < 0) {
    return [
      [p1.topRight(), p2.bottomLeft()],
      [p1.bottomLeft(), p2.topRight()]
    ];
  } else if (dx > 0 && dy === 0) {
    return [
      [p1.topRight(), p2.topLeft()],
      [p1.bottomLeft(), p2.topRight()]
    ];
  } else if (dx > 0 && dy > 0) {
    return [
      [p1.bottomRight(), p2.topLeft()],
      [p1.topLeft(), p2.bottomRight()]
    ];
  } else if (dx === 0 && dy > 0) {
    return [
      [p1.bottomLeft(), p2.topLeft()],
      [p1.topLeft(), p2.bottomRight()]
    ];
  } else if (dx < 0 && dy > 0) {
    return [
      [p1.bottomLeft(), p2.topRight()],
      [p1.topRight(), p2.bottomLeft()]
    ];
  } else if (dx < 0 && dy === 0) {
    return [
      [p1.topLeft(), p2.topRight()],
      [p1.topRight(), p2.bottomLeft()]
    ];
  }
  return [
    [p1.topLeft(), p2.bottomRight()],
    [p1.bottomRight(), p2.topLeft()]
  ];
}
