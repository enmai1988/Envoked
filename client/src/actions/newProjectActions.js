import axios from 'axios';

export const updateProjectForm = (field, value) => {
  return dispatch => {
    dispatch({
      type: `CHANGE_${field.toUpperCase()}`,
      payload: value
    });
  };
};
