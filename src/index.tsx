import React from "react";
import ReactDOM from "react-dom";
import {App} from "./App";
import { Provider } from "react-redux";
import "./index.css";
import store from "./shared/store/Store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);