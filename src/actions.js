export const UPDATE_POSITION_STRING = 'UPDATE_POSITION_STRING';
export const LOAD_POSITION = 'LOAD_POSITION';
export const SAVE_POSITION = 'SAVE_POSITION';
export const DELETE_SAVED_POSITION = 'DELETE_SAVED_POSITION';

export const UPDATE_CORRECTION_STRINGS = 'UPDATE_CORRECTION_STRINGS';
export const APPLY_CORRECTION = 'APPLY_CORRECTION';

export function applyCorrection(positionId) {
  return {
    type: APPLY_CORRECTION,
    positionId
  };
}

export function updateCorrectionStrings(strings) {
  return {
    type: UPDATE_CORRECTION_STRINGS,
    strings
  };
}

export function deleteSavedPosition(index) {
  return {
    type: DELETE_SAVED_POSITION,
    index
  };
}

export function savePosition(positionId) {
  return {
    type: SAVE_POSITION,
    positionId
  };
}

export function updatePositionString(positionId, positionString) {
  return {
    type: UPDATE_POSITION_STRING,
    positionId,
    positionString
  };
}

export function loadPosition(positionId, position) {
  return {
    type: LOAD_POSITION,
    positionId,
    position
  };
}
