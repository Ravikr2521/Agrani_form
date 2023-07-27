import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import FooterData from "../../../Footer/FooterData";
import { CgLogIn } from "react-icons/cg";
import OnepageMenu from "../../OnepageMenu";
import FooterTwo from "../../FooterTwo";
import OTPInput from "react-otp-input";

const Existinguser = () => {
  var applicantID = localStorage.getItem("applicant_id");

  const [Verify, setVerify] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  var Api_Url =process.env.REACT_APP_API_URL

  const [otp, setOtp] = useState("");
  function handleChange(otp) {
    setOtp(otp);
  }

  const history = useHistory();

  const [btnState, setbtnState] = useState(true);
  const [btnState1, setbtnState1] = useState(false);
  const NewFunction = (e) => {
    setEdit(false);
    setbtnState1(true);
    setbtnState(false);
  };

  const [usertype, setusertype] = useState(false);
  const [urlid, seturlid] = useState();

  const [edit, setEdit] = useState(false); 
  localStorage.setItem("urlid", urlid);
  console.log("urlid" ,urlid)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  var phone = localStorage.getItem("phoneNumber");
  const verifyNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const verifyFunction = (e) => {
    setVerify(true);
  };

  function sendOtp(e) {
    const data = {
      phoneNumber: phoneNumber,
    };
    var formdata = new FormData();
    formdata.append("email_or_phone", phone);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${Api_Url}/api/existing-user-form/?email_or_phone=${phoneNumber}`,
      requestOptions
    )
      .then((r) => r.json())
      .then((result) => {
        result.status == 200
          ? Swal.fire({
              position: "bottom-end",
              icon: "success",
              title: "Otp sent",
              showConfirmButton: false,
              timer: 1000,
            }) && verifyFunction(true)
          : Swal.fire({
              title: result.message,
            });
      });
  }

  const onSubmit = () => {
    console.log(otp, "dhdjdkks");

    var formdata = new FormData();
    formdata.append("email_or_phone", phoneNumber);
    formdata.append("otp_code", otp);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(`${Api_Url}/api/existing-user-form/`, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        console.log(result,);
        seturlid(result?.data.ui_section_id);
        if (result.status == 200) {
          localStorage.setItem("applicant_id", result?.data.applicant_id);
          localStorage.setItem("token", result?.data.token);
          Swal.fire({
            icon: "success",
            title: "Logged In",
            showConfirmButton: false,
            timer: 1000,
          });
          setusertype(true);
          history.push("/");
        }

        if (result.status != 200) {
          Swal.fire(result.message);
        }

        if (result.data.ui_section_id == 5) {
          history.push("/final-preview");
        }
      });
  };

  // console.log(urlid + " existing");
  return (
    <>
      <div className="body_wrapper bg-light-org">
        <OnepageMenu
          slogo="sticky_logo"
          mClass="menu_four"
          nClass="w_menu"
          hbtnClass="btn_get_radious menu_custfive"
        />

        <div className="col-lg-12 mt_130">
          <div className="sign_info_content text-center mb_50">
            <h3 className="f_p f_600 f_size_40 t_color mb_20">
              Welcome to Agrani Saathi
            </h3>
            <>
              <div className="mb_20">
                {urlid === undefined ||
                urlid === "undefined" ||
                urlid === null ||
                urlid == 0 ? (
                  <>
                    <Link
                      to="/Existinguser"
                      className={
                        btnState === true
                          ? "btn_three mr-4 mt-3"
                          : "btn_three sign_btn_transparent mr-4 mt-3"
                      }
                      Name={applicantID ? "tab active" : "tab"}
                    >
                      Existing User
                    </Link>
                    <Link
                      to="/"
                      Name={applicantID ? "tab active" : "tab"}
                      className={
                        btnState1 === true
                          ? "btn_three mr-4 mt-3 "
                          : "btn_three sign_btn_transparent mr-4 mt-3 active"
                      }
                    >
                      New User
                    </Link>
                  </>
                ) : null}
              </div>
            </>

            <div className="bg-shd col-lg-11 m-auto">
              <section className="software_service_area sec_pad ">
                <div className="container">
                  <section className="sign_in_area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-7 m-auto border bg-white p-5 existing_user">
                          <div className="login_info pl-0 ">
                            <h2 className="f_p f_600 f_size_24 t_color3 mb_40 mt_20 text-center">
                              Login to view your
                              <span className="f_700"> Application </span>
                            </h2>
                            <form
                              action="#"
                              className="login-form sign-in-form"
                            >
                              <div className="row ">
                                <div className="col-lg-8">
                                  {/* <label className="f_p text_c f_400 text-left">
                                    Mobile No.
                                  </label> */}

                                  <div className="form-group text_box  ">
                                    <input
                                      className=" form-control1"
                                      type="text"
                                      placeholder="Enter Mobile No."
                                      required
                                      {...register("phoneNumber", {
                                        onChange: (e) => {
                                          verifyNumber(e);
                                        },
                                        required: true,
                                        minLength: 10,
                                        maxLength: 10,
                                      })}
                                    />
                                    {errors.phoneNumber && (
                                      <p className="m input-error">
                                        Please enter Valid No
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  {Verify === true ? (
                                    <button
                                      id="sendotp"
                                      type="button"
                                      onClick={(e) => sendOtp()}
                                      name="otp_code"
                                      className="otp_btn mt-2 py-3 w-100"
                                      disabled={!phoneNumber}
                                    >
                                      Resend Otp
                                    </button>
                                  ) : (
                                    <button
                                      id="sendotp"
                                      type="button"
                                      onClick={(e) => sendOtp()}
                                      name="otp_code"
                                      className="otp_btn mt-2 py-3 w-100"
                                      disabled={!phoneNumber}
                                    >
                                      Submit
                                    </button>
                                  )}
                                </div>
                              </div>

                              {Verify === true ? (
                                <div className="row justify-content-center">
                                  <div className="col-lg-6  text-center">
                                    <OTPInput
                                      type="number"
                                      id="otp"
                                      value={otp}
                                      placeholder="Enter Otp"
                                      name="otp_code"
                                      inputStyle="inputStyle"
                                      numInputs={4}
                                      onChange={handleChange}
                                      separator={<span></span>}
                                    />
                                    {errors.otp_code && (
                                      <p className="m input-error">
                                        Please enter valid otp
                                      </p>
                                    )}
                                  </div>
                                  <div className="col-lg-12 text-center ">
                                    <button
                                      type="submit"
                                      className="btn Login_button "
                                      onClick={handleSubmit(onSubmit)}
                                    >
                                      Login <CgLogIn />
                                    </button>
                                  </div>
                                </div>
                              ) : null}
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <FooterTwo FooterData={FooterData} />
    </>
  );
};

export default Existinguser;
