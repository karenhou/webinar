import axios from "axios";

/**
 * sets the axios header for API calls
 *
 * @param {string} token
 */
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
  console.log("token ", axios.defaults.headers);
};

export default setAuthToken;
