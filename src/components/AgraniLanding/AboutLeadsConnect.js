import React, { Component } from "react";
import Reveal from "react-reveal";
class AboutLeadsConnect extends Component {
  render() {
    return (
      <section className="new_startup_banner_area" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.4s">
              <Reveal left cascade>
                <div className="new_startup_img">
                  <div className="line line_one">
                    <img
                      src={require("../../assets/image/new_shape.png")}
                      alt=""
                    />
                  </div>
                  {/* <div className="line line_two"><img src={require('../../img/new/line_02.png')} alt=""/></div>
                                <div className="line line_three"><img src={require('../../img/new/line_03.png')} alt=""/></div> */}
                  <img
                    src={require("../../assets/image/leadsconnect.png")}
                    alt=""
                  />
                </div>
              </Reveal>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <Reveal bottom cascade duraton={1200}>
                <div className="new_startup_content">
                  <h2
                    className="f_700 f_size_35 l_height50 text-primary mb_20 wow fadeInRight "
                    data-wow-delay="0.3s"
                  >
                    Ready to know about
                    <br />
                    <span>Leads Connect</span> ?
                  </h2>
                  <p
                    className="f_400 text-secondary l_height28 wow fadeInRight"
                    data-wow-delay="0.4s"
                  >
                    Founded in 2009 with a vision of providing end-end solutions
                    to farmers.
                  </p>
                  <p
                    className="f_400 text-secondary l_height28 wow fadeInRight"
                    data-wow-delay="0.4s"
                  >
                    We are primarily an Agri Tech Analytics driven Organization
                    with Pan India presence in more than 100 districts.
                  </p>
                  <p
                    className="f_400 text-secondary l_height28 wow fadeInRight"
                    data-wow-delay="0.4s"
                  >
                    We have experience in delivering prestigious projects
                    related to Agri Risk Management to Nodal Agencies of
                    Government of India.
                  </p>
                  <div
                    className="action_btn d-flex align-items-center mt_40 wow fadeInRight"
                    data-wow-delay="0.6s"
                  >
                    <a
                      href="https://www.leadsconnect.in/"
                      className="btn_hover app_btn"
                    >
                      Know More <i className="ti-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default AboutLeadsConnect;
