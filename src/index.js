import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "leaflet/dist/leaflet.css";
import "./index.css";
import "./App.css";
import "./report.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "react-datetime/css/react-datetime.css";
import { Provider } from "react-redux";
import appReducers from "./reducers/index";

import "flatpickr/dist/themes/material_orange.css";
const flatpickr = require("flatpickr").default;
const VN = require("flatpickr/dist/l10n/vn").default.vn;
flatpickr.localize(VN);
export const store = createStore(appReducers, applyMiddleware(thunk));

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
