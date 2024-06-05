import React, { useEffect, useState } from "react";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";
import BankDetails from "./BankDetails";
import CertificationDetails from "./CertificationDetails";
import BusinessDetails from "./BusinessDetails";
import Preview from "./Preview";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CryptoState } from "../../FarmerContext";
import CorporateForm from "./CorporateForm";
import { FaDownload } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import KycDetails from "./KycDetails";
import { Modal } from "reactstrap";
import Login from "../Login";
import { Spinner } from "react-bootstrap";
import UploadSignedDoc from "./UploadSignedDoc";

const CloudServiceTab = ({ urlid }) => {
  // console.clear()

  const {
    education,
    bank,
    personal,
    KycDetail,
    certificate,
    business,
    completedSection,
    corporate,
    SetCorporate,
    loginModal,
    userDetails
  } = CryptoState();
  // console.log(userDetails , "userDetails")
  const history = useHistory();
  var Api_Url = process.env.REACT_APP_API_URL;
  const applicaintId = localStorage.getItem("user-info-id");

  const [checked, setChecked] = useState(userDetails?.is_agreed);
  const [downloadUrl, setdownloadUrl] = useState("");
  const [Verify, setVerify] = useState(false);
  const [loading,setLoading]=useState(false)
  const verifyFunction = (e) => {
    setVerify(true);
  };
  function handleClick() {
    var id = localStorage.getItem("applicant_id");
    // localStorage.clear(id);
  }

  const login_token = localStorage.getItem("token");
  const [EntityType, setEntityType] = useState("Individual");
  const [radioValue, setRadioValue] = useState(1);
  const [currentSection, setCurrentSection] = useState("1");

  const onChange = (ev) => {
    console.log(ev.target.value + EntityType);
    setRadioValue(ev.target.value);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = () => {
    SetCorporate(true);
    setLoading(true)
    let user_token = localStorage.getItem("token");
    var id = localStorage.getItem("user-info-id");

    var formdata = new FormData();
    formdata.append("is_agreed", checked);
    formdata.append("applicant_id", id);
    formdata.append("created_by", "0");
    // formdata.append("created_by_name", "Self");
    
    var requestOptions = {
      method: "PUT",
      body: formdata,
      headers: { Authentication: `Token ${user_token}` },
    };

    fetch(`${Api_Url}/api/preview/${id}`, requestOptions)
      .then((r) => r.json())

      .then((result) => {

        if ("detail" in result) {
          Swal.fire("Please Fill your Application in sequence");
          history.push("/");
          setLoading(false)
          return;
          
        } else if (result.status == 200) {
          Swal.fire({
            icon: "success",
            text:
              "Your Applicant ID is : " +
              id +
              "  Download Your form and sign it and send it to: 1601, 16th Floor, World Trade Tower, Plot No. C-001, Sector 16, Noida, UP - 201301 .For Any Quary : +91 6390640749   info@leadsconnect.in",
            title: "Thank You, Your Application is Saved Successfully",
          });
          setdownloadUrl(result.data.empanelment_form_url);
          verifyFunction(true);
          setLoading(false)
          document.getElementById("submitbutton").disabled = true;
        } else{
          Swal.fire(result.message);
          setLoading(false)
        }
         
      }).catch((error)=>{
        Swal.fire({icon: "warning",
        title:"Server is not responding", timer:1500},);
        setLoading(false)
      }

      )
  };

  // for navigation
  useEffect(() => {
    if (personal === true) {
      document.getElementById("KycDetails").click();
    }
  }, [personal, user_id]);

  useEffect(() => {
    if (KycDetail === true) {
      document.getElementById("EducationDetails").click();
    }
  }, [KycDetail]);

  useEffect(() => {
    if (education === true) {
      document.getElementById("BankDetails").click();
    }
  }, [education]);

  useEffect(() => {
    if (bank === true) {
      document.getElementById("CertificationDetails").click();
    }
  }, [bank]);

  useEffect(() => {
    if (certificate === true) {
      document.getElementById("BusinessDetails").click();
    }
  }, [certificate]);

  useEffect(() => {
    if (business === true) {
      document.getElementById("Preview").click();
    }
  }, [business]);

  useEffect(() => {
    if (
      business === true &&
      certificate === true &&
      bank === true &&
      education === true &&
      KycDetail === true
    ) {
      document.getElementById("Preview").click();
    }
  }, []);

  const [userData, setUserData] = useState(undefined);

  var user_id = localStorage.getItem("user-info-id");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: { Authentication: `Token ${login_token}` },
  };

  useEffect(() => {
    if (!user_id || !login_token) return;
    var USER_DETAILS_ENDPOINT = Api_Url + "/api/user-info/" + user_id;

    fetch(USER_DETAILS_ENDPOINT, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data?.data || {}).length != 0) {
          setUserData(data?.data);
          setCurrentSection(
            (parseInt(data?.data?.ui_section_id) + 1).toString()
          );
        }
      })
      .catch((err) => console.log("err: ", err));
  }, [user_id, completedSection]);

  useEffect(() => {
    if (completedSection == "0") return;
    setCurrentSection((parseInt(completedSection) + 1).toString());
  }, [completedSection]);

  useEffect(() => {
    var sectionIdMapper = {
      1: "PersonalDetails",
      2: "KycDetails",
      3: "EducationDetails",
      4: "BankDetails",
      5: "CertificationDetails",
      6: "BusinessDetails",
      7: "Preview",
    };

    if (currentSection == "1") return;

    document.getElementById(sectionIdMapper[currentSection]).click();
  }, [currentSection]);

  return (
    <>
      <div className="row">
        <>
          <div className="col-lg-9 col-md-9 m-auto ">
            <div className="row">
              {/* <div className="col-lg-12 form-check text_box text-center pt-3">
                <h3 className="">Legal Entity Type</h3>
                <div className="col-lg-12 p-0">
                  <div className="form-check form-check-inline">
                    <input
                      name="EntityType"
                      id="Individual"
                      type="radio"
                      value="Individual"
                      checked={EntityType === "Individual"}
                      onChange={(e) => setEntityType(e.currentTarget.value)}
                    />
                    <label
                      htmlFor="Individual"
                      className="f_p text_c f_400 ml-3 mb-0"
                    >
                      Individuals
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      name="EntityType"
                      id="corporate"
                      type="radio"
                      value="corporate"
                      checked={EntityType === "corporate"}
                      onChange={(e) => setEntityType(e.currentTarget.value)}
                      disabled={corporate}
                    />
                    <label
                      htmlFor="corporate"
                      className="f_p text_c f_400 ml-3 mb-0"
                    >
                      Corporate
                    </label>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {EntityType === "Individual" ? (
            <>
              <div className="col-lg-9 col-md-9 col-11 bg-white p-0 Form_BG">
                <div className="tab-content software_service_tab_content mt-5 mb-0">
                  <div
                    className={`tab-pane fade ${
                      urlid === undefined ||
                      urlid === "undefined" ||
                      urlid === null
                        ? "show active"
                        : ""
                    }`}
                    id="de"
                    role="tabpanel"
                    aria-labelledby="PersonalDetails"
                  >
                    <div className="row">
                      <PersonalDetails />
                    </div>
                  </div>

                  <div
                    className={`tab-pane fade ${
                      urlid == 1 ? "show active" : ""
                    }`}
                    id="saas"
                    role="tabpanel"
                    aria-labelledby="KycDetails"
                  >
                    <div className="row">
                      <KycDetails />
                    </div>
                  </div>

                  <div
                    className={`tab-pane fade ${
                      urlid == 2 ? "show active" : ""
                    }`}
                    id="education"
                    role="tabpanel"
                    aria-labelledby="EducationDetails"
                  >
                    <div className="row">
                      <EducationDetails />
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${
                      urlid == 3 ? "show active" : ""
                    }`}
                    id="ma"
                    role="tabpanel"
                    aria-labelledby="ma-tab"
                  >
                    <div className="row">
                      <BankDetails />
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${
                      urlid == 4 ? "show active" : ""
                    }`}
                    id="secure"
                    role="tabpanel"
                    aria-labelledby="CertificationDetails"
                  >
                    <div className="row">
                      <CertificationDetails />
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${
                      urlid == 5 ? "show active" : ""
                    }`}
                    id="scale"
                    role="tabpanel"
                    aria-labelledby="BusinessDetails"
                  >
                    <div className="row">
                      <BusinessDetails />
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${
                      urlid == 6 ? "show active" : ""
                    }`}
                    id="monitor"
                    role="tabpanel"
                    aria-labelledby="Preview"
                  >
                    <div className="row">
                      <Preview />

                      <div className="col-lg-12 m-auto pb-2 text-">
                        <form>
                          <div className="row mt-6 text-center">
                            <div className="col-lg-6 col-md-6  col-12 form-check text_box">
                              <a
                                className="ml-4"
                                href="http://saathi.agrani.io.s3-website.ap-south-1.amazonaws.com/static/media/Terms-and-conditions.pdf"
                                target="_blank"
                              >
                                Click here to view Terms and Conditions
                              </a>
                              <div className="form-check">
                                <input
                                  className="form-check-input agreecheckbox "
                                  type="checkbox"
                                  value=""
                                  id="ExperienceinInsurance"
                                  // defaultChecked={userDetails?.is_agreed}
                                  // checked={checked}
                                  onChange={() => setChecked(!checked)}
                                />

                                <label
                                  className="form-check-label agreeline "
                                  htmlFor="Yes"
                                >
                                  I read and accept the Terms and Conditions
                                </label>
                                <br />
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-12">
                              <button
                                type="submit"
                                id="submitbutton"
                                className="btn_three mr-2 mt-2 mb-4"
                                onClick={handleSubmit(onSubmit)}
                              >
                                Submit Application 
                                &nbsp; {loading ? <Spinner size="sm"></Spinner> : ""}
                              </button>

                              {Verify == true ? (
                                <>
                                 <button
                              type="button"
                              className="btn_three mr-2 mt-2 dbtnclr"
                              onClick={handleClick}
                            >
                              <a href={downloadUrl} >
                                Download Form <FaDownload />
                              </a>
                            </button>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </form>
{/* {console.log(userDetails.is_agreed ,userDetails?.is_attached_by_agent ,userDetails?.onboarding_status !== "QC1 Approved")} */}

                        <div>
                        {userDetails && userDetails.is_agreed !== false && userDetails?.is_attached_by_agent !== false && (userDetails?.onboarding_status !== "QC1 Approved" ? false : true) ? "" : <UploadSignedDoc/>}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-1 pl-0">
                <ul
                  className="nav nav-tabs software_service_tab"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <span
                      className={`nav-link ${
                        urlid == undefined ||
                        urlid === "undefined" ||
                        urlid === null
                          ? "active"
                          : ""
                      }`}
                      data-toggle="tab"
                      id="PersonalDetails"
                      href="#de"
                      role="tab"
                      aria-controls="de"
                      aria-selected="true"
                      // disabled={urlid == undefined ? false : urlid == 1 || urlid == 2 || urlid == 3 || urlid == 4 || urlid == 5 ? true : true}
                    >
                      Personal Details
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      className={`nav-link ${urlid == 1 ? "active" : ""}`}
                      id="KycDetails"
                      data-toggle="tab"
                      href="#saas"
                      role="tab"
                      aria-controls="saas"
                      aria-selected="false"
                      // disabled={urlid == 1 || urlid == 2 || urlid == 3 || urlid == 4 || urlid == 5 ? true : urlid == undefined ? false : false}
                    >
                      KYC Details
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      className={`nav-link ${urlid == 2 ? "active" : ""}`}
                      id="EducationDetails"
                      data-toggle="tab"
                      href="#education"
                      role="tab"
                      aria-controls="education"
                      aria-selected="false"
                      // disabled={urlid == 1 || urlid == 2 || urlid == 3 || urlid == 4 || urlid == 5 ? true : urlid == undefined ? false : false}
                    >
                      Education Details
                    </span>
                  </li>
                  <li className="nav-item ">
                    <a
                      className={`nav-link ${urlid == 3 ? "active" : ""}`}
                      id="BankDetails"
                      data-toggle="tab"
                      href="#ma"
                      role="tab"
                      aria-controls="ma"
                      aria-selected="true"
                      // disabled={urlid == 1 || urlid == 3 || urlid == 4 || urlid == 5 ? true : false}
                    >
                      Bank Details
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className={`nav-link ${urlid == 4 ? "active" : ""}`}
                      id="CertificationDetails"
                      data-toggle="tab"
                      href="#secure"
                      role="tab"
                      aria-controls="secure"
                      aria-selected="false"
                      // disabled={urlid == 1 || urlid == 2 || urlid == 4 || urlid == 5 ? true : false}
                    >
                      Certification Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${urlid == 5 ? "active" : ""}`}
                      id="BusinessDetails"
                      data-toggle="tab"
                      href="#scale"
                      role="tab"
                      aria-controls="scale"
                      aria-selected="true"
                      // disabled={urlid == 1 || urlid == 2 || urlid == 3 || urlid == 5 ? true : false}
                    >
                      Business Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${urlid == 6 ? "active" : ""}`}
                      id="Preview"
                      data-toggle="tab"
                      href="#monitor"
                      role="tab"
                      aria-controls="monitor"
                      aria-selected="false"
                      // disabled={urlid == 5 ? true : false}
                    >
                      Preview
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <CorporateForm />
          )}
        </>
        {login_token == "undefined" || login_token == null ? (
         history.push("/login")
          // <Modal
          //   size="l"
          //   isOpen={loginModal}
          //   className="d-flex justify-content-center align-items-center vh-100"
          // >
          //   <div className=" thm-bg-primary">
          //   </div>
          //   <div className="">
          //     <Login />
          //   </div>
          // </Modal>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default CloudServiceTab;
