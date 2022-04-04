import { isObjEmpty } from "../../utils/tool";

import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function authReducer(state = initialState, action) {
  // console.log("redux ", action.payload);
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isObjEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
