import React, { useState } from "react";
import FooterTwo from "../components/AgraniLanding/FooterTwo";
import FooterData from "../components/Footer/FooterData";
import OnepageMenu from "../components/AgraniLanding/OnepageMenu";
import { useEffect } from "react";
import FinalPreview from "../components/AgraniLanding/SaathiForm/PreviewPage/FinalPreview";
import { FaDownload } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../components/FarmerContext";
import UploadSignedDoc from "../components/AgraniLanding/SaathiForm/UploadSignedDoc";

const SaathiPreview = () => {
  const {
    userDetails
  } = CryptoState();
  console.log(userDetails , "userDetails")
  // console.clear()
  const history = useHistory();
  const [downloadUrl, setdownloadUrl] = useState("");
  var Api_Url =process.env.REACT_APP_API_URL
  localStorage.getItem("userDetail");
  var id = localStorage.getItem("user-info-id");
  let user_token = localStorage.getItem("token")
  // console.log(id)

  function handlePreview() {
    history.push("/UserPreview");
    return;
  }
  // function handleLogout() {
  //   localStorage.clear(id);
  //   history.push("/");
  //   return;
  // }

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: { Authentication: `Token ${user_token}`,}   

  };

  function handleClick() {
    fetch(`${Api_Url}/api/download-form/${id}?created_by=0` ,requestOptions)
      .then((r) => r.json())
      .then((result) => {
        setdownloadUrl(result.data["download-link"]);
        console.log(result);
      
      });
  }
  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="body_wrapper bg-light-org">
      <OnepageMenu
        slogo="sticky_logo"
        mClass="menu_four"
        nClass="w_menu"
        hbtnClass="btn_get_radious menu_custfive"
      />

      <div className="bg-shd col-lg-11 mx-auto mt-5 pt-5">
        {/* <div className="col-lg-1 mx-auto">
          <Link href="/">
            <button
              type="submit"
              className="btn_three sign_btn_transparent mt-2 text-center d-flex"
              onClick={(e) => handleLogout()}
            >
              Logout
            </button>
          </Link>
        </div> */}
        <section className="software_service_area sec_pad mt-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-md-10 col-11 bg-white p-0 Form_BG m-auto">
                <div className="tab-content software_service_tab_content mt-5 mb-0">
                  <div
                    className="tab-pane fade show active"
                    id="monitor"
                    role="tabpanel"
                    aria-labelledby="Preview"
                  >
                    <div className="row">
                      <FinalPreview />
                    </div>
                    <form>
                      <div className="row mt-6">
                        <div className="col-lg-12 form-check text_box mt-3">
                          <div className="form-check text-center ">
                            <button
                              className="m-2 mr-5 btn border-bottom"
                              onClick={() => handlePreview()}
                            >
                              Preview
                            </button>
                            <button
                              type="button"
                              className="btn_three mr-2 mt-2 dbtnclr"
                              onClick={handleClick}
                            >
                              <a href={downloadUrl} >
                                Download Form <FaDownload />
                              </a>
                            </button>
                          </div>
                        </div>
                      </div>
                      {userDetails && userDetails.is_agreed !== false && userDetails?.is_attached_by_agent !== false && (userDetails?.onboarding_status !== "QC1 Approved" ? false : true) ? "" : <UploadSignedDoc/>}
                      <div>

                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <FooterTwo FooterData={FooterData} />
    </div>
  );
};
export default SaathiPreview;
