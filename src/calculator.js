import {
  MORTAR_TABLE,
  ROCKET_TABLE,

  MIN_ROCKET_DISTANCE,
  MAX_ROCKET_DISTANCE,

  MIN_DISTANCE,
  MAX_DISTANCE,

  TOO_CLOSE,
  TOO_FAR
} from './const';

export function interpolateElevation(distance) {
  if (distance < MIN_DISTANCE) return TOO_CLOSE;
  if (distance > MAX_DISTANCE) return TOO_FAR;

  for (let i = 0; i < MORTAR_TABLE.length; i++) {
    let currentTableEntry = MORTAR_TABLE[i],
      nextTableEntry = MORTAR_TABLE[i+1],
      currentX = currentTableEntry[0],
      currentY = currentTableEntry[1]
    ;

    if (distance === currentX) return currentY;

    let nextX = nextTableEntry[0];

    if (distance >= nextX) continue;

    let nextY = nextTableEntry[1],
      slope = (nextY - currentY) / (nextX - currentX),
      deltaX = distance - currentX
    ;

    // rounded to nearest .1
    return Math.round((slope * deltaX + currentY) * 10) / 10;
  }
}

export function interpolateTaps(distance) {
  if (distance < MIN_ROCKET_DISTANCE) return 0;
  if (distance > MAX_ROCKET_DISTANCE) return TOO_FAR;

  for (let i = 0; i < ROCKET_TABLE.length; i++) {
    let currentTableEntry = ROCKET_TABLE[i],
      nextTableEntry = ROCKET_TABLE[i+1],
      currentX = currentTableEntry[0],
      currentY = currentTableEntry[1]
    ;

    if (distance === currentX) return currentY;

    let nextX = nextTableEntry[0];

    if (distance >= nextX) continue;

    let nextY = nextTableEntry[1],
      slope = (nextY - currentY) / (nextX - currentX),
      deltaX = distance - currentX
    ;

    // rounded to nearest .1
    return Math.round(slope * deltaX + currentY);
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
