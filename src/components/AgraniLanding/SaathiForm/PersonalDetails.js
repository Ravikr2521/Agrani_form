import React, { useState } from "react";
import "flatpickr/dist/themes/confetti.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CryptoState } from "../../FarmerContext";
import { Spinner } from "react-bootstrap";

const PersonalDetails = () => {
  // console.clear()
  const { setPersonal, SetCorporate, setCompletedSection, userDetails } =
    CryptoState();
  var Api_Url = process.env.REACT_APP_API_URL;
  let user_token = localStorage.getItem("token");
  const User_Mobile = localStorage.getItem("phone_number");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const applicaintId = localStorage.getItem("user-info-id");

  // OTP Function
  const [phoneNumber, setPhoneNumber] = useState();

  const [userData, setUserData] = useState();

  localStorage.getItem("userDetail");
  const verifyNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const inputFields = document.querySelectorAll("input.field");
  inputFields.forEach((field) => {
    field.addEventListener("input", handleInput);
  });

  function handleInput(e) {
    let inputField = e.target;
    if (inputField.value.length >= 1) {
      let nextField = inputField.nextElementSibling;
      return nextField && nextField.focus();
    }
  }
  const personal_detail = localStorage.getItem("personal_detail");

  function sendData(data) {
    setLoading(true);
    var jsonData = {
      individuals: data.LegalEntityType,
      firstName: data.firstName || userDetails?.firstName,
      lastName: data.lastName || userDetails?.lastName,
      phoneNumber: User_Mobile,
      alternatePhoneNumber:
        data.alternatePhoneNumber || userDetails?.personal_detail?.email,
      email: data.email || userDetails?.email,
      ui_section_id: "1",
      created_by: "0",
      created_by_name: "Self",
      empanelment_agent_id: "0",
    };
    var requestOptions = {
      method: personal_detail == "false" ? "POST" : "PUT",
      body: JSON.stringify(jsonData),
      headers: {
        ...(user_token === undefined || user_token === null
          ? { "Content-Type": "application/json" }
          : {
              Authentication: `Token ${user_token}`,
              "Content-Type": "application/json",
            }),
      },
    };
    const apiUrl =
      personal_detail == "false"
        ? `${Api_Url}/api/personal-details/`
        : `${Api_Url}/api/existing-user/${applicaintId}`;

    fetch(apiUrl, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        var applicaintId = result.data.applicant_id;
        console.log(applicaintId, "id");
        localStorage.setItem("applicant_id", result?.data?.applicant_id);

        if (result.status === 201 || result.status === 200) {
          Swal.fire({
            icon: "success",
            title: result.message,
            timer: 1500,
          });
          setPersonal(true);
          setCompletedSection("1");
          setLoading(false);
          if (result.status === 201) {
            localStorage.setItem(
              "personal_detail",
              result?.data?.is_personal_details
            );
          }
        } else {
          Swal.fire({
            icon: "warning",
            title: result.message,
            timer: 3000,
          });
          setLoading(false);
        }

        // if(result.status===200) {
        // document.getElementById("save_btn").disabled=true }
      });
  }

  const onSubmit = (data) => {
    SetCorporate(true);
    // localStorage.setItem("token", data.token);
    window.localStorage.setItem("userDetail", JSON.stringify(data));
    setUserData(data);
    sendData(data);
  };

  //*********api for sending otp**********

  // async function sendOtp(e) {
  //   const data = {
  //     phoneNumber: phoneNumber,
  //   };

  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(
  //     `${Api_Url}/api/mobile/otp/?phone_number=${phoneNumber}`,
  //     requestOptions
  //   )
  //     .then((r) => r.json())
  //     .then((result) => {
  //       result.status == 200
  //         ? Swal.fire({
  //             position: "bottom-end",
  //             icon: "success",
  //             title: "Otp sent",
  //             showConfirmButton: false,
  //             timer: 1000,
  //           }) && verifyFunction(true)
  //         : Swal.fire({
  //             title: result.message,
  //           });
  //     });
  // }

  //*********api for verifing otp**********

  // function verifyOtp(e) {
  //   e.preventDefault();
  //   var formdata = new FormData();
  //   formdata.append("phone_number", phoneNumber);
  //   formdata.append("otp_code", otp);

  //   for (var pair of formdata.entries()) {
  //     console.log(pair[0] + ", " + pair[1]);
  //   }
  //   var requestOptions = {
  //     method: "POST",
  //     body: formdata,
  //     redirect: "follow",
  //   };

  //   fetch(`${Api_Url}/api/mobile/verification/`, requestOptions)
  //     .then((r) => r.json())
  //     .then((result) => {
  //       result.status == 200
  //         ? setnoVerified(true)
  //         : Swal.fire({ text: result.message });

  //       if (result.status == 200) {
  //         document.getElementById("phoneNumber").disabled = true;
  //         document.getElementById("otp").disabled = true;
  //         document.getElementById("sendotp").disabled = true;
  //         document.getElementById("verifyotp").disabled = true;
  //       } else {
  //         document.getElementById("phoneNumber").disabled = false;
  //         document.getElementById("otp").disabled = false;
  //         document.getElementById("sendotp").disabled = false;
  //         document.getElementById("verifyotp").disabled = true;
  //       }
  //     });
  // }

  return (
    <>
      <section className="sign_in_area col-lg-12">
        <div className="px-4">
          <div className="login_info pl-0">
            <h2 className="f_p f_600 f_size_24 t_color3 mb_40 mt_20 text-center">
              Fill the <span className="f_700 orange">Personal Details</span> in
              Application
            </h2>
            <div className="formdetails">
              <form action="#" className=" login-form sign-in-form">
                <div className="row">
                  <div className="col-lg-12 form-check text_box ">
                    <h6 className="">Legal Entity Type</h6>
                    <div className="col-lg-12 p-0">
                      <div className="form-check form-check-inline">
                        <input
                          name="LegalEntityType"
                          id="Individuals"
                          type="radio"
                          value="individual"
                          defaultChecked
                          readOnly
                          {...register("LegalEntityType")}
                        />
                        <label
                          htmlFor="Individuals"
                          className="f_p text_c f_400 ml-3 mb-0"
                        >
                          Individuals
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          name="LegalEntityType"
                          id="Proprietorship"
                          type="radio"
                          value="sole_proprietorship"
                          readOnly
                          {...register("LegalEntityType")}
                        />
                        <label
                          htmlFor="Proprietorship"
                          className="f_p text_c f_400 ml-3 mb-0"
                        >
                          Proprietorship
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <small style={{color:"#ff0000"}}>*</small> <small>Compulsory fields</small> */}
                <div className="row">
                  <div className="col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400 m-0 mb-1">
                      First Name <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="Enter First Name"
                      defaultValue={userDetails ? userDetails?.firstName : ""}
                      required={userDetails?.firstName ? false : true}
                      {...register("firstName", {})}
                    />
                    {errors.firstName && (
                      <p className="m input-error ">Please enter first name</p>
                    )}
                  </div>
                  <div className="col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400 m-0 mb-1">
                      Last Name <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      className="form-control"
                      name="lastName"
                      type="text"
                      placeholder="Enter Last Name"
                      defaultValue={userDetails ? userDetails.lastName : ""}
                      required={userDetails?.lastName ? false : true}
                      {...register("lastName", {
                        pattern: {
                          value: /[A-Za-z]/,
                          message: "Please enter a valid last name ",
                        },
                      })}
                    />
                    {errors.lastName && (
                      <p className="m input-error">Please enter last name</p>
                    )}
                  </div>
                  {/* <div className=" col-lg-4 form-group text_box">
                    <label className="f_p text_c f_400">
                      Phone Number <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      id="phoneNumber"
                      className="form-control w"
                      name="phoneNumber"
                      type="text"
                      placeholder="Enter Phone Number"
                      defaultValue={data !== null ? data.phoneNumber : ""}
                      required
                      {...register("phoneNumber", {
                        onChange: (e) => {
                          verifyNumber(e);
                        },
                        required: true,
                        minLength: 10,
                        disabled: false,
                      })}
                    />
                    {errors.phoneNumber && (
                      <p className="m input-error">Please enter valid No</p>
                    )}
                  </div>
                  <div className="col-lg-2 btn-bg-gray">
                    {Verify === true ? (
                      <button
                        id="sendotp"
                        type="button"
                        onClick={(e) => sendOtp()}
                        name="otp_code"
                        className="resend_button"
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
                        className="btn_three"
                        disabled={!phoneNumber}
                      >
                        Send Otp
                      </button>
                    )}
                  </div>

                  {Verify === true ? (
                    <>
                      <div className=" col-lg-4 form-group text_box">
                        <label className="f_p text_c f_400 ">
                          Verify OTP
                         
                        </label>

                        <div className="otp">
                          <input
                            type="number"
                            className="form-control w"
                            id="otp"
                            placeholder="Enter Otp"
                            name="otp_code"
                            {...register("otp_code", {
                              onChange: (e) => {
                                setOtp(e.target.value);
                              },
                              required: true,
                              maxLength: 4,
                              minLength: 4,
                            })}
                          />
                          {errors.otp_code && (
                            <p className="m input-error">
                              Please enter valid otp
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-2 ">
                        <button
                          type="button"
                          className={
                            `${
                              noVerified === true ? "btn-success" : "btn_three"
                            }` + " btn_success"
                          }
                          onClick={verifyOtp}
                          disabled={noVerified === true ? true : false}
                        >
                          {noVerified === true ? "Verified " : "Verify"}{" "}
                          <i class="fas fa-award ml-2"></i>
                        </button>
                      </div>
                    </>
                  ) : null} */}

                  <div className=" col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400 m-0 mb-1">
                      Alternate Phone Number
                    </label>
                    <input
                      className="form-control w"
                      name="alternatePhoneNumber"
                      type="number"
                      placeholder="Enter Alternate Phone Number"
                      defaultValue={
                        userDetails?.personal_details?.alternatePhoneNumber ||
                        ""
                      }
                      {...register("alternatePhoneNumber", {
                        minLength: 10,
                        maxLength: 10,
                      })}
                    />
                    {errors.alternatePhoneNumber && (
                      <p className="m input-error">Please enter valid No</p>
                    )}
                  </div>
                  <div className="col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400 m-0 mb-1">
                      Email ID
                    </label>
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      placeholder="Enter Email ID"
                      defaultValue={userDetails ? userDetails?.email : ""}
                      {...register("email", {
                        pattern:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
                    {errors.email && (
                      <p className="m input-error">Please check the Email</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-4 m-auto pb-5 justify-content-center text-center">
                  <button
                    type="submit"
                    className="saved_btn"
                    id="save_btn"
                    onClick={handleSubmit(onSubmit)}
                  >
                    {personal_detail == "false" ? "Save" : "Update"}
                    &nbsp; {loading ? <Spinner size="sm"></Spinner> : ""}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PersonalDetails;
