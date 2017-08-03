import { UPDATE_VIDEOCHATINFO } from '../constants';

export const updateVieoChatInfo = info => {
  return dispatch => {
    dispatch({ type: UPDATE_VIDEOCHATINFO, payload: info });
  };
};
