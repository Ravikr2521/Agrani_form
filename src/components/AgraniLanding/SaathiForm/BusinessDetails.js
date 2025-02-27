import React, { useEffect, useState } from "react";
import "flatpickr/dist/themes/confetti.css";
import { Spinner } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { CryptoState } from "../../FarmerContext";

const BusinessDetails = () => {
  var Api_Url = process.env.REACT_APP_API_URL;

  const history = useHistory();
  const { setBusiness, SetCorporate, userDetails, dropdownData } =
    CryptoState();
  const MasterDropDown = dropdownData?.data?.results[0];

  const [loading, setLoading] = useState(false);
  const [IncomeSource, setIncomeSource] = useState(
    userDetails?.business_details?.income_source || ""
  );
  const [professionaltraining, setProfessionalTraining] = useState(
    Boolean(
      userDetails?.business_details
        ?.is_professional_training_insurance_and_bank_product
    )
  );
  const [interestInSelling, setInterestInSelling] = useState(
    userDetails?.business_details?.interest_in_selling || ""
  );

  const IncomeListData = [
    {
      label: "Income Source",
      options:
        MasterDropDown?.income_type?.map((Income) => ({
          label: `${Income}`,
          value: `${Income}`,
        })) || [],
    },
  ];

  const PolicyData = [
    {
      label: "Status",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ],
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    reset({
      experience_in_insurance:
        userDetails?.experiences?.experience_in_insurance || false,
      experience_in_banking:
        userDetails?.experiences?.experience_in_banking || false,
      experience_in_agri_input:
        userDetails?.experiences?.experience_in_agri_input || false,
      experience_in_agri_output:
        userDetails?.experiences?.experience_in_agri_output || false,
      interest_in_selling: userDetails?.business_details?.interest_in_selling,
    });
    setIncomeSource(userDetails?.business_details?.income_source || "");
    if (userDetails?.business_details) {
      setProfessionalTraining(
        userDetails?.business_details
          ?.is_professional_training_insurance_and_bank_product || false
      );
      setInterestInSelling(
        userDetails?.business_details?.interest_in_selling || ""
      );
    }
  }, [userDetails]);

  const onSubmit = (data) => {
    SetCorporate(true);
    setLoading(true);

    localStorage.setItem("userDetail", JSON.stringify(data));
    let user_token = localStorage.getItem("token");
    var userId = localStorage.getItem("user-info-id");

    var formdata = new FormData();
    var temp = [
      data.experience_in_insurance,
      data.experience_in_banking,
      data.experience_in_agri_input,
      data.experience_in_agri_output,
    ];

    if (temp.indexOf(true) === -1) {
      Swal.fire({
        icon: "warning",
        title: "Please select at least one Experience",
        timer: 3000,
      });
      setLoading(false);
    } else {
      formdata.append("source_of_income", IncomeSource);
      formdata.append("income", data.income);
      formdata.append("experience_in_insurance", data.experience_in_insurance);
      formdata.append("experience_in_banking", data.experience_in_banking);
      formdata.append(
        "experience_in_agrani_input",
        data.experience_in_agri_input
      );
      formdata.append(
        "experience_in_agrani_output",
        data.experience_in_agri_output
      );
      formdata.append(
        "is_professional_training_insurance_and_bank_product",
        professionaltraining
      );
      formdata.append("interest_in_selling", interestInSelling);
      formdata.append("applicant_id", userId);
      formdata.append("ui_section_id", "6");
      formdata.append("created_by_name", "Self");
      formdata.append("created_by", "0");

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
        headers: { Authentication: `Token ${user_token}` },
      };

      fetch(`${Api_Url}/api/business-details/`, requestOptions)
        .then((r) => r.json())
        .then((result) => {
          Swal.fire({
            icon:
              result.status === 200 || result.status === 201
                ? "success"
                : "warning",
            title: result.message,
            timer: 1500,
          });
          setBusiness(result.status === 200 || result.status === 201);
          setLoading(false);
        });
    }
  };

  return (
    <section className="sign_in_area col-lg-12">
      <div className="px-5">
        <div className="login_info pl-0">
          <h2 className="f_p f_600 f_size_24 t_color3 mb_40 mt_20 text-center">
            Fill the <span className="f_700 orange">Business Details</span> in
            Application
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-6 form-group text_box">
                <label className="f_p text_c f_400">
                  Select Primary Source of Income{" "}
                  <small style={{ color: "#ff0000" }}>*</small>
                </label>
                <Controller
                  name="source_of_income"
                  control={control}
                  rules={{
                    required:
                      !IncomeSource &&
                      !userDetails?.business_details?.income_source &&
                      `This field is required`,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={IncomeListData[0]?.options.find(
                        (option) => option.label === IncomeSource
                      )}
                      onChange={(selectedOption) => {
                        setIncomeSource(selectedOption.label);
                        field.onChange(selectedOption.label);
                      }}
                      options={IncomeListData}
                      classNamePrefix="select2-selection"
                      placeholder={
                        IncomeSource ||
                        userDetails?.business_details?.income_source ||
                        "Select"
                      }
                    />
                  )}
                />
                {errors.source_of_income && (
                  <small style={{ color: "red" }}>
                    {errors.source_of_income.message}
                  </small>
                )}
              </div>

              <div className="col-lg-6 form-group text_box">
                <label className="f_p text_c f_400">
                  Annual Income <small style={{ color: "#ff0000" }}>*</small>
                </label>
                <input
                  name="income"
                  type="text"
                  defaultValue={userDetails?.business_details?.income || ""}
                  placeholder="Enter income"
                  required
                  {...register("income")}
                />
              </div>

              <div className="col-lg-12 form-group mb-4">
                <label className="f_p text_c f_400">Experience in: </label>
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  {["insurance", "banking", "agri_input", "agri_output"].map(
                    (field) => (
                      <div key={field} className="form-check mx-2">
                        <input
                          {...register(`experience_in_${field}`)}
                          className="form-check-input mt-2"
                          type="checkbox"
                        />
                        <label className="form-check-label">
                          {field.replace("_", " ")}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="col-lg-12 form-group text_box">
                <label className="f_p text_c f_400">
                  Professional Training{" "}
                  <small style={{ color: "#ff0000" }}>*</small>
                </label>
                <Controller
                  name="is_professional_training_insurance_and_bank_product"
                  rules={{
                    required:
                      Object.keys(userDetails?.business_details || {})
                        .length === 0 && `This field is required`,
                  }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={PolicyData[0]?.options.find(
                        (option) => option.value === professionaltraining
                      )}
                      onChange={(selectedOption) => {
                        setProfessionalTraining(selectedOption.value);
                        field.onChange(selectedOption.value);
                      }}
                      options={PolicyData}
                      classNamePrefix="select2-selection"
                    />
                  )}
                />
              </div>

              <div className="col-lg-12 form-check text_box">
                <label className="f_p text_c f_400">
                  You are interested in selling{" "}
                  <small style={{ color: "#ff0000" }}>*</small>
                </label>
                <div className="col-lg-12 p-0">
                  {["InsuranceProducts", "BankingProducts", "Both"].map(
                    (option) => (
                      <div
                        className="form-check form-check-inline"
                        key={option}
                      >
                        <input
                          {...register("interest_in_selling", {
                            required: "This field is required",
                          })}
                          name="interest_in_selling"
                          type="radio"
                          value={option}
                          checked={option === interestInSelling}
                          onChange={(e) => setInterestInSelling(e.target.value)}
                        />
                        <label className="f_p text_c f_400 ml-3 mb-0">
                          {option.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="col-lg-4 m-auto pb-5 text-center">
                <button type="submit" className="saved_btn">
                  {userDetails?.business_details ? "Update" : "Save"}{" "}
                  {loading && <Spinner size="sm" />}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BusinessDetails;
