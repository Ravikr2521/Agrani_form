import React from "react";
import Reveal from "react-reveal";
const AppFeatures = () => {
  return (
    <section className="app_featured_area_two">
      <div className="triangle_shape"></div>
      <div className="container">
        <div className="row app_feature_info">
          <div className="col-lg-5">
            <div className="app_img">
              <div className="dot dot_one wow fadeIn" data-wow-delay="0.5s">
                <span className="dot1"></span>
                <span className="dot2"></span>
              </div>
              <div className="dot dot_two wow fadeIn" data-wow-delay="0.8s">
                <span className="dot1"></span>
                <span className="dot2"></span>
              </div>
              <div className="dot dot_three wow fadeIn" data-wow-delay="0.3s">
                <span className="dot1"></span>
                <span className="dot2"></span>
              </div>
              <Reveal effect="fadeInLeft" duration={2500}>
                <img
                  className="text_bg one"
                  src={require("../../assets/image/home/text_one.png")}
                  alt=""
                />
              </Reveal>
              <Reveal effect="fadeInDown" duration={2000}>
                <img
                  className="text_bg two"
                  src={require("../../assets/image/home/text_three.png")}
                  alt=""
                />
              </Reveal>
              <Reveal effect="fadeInRight" duration={1500}>
                <img
                  className="text_bg three"
                  src={require("../../assets/image/home/text_two.png")}
                  alt=""
                />
              </Reveal>
              <img
                className="wow fadeIn phone_img"
                src={require("../../assets/image/icon/front.png")}
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-7 d-flex align-items-center">
            <Reveal bottom cascade>
              <div className="app_featured_content">
                <h2 className="f_p f_size_30 f_700 t_color l_height45 mb-30">
                  Agricultural Solutions
                  <br /> Farmer
                </h2>
                <p className="f_400 text-secondary">
                  Using <span className="text-primary">AGRANI Farmer </span>{" "}
                  App, the farmer gets connected with the required services such
                  as Banking, Insurance ,Advisory , Inputs & Market Linkages.
                </p>
                <p className="f_400 text-secondary">
                  <span className="text-primary"> AGRANI Saathi</span> is the
                  facilitator to bridge the gap between service providers and
                  consumers through the digital half of <span className="text-primary"> AGRANI </span>. Based on the
                  information provided by AGRANI Saathi , the intelligent
                  backend module of{" "}
                  <span className="text-primary"> AGRANI </span> curates and
                  analyses the information for providing analytics driven farmer
                  centric solutions.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AppFeatures;
