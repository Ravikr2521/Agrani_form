import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";

import Select from "react-select";
import Swal from "sweetalert2";
import { CryptoState } from "../../FarmerContext";

const CertificationDetails = () => {
  var Api_Url = process.env.REACT_APP_API_URL;

  const { setCertificate, SetCorporate, userDetails } = CryptoState();

  const [InsuranceExamStatus, setInsuranceExamStatus] = useState(null);
  const [BankingExamStatus, setBankingExamStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      userDetails?.certification_details?.is_insurance_exam_passed !== undefined
    ) {
      setInsuranceExamStatus({
        value: userDetails.certification_details.is_insurance_exam_passed,
        label: userDetails.certification_details.is_insurance_exam_passed
          ? "Yes"
          : "No",
      });
    }

    if (
      userDetails?.certification_details?.is_banking_exam_passed !== undefined
    ) {
      setBankingExamStatus({
        value: userDetails.certification_details.is_banking_exam_passed,
        label: userDetails.certification_details.is_banking_exam_passed
          ? "Yes"
          : "No",
      });
    }
  }, [userDetails?.certification_details]);

  const ExamStatusOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    reset({
      is_insurance_exam_passed:
        userDetails?.certification_details?.is_insurance_exam_passed || "",
      is_banking_exam_passed:
        userDetails?.certification_details?.is_banking_exam_passed || "",
    });
  }, [userDetails, reset]);

  const onSubmit = (data) => {
    if (!InsuranceExamStatus || !BankingExamStatus) {
      Swal.fire("Please select Exam Status for both fields.");
      return;
    }

    SetCorporate(true);
    setLoading(true);

    localStorage.setItem("userDetail", JSON.stringify(data));

    let user_token = localStorage.getItem("token");
    var userId = localStorage.getItem("user-info-id");

    var formdata = new FormData();
    formdata.append("is_insurance_exam_passed", InsuranceExamStatus.value);
    formdata.append("is_banking_exam_passed", BankingExamStatus.value);
    formdata.append("applicant_id", userId);

    if (InsuranceExamStatus.value) {
      for (let file of data.posp_certificate) {
        formdata.append("posp_certificate", file);
      }
    }

    if (BankingExamStatus.value) {
      for (let file of data.bank_certificate) {
        formdata.append("bank_certificate", file);
      }
    }

    for (let file of data.police_verification_certificate) {
      formdata.append("police_verification_certificate", file);
    }

    formdata.append("ui_section_id", "5");
    formdata.append("created_by", "0");
    formdata.append("created_by_name", "Self");

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: { Authentication: `Token ${user_token}` },
    };

    fetch(`${Api_Url}/api/certification-details/`, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        if (result.status === 200 || result.status === 201) {
          Swal.fire({
            icon: "success",
            title: result.message,
            timer: 1500,
          });
          setCertificate(true);
        } else {
          Swal.fire({
            icon: "warning",
            title: result.message,
            timer: 3000,
          });
        }
        setLoading(false);
      });
  };

  return (
    <section className="sign_in_area col-lg-12">
      <div className="px-5">
        <div className="login_info pl-0">
          <h2 className="f_p f_600 f_size_24 t_color3 mb_40 mt_20 text-center">
            Fill the <span className="f_700 orange">Certification Details</span>{" "}
            in Application
          </h2>
          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="login-form sign-in-form"
            >
              <div className="row">
                {/* Insurance Exam Passed */}
                <div className="col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400">
                    Insurance Exam Passed
                  </label>
                  <Select
                    value={InsuranceExamStatus}
                    onChange={setInsuranceExamStatus}
                    options={ExamStatusOptions}
                    classNamePrefix="select2-selection"
                    placeholder={
                      !userDetails?.certification_details
                        ?.is_insurance_exam_passed
                        ? !userDetails?.certification_details
                            ?.is_insurance_exam_passed
                          ? !userDetails?.certification_details
                            ? "Select"
                            : "No"
                          : "Yes"
                        : !userDetails?.certification_details
                        ? "Select"
                        : !userDetails?.certification_details
                            ?.is_insurance_exam_passed
                        ? "No"
                        : "Yes"
                    }
                  />
                  {errors.is_insurance_exam_passed && (
                    <small className="text-danger">
                      This field is required
                    </small>
                  )}
                </div>

                {/* Banking Exam Passed */}
                <div className="col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400">Bank Exam Passed</label>
                  <Select
                    value={BankingExamStatus}
                    onChange={setBankingExamStatus}
                    options={ExamStatusOptions}
                    classNamePrefix="select2-selection"
                    placeholder={
                      !userDetails?.certification_details
                        ?.is_banking_exam_passed
                        ? !userDetails?.certification_details
                            ?.is_banking_exam_passed
                          ? !userDetails?.certification_details
                            ? "Select"
                            : "No"
                          : "Yes"
                        : !userDetails?.certification_details
                        ? "select"
                        : !userDetails?.certification_details
                            ?.is_banking_exam_passed
                        ? "No"
                        : "Yes"
                    }
                  />
                  {errors.is_banking_exam_passed && (
                    <small className="text-danger">
                      This field is required
                    </small>
                  )}
                </div>

                {/* POSP Certificate Upload */}
                <div className="col-lg-6 form-group mb-4">
                  <label className="f_p text_c f_400">
                    Upload POSP Certificate (Image or PDF)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*,.pdf"
                    name="posp_certificate"
                    {...register("posp_certificate")}
                    disabled={InsuranceExamStatus?.value !== true}
                  />
                  <small>(image or Pdf Format Only)</small>{" "}
                  <small style={{ color: "#ff0000" }}>max 5mb</small>
                </div>

                {/* Banking Certificate Upload */}
                <div className="col-lg-6 form-group mb-4">
                  <label className="f_p text_c f_400">
                    Upload Banking Certificate
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="bank_certificate"
                    accept="image/*,.pdf"
                    {...register("bank_certificate")}
                    disabled={BankingExamStatus?.value !== true}
                  />
                  <small>(image or Pdf Format Only)</small>{" "}
                  <small style={{ color: "#ff0000" }}>max 5mb</small>
                </div>

                {/* Police Verification Certificate */}
                <div className="col-lg-12 form-group mb-4">
                  <label className="f_p text_c f_400">
                    Upload Police Verification Certificate
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="police_verification_certificate"
                    accept="image/*,.pdf"
                    {...register("police_verification_certificate", {
                      required: true,
                    })}
                  />
                  <small>(image or Pdf Format Only)</small>{" "}
                  <small style={{ color: "#ff0000" }}>max 5mb</small>
                  {errors.police_verification_certificate && (
                    <small className="text-danger">
                      This field is required
                    </small>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-lg-4 m-auto pb-5 text-center">
                <button type="submit" className="saved_btn">
                  {userDetails?.certification_details === null
                    ? "Save"
                    : "Update"}
                  {loading && <Spinner size="sm" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationDetails;
