import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import App from "./App";
import Login from "./routes/login";
import MyWebinars from "./routes/myWebinars";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import PrivateRoute from "./components/HOC/PrivateRoute";
import NotFound from "./routes/404";
const rootElement = document.getElementById("root");
const theme = {
  primary: "#013881",
  dk: "#01254F",
};
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route index path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/my_webinars"
              element={
                <PrivateRoute>
                  <MyWebinars />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
