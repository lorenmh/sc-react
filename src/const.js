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

export const IS_A_STUPID_BROWSER = /ios|ipad/i.test(navigator.userAgent);

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

export const GAME_SQUAD = 'squad';
export const GAME_PS = 'ps';

export const ROCKET = 'rocket';
export const MORTAR = 'mortar';

export const MORTAR_BR_3 = 'br3';
export const MORTAR_BR_4 = 'br4';
export const MORTAR_DE = 'de';

export const MORTAR_TEXTS = {
  [MORTAR_BR_3]: 'British - 3in',
  [MORTAR_BR_4]: 'British - 4in',
  [MORTAR_DE]: 'German - 8cm'
};

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
];

export const ROCKET_TABLE = [
  [60, 1],
  [170, 2],
  [230, 3],
  [285, 4],
  [300, 5],
  [340, 6],
  [390, 7],
  [435, 8],
  [490, 9],
  [540, 10],
  [560, 11],
  [585, 12],
  [630, 13],
  [650, 14],
  [680, 15],
  [700, 16],
  [740, 17],
  [745, 18],
  [775, 19],
  [815, 21]
];

export const MORTAR_BR_3_TABLE = [
  [50, 1582],
  [100, 1565],
  [150, 1548],
  [200, 1530],
  [250, 1513],
  [300, 1495],
  [350, 1477],
  [400, 1459],
  [450, 1441],
  [500, 1423],
  [550, 1404],
  [600, 1385],
  [650, 1366],
  [700, 1346],
  [750, 1327],
  [800, 1306],
  [850, 1285],
  [900, 1264],
  [950, 1241],
  [1000, 1218],
  [1050, 1194],
  [1100, 1168],
  [1150, 1141],
  [1200, 1112],
  [1250, 1081]
]

export const MORTAR_BR_4_TABLE = [
  [50, 1590],
  [100, 1580],
  [150, 1570],
  [200, 1561],
  [250, 1551],
  [300, 1541],
  [350, 1531],
  [400, 1521],
  [450, 1511],
  [500, 1501],
  [550, 1492],
  [600, 1482],
  [650, 1471],
  [700, 1461],
  [750, 1451],
  [800, 1441],
  [850, 1431],
  [900, 1420],
  [950, 1410],
  [1000, 1399],
  [1050, 1389],
  [1100, 1378],
  [1150, 1367],
  [1200, 1356],
  [1250, 1345]
]

export const MORTAR_DE_TABLE = [
  [50, 1578],
  [100, 1557],
  [150, 1536],
  [200, 1514],
  [250, 1493],
  [300, 1471],
  [350, 1449],
  [400, 1427],
  [450, 1404],
  [500, 1381],
  [550, 1357],
  [600, 1333],
  [650, 1308],
  [700, 1282],
  [750, 1256],
  [800, 1228],
  [850, 1199],
  [900, 1168],
  [950, 1134],
  [1000, 1098],
  [1050, 1057],
  [1100, 1009],
  [1150, 947],
  [1200, 803]
];

export const TABLES = {
  [MORTAR]: MORTAR_TABLE,
  [ROCKET]: ROCKET_TABLE,
  [MORTAR_BR_3]: MORTAR_BR_3_TABLE,
  [MORTAR_BR_4]: MORTAR_BR_4_TABLE,
  [MORTAR_DE]: MORTAR_DE_TABLE,
};

export const ROUNDING = {
  [MORTAR]: 10,
  [ROCKET]: 1,
  [MORTAR_BR_3]: 10,
  [MORTAR_BR_4]: 10,
  [MORTAR_DE]: 10,
};

export const BOUNDS = (
  Object.keys(TABLES)
    .map(k => [k, TABLES[k]])
    .map(([id, table]) => ({
      id,
      distance: [table[0][0], table[table.length-1][0]],
      elevation: [table[0][1], table[table.length-1][1]],
    }))
    .reduce((mapping, bounds) => {
      const { id, distance, elevation } = bounds;
      mapping[id] = {
        distance,
        elevation,
      };
      return mapping
    }, {})
);

export const TOO_FAR = 'TOO_FAR';
export const TOO_CLOSE = 'TOO_CLOSE';
