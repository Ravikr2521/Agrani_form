import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CgLogIn } from "react-icons/cg";

import OTPInput from "react-otp-input";
import { useHistory } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Swal from "sweetalert2";
import { CryptoState } from "../FarmerContext";
import { Card, CardBody } from "reactstrap";
import Login_img from "../../assets/image/computer.png";

const Login = () => {
  var applicantID = localStorage.getItem("applicant_id");
  const { loginModal, setLoginModal, logoutbutton, setLogoutButton } =
    CryptoState();

  const [Verify, setVerify] = useState(false);
  const [urlid, seturlid] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  var Api_Url = process.env.REACT_APP_API_URL;

  const [otp, setOtp] = useState("");
  function handleChange(otp) {
    setOtp(otp);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const history = useHistory();

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
      `${Api_Url}/api/login/?email_or_phone=${phoneNumber}&created_by=0`,
      requestOptions
    )
      .then((r) => r.json())
      .then((result) => {
        if (result.status == 200) {
          Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: "Otp sent",
            showConfirmButton: false,
            timer: 1000,
          });
          verifyFunction(true);
        } else {
          Swal.fire({
            title: result.message,
          });
        }
      });
  }

  const onSubmit = () => {
    //   console.log(otp, "dhdjdkks");

    var formdata = new FormData();
    formdata.append("email_or_phone", phoneNumber);
    formdata.append("otp_code", otp);
    formdata.append("created_by", "0");

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(`${Api_Url}/api/login/`, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        console.log(result, "login result");
        seturlid(result?.data.ui_section_id);
        if (result.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Logged In",
            showConfirmButton: false,
            timer: 1000,
          });

          setLogoutButton(true);

          //   localStorage.setItem("applicant_id" , result.data.applicant_id)
          localStorage.setItem(
            "personal_detail",
            result?.data?.is_personal_details
          );
          localStorage.setItem("token", result?.data?.token);
          localStorage.setItem("phone_number", phoneNumber);
          localStorage.setItem("user-info-id", result?.data?.applicant_id);
          history.push("/");
          // setLoginModal(false);
        }
        if (result?.data?.onboarding_status === "Completed") {
          history.push("/final-preview");
        }

        if (result.status != 200) {
          Swal.fire(result.message);
        }
      });
  };
  return (
    <div>
      {/* <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-lg-12 d-flex flex-lg-row flex-column justify-content-center align-items-center  bg-white">
          <div className="col-lg-6 d-flex justify-content-center align-items-center display">
            <div className="text_div flex-lg-column  d-flex justify-content-center align-items-center py-5">
              <div className="col-lg-8 p-3">
                <p
                  className="text-white"
                  style={{ fontSize: "60px", lineHeight: "65px" }}
                >
                  Banking that Always your side
                </p>
              </div>
              <div className="col-lg-7">
                <p className="text-white m-0">
                  Dummy text Dmmy text dummy text dummy text
                  text dummy text dummy text

                </p>
              </div>
              <div className="col-lg-10 mt-4 ">
                <div
                  id="carouselExampleIndicators"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <ol class="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      class="active"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="1"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="2"
                    ></li>
                  </ol>
                  <div class="carousel-inner" style={{marginLeft:"4.5rem"}}>
                    <div class="carousel-item active mb-5">
                      <div className=" col-lg-9  p-4" style={{borderRadius:"10px" , backgroundColor:"#0000002e"}}>
                        <p className="text-white fw-bold"> User onboarding is the process where a product, service, or app is introduced to a new user and they become familiar with it.</p>
                      </div>
                    </div>
                    <div class="carousel-item mb-5">
                    <div className=" col-lg-9 rounded p-4" style={{borderRadius:"10px" , backgroundColor:"#0000002e"}}>
                        <p className="text-white fw-bold"> Despite popular belief, user onboarding does not begin and end with the first experience. There are three stages of user </p>
                      </div>
                    </div>
                    <div class="carousel-item mb-5">
                    <div className=" col-lg-9 rounded p-4" style={{borderRadius:"10px" , backgroundColor:"#0000002e"}}>
                        <p className="text-white fw-bold"> Onboarding for API-centric products is very different. Developers don’t want a API right away. Support them with quick-start</p>
                      </div>
                    </div>
                  </div>
                  <a
                    class="carousel-control-prev mb-5 d-none"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a
                    class="carousel-control-next mb-5 d-none"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>

             
            </div>
          </div>
          <div className="col-lg-6  col-12 w-100 vh-100 d-flex justify-content-center align-items-center">
            <Card className="  w-100 border-0">
              <CardBody className="">
                <div className="text-center ">
                
                    <img
                      src={require("../../assets/image/logo/agrani-logo.png")}
                      height="65px"
                      className="mb-4"
                      alt=""
                    />
                  
                </div>
                <h6 className="text-center mt-2">
                  Login /Sign Up
                </h6>
             
                <form action="#" className="login-form sign-in-form mt-3">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    {Verify === true ? (
                      ""
                    ) : (
                      <div className="col-lg-7 text-center rounded">
                        <div className="form-group text_box  ">
                          <input
                            className=" form-control1"
                            type="text"
                            placeholder="Enter Mobile No."
                            required
                            maxLength={10}
                            {...register("phoneNumber", {
                              onChange: (e) => {
                                verifyNumber(e);
                              },
                              required: true,
                              minLength: 10,
                            })}
                            style={{borderRadius:"10px"}}
                          />
                          {errors.phoneNumber && (
                            <p className="m input-error m-0">
                              Please enter Valid No
                            </p>
                          )}
                        </div>
                        <div className=" d-flex justify-content-center">
                          <div className="col-lg-6">
                            <button
                              id="sendotp"
                              type="button"
                              onClick={(e) => sendOtp()}
                              name="otp_code"
                              className="otp_btn mb-2 w-100"
                              disabled={!phoneNumber}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {Verify === true ? (
                    <div className="row justify-content-center">
                      <div className="d-flex justify-content-center align-items-center container">
                        <div className="col-lg-9  text-center  px-3">
                          <h5 className="m-0">Mobile Number verification</h5>
                          <span className="mobile-text">
                            Enter the code sent on your mobile phone{" "}
                            <b className="text-danger">{phoneNumber}</b>
                          </span>
                          <div className="d-flex flex-row mt-3 justify-content-center ">
                            <div className="col-lg-9 custom_margin">
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
                            </div>
                            {errors.otp_code && (
                              <p className="m input-error">
                                Please enter valid otp
                              </p>
                            )}
                          </div>
                          <div className="text-center mt-3">
                            <span className="d-block mobile-text">
                              Didn't receive the code?
                            </span>
                            <span
                              className="font-weight-bold text-danger cursor"
                              onClick={(e) => sendOtp()}
                            >
                              Resend
                            </span>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              size=""
                              className="btn Login_button mb-3 "
                              onClick={handleSubmit(onSubmit)}
                            >
                              Login <CgLogIn />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div> */}

      <div className="rounded-3  position-relative">
        <CardBody className="p-4 my-2">
          <div className="text-center ">
            <img src={Login_img} style={{ height: "80px" }} />
          </div>
          {Verify === true ? (
            " "
          ) : (
            <h5 className=" f_600 my-4   text-center ">Login With Mobile</h5>
          )}
          <form action="#" className="login-form sign-in-form">
            <div className="d-flex flex-column justify-content-center align-items-center">
              {Verify === true ? (
                ""
              ) : (
                <div className="col-lg-11 text-center">
                  <div className="form-group text_box  ">
                    <input
                      className="form-control1"
                      type="text"
                      placeholder="Enter 10 digits Mobile No."
                      required
                      maxLength={10}
                      {...register("phoneNumber", {
                        onChange: (e) => {
                          verifyNumber(e);
                        },
                        required: true,
                        minLength: 10,
                      })}
                    />
                    {errors.phoneNumber && (
                      <p className="m input-error m-0">Please enter Valid No</p>
                    )}
                  </div>
                  <div className=" d-flex justify-content-center">
                    <div className="w-100 mt-lg-0 mt-3">
                      <button
                        id="sendotp"
                        type="submiit"
                        onClick={(e) => sendOtp()}
                        name="otp_code"
                        className="otp_btn mb-2 w-100"
                        disabled={!phoneNumber}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {Verify === true ? (
              <div className="row justify-content-center mt-2">
                <IoMdArrowRoundBack
                  className="position-absolute cursor"
                  onClick={() => setVerify(false)}
                  style={{ top: "15px", left: "15px", fontSize: "20px" }}
                />
                <div className="d-flex justify-content-center align-items-center container mt-3">
                  <div className="  px-3">
                    <h5 className="m-0">Mobile phone verification</h5>
                    <span className="mobile-text">
                      Enter the code sent on your mobile phone{" "}
                      <b className="text-danger">{phoneNumber}</b>
                    </span>
                    <div className="d-flex flex-row mt-3 justify-content-center align-items-center">
                      <div className="col-lg-10">
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
                      </div>
                      {errors.otp_code && (
                        <p className="m input-error">Please enter valid otp</p>
                      )}
                    </div>
                    <div className="text-center mt-4">
                      <span className="d-block mobile-text">
                        Don't receive the code?
                      </span>
                      <span
                        className="font-weight-bold text-danger cursor"
                        onClick={(e) => sendOtp()}
                      >
                        Resend
                      </span>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        size=""
                        className="btn Login_button  "
                        onClick={handleSubmit(onSubmit)}
                      >
                        Login <CgLogIn />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </form>
        </CardBody>
      </div>
    </div>
  );
};

export default Login;
