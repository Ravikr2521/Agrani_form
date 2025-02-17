import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "./assets/themify-icon/themify-icons.css";
import "./assets/simple-line-icon/simple-line-icons.css";
import "./assets/font-awesome/css/all.css";
import "./assets/elagent/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.css";
import "./assets/responsive.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js";
import FarmerContext from "./components/FarmerContext";
import AppBanner from "./components/AgraniLanding/AppBanner";
import { ToastContainer } from "react-toastify";

const loader = document.querySelector("#preloader");

const showLoader = () => loader.classList.remove("loader--hide");

const hideLoader = () => loader.classList.add("loader--hide");

setTimeout(
  () =>
    ReactDOM.render(
      <FarmerContext>
        <App hideLoader={hideLoader} showLoader={showLoader} />
        {/* <AppBanner/> */}
      </FarmerContext>,
      document.getElementById("root")
    ),
  1000
);

serviceWorker.unregister();
