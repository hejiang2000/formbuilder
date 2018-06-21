import { addNotification } from "./notifications";
import config from "../config";


export const ACCOUNT_LOGIN = "ACCOUNT_LOGIN";

export const ACCOUNT_LOGIN_PENDING = "ACCOUNT_LOGIN_PENDING";
export const ACCOUNT_LOGIN_DONE = "ACCOUNT_LOGIN_DONE";
export const ACCOUNT_LOGIN_FAILED = "ACCOUNT_LOGIN_FAILED";

export const ACCOUNT_CREATION_PENDING = "ACCOUNT_CREATION_PENDING";
export const ACCOUNT_CREATION_DONE = "ACCOUNT_CREATION_DONE";

export const SCHEMA_RETRIEVAL_PENDING = "SCHEMA_RETRIEVAL_PENDING";
export const SCHEMA_RETRIEVAL_DONE = "SCHEMA_RETRIEVAL_DONE";

export const RECORDS_RETRIEVAL_PENDING = "RECORDS_RETRIEVAL_PENDING";
export const RECORDS_RETRIEVAL_DONE = "RECORDS_RETRIEVAL_DONE";

function connectivityIssues(dispatch, message) {
  dispatch(addNotification(message, { type: "error" }));
}

/**
 * Return HTTP authentication headers from a given pair of username and password.
 **/
function getAuthenticationHeaders(username, password) {
  return { Authorization: "Basic " + btoa(`${username}:${password}`) };
}

/**
 * login and give the credentials to the callback function
 * when it's done.
 **/
export function accountLogin(formData, success) {
  const thunk = (dispatch, getState, retry = true) => {

    const url = config.server.remote;
    const authHeaders = getAuthenticationHeaders(formData.username, formData.password);

    dispatch({ type: ACCOUNT_LOGIN_PENDING });
    fetch(url, { method: "GET", headers: authHeaders })
      .then((response) => {
        response.json().then(data => {
          if (data.user && data.user.id && data.user.id.startsWith('account:')) {
            dispatch({
              type: ACCOUNT_LOGIN_DONE,
              authHeaders,
            });

            success && success(formData);
          } else {
            connectivityIssues(dispatch, "无效的用户名或密码.");
            dispatch({ type: ACCOUNT_LOGIN_FAILED });
          }
        })
      })
      .catch((error) => {
        if (error.response === undefined) {
          throw error;
        }

        connectivityIssues(dispatch, "We were unable to publish your form.");
        dispatch({ type: ACCOUNT_LOGIN_FAILED });
      });
  };
  return thunk;
}

export function accountCheck(success, failure) {
  const thunk = (dispatch, getState, retry = true) => {
    if (getState().accountStatus.authHeaders) {
      success && success();
    } else {
      failure && failure();
    }
  };
  return thunk;
}
