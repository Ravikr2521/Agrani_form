import React, { Component } from "react";
import AboutWidget from "../Footer/FooterWidget/AboutWidget";
import Reveal from "react-reveal/Reveal";
import {MdEmail} from "react-icons/md"
import {IoCall} from "react-icons/io5"
class FooterTwo extends Component {
  render() {
    var { fClass } = this.props;
    let FooterData = this.props.FooterData;
    return (
      <footer
        className={`footer_area footer_area_four f_bg ${fClass}`}
        id="contact"
      >
        <div className="footer_top">
          <div className="container ">
            <div className="row ">
              {FooterData.CompanyWidget.map((widget) => {
                return (
                  <Reveal effect="fadeInUp" key={widget.id}>
                    <div className="col-lg-5 col-md-6">
                      <div
                        className=""
                      // data-wow-delay="0.2s"
                      >
                        <a href="index.html" className="f-logo">
                          <img
                            src={require("../../assets/image/logo/agrani-logo.png")}
                            height="40px"
                            alt=""
                          />
                        </a>

                        <div className="widget-wrap mt-3">
                          <div className="contact_info_item ">
                            <h6 className="f_p f_size_20 t_color f_500">
                              Office Address
                            </h6>
                            <p className="f_400 f_size_15 ">
                              1601, 16th Floor, World Trade Tower, Plot No.
                              C-001, Sector 16, Noida, Uttar Pradesh 201301
                            </p>
                          </div>

                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}

              {/* <form
                  onSubmit={this.submitForm}
                  className="contact_form_box"
                  method="post"
                  id="contactForm"
                > */}
              <div className="col-lg-4">


                <div className="contact_info_item p-2 ">
                  <h6 className="f_p f_size_20 t_color f_500">
                    Help & Support
                  </h6>

                </div>
                <p className="f_400 f_p f_size_15 mb-0 ">
                  <span><MdEmail/> Email:</span>{" "}
                  <a
                    href="mailto:Agrani-Saathi@gmail.com"
                    className="f_400 orange"
                  >
                    info@leadsconnect.co.in
                  </a>
                </p>
                <p className="f_400 f_p f_size_15  l_height34">
                  <span><IoCall/> Phone:</span>{" "}
                  <a href="tel:180011029232" className="f_400 orange">
                    180011029232
                  </a>
                </p>




                {/* <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group text_box">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group text_box">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          placeholder="Your Email"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group text_box">
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          placeholder="Subject"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="form-group text_box">
                        <textarea
                          onChange={this.handleChange}
                          className="Contactmessage"
                          name="Contactmessage"
                          id="message"
                          cols="30"
                          rows="10"
                          placeholder="Enter Your Message . . ."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <button type="submit" className="btn_three w-100">
                        Send Message
                      </button>
                    </div>
                  </div> */}
                {/* </form> */}
              </div>
              <div className="col-lg-3">
                <h6 className="f_p f_size_20 t_color f_500">
                  Social Media Link
                </h6>

                <div className="widget-wrap">
                  <div className="contact_info_item ">
                    <div className="f_social_icon_two ">
                      {FooterData.socialIcon.map((item) => {
                        return (
                          <a target='_blank' href={item.url} key={item.id}>

                            <i className={item.icon}></i>
                          </a>
                        );
                      })}
                    </div>
                    <ul className="list-unstyled d-flex">
                      <li >
                        <a className="black_clr" href="https://agrani.io/home" >Terms of Use    |</a>
                      </li>

                      <li>
                        <a className="ml-2 black_clr" href="https://agrani.io/home" >Privacy Policy</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-5 col-sm-6 text-center">
                <p className="mb-0 f_400 black_clr">{FooterData.copywrite}</p>
              </div>
              {/* <div className="col-lg-4 col-md-3 col-sm-6">
                <div className="f_social_icon_two text-center">
                  {FooterData.socialIcon.map((item) => {
                    return (
                      <a target='_blank' href={item.url} key={item.id}>

                        <i className={item.icon}></i>
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <ul className="list-unstyled f_menu text-right">
                  <li>
                    <a href=".#">Terms of Use</a>
                  </li>
                  <li>
                    <a href=".#">Privacy Policy</a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default FooterTwo;
