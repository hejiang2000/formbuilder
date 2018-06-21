import {
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
  NOTIFICATION_REMOVE_ALL
} from "../actions/notifications";

const INITIAL_STATE = [];

export default function collections(state = INITIAL_STATE, action) {
  switch(action.type) {

  case NOTIFICATION_ADD:
    return [...state, action.notification];

  case NOTIFICATION_REMOVE:
    return state.filter(({id}) => action.id !== id);

  case NOTIFICATION_REMOVE_ALL:
    return [];

  default:
    return state;
  }
}
