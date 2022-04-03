import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from "./types";

const API_BASE_URL = "https://g1api.finlogix.com/v1";

/**
 * logoutUser - log user out and remove tokens
 *
 */
export const logoutUser = () => {
  return async (dispatch) => {
    try {
      let result = await axios.post(API_BASE_URL + "/me/user/logout", {});

      console.log("logoutUser result ", result);

      if (result) {
        // Remove token from localStorage
        localStorage.removeItem("jwtToken");
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to {} which will set isAuthenticated to false
        dispatch(setCurrentUser({}));
        return {
          data: {
            code: "200",
            data: "",
            msg: "Logout successful, now redirect",
          },
        };
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: result.data.msg,
        });
        return result.data;
      }
    } catch (error) {
      console.log("catched logoutUser err ", error);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
      return {
        data: {
          code: "400",
          data: {},
          msg: "[logoutUser] went wrong " + JSON.stringify(error),
        },
      };
    }
  };
};

export const loginUser = (userData, history) => {
  return async (dispatch) => {
    let result;

    try {
      result = await axios.post(API_BASE_URL + "/auth/login/email", userData);

      console.log("loginUser result ", result.data);

      if (result) {
        const { auth } = result.data;
        localStorage.setItem("jwtToken", auth.access_token);
        setAuthToken(auth.access_token);
        // Decode token to get user data
        const decoded = jwt_decode(auth.access_token);
        dispatch(setCurrentUser(decoded));
        dispatch(clearErrors());
        return {
          data: {
            code: "200",
            data: "",
            msg: "Login successful, now redirect",
          },
        };
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: result.data.msg,
        });
        return result.data;
      }
    } catch (error) {
      console.log("catched loginUser err ", error);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
      return {
        data: {
          code: "400",
          data: {},
          msg: "[loginUser] went wrong " + JSON.stringify(error),
        },
      };
    }
  };
};

/**
 * store logged info into redux and setCurrentUser
 *
 * @param {object} decoded - decoded json token
 * @returns {function} redux function call to store current user
 */
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

/**
 * clearErrors
 *
 * @returns {function} redux function call to clear errors
 */
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const fetchPostList = () => {
  return async (dispatch) => {
    let result;

    try {
      result = await axios.get(
        API_BASE_URL + "/post/analysis?per_page=12&page=1",
        {}
      );

      console.log("fetchPostList result ", result.data);

      if (result) {
        return {
          data: {
            code: "200",
            data: result.data,
            msg: "fetchPostList successful",
          },
        };
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: result.data.msg,
        });
        return result.data;
      }
    } catch (error) {
      console.log("catched fetchPostList err ", error);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
      return {
        data: {
          code: "400",
          data: {},
          msg: "[fetchPostList] went wrong " + JSON.stringify(error),
        },
      };
    }
  };
};
