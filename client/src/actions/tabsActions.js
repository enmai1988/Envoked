export const selectTab = (tabName) => {
  return dispatch => {
    dispatch({ type: `SELECT_TAB_${tabName}` });
  };
};
