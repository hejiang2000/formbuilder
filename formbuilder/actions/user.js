import { addNotification } from "./notifications";
import config from "../config";


export const ACCOUNT_LOGIN_PENDING = "ACCOUNT_LOGIN_PENDING";
export const ACCOUNT_LOGIN_DONE = "ACCOUNT_LOGIN_DONE";
export const ACCOUNT_LOGIN_FAILED = "ACCOUNT_LOGIN_FAILED";

export const ACCOUNT_CREATION_PENDING = "ACCOUNT_CREATION_PENDING";
export const ACCOUNT_CREATION_DONE = "ACCOUNT_CREATION_DONE";
export const ACCOUNT_CREATION_FAILED = "ACCOUNT_CREATION_FAILED";


function connectivityIssues(dispatch, message) {
  dispatch(addNotification(message, { type: "error" }));
}

/**
 * Return HTTP authentication headers from a given pair of username and password.
 **/
function getAuthenticationHeaders(username, password) {
  return { Authorization: "Basic " + btoa(`${username}:${password}`) };
}

function getAuthInfo(formData) {
  const username = formData.email.trim().replace(/@/, '_at_').replace(/\./g, '_');
  const password = formData.password.trim();
  return { username, password };
}
/**
 * signup and give the credentials to the callback function
 * when it's done.
 **/
export function accountSignup(formData, success) {
  const thunk = (dispatch, getState, retry = true) => {

    const url = config.server.remote + (config.server.remote.endsWith('/') ? "accounts" : "/accounts");
    const { username, password } = getAuthInfo(formData);

    const body = JSON.stringify({ data: { id: username, password } });
    dispatch({ type: ACCOUNT_CREATION_PENDING });
    fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json;utf-8"
      }
    })
      .then((response) => {
        response.json().then(json => {
          if (json.data.id && json.data.id === username) {
            const authHeaders = getAuthenticationHeaders(username, password);
            dispatch({ type: ACCOUNT_LOGIN_DONE, authHeaders });
            success && success(formData);
          } else {
            connectivityIssues(dispatch, "无效的用户名或密码.");
            dispatch({ type: ACCOUNT_CREATION_FAILED });
          }
        })
      })
      .catch((error) => {
        if (error.response === undefined) {
          throw error;
        }

        connectivityIssues(dispatch, "账号注册失败: 电子邮件已占用。");
        dispatch({ type: ACCOUNT_CREATION_FAILED });
      });
  };
  return thunk;
}

export function accountLogin(formData, success) {
  const thunk = (dispatch, getState, retry = true) => {

    const url = config.server.remote;
    const { username, password } = getAuthInfo(formData);
    const authHeaders = getAuthenticationHeaders(username, password);

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
