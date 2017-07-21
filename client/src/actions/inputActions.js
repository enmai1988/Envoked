export const updateInput = (field, value) => {
  return dispatch => {
    dispatch({
      type: `CHANGE_${field.toUpperCase()}`,
      payload: value
    });
  };
};
