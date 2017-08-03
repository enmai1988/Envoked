import { UPDATE_VIDEOCHATINFO } from '../constants';

const initState = {
  inviter: {},
  invitee: {}
};

const videoChatReducer = (state = initState, action) => {
  switch (action.type) {
  case UPDATE_VIDEOCHATINFO:
    return { ...state, inviter: action.payload.inviter, invitee: action.payload.invitee };
  default:
    return state;
  }
};

export default videoChatReducer;
