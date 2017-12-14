export const MAX_LEN_KPA = 5;

// Const values for the GridView
let w = window.innerWidth,
  s
;

if (w>1000) {s = 90;}
else if (w>800) { s=80;}
else if (w>600) { s=70;}
else if (w>330) { s=60;}
else if (w>280) {s=50;}
else {s=40;}

export const SIZE = s;
export const STROKE = 1;
export const GRID_SIZE = SIZE + 2*STROKE;
export const CIRCLE_RADIUS = SIZE/50;
export const LARGE_GRID = 300;
export const SMALL_GRID = 300/9;
export const MIN_ERROR = 300/Math.pow(3,5);
export const KEY_PADDING = 4;
export const TEXT_SIZE = 8;
export const KEY_HEIGHT = 11;
export const SVG_WIDTH = GRID_SIZE;
export const SVG_HEIGHT = GRID_SIZE + KEY_PADDING + KEY_HEIGHT;
export const EPSILON = 0.001;
export const TITLE_SIZE = 12;
export const GRID_VIEW_HEIGHT = SIZE+40;

export const PRECOMPUTE = (
  [...Array(5).keys()]
    .map(i => [300 / Math.pow(3, i), 300 / Math.pow(3, i+1)])
);

export const KPM = [
  [7,8,9],
  [4,5,6],
  [1,2,3]
];

export const MORTAR_ID = 'mortar';
export const TARGET_ID = 'target';

export const MORTAR_TABLE = [
    [50, 1579],
    [100, 1558],
    [150, 1538],
    [200, 1517],
    [250, 1496],
    [300, 1475],
    [350, 1453],
    [400, 1431],
    [450, 1409],
    [500, 1387],
    [550, 1364],
    [600, 1341],
    [650, 1317],
    [700, 1292],
    [750, 1267],
    [800, 1240],
    [850, 1212],
    [900, 1183],
    [950, 1152],
    [1000, 1118],
    [1050, 1081],
    [1100, 1039],
    [1150, 988],
    [1200, 918],
    [1250, 800]
  ]
;

export const MIN_DISTANCE = MORTAR_TABLE[0][0];
export const MAX_DISTANCE = MORTAR_TABLE[MORTAR_TABLE.length-1][0];

export const MIN_ELEVATION = MORTAR_TABLE[0][1];
export const MAX_ELEVATION = MORTAR_TABLE[MORTAR_TABLE.length-1][1];

export const TOO_FAR = 'TOO_FAR';
export const TOO_CLOSE = 'TOO_CLOSE';

