import React from "react";
import OnepageMenu from "../components/AgraniLanding/OnepageMenu";
import AppBanner from "../components/AgraniLanding/AppBanner";
// import AppFeaturesTwo from "../components/AgraniLanding/AppFeaturesTwo";
import AppFeatures from "../components/AgraniLanding/AppFeatures";
import AppTestimonial from "../components/AgraniLanding/AppTestimonial";
import AppWork from "../components/AgraniLanding/AppWork";
import ScreenshowCase from "../components/AgraniLanding/ScreenshowCase";
import AppGetstarted from "../components/AgraniLanding/AppGetstarted";
import FooterTwo from "../components/AgraniLanding/FooterTwo";
import ServiceData from '../components/AgraniLanding/ServiceData';
import FooterData from "../components/Footer/FooterData";
import AboutLeadsConnect from "../components/AgraniLanding/AboutLeadsConnect";
import StartupFeatures from "../components/AgraniLanding/StartupFeatures";

const Home = () => {
  return (
    <div className="body_wrapper">
      <OnepageMenu
        slogo="sticky_logo"
        mClass="menu_four"
        nClass="w_menu"
        hbtnClass="btn_get_radious menu_custfive"
      />
      <AppBanner />
      <StartupFeatures />
      {/* <AppFeaturesTwo /> */}
      <AboutLeadsConnect />
      <AppFeatures />
      <AppWork ServiceData={ServiceData} />
      <AppTestimonial />
      <ScreenshowCase />
      <AppGetstarted />
      <FooterTwo FooterData={FooterData} />
    </div>
  );
};
export default Home;
