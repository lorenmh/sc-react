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

let isMobile = false;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

export const IS_MOBILE = isMobile;

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

export const MIN_DISTANCE = MORTAR_TABLE[0][0];
export const MAX_DISTANCE = MORTAR_TABLE[MORTAR_TABLE.length-1][0];

export const MIN_ROCKET_DISTANCE = ROCKET_TABLE[0][0];
export const MAX_ROCKET_DISTANCE = ROCKET_TABLE[ROCKET_TABLE.length-1][0];

export const MIN_ELEVATION = MORTAR_TABLE[0][1];
export const MAX_ELEVATION = MORTAR_TABLE[MORTAR_TABLE.length-1][1];

export const MIN_ROCKET_ELEVATION = ROCKET_TABLE[0][1];
export const MAX_ROCKET_ELEVATION = ROCKET_TABLE[ROCKET_TABLE.length-1][1];

export const TOO_FAR = 'TOO_FAR';
export const TOO_CLOSE = 'TOO_CLOSE';

