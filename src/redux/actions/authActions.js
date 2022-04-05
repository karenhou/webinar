import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER } from "./types";

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

      if (result.status === 200) {
        // Remove token from localStorage
        localStorage.removeItem("jwtToken");
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to {} which will set isAuthenticated to false
        dispatch(setCurrentUser({}));

        return {
          code: result.status,
          data: "",
          msg: "Logout successful, now redirect",
        };
      } else {
        return result.data;
      }
    } catch (error) {
      console.log("catched logoutUser err ", error);
      return {
        code: 400,
        data: {},
        msg: "[logoutUser] went wrong " + JSON.stringify(error),
      };
    }
  };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    let result;

    try {
      result = await axios.post(`${API_BASE_URL}/auth/login/email`, userData);
      console.log("loginUser result ", result.data);

      if (result) {
        const { auth } = result.data;
        localStorage.setItem("jwtToken", auth.access_token);
        setAuthToken(auth.access_token);
        // Decode token to get user data
        const decoded = jwt_decode(auth.access_token);
        dispatch(setCurrentUser(decoded));

        return {
          code: result.status,
          data: "",
          msg: "Login successful, now redirect",
        };
      } else {
        return result.data;
      }
    } catch (error) {
      console.log("catched loginUser err ", error);
      return {
        code: 403,
        data: "",
        msg: "[loginUser] went wrong " + JSON.stringify(error),
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

export const fetchPostList = (pageNum) => {
  return async (dispatch) => {
    let result;

    try {
      result = await axios.get(
        `${API_BASE_URL}/post/analysis?per_page=12&page=${pageNum}`,
        {}
      );

      if (result.status === 200) {
        return {
          code: result.status,
          data: result.data.data,
          msg: "fetchPostList successful",
        };
      } else {
        return result.data;
      }
    } catch (error) {
      console.log("catched fetchPostList err ", error);
      return {
        code: 400,
        data: {},
        msg: "[fetchPostList] went wrong " + JSON.stringify(error),
      };
    }
  };
};

export const fetchFavouriteList = () => {
  return async (dispatch) => {
    let result;

    try {
      result = await axios.get(
        `${API_BASE_URL}/me/user/favourite/post-analysis`,
        {}
      );

      console.log("fetchFavouriteList result ", result);

      if (result.status === 200) {
        return {
          code: result.status,
          data: result.data.data,
          msg: "fetchFavouriteList successful",
        };
      } else {
        return result.data;
      }
    } catch (error) {
      console.log("catched fetchFavouriteList err ", error);
      return {
        code: 400,
        data: {},
        msg: "[fetchFavouriteList] went wrong " + JSON.stringify(error),
      };
    }
  };
};

export const addFavouritePost = (userData) => {
  return async (dispatch) => {
    let result;

    try {
      result = await axios.post(
        `${API_BASE_URL}/me/user/favourite/post-analysis/${userData.postID}`,
        {}
      );

      console.log("addFavouritePost result ", result);

      if (result.status === 200) {
        return {
          code: result.status,
          data: "",
          msg: `addFavouritePost ${userData.postID} successful`,
        };
      } else {
        return result.data;
      }
    } catch (error) {
      console.log("catched addFavouritePost err ", error);

      return {
        code: 400,
        data: {},
        msg: "[addFavouritePost] went wrong " + JSON.stringify(error),
      };
    }
  };
};

export const removeFavouritePost = (postID) => {
  return async (dispatch) => {
    let result;

    try {
      result = await axios.delete(
        `${API_BASE_URL}/me/user/favourite/post-analysis/${postID}`,
        {}
      );

      console.log("removeFavouritePost result ", result);

      if (result.status === 200) {
        return {
          code: result.data.status_code,
          data: "",
          msg: `removeFavouritePost ${postID} successful`,
        };
      } else {
        return result.data;
      }
    } catch (error) {
      console.log("catched removeFavouritePost err ", error);
      return {
        code: 400,
        data: {},
        msg: "[removeFavouritePost] went wrong " + JSON.stringify(error),
      };
    }
  };
};
