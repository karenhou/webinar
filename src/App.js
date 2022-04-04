import { useRef, useState } from "react";
import { connect } from "react-redux";
import {
  setCurrentUser,
  logoutUser,
  addFavouritePost,
} from "./redux/actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import store from "./redux/store";

import Hero from "./components/hero";
import NavBar from "./components/navbar";
import WebinarList from "./components/webinarList";
import RegisterForm from "./components/registerForm";

//check token for auth, it token expired, logout user
if (localStorage.jwtToken !== "undefined" && localStorage.jwtToken) {
  //set token to auth header
  setAuthToken(localStorage.jwtToken);
  //decode token to get user data
  const decoded = jwt_decode(localStorage.jwtToken);
  // console.log("inapp ", decoded);
  //set current user
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    //redirect to login
    window.location.href = "/login";
  }
}

const scrollDown = (ref) => {
  window.scrollTo({
    top: ref.current.offsetTop,
    behavior: "smooth",
  });
};
const App = ({ auth, logoutUser, addFavouritePost }) => {
  const formSection = useRef(null);
  const [formTopic, setFormTopic] = useState("N/A");
  const [postID, setPostID] = useState("");

  return (
    <div className="App">
      <NavBar isAuthed={auth.isAuthenticated} logoutUser={logoutUser} />
      <Hero />
      <WebinarList
        scrollDown={scrollDown}
        formSection={formSection}
        setFormTopic={setFormTopic}
        setPostID={setPostID}
      />
      <RegisterForm
        ref={formSection}
        formTopic={formTopic}
        postID={postID}
        addFavouritePost={addFavouritePost}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  setCurrentUser,
  logoutUser,
  addFavouritePost,
})(App);
