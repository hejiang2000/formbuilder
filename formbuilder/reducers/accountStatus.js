import {
  ACCOUNT_LOGIN_PENDING,
  ACCOUNT_LOGIN_DONE,
  ACCOUNT_LOGIN_FAILED
} from "../actions/account";

const INITIAL_STATE = {
  status: "init",
  authHeaders: null,
};

export default function accountStatus(state = INITIAL_STATE, action) {
  switch(action.type) {

  case ACCOUNT_LOGIN_FAILED:
    return {...state, status: "failed"};

  case ACCOUNT_LOGIN_PENDING:
    return {...state, status: "pending"};

  case ACCOUNT_LOGIN_DONE:
    return {
      ...state,
      status: "done",
      authHeaders: action.authHeaders,
    };
  default:
    return state;
  }
}
