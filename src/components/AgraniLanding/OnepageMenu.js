import React, { useEffect } from "react";
import Sticky from "react-stickynode";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { CryptoState } from "../FarmerContext";
import Swal from "sweetalert2";

const OnepageMenu = ({ mClass, nClass, cClass, slogo, hbtnClass }) => {


  const {
    logoutbutton,setLogoutButton,setLoginModal
  } = CryptoState();
  var id = localStorage.getItem("user-info-id");
  const user_token= localStorage.getItem("token")

  const history = useHistory();
  function handleLogout() {
    localStorage.clear(id);
    Swal.fire({
      icon: "success",
      title: "Logged out",
      showConfirmButton: false,
      timer: 1000,
    });
    // history.push("/login")
    window.location.reload()  
    setLogoutButton(false)
    setLoginModal(true)
    
    return;
  }


  useEffect(()=>{
    if(user_token){
      setLogoutButton(true)
    }
  

  },[])

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
            {logoutbutton === true || user_token !== null ? <div
              type="submit"
              className="mx-2 text-center d-lg-none d-md-none d-block "
             
              onClick={(e) => handleLogout()}
            >
             <div className="d-flex"> <h5 className="m-0"><MdOutlineLogout /> </h5>  <h6  style={{color:"#f59d0e"}} className="mt-1"> Logout</h6> </div>
            </div> : "" }
            <button
              className="navbar-toggler collapsed  d-none"
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
              className="collapse navbar-collapse d-lg-block d-md-block d-none"
              id="navbarSupportedContent"
            >
              <ul className={`navbar-nav menu ml-auto ${nClass}`}>
                <li className="nav-item">
                  <a
                    className="nav-link f-bold"
                    href="mailto:info@leadsconnect.co.in"
                  >
                    <MdEmail /> info@leadsconnect.co.in
                  </a>
                </li>
              </ul>
              <a
                className={`btn_get btn_hover d-lg-block d-md-block d-none ${hbtnClass}`}
                href="tel:18001029232"
              >
                <IoCall />
                18001029232
              </a>
              {logoutbutton === true || user_token !== null ? <div
              type="submit"
              className="  mt-lg-2 mb-lg-0 mb-3 mx-lg-3 mx-4 text-center  "
             
              onClick={(e) => handleLogout()}
            >
             <div className="d-flex"> <h5 className="m-0"><MdOutlineLogout /> </h5>  <h6  style={{color:"#f59d0e"}} className="mt-1"> Logout</h6> </div>
            </div> : "" }
            </div>
            
          </div>
        </nav>
      </header>
    </Sticky>
  );
};

export default OnepageMenu;
