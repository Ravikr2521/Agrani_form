import React, { useEffect, useState } from "react";
import "flatpickr/dist/themes/confetti.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CryptoState } from "../../FarmerContext";
import { Spinner } from "react-bootstrap";

const PersonalDetails = () => {
  const { setPersonal, SetCorporate, setCompletedSection, userDetails } =
    CryptoState();

  const Api_Url = process.env.REACT_APP_API_URL;
  const user_token = localStorage.getItem("token");
  const User_Mobile = localStorage.getItem("phone_number");
  const [loading, setLoading] = useState(false);
  // localStorage.getItem("userDetail");

  // console.log(userDetails, "heyyy");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
    });
  }, [userDetails]);

  const personal_detail = localStorage.getItem("personal_detail");
  const applicaintId = localStorage.getItem("user-info-id");

  function sendData(data) {
    setLoading(true);
    const jsonData = {
      individuals: data.LegalEntityType,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: User_Mobile,
      alternatePhoneNumber: data.alternatePhoneNumber,
      email: data.email,
      ui_section_id: "1",
      created_by: "0",
      created_by_name: "Self",
      empanelment_agent_id: "0",
    };

    const requestOptions = {
      method: personal_detail === "false" ? "POST" : "PUT",
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
      personal_detail === "false"
        ? `${Api_Url}/api/personal-details/`
        : `${Api_Url}/api/existing-user/${applicaintId}`;

    fetch(apiUrl, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        const applicantId = result.data.applicant_id;
        localStorage.setItem("applicant_id", applicantId);

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
      });
  }

  const onSubmit = (data) => {
    SetCorporate(true);
    window.localStorage.setItem("userDetail", JSON.stringify(data));
    sendData(data);
  };

  return (
    <section className="sign_in_area col-lg-12">
      <div className="px-4">
        <div className="login_info pl-0">
          <h2 className="f_p f_600 f_size_24 t_color3 mb_40 mt_20 text-center">
            Fill the <span className="f_700 orange">Personal Details</span> in
            Application
          </h2>
          <div className="formdetails">
            <form
              action="#"
              className="login-form sign-in-form"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                        {...register("LegalEntityType", {
                          required: "Legal entity type is required",
                        })}
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
                        {...register("LegalEntityType", {
                          required: "Legal entity type is required",
                        })}
                      />
                      <label
                        htmlFor="Proprietorship"
                        className="f_p text_c f_400 ml-3 mb-0"
                      >
                        Proprietorship
                      </label>
                    </div>
                  </div>
                  {errors.LegalEntityType && (
                    <p className="m input-error">
                      {errors.LegalEntityType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400 m-0 mb-1">
                    First Name <small style={{ color: "#ff0000" }}>*</small>
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    {...register("firstName", {
                      required: "First Name required.",
                    })}
                  />
                  {errors.firstName && (
                    <p className="m-1 input-error">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400 m-0 mb-1">
                    Last Name <small style={{ color: "#ff0000" }}>*</small>
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Enter Last Name"
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                  />
                  {errors.lastName && (
                    <p className="m-1 input-error">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400 m-0 mb-1">
                    Alternate Phone Number
                  </label>
                  <input
                    name="alternatePhoneNumber"
                    type="text"
                    placeholder="Enter Alternate Phone Number"
                    defaultValue={
                      userDetails?.personal_details?.alternatePhoneNumber || ""
                    }
                    {...register("alternatePhoneNumber", {
                      minLength: {
                        value: 10,
                        message: "Please enter a valid phone number",
                      },
                      maxLength: {
                        value: 10,
                        message: "Please enter a valid phone number",
                      },
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message:
                          "Please enter a valid phone number (10 digits only)",
                      },
                    })}
                  />
                  {errors.alternatePhoneNumber && (
                    <p className="m input-error">
                      {errors.alternatePhoneNumber.message}
                    </p>
                  )}
                </div>

                <div className="col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400 m-0 mb-1">Email ID</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter Email ID"
                    defaultValue={userDetails?.email || ""}
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="m input-error">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="col-lg-4 m-auto pb-5 justify-content-center text-center">
                <button type="submit" className="saved_btn" id="save_btn">
                  {personal_detail === "false" ? "Save" : "Update"}
                  {loading && <Spinner size="sm" className="mx-1" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalDetails;
