import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import App from "./App";
import Login from "./routes/login";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
