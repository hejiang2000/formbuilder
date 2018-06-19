import KintoClient from "kinto-http";
import btoa from "btoa";
import uuid from "uuid";

import {addNotification} from "./notifications";
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

const CONNECTIVITY_ISSUES = "This is usually due to an unresponsive server or some connectivity issues.";

function connectivityIssues(dispatch, message) {
  const msg = message +  " " + CONNECTIVITY_ISSUES;
  dispatch(addNotification(msg, {type: "error"}));
}

/**
 * Return HTTP authentication headers from a given pair of username and password.
 **/
function getAuthenticationHeaders(username, password) {
  return {Authorization: "Basic " + btoa(`${username}:${password}`)};
}

/**
 * login and give the credentials to the callback function
 * when it's done.
 **/
export function accountLogin(callback) {
  const thunk =  (dispatch, getState, retry = true) => {

    const form = getState().form;
    const formData = form.formData;

    const url = config.server.remote + "/account";
    const authHeaders = getAuthenticationHeaders(formData.username, formData.password);

    dispatch({type: ACCOUNT_LOGIN_PENDING});

    fetch(url, authHeaders)
    .then(({data})=> {
      dispatch({
        type: ACCOUNT_LOGIN_DONE,
        authHeaders,
      });
      if (callback) {
        callback(formData);
      }
    })
    .catch((error) => {
      if (error.response === undefined) {
        throw error;
      }

      connectivityIssues(dispatch, "We were unable to publish your form.");
      dispatch({type: ACCOUNT_LOGIN_FAILED});
    });

  };
  return thunk;
}
