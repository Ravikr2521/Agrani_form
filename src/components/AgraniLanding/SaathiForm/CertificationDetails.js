import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { CryptoState } from "../../FarmerContext";

const CertificationDetails = () => {
  var Api_Url = process.env.REACT_APP_API_URL;
  // console.clear()
  const history = useHistory();
  const { setCertificate, SetCorporate, userDetails } = CryptoState();

  const [changeEvent, SetChangeEvent] = useState(null);
  const [Change, setChange] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetails?.certification_details?.is_insurance_exam_passed)
      SetChangeEvent(
        userDetails?.certification_details?.is_insurance_exam_passed
      );
    if (userDetails?.certification_details?.is_banking_exam_passed)
      setChange(userDetails?.certification_details?.is_banking_exam_passed);
  }, [userDetails?.certification_details]);

  const [InsuranceExamStatus, setInsuranceExamStatus] = useState("");
  function handelInsuranceExamStatus(InsuranceExamStatus) {
    setInsuranceExamStatus(InsuranceExamStatus);
    SetChangeEvent(InsuranceExamStatus);
  }

  const [BankingExamStatus, setBankingExamStatus] = useState("");

  function handelBankingExamStatus(BankingExamStatus) {
    setBankingExamStatus(BankingExamStatus);
    setChange(BankingExamStatus);
  }

  // ExamStatusData selectbox
  const ExamStatusData = [
    {
      label: "Exam Status",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ],
    },
  ];

  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    SetCorporate(true);
    setLoading(true);

    localStorage.setItem("userDetail", JSON.stringify(data));

    let user_token = localStorage.getItem("token");
    var userId = localStorage.getItem("user-info-id");

    var formdata = new FormData();
    formdata.append(
      "is_insurance_exam_passed",
      InsuranceExamStatus === ""
        ? userDetails?.certification_details?.is_insurance_exam_passed
        : InsuranceExamStatus
    );
    formdata.append(
      "is_banking_exam_passed",
      BankingExamStatus === ""
        ? userDetails?.certification_details?.is_banking_exam_passed
        : BankingExamStatus
    );
    formdata.append("applicant_id", userId);

    for (let a = 0; a < data?.posp_certificate?.length; a++) {
      if (InsuranceExamStatus === false) {
        formdata.append("posp_certificate", []);
      } else {
        formdata.append("posp_certificate", data.posp_certificate[a]);
      }
    }

    for (let b = 0; b < data?.bank_certificate?.length; b++) {
      if (BankingExamStatus === false) {
        formdata.append("bank_certificate", []);
      } else {
        formdata.append("bank_certificate", data.bank_certificate[b]);
      }
    }

    for (let c = 0; c < data?.police_verification_certificate?.length; c++) {
      formdata.append(
        "police_verification_certificate",
        data.police_verification_certificate[c]
      );
    }

    formdata.append("ui_section_id", "5");
    formdata.append("created_by", "0");
    formdata.append("created_by_name", "Self");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: { Authentication: `Token ${user_token}` },
    };

    fetch(`${Api_Url}/api/certification-details/`, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        if (result.status === 200 || result.status === 201) {
          Swal.fire({
            icon: "success",
            title: result.message,
            buttons: false,
            timer: 1500,
          });
          setCertificate(true);
          setLoading(false);
        } else {
          Swal.fire({
            icon: "warning",
            title: result.message,
            timer: 3000,
          });
          setLoading(false);
        }

        if ("detail" in result) {
          Swal.fire("Please Fill your Application");
          history.push("/");
          return;
        }
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
            <form action="#" className="login-form sign-in-form">
              <div className="row">
                <div className="col-lg-6 form-group text_box">
                  <div className="mb-3">
                    <label
                      className="f_p text_c f_400"
                      name="is_insurance_exam_passed"
                    >
                      Insurance Exam Passed
                    </label>
                    <Select
                      required
                      value={InsuranceExamStatus?.label}
                      onChange={(InsuranceExamStatus) => {
                        handelInsuranceExamStatus(InsuranceExamStatus.value);
                      }}
                      options={ExamStatusData}
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
                  </div>
                </div>
                <div className="col-lg-6 form-group text_box">
                  <div className="mb-3">
                    <label
                      className="f_p text_c f_400"
                      name="is_banking_exam_passed"
                    >
                      Bank Exam Passed
                    </label>
                    <Select
                      required
                      value={BankingExamStatus?.label}
                      onChange={(BankingExamStatus) => {
                        handelBankingExamStatus(BankingExamStatus.value);
                      }}
                      options={ExamStatusData}
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
                  </div>
                </div>

                <div className="col-lg-6 form-group mb-4">
                  <label className="f_p text_c f_400">
                    Upload POSP Certificate{" "}
                    <small>(Image Or Pdf Format Only*)</small>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*,.pdf"
                    name="posp_certificate"
                    {...register("posp_certificate", {
                      disabled: !changeEvent ? true : false,
                    })}
                  />
                  <small>(image or Pdf Format Only)</small>{" "}
                  <small style={{ color: "#ff0000" }}>max 5mb</small>
                </div>
                <div className="col-lg-6 form-group mb-4">
                  <label className="f_p text_c f_400">
                    Upload Banking Certificate
                    {/* <small>(Image Or Pdf Format*)</small> */}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="bank_certificate"
                    accept="image/*,.pdf"
                    {...register("bank_certificate", {
                      disabled: !Change ? true : false,
                    })}
                  />
                  <small>(image or Pdf Format Only)</small>{" "}
                  <small style={{ color: "#ff0000" }}>max 5mb</small>
                </div>

                <div className="col-lg-12 form-group mb-4">
                  <label className="f_p text_c f_400">
                    Upload Police Verification Certificate
                    {/* <small>(Image Or Pdf Format Only*)</small> */}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="policecertificate"
                    name="police_verification_certificate"
                    accept="image/*,.pdf"
                    {...register("police_verification_certificate", {})}
                  />
                  <small>(image or Pdf Format Only)</small>{" "}
                  <small style={{ color: "#ff0000" }}>max 5mb</small>
                </div>
              </div>

              <div className="col-lg-4 m-auto pb-5 justify-content-center text-center">
                <button
                  type="submit"
                  className="saved_btn"
                  onClick={handleSubmit(onSubmit)}
                >
                  {userDetails?.certification_details === null
                    ? "Save"
                    : "Update"}
                  &nbsp; {loading ? <Spinner size="sm"></Spinner> : ""}
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
