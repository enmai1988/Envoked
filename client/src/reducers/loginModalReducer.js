const initLoginModalState = { open: false };

const handleLoginModal = (state = initLoginModalState, action) => {
  switch (action.type) {
  case 'SHOW_LOGIN_MODAL':
    return { ...state, open: true };
  case 'HIDE_LOGIN_MODAL':
    return { ...state, open: true };
  default:
    return state;
  }
};

export default handleLoginModal;
