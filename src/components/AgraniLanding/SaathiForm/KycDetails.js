import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Select from "react-select";
import { SaathiService } from "../../../service/saathi.service";
import { CryptoState } from "../../FarmerContext";
import { Spinner } from "react-bootstrap";

const KycDetails = (data) => {
  const { setKycDetail, SetCorporate, setCompletedSection, userDetails } =
    CryptoState();
  const Api_Url = process.env.REACT_APP_API_URL;
  const [date, setDate] = useState();
  const [MaritalStatus, setMaritalStatus] = useState();
  const [OccupationList, setOccupationList] = useState([]);
  const [OccupationName, setOccupationName] = useState("");
  const [Relationship, setRelationship] = useState();
  const [RelationList, setRelationList] = useState([]);
  const [OccupationId, setOccupationId] = useState("");
  const [OtherDocName, setOtherDocName] = useState([]);
  const [StatesCode, setStatesCode] = useState(null);
  const [StateName, setStateName] = useState(null);
  const [DistrictCode, setDistrictCode] = useState(null);
  const [DistrictName, setDistrictName] = useState(null);
  const [BlockCode, setBlockCode] = useState(null);
  const [BlockName, setBlockName] = useState(null);
  const [DistrictList, setDistrictList] = useState([]);
  const [BlockList, setBlockList] = useState([]);
  const [statedatalist, setstatedatalist] = useState({});
  const [changeEvent, SetChangeEvent] = useState(null);
  const [isDisabled, setIsDisabled] = useState(null);
  const [loading,setLoading]=useState(false)
  const [loader,setLoader]=useState(false)


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

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

  const customStyles = {
    control: (base) => ({
      ...base,
      // height: 50,
      minHeight: 20,
    }),
  };

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

  function handleMaritalStatus(MaritalStatus) {
    setMaritalStatus(MaritalStatus);
  }
  function handleOccupationName(OccupationObject) {
    setOccupationId(OccupationObject.value);
    setOccupationName(OccupationObject.label);
  }
  function handleRelationship(Relationship) {
    setRelationship(Relationship);
  }

  function handleStatesDropdown(StateObject) {
    setStatesCode(StateObject.value);
    setStateName(StateObject.label);
    setLoader(true)
  }

  function handleDistrictCode(DistrictObject) {
    setDistrictCode(DistrictObject.value);
    setDistrictName(DistrictObject.label);
  }

  function handleBlockCode(BlockObject) {
    setBlockCode(BlockObject.value);
    setBlockName(BlockObject.label);
  }

  function handlOtherDocName(OtherDocName) {
    setOtherDocName(OtherDocName);
    SetChangeEvent(OtherDocName);
    setIsDisabled(OtherDocName);
  }

  // Marital Status selectbox
  const MaritalStatusList = [
    { value: "single", label: "Unmarried" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "Widow / widower", label: "Widower / widower" },
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

  //   Relationship Status selectbox
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

  useEffect(() => {
    SaathiService.getMasterstateData()
      .then((data) => setstatedatalist(data))
      .catch((error) => {
        console.warn("Not data fetch :(");
      });
  }, []);

  
  useEffect(() => {
    if (StatesCode !== null) {
      SaathiService.getMasterdistrictsData(StatesCode)
        .then((data) => {
          setDistrictList(data);
          setLoader(false)
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

//   console.log("checllll", userDetails);


  const onSubmit = (data) => {
    setLoading(true)
    SetCorporate(true);
    data["dateOfBirth"] = date;
    localStorage.setItem("userDetail", JSON.stringify(data));
    let user_token = localStorage.getItem("token");
    const User_Mobile = localStorage.getItem("phone_number");
    console.log(user_token, "token");

    var userId = localStorage.getItem("user-info-id");
    var formdata = new FormData();
    formdata.append("dateOfBirth" , data.dateOfBirth);
    formdata.append("gender", data.gender || userDetails?.personal_details?.gender);
    formdata.append("martialStatus", MaritalStatus || userDetails?.personal_details?.martialStatus);
    formdata.append("noOfMember", data.noOfMember || userDetails?.personal_details?.noOfMember);
    formdata.append("occupation", OccupationName || userDetails?.personal_details?.occupation);
    formdata.append("occupation_id", OccupationId || userDetails?.personal_details?.occupation_id);
    formdata.append("aadharNumber", data.aadharNumber || userDetails?.personal_details?.aadharNumber);
    formdata.append("panNumber", data.panNumber || userDetails?.personal_details?.panNumber);
    formdata.append("phoneNumber", User_Mobile);
    formdata.append("address", data.address || userDetails?.personal_details?.address );
    formdata.append("city", BlockName || userDetails?.personal_details?.city);
    formdata.append("city_id", BlockCode);
    formdata.append("state", StateName || userDetails?.personal_details?.state);
    formdata.append("state_id", StatesCode);
    formdata.append("district", DistrictName || userDetails?.personal_details?.district);
    formdata.append("district_id", DistrictCode);
    formdata.append("nomineeName", data.nomineeName || userDetails?.personal_details?.nomineeName);
    formdata.append("nomineeRelationship", Relationship || userDetails?.personal_details?.nomineeRelationship);
    formdata.append("pincode", data.pincode || userDetails?.personal_details?.pincode);
    formdata.append("ui_section_id", "2");

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
    formdata.append("created_by_name", "Self");

    //for printing
    for (var pair of formdata.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    var requestOptions = {
      method: "PUT",
      body: formdata,
      headers: { Authentication: `Token ${user_token}` },
    };

    fetch(`${Api_Url}/api/kyc-details/${userId}`, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        if (result.status === 200) {
          Swal.fire({
            icon: "success",
            title: result.message,
            timer: 1500,
          });
          setKycDetail(true);
          setCompletedSection("2");
          setLoading(false)
        }
         else {
          Swal.fire({
            icon: "warning",
            title: result.message,
            timer: 3000,
          });
          setLoading(false)
        }
        // if(result.status===200) {
        // document.getElementById("save_btn").disabled=true }
      })
      .catch((err)=>{
        console.log(err)
        setLoading(false)
      }
      )
      
  };


  return (
    <section className="sign_in_area col-lg-12">
      <div className="px-4">
        <div className="login_info pl-0">
          <h2 className="f_p f_600 f_size_24 t_color3 mb_40 mt_20 text-center">
            Fill the KYC Details in
            <span className="f_700"> Application</span>
          </h2>

          <div className="formdetails">
            <form action="#" className=" login-form sign-in-form">
              <div className="row">
                <div className="col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400 m-0 mb-1">
                    Date Of Birth <small style={{ color: "#ff0000" }}>*</small>
                  </label>

                  <input
                    className="form-control d-block w"
                    name="dateOfBirth"
                    type="date"
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    // defaultValue={userDetails?.personal_details?.dateOfBirth }
                          />
                </div>
                {errors.dateOfBirth && (
                  <p className="m input-error">Please fill DOB</p>
                )}

                <div className="col-lg-6 form-check text_box">
                  <label className="f_p text_c f_400 m-0 mb-1">
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

                <div className="col-lg-6  text_box">
                  <div className="mb-3">
                    <label className="f_p text_c f_400 m-0 mb-1">
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
                      options={MaritalStatusList}
                      placeholder={userDetails?.personal_details?.martialStatus || "Select Status"}
                      className="select_box"
                      styles={customStyles}
                    />
                  </div>
                </div>
                <div className="col-lg-6 form-group text_box">
                  <div className="mb-3">
                    <label className="f_p text_c f_400 m-0 mb-1">
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
                      placeholder={userDetails?.personal_details?.occupation || "Select Occupation"}
                      options={OccupationListData}
                      classNamePrefix="select_box"
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
                    <label className="f_p text_c f_400 m-0 mb-1">
                      Select State <small style={{ color: "#ff0000" }}>*</small>
                    </label>

                    <Select
                      required
                      value={
                        StatesCode === null ? StatesCode : StatesCode.label
                      }
                      onChange={(StatesCode) => {
                        handleStatesDropdown(StatesCode);
                      }}
                      options={optionStatesCode}
                      placeholder={userDetails?.personal_details?.state || "Select State"}
                      classNamePrefix="select2-selection"
                    />
                  </div>
                </div>

                <div className="col-lg-6 form-group text_box">
                  <div className="mb-3">
                    <label className="f_p text_c f_400 m-0 mb-1">
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
                      placeholder={userDetails?.personal_details?.district || "Select District"}
                      classNamePrefix="select2-selection"
                      isLoading={loader}
                    
                    />
                  </div>
                </div>

                <div className="col-lg-4 form-group text_box">
                  <div className="mb-3">
                    <label className="f_p text_c f_400 m-0 mb-1">
                      Select Block <small style={{ color: "#ff0000" }}>*</small>
                    </label>

                    <Select
                      {...register("city")}
                      value={BlockCode === null ? BlockCode : BlockCode.label}
                      onChange={(BlockCode) => {
                        handleBlockCode(BlockCode);
                      }}
                      options={optionBlockCode}
                      placeholder={userDetails?.personal_details?.city || "Select City"}
                      classNamePrefix="select2-selection"
                    />
                  </div>
                </div>

                <div className="col-lg-2 form-group text_box">
                  <label className="f_p text_c f_400 m-0 mb-1">
                    Pin Code <small style={{ color: "#ff0000" }}>*</small>
                  </label>
                  <input
                    className="form-control"
                    name="pincode"
                    type="text"
                    placeholder="Pincode"
                    required={!userDetails?.personal_details?.pincode ? true :false}
                    {...register("pincode", {
                      minLength: 6,
                      maxLength: 7,
                    })}
                    defaultValue={
                        userDetails
                          ? userDetails?.personal_details?.pincode
                          : ""
                      }
                  />
                  {errors?.pincode !== null || errors.pincode !== "undefined"  && (
                    <p className="m input-error">Enter pin code</p>
                  )}
                </div>

                <div className="col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400 m-0 mb-1">
                    Address <small style={{ color: "#ff0000" }}>*</small>
                  </label>
                  <input
                    className="form-control"
                    name="address"
                    type="text"
                    placeholder="Enter Address"
                    defaultValue={userDetails?.personal_details?.address}
                    required={!userDetails?.personal_details?.address ? true :false}
                    {...register("address", {
                      pattern: {
                        value: /[A-Za-z]/,
                      },
                    })}
                  />
                  {errors.address !== null || errors.address !== "undefined" && (
                    <p className="m input-error">please enter address</p>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <h4 className="mb-1">
                    Other Details <small style={{ color: "#ff0000" }}>*</small>
                  </h4>
                  <hr />
                </div>
                <div className=" col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400 m-0 mb-1">
                    No. of Family Numbers{" "}
                    <small style={{ color: "#ff0000" }}>*</small>
                  </label>
                  <input
                    className="form-control w"
                    name="noOfMember"
                    type="number"
                    placeholder="Enter Number "
                    required={!userDetails?.personal_details?.noOfMember ?true :false}
                    {...register("noOfMember", {
                    })}
                    defaultValue={userDetails?.personal_details?.noOfMember}
                    
                  />
                  {errors.noOfMember !== null || errors.noOfMember !== "undefined" && (
                    <p className="m input-error">Enter No. of member</p>
                  )}
                </div>

                <div className=" col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400 m-0 mb-1">
                    Nominee Name <small style={{ color: "#ff0000" }}>*</small>
                  </label>
                  <input
                    className="form-control"
                    name="nomineeName"
                    type="text"
                    required={!userDetails?.personal_details?.noOfMember ? true :false}
                    placeholder="Enter Nominee Name"
                    {...register("nomineeName", {
                    })}
                    defaultValue={userDetails?.personal_details?.noOfMember}
                  />
                  {errors.nomineeName !== null || errors.nomineeName !== "undefined" && (
                    <p className="m input-error">
                      Enter name of nominee <small>*</small>
                    </p>
                  )}
                </div>

                <div className="col-lg-6 form-group text_box">
                  <div className="mb-3">
                    <label className="f_p text_c f_400 m-0 mb-1">
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
                      placeholder={userDetails?.personal_details?.nomineeRelationship || "Select Relationship"}
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
                  <label className="f_p text_c f_400 m-0 mb-1">
                    Aadhar Number <small style={{ color: "#ff0000" }}>*</small>
                  </label>
                  <input
                    className="form-control w"
                    name="aadharNumber"
                    type="number"
                    placeholder="Enter Aadhar Number"
                    defaultValue={userDetails?.personal_details?.aadharNumber}
                    required={!userDetails?.personal_details?.aadharNumber ? true :false}
                    {...register("aadharNumber", {
                      maxLength: 12,
                      minLength: 12,
                    })}
                    
                  />
                  {errors.aadharNumber && (
                    <p className="m input-error">Invalid Aadhar Number</p>
                  )}
                </div>

                <div className=" col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400 m-0 mb-1">
                    PAN Number <small style={{ color: "#ff0000" }}>*</small>
                  </label>
                  <input
                    name="panNumber"
                    type="text"
                    className="text-uppercase"
                    placeholder="Enter PAN Number"
                    defaultValue={userDetails?.personal_details?.panNumber}
                    required={!userDetails?.personal_details?.panNumber ? true :false}
                    {...register("panNumber", {
                      maxLength: 10,
                      minLength: 10,
                    })}
                  />
                  {errors.panNumber && (
                    <p className="m input-error">Invalid Pan Nmber</p>
                  )}
                </div>

                <div className="col-lg-6 form-group mb-4">
                  <label className="f_p text_c f_400 m-0 mb-1">
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
                  <label className="f_p text_c f_400 m-0 mb-1">
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
                  <label className="f_p text_c f_400 m-0 mb-1">
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
                    <label className="f_p text_c f_400 m-0 mb-1">
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
                  <label className="f_p text_c f_400 m-0 mb-1">
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
                  <label className="f_p text_c f_400 m-0 mb-1">
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

              <div className="col-lg-4 m-auto pb-5 mb-5 justify-content-center text-center">
                <button
                  type="submit"
                  className="saved_btn"
                  id="save_btn"
                  onClick={handleSubmit(onSubmit)}
                >
                  {!userDetails?.personal_details?.aadharNumber  ? "Save" : "Update"}  &nbsp; {loading ? <Spinner size="sm"></Spinner> : ""}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KycDetails;
