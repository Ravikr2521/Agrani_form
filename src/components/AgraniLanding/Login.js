import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import OTPInput from "react-otp-input";
import { CryptoState } from "../FarmerContext";
import { FiLogIn } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";

import { Card, CardBody, Label } from "reactstrap";
import { Spinner } from "react-bootstrap";

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
          setLoginModal(false);
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
    <Card className="   position-relative">
      
      <CardBody>

      <div className="text-center login_icon">
        <h1>
        <FaUserAlt />
        </h1>

      </div>
      <h2 className="f_p f_600 f_size_24  mb_40 mt_20 text-center mt-4">
       <FiLogIn/>  Login /Sign Up
      </h2>
      <form action="#" className="login-form sign-in-form">
        
      
        <div className="d-flex flex-column justify-content-center align-items-center">
        {Verify ===  true ? ""  : 
         <div className="col-lg-11 text-center">


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
              />
              {errors.phoneNumber && (
                <p className="m input-error m-0">Please enter Valid No</p>
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
            }

          {/* {Verify === true ? (
            <div className=" d-flex justify-content-end align-items-end position-absolute resend_otp">
              <div>
                <div
                  id="sendotp"
                  type="button"
                  onClick={(e) => sendOtp()}
                  name="otp_code"
                  className="btn text-primary mt-2  w-100"
                  disabled={!phoneNumber}
                >
                  Resend Otp
                </div>
              </div>
            </div> 
          ) : (
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
          )} */}
        </div>

        {Verify === true ? (
          <div className="row justify-content-center mt-2">
            <div className="d-flex justify-content-center align-items-center container">
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
                  <span className="font-weight-bold text-danger cursor"  onClick={(e) => sendOtp()}>
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

            {/* <div className="col-lg-10  text-center">
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
                <p className="m input-error">Please enter valid otp</p>
              )}
            </div> */}
          </div>
        ) : null}
      </form>
      </CardBody>
    </Card>
  );
};

export default Login;
