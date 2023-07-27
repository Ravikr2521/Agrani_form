import React from "react";
import FooterTwo from '../components/AgraniLanding/FooterTwo';
import FooterData from '../components/Footer/FooterData';
import OnepageMenu from "../components/AgraniLanding/OnepageMenu";
const NotFound = () => (
  <div className="body_wrapper">
    <OnepageMenu
        slogo="sticky_logo"
        mClass="menu_four"
        nClass="w_menu"
        hbtnClass="btn_get_radious menu_custfive"
      />
    <section className="error_two_area">
      <div className="container flex">
        <div className="error_content_two text-center">
          <img src={require("../assets/image/home/error.png")} alt="" />
          <h2>Error. We can’t find the page you’re looking for.</h2>
          <p>
            Sorry for the inconvenience. Go to our homepage or check out our
            latest collections for Fashion, Chair, Decoration...{" "}
          </p>
          <form action="#" className="search">
            <input type="text" className="form-control" placeholder="search" />
          </form>
          <a href="/" className="about_btn btn_hover">
            Back to Home Page <i className="arrow_right"></i>
          </a>
        </div>
      </div>
    </section>
    <FooterTwo FooterData={FooterData} />
  </div>
);
export default NotFound;
