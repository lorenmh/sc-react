export const UPDATE_POSITION_VALUE = 'UPDATE_POSITION_VALUE';
export const UPDATE_HOVER = 'UPDATE_HOVER';
export const APPLY_HOVER_POSITION = 'APPLY_HOVER_POSITION';
export const LOAD_POSITION = 'LOAD_POSITION';
export const SAVE_POSITION = 'SAVE_POSITION';
export const DELETE_SAVED_POSITION = 'DELETE_SAVED_POSITION';

export const UPDATE_CORRECTION_VALUES = 'UPDATE_CORRECTION_VALUES';
export const APPLY_CORRECTION = 'APPLY_CORRECTION';

export function applyCorrection(positionId) {
  return {
    type: APPLY_CORRECTION,
    positionId
  };
}

export function updateCorrectionValues(values) {
  return {
    type: UPDATE_CORRECTION_VALUES,
    values
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

export function updatePositionValue(positionId, positionValue) {
  return {
    type: UPDATE_POSITION_VALUE,
    positionId,
    positionValue
  };
}

export function updateHover(positionId, position) {
  return {
    type: UPDATE_HOVER,
    positionId,
    position
  };
}

export function applyHoverPosition(positionId, position) {
  return {
    type: APPLY_HOVER_POSITION,
    positionId,
    position
  };
}

export function loadPosition(positionId, position) {
  return {
    type: LOAD_POSITION,
    positionId,
    position
  };
}
