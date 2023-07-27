import React, { Component } from "react";
import Sticky from "react-stickynode";
import {IoCall} from "react-icons/io5"
import {MdEmail} from "react-icons/md"

class OnepageMenu extends Component {
  render() {
    var { mClass, nClass, cClass, slogo, hbtnClass } = this.props;
    return (
      <Sticky top={0} innerZ={9999} activeClass="navbar_fixed">
        <header className="header_area">
          <nav className={`navbar navbar-expand-lg menu_one ${mClass}`}>
            <div className={`container ${cClass}`}>
              <a className={`navbar-brand ${slogo}`} href="/">
                <img
                  src={require("../../assets/image/logo/agrani-logo.png")}
                  height="35px"
                  alt=""
                />
                <img
                  src={require("../../assets/image/logo/agrani-logo.png")}
                  alt="logo"
                  height="35px"
                />
              </a>
              <button
                className="navbar-toggler collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="menu_toggle">
                  <span className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                  <span className="hamburger-cross">
                    <span></span>
                    <span></span>
                  </span>
                </span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className={`navbar-nav menu ml-auto ${nClass}`}>
                  {/* <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass="active"
                      to="home"
                      spy={true}
                      smooth={true}
                      offset={0}
                      duration={1000}
                    >
                      Home
                    </Link>
                  </li> */}
                  {/* <li className="nav-item">
                    <Link
                      className="nav-link"
                      activeClass=""
                      to="about"
                      spy={true}
                      smooth={true}
                      offset={0}
                      duration={1000}
                    >
                      About
                    </Link>
                  </li> */}
                 
                  <li className="nav-item">
                    <a
                      className="nav-link f-bold"
                     href="mailto:info@leadsconnect.co.in"
                    >
                   <MdEmail/> info@leadsconnect.co.in


                    </a>
                  </li>
                 
                </ul>
                <a 
                className={`btn_get btn_hover ${hbtnClass}`} href="tel:18001029232"
 >
               <IoCall/> 
                18001029232
                </a>
              </div>
            </div>
          </nav>
        </header>
      </Sticky>
    );
  }
}

export default OnepageMenu;
