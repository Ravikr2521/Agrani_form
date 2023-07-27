import React, { useState, useEffect } from "react";
import "flatpickr/dist/themes/confetti.css";
import Flatpickr from "react-flatpickr";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Select from "react-select";
import { SaathiService } from "../../../service/saathi.service";
import { CryptoState } from "../../FarmerContext";
import swal from "sweetalert";

const PersonalDetails = (data) => {
  // console.clear()
  const { setPersonal, SetCorporate } = CryptoState();
  var Api_Url = process.env.REACT_APP_API_URL;
  console.log(Api_Url, "check url");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [Verify, setVerify] = useState(false);
  const [noVerified, setnoVerified] = useState(false);
  const [date, setDate] = useState();

  const verifyFunction = (e) => {
    setVerify(true);
  };

  // OTP Function
  const [phoneNumber, setPhoneNumber] = useState();
  const [otp, setOtp] = useState("");

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

  function sendData(data) {
    var formdata = new FormData();
    formdata.append("individuals", data.LegalEntityType);
    formdata.append("firstName", data.firstName);
    formdata.append("lastName", data.lastName);
    formdata.append("nomineeName", data.nomineeName);
    formdata.append("nomineeRelationship", Relationship);
    formdata.append("noOfMember", data.noOfMember);
    formdata.append("dateOfBirth", data.dateOfBirth);
    formdata.append("gender", data.gender);
    formdata.append("martialStatus", MaritalStatus);
    formdata.append("occupation", OccupationName);
    formdata.append("occupation_id", OccupationId);
    formdata.append("aadharNumber", data.aadharNumber);
    formdata.append("panNumber", data.panNumber);
    formdata.append("phoneNumber", data.phoneNumber);
    formdata.append("alternatePhoneNumber", data.alternatePhoneNumber);
    formdata.append("email", data.email);
    formdata.append("address", data.address);
    formdata.append("city", BlockName);
    formdata.append("city_id", BlockCode);
    formdata.append("state", StateName);
    formdata.append("state_id", StatesCode);
    formdata.append("district", DistrictName);
    formdata.append("district_id", DistrictCode);
    formdata.append("pincode", data.pincode);
    formdata.append("ui_section_id", "1");

    for (let d = 0; d < data.profile_picture.length; d++) {
      formdata.append("profile_picture", data.profile_picture[d]);
    }

    if (data.dateOfBirth == null || undefined) {
      Swal.fire("Please Select Date of Birth");
    }
    if (data.panNumber && OtherDocName == null) {
      alert("please select either PAN or Other Document");
    }

    for (let a = 0; a < data.aadhar_card.length; a++) {
      formdata.append("aadhar_card", data.aadhar_card[a]);
    }

    if (data.pan_card.length > 0) {
      for (let c = 0; c < data.pan_card.length; c++) {
        formdata.append("pan_card", data.pan_card[c]);
      }
    }

    //other Document
    if (data.other_document == undefined) {
      formdata.append("other_document", []);
    } else {
      for (let b = 0; b < data.other_document.length; b++) {
        formdata.append("other_document", data.other_document[b]);
      }
    }
    //other document Number
    if (data.otherDocumentNumber == undefined) {
      formdata.append("otherDocumentNumber", "");
    } else {
      formdata.append("otherDocumentNumber", data.otherDocumentNumber);
    }

    //othet document type
    if (OtherDocName == undefined || OtherDocName.length == 0) {
      formdata.append("other_document_type", "");
    } else {
      formdata.append("other_document_type", OtherDocName);

      if (
        data.otherDocumentNumber.trim() == "" ||
        data.otherDocumentNumber.trim() == null
      ) {
        alert("Please Enter Other Document Number");
        return;
      }
    }
    formdata.append("created_by", "0");

    //for printing
    for (var pair of formdata.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: {},
    };

    fetch(`${Api_Url}/api/personal-details/`, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        console.log(result , "check Result")
        var userInfo = result?.data.token;
        console.log(userInfo, "userInfo");
        localStorage.setItem("token", result.data.token);

        var applicaintId = result.data.applicant_id;
        console.log(applicaintId, "id");
        localStorage.setItem("applicant_id", result.data.applicant_id);

        result.status === 201
          ? Swal.fire({
              icon: "success",
              title: result.message,
              timer: 1500,
            }) && setPersonal(true)
          :  Swal.fire({
            icon: "warning",
            title: result.message,
            timer: 3000,
          });

        // if(result.status===200) {
        // document.getElementById("save_btn").disabled=true }
      });
  }

  const onSubmit = (data) => {
    SetCorporate(true);
    data["dateOfBirth"] = date;
    localStorage.setItem("token", data.token);
    localStorage.setItem("phoneNumber", data.phoneNumber);
    window.localStorage.setItem("userDetail", JSON.stringify(data));

    setUserData(data);
    sendData(data);
  };

  //*********api for sending otp**********

  async function sendOtp(e) {
    const data = {
      phoneNumber: phoneNumber,
    };

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${Api_Url}/api/mobile/otp/?phone_number=${phoneNumber}`,
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

  //*********api for verifing otp**********

  function verifyOtp(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("phone_number", phoneNumber);
    formdata.append("otp_code", otp);

    for (var pair of formdata.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${Api_Url}/api/mobile/verification/`, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        result.status == 200
          ? setnoVerified(true)
          : Swal.fire({ text: result.message });

        if (result.status == 200) {
          document.getElementById("phoneNumber").disabled = true;
          document.getElementById("otp").disabled = true;
          document.getElementById("sendotp").disabled = true;
          document.getElementById("verifyotp").disabled = true;
        } else {
          document.getElementById("phoneNumber").disabled = false;
          document.getElementById("otp").disabled = false;
          document.getElementById("sendotp").disabled = false;
          document.getElementById("verifyotp").disabled = true;
        }
      });
  }

  // get master state data
  const [statedatalist, setstatedatalist] = useState({});
  useEffect(() => {
    SaathiService.getMasterstateData()
      .then((data) => setstatedatalist(data))
      .catch((error) => {
        console.warn("Not data fetch :(");
      });
  }, []);

  const [MaritalStatus, setMaritalStatus] = useState();
  const [Relationship, setRelationship] = useState();
  const [RelationList, setRelationList] = useState([]);
  const [OccupationList, setOccupationList] = useState([]);
  const [OccupationName, setOccupationName] = useState([]);
  const [OccupationId, setOccupationId] = useState([]);
  const [OtherDocName, setOtherDocName] = useState([]);
  const [StatesCode, setStatesCode] = useState(null);
  const [StateName, setStateName] = useState(null);
  const [DistrictCode, setDistrictCode] = useState(null);
  const [DistrictName, setDistrictName] = useState(null);
  const [BlockCode, setBlockCode] = useState(null);
  const [BlockName, setBlockName] = useState(null);
  const [DistrictList, setDistrictList] = useState([]);
  const [BlockList, setBlockList] = useState([]);
  const [changeEvent, SetChangeEvent] = useState(null);
  const [isDisabled, setIsDisabled] = useState(null);

  function handleMaritalStatus(MaritalStatus) {
    setMaritalStatus(MaritalStatus);
  }
  function handleRelationship(Relationship) {
    setRelationship(Relationship);
  }
  function handleOccupationName(OccupationObject) {
    setOccupationId(OccupationObject.value);
    setOccupationName(OccupationObject.label);
  }

  function handlOtherDocName(OtherDocName) {
    setOtherDocName(OtherDocName);
    SetChangeEvent(OtherDocName);
    setIsDisabled(OtherDocName);
  }

  function handleStatesDropdown(StateObject) {
    setStatesCode(StateObject.value);
    setStateName(StateObject.label);
  }

  function handleDistrictCode(DistrictObject) {
    setDistrictCode(DistrictObject.value);
    setDistrictName(DistrictObject.label);
  }

  function handleBlockCode(BlockObject) {
    setBlockCode(BlockObject.value);
    setBlockName(BlockObject.label);
  }
  const customStyles = {
    control: (base) => ({
      ...base,
      // height: 50,
      minHeight: 20,
    }),
  };

  // Marital Status selectbox
  const MaritalStatusList = [
    {
      label: "Status",
      options: [
        { value: "single", label: "Unmarried" },
        { value: "married", label: "Married" },
        { value: "divorced", label: "Divorced" },
        { value: "Widow / widower", label: "Widower / widower" },
      ],
    },
  ];

  // Relationship Status selectbox
  const RelationshipList = [
    {
      label: "Relationship",
      options:
        RelationList.data &&
        RelationList.data.relation_data.map((Relation) => ({
          label: `${Relation.relation}`,
          value: `${Relation.relation}`,
        })),
    },
  ];
  // Document selectbox
  const DocumenttypeListData = [
    {
      label: "Document",
      options: [
        { value: "", label: "Select-Document" },
        { value: "voter_card", label: "Voter ID" },
        { value: "driving_licence", label: "Driving License" },
        { value: "ration_card", label: "Ration Card" },
        { value: "bank_document", label: "Bank Document" },
      ],
    },
  ];
  // Occupation selectbox
  const OccupationListData = [
    {
      label: "Occupation",
      options:
        OccupationList.data &&
        OccupationList.data.map((OCP) => ({
          label: `${OCP.occupation}`,
          value: `${OCP.id}`,
        })),
    },
  ];

  const optionStatesCode = [
    {
      label: "State",
      options:
        statedatalist.data &&
        statedatalist.data.map((state) => ({
          label: `${state.state_name}`,
          value: `${state.state_code}`,
        })),
    },
  ];
  const optionDistrictCode = [
    {
      label: "District",
      options:
        DistrictList.data &&
        DistrictList.data.map((district) => ({
          label: `${district.level_3_name}`,
          value: `${district.level_3_code}`,
        })),
    },
  ];
  const optionBlockCode = [
    {
      label: "Block",
      options:
        BlockList.data &&
        BlockList.data.map((district) => ({
          label: `${district.level_4_name}`,
          value: `${district.level_4_code}`,
        })),
    },
  ];

  useEffect(() => {
    // Bulk Api
    SaathiService.getBulkData()
      .then((data) => {
        setRelationList(data);
      })
      .catch((error) => {
        console.warn("Not good data fetch :(");
      });

    // Occupation api
    SaathiService.getOccupationData()
      .then((data) => {
        setOccupationList(data);
      })
      .catch((error) => {
        console.warn("Not good data fetch :(");
      });
  }, []);

  useEffect(() => {
    if (StatesCode !== null) {
      SaathiService.getMasterdistrictsData(StatesCode)
        .then((data) => {
          setDistrictList(data);
        })
        .catch((error) => {
          console.warn("Not good data fetch :(");
        });
    }

    if (DistrictCode !== null) {
      SaathiService.getMasterblocksData(DistrictCode)
        .then((data) => {
          setBlockList(data);
        })
        .catch((error) => {
          console.warn("Not good data fetch :(");
        });
    }
  }, [StatesCode, DistrictCode, BlockCode]);

  return (
    <>
      <section className="sign_in_area col-lg-12">
        <div className="px-4">
          <div className="login_info pl-0">
            <h2 className="f_p f_600 f_size_24 t_color3 mb_40 mt_20 text-center">
              Fill the Personal Details in
              <span className="f_700"> Application</span>
            </h2>
            <div className="formdetails">
              <form action="#" className=" login-form sign-in-form">
                <div className="row">
                  <div className="col-lg-12 form-check text_box highlightpart">
                    <h6 className="">Select Type</h6>
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
                    <label className="f_p text_c f_400">
                      First Name <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="Enter First Name"
                      defaultValue={data !== null ? data.firstName : ""}
                      required
                      {...register("firstName", {
                        required: true,
                      })}
                    />
                    {errors.firstName && (
                      <p className="m input-error">Please enter first name</p>
                    )}
                  </div>

                  <div className="col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400">
                      Last Name <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      className="form-control"
                      name="lastName"
                      type="text"
                      placeholder="Enter Last Name"
                      defaultValue={data !== null ? data.lastName : ""}
                      required
                      {...register("lastName", {
                        required: true,
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

                  <div className=" col-lg-4 form-group text_box">
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
                          {/* <button type="button" className="resend ml-5" onClick={(e) => sendOtp()}>
                          Resend OTP
                          <i className="fa fa-caret-right"></i>
                        </button> */}
                        </label>
                        {/* <span className="ml-4">Otp Sent to given No</span> */}

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
                  ) : null}

                  <div className=" col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400">
                      Alternate Phone Number
                    </label>
                    <input
                      className="form-control w"
                      name="alternatePhoneNumber"
                      type="number"
                      placeholder="Enter Alternate Phone Number"
                      defaultValue={
                        data !== null ? data.alternatePhoneNumber : ""
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
                    <label className="f_p text_c f_400">Email ID</label>
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      placeholder="Enter Email ID"
                      defaultValue={data !== null ? data.email : ""}
                      {...register("email", {
                        pattern:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
                    {errors.email && (
                      <p className="m input-error">Please check the Email</p>
                    )}
                  </div>

                  <div className="col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400">
                      Date Of Birth{" "}
                      <small style={{ color: "#ff0000" }}>*</small>
                    </label>

                    <input
                      className="form-control d-block w"
                      placeholder="YYYY-MM-DD"
                      name="dateOfBirth"
                      type="date"
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="m input-error">Please fill DOB</p>
                  )}

                  <div className="col-lg-6 form-check text_box">
                    <label className="f_p text_c f_400">
                      Gender <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <div className="col-lg-12 p-0">
                      <div className="form-check form-check-inline">
                        <input
                          name="Gender"
                          id="male"
                          type="radio"
                          value="male"
                          defaultChecked
                          readOnly
                          {...register("gender")}
                        />
                        <label
                          htmlFor="male"
                          className="f_p text_c f_400 ml-3 mb-0"
                        >
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          name="Gender"
                          id="female"
                          type="radio"
                          value="female"
                          readOnly
                          {...register("gender")}
                        />
                        <label
                          htmlFor="female"
                          className="f_p text_c f_400 ml-3 mb-0"
                        >
                          Female
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          name="Gender"
                          id="female"
                          type="radio"
                          value="other"
                          readOnly
                          {...register("gender")}
                        />
                        <label
                          htmlFor="female"
                          className="f_p text_c f_400 ml-3 mb-0"
                        >
                          Other
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 form-group text_box">
                    <div className="mb-3">
                      <label className="f_p text_c f_400">
                        Select Marital Status{" "}
                        <small style={{ color: "#ff0000" }}>*</small>
                      </label>
                      <Select
                        required
                        value={
                          MaritalStatus === undefined
                            ? MaritalStatus
                            : MaritalStatus.value
                        }
                        onChange={(MaritalStatus) => {
                          handleMaritalStatus(MaritalStatus.value);
                        }}
                        defaultValue={data !== null ? data.martialStatus : ""}
                        options={MaritalStatusList}
                        // classNamePrefix="select2-selection"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 form-group text_box">
                    <div className="mb-3">
                      <label className="f_p text_c f_400">
                        Select Occupation{" "}
                        <small style={{ color: "#ff0000" }}>*</small>
                      </label>
                      <Select
                        {...register("occupation", {})}
                        value={
                          OccupationName === undefined
                            ? OccupationName
                            : OccupationName.label
                        }
                        onChange={(OccupationName) => {
                          handleOccupationName(OccupationName);
                        }}
                        options={OccupationListData}
                        classNamePrefix="select2-selection"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="mb-1">
                      Residential Details{" "}
                      <small style={{ color: "#ff0000" }}>*</small>
                    </h4>
                    <hr />
                  </div>
                  <div className="col-lg-6 form-group text_box">
                    <div className="mb-3">
                      <label className="f_p text_c f_400">
                        Select State{" "}
                        <small style={{ color: "#ff0000" }}>*</small>
                      </label>

                      <Select
                        required
                        value={
                          StatesCode === null ? StatesCode : StatesCode.label
                        }
                        onChange={(StatesCode) => {
                          console.log("State Code", StatesCode);
                          handleStatesDropdown(StatesCode);
                        }}
                        options={optionStatesCode}
                        classNamePrefix="select2-selection"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 form-group text_box">
                    <div className="mb-3">
                      <label className="f_p text_c f_400">
                        Select District
                        <small style={{ color: "#ff0000" }}>*</small>
                      </label>
                      <Select
                        {...register("district")}
                        value={
                          DistrictCode === null
                            ? DistrictCode
                            : DistrictCode.label
                        }
                        onChange={(DistrictCode) => {
                          handleDistrictCode(DistrictCode);
                        }}
                        options={optionDistrictCode}
                        classNamePrefix="select2-selection"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 form-group text_box">
                    <div className="mb-3">
                      <label className="f_p text_c f_400">
                        Select Block{" "}
                        <small style={{ color: "#ff0000" }}>*</small>
                      </label>

                      <Select
                        {...register("city")}
                        value={BlockCode === null ? BlockCode : BlockCode.label}
                        onChange={(BlockCode) => {
                          console.log("Block", BlockCode);
                          handleBlockCode(BlockCode);
                        }}
                        options={optionBlockCode}
                        classNamePrefix="select2-selection"
                      />
                    </div>
                  </div>

                  <div className="col-lg-2 form-group text_box">
                    <label className="f_p text_c f_400">
                      Pin Code <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      className="form-control"
                      name="pincode"
                      type="text"
                      placeholder="Pincode"
                      required
                      {...register("pincode", {
                        required: true,
                        minLength: 6,
                        maxLength: 7,
                      })}
                    />
                    {errors.pincode && (
                      <p className="m input-error">Enter pin code</p>
                    )}
                  </div>

                  <div className="col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400">
                      Address <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      className="form-control"
                      name="address"
                      type="text"
                      placeholder="Enter Address"
                      defaultValue={data !== null ? data.address : ""}
                      required
                      {...register("address", {
                        required: true,
                        pattern: {
                          value: /[A-Za-z]/,
                        },
                      })}
                    />
                    {errors.address && (
                      <p className="m input-error">please enter address</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="mb-1">
                      Other Details{" "}
                      <small style={{ color: "#ff0000" }}>*</small>
                    </h4>
                    <hr />
                  </div>
                  <div className=" col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400">
                      No. of Family Numbers{" "}
                      <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      className="form-control w"
                      name="noOfMember"
                      type="number"
                      placeholder="Enter Number "
                      required
                      {...register("noOfMember", {
                        required: true,
                      })}
                    />
                    {errors.noOfMember && (
                      <p className="m input-error">Enter No. of member</p>
                    )}
                  </div>

                  <div className=" col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400">
                      Nominee Name <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      className="form-control"
                      name="nomineeName"
                      type="text"
                      required
                      placeholder="Enter Nominee Name"
                      {...register("nomineeName", {
                        required: true,
                      })}
                    />
                    {errors.nomineeName && (
                      <p className="m input-error">
                        {" "}
                        Enter name of nominee <small>*</small>
                      </p>
                    )}
                  </div>

                  <div className="col-lg-6 form-group text_box">
                    <div className="mb-3">
                      <label className="f_p text_c f_400">
                        Select Relationship of Nominee{" "}
                        <small style={{ color: "#ff0000" }}>*</small>
                      </label>
                      <Select
                        required
                        {...register("nomineeRelationship", {})}
                        value={
                          Relationship === undefined
                            ? Relationship
                            : Relationship.value
                        }
                        onChange={(Relationship) => {
                          handleRelationship(Relationship.value);
                        }}
                        options={RelationshipList}
                        classNamePrefix="select2-selection"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="mb-1">Document Details</h4>
                    <hr />
                  </div>
                  <div className=" col-lg-6 form-group text_box ">
                    <label className="f_p text_c f_400">
                      Aadhar Number{" "}
                      <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      className="form-control w"
                      name="aadharNumber"
                      type="number"
                      placeholder="Enter Aadhar Number"
                      defaultValue={data !== null ? data.aadharNumber : ""}
                      {...register("aadharNumber", {
                        required: true,
                        maxLength: 12,
                        minLength: 12,
                      })}
                    />
                    {errors.aadharNumber && (
                      <p className="m input-error">Invalid Aadhar Number</p>
                    )}
                  </div>

                  <div className=" col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400 ">
                      PAN Number <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      name="panNumber"
                      type="text"
                      className="text-uppercase"
                      placeholder="Enter PAN Number"
                      defaultValue={data !== null ? data.panNumber : ""}
                      {...register("panNumber", {
                        required: true,
                        maxLength: 10,
                        minLength: 10,
                      })}
                    />
                    {errors.panNumber && (
                      <p className="m input-error">Invalid Pan Nmber</p>
                    )}
                  </div>

                  <div className="col-lg-6 form-group mb-4">
                    <label className="f_p text_c f_400">
                      Upload Aadhar Card{" "}
                      <small style={{ color: "#ff0000" }}>*</small>
                      {/* <small>(Image Or Pdf Format Only*)</small> */}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="AddharImg"
                      multiple
                      accept="image/jpeg,image/png,application/pdf"
                      name="aadhar_card"
                      {...register("aadhar_card", {
                        required: true,
                      })}
                    />
                    <small>(image or Pdf Format Only)</small>{" "}
                    <small style={{ color: "#ff0000" }}>max 5mb</small>
                    {errors.aadhar_card && (
                      <p className="m input-error">
                        Choose front and back side of Aadhar
                      </p>
                    )}
                  </div>

                  <div className="col-lg-6 form-group mb-4">
                    <label className="f_p text_c f_400">
                      Upload Pan Card{" "}
                      <small style={{ color: "#ff0000" }}>*</small>
                      {/* <small>(Image Or Pdf Format Only*)</small> */}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="pan_card"
                      accept="image/jpeg,image/png,application/pdf"
                      {...register("pan_card", {
                        required: true,
                      })}
                    />
                    <small>(image or Pdf Format Only)</small>{" "}
                    <small style={{ color: "#ff0000" }}>max 5mb</small>
                    {errors.pan_card && (
                      <p className="m input-error">Choose pan card</p>
                    )}
                  </div>

                  {/* //Profile photo */}
                  <div className="col-lg-6 form-group mb-4">
                    <label className="f_p text_c f_400">
                      Upload Your Profie picture{" "}
                      <small style={{ color: "#ff0000" }}>*</small>
                      {/* <small>(Image Or Pdf Format Only*)</small> */}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/jpeg,image/png,application/pdf"
                      name="profile_picture"
                      {...register("profile_picture", {
                        required: true,
                      })}
                    />
                    <small>(passport size image)</small>{" "}
                    <small style={{ color: "#ff0000" }}>max 5mb</small>
                    {errors.profile_picture && (
                      <p className="m input-error">Choose profile picture</p>
                    )}
                  </div>

                  {/**** other Document */}

                  <div className="col-lg-6 form-group text_box">
                    <div className="mb-3">
                      <label className="f_p text_c f_400">
                        Select Other Document
                      </label>
                      <Select
                        {...register("other_document_type", {})}
                        value={
                          OtherDocName === undefined
                            ? OtherDocName
                            : OtherDocName.label
                        }
                        onChange={(OtherDocName) => {
                          handlOtherDocName(OtherDocName.value);
                          SetChangeEvent(OtherDocName);
                        }}
                        options={DocumenttypeListData}
                        classNamePrefix="select2-selection"
                      />
                    </div>
                  </div>

                  <div className=" col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400">
                      Other Document Number
                    </label>
                    <input
                      className="form-control w"
                      name="otherDocumentNumber"
                      type="text"
                      placeholder="Enter Document Number"
                      {...register("otherDocumentNumber", {
                        disabled: changeEvent == null ? true : false,
                      })}
                    />
                  </div>

                  <div className="col-lg-6 form-group mb-4">
                    <label className="f_p text_c f_400">
                      Upload Document
                      {/* <small>(Image Or Pdf Format Only*)</small> */}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="OtherDocImg"
                      name="other_document"
                      multiple
                      accept="image/jpeg,image/png,application/pdf"
                      {...register("other_document", {
                        disabled: changeEvent == null ? true : false,
                      })}
                    />
                    <small>(image or Pdf Format Only)</small>{" "}
                    <small style={{ color: "#ff0000" }}>max 5mb</small>
                  </div>
                </div>

                <div className="col-lg-4 m-auto pb-5 justify-content-center text-center">
                  <button
                    type="submit"
                    className="saved_btn"
                    id="save_btn"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save
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
