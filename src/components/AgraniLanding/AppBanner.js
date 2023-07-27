import React from "react";
import Reveal from "react-reveal";

const AppBanner = () => {
  return (
    <section className="app_banner_area" id="home">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <Reveal bottom cascade>
              <div className="app_banner_contentmt mt_40">
                <h2
                  className="f_p f_700 f_size_40 w_color mb_20 wow fadeInLeft"
                  data-wow-delay="0.2s"
                >
                  Space Tech-AI based <br />
                  Multi-Event Real Time Analytics Omni-Channel Platform
                </h2>
                <p
                  className="f_400 f_size_20 l_height30 w_color wow fadeInLeft"
                  data-wow-delay="0.3s"
                >
                  for Delivering end-to-end Precise, Hyperlocal & User Driven
                  Agri-FinTech Services.!!
                </p>
                <a
                  href=".#"
                  className="btn_hover mt_30 app_btn wow fadeInLeft"
                  data-wow-delay="0.5s"
                >
                  Get Started
                </a>
              </div>
            </Reveal>
          </div>
          <div className="col-lg-5">
            <div className="app_img">
              <img
                className="app_screen one wow fadeInDown"
                src={require("../../assets/image/icon/drone.png")}
                height="100"
                alt=""
              />
              <img
                className="app_screen two wow fadeInDown"
                src={require("../../assets/image/icon/growth.png")}
                height="100"
                alt=""
              />
              <img
                className="app_screen three wow fadeInDown"
                src={require("../../assets/image/icon/smart-farm.png")}
                height="100"
                alt=""
              />
              <img
                className="mobile"
                src={require("../../assets/image/icon/mobile.png")}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppBanner;
