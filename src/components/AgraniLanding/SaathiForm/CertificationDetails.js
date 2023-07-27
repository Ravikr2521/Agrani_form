import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { SaathiService } from "../../../service/saathi.service";
import { CryptoState } from "../../FarmerContext";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const CertificationDetails = () => {
  var Api_Url = process.env.REACT_APP_API_URL;
  // console.clear()
  const history = useHistory();
  const { setCertificate, SetCorporate } = CryptoState();

  const [Qualificationlist, setQualificationlist] = useState({});
  const [changeEvent, SetChangeEvent] = useState(null);
  const [Change, setChange] = useState(null);


  useEffect(() => {
    SaathiService.getBulkData()
      .then((data) => setQualificationlist(data))
      .catch((error) => {
        console.warn("Not data fetch :(");
      });
  }, []);

  const [InsuranceExamStatus, setInsuranceExamStatus] = useState([]);
  function handelInsuranceExamStatus(InsuranceExamStatus) {
    setInsuranceExamStatus(InsuranceExamStatus);
    SetChangeEvent(InsuranceExamStatus);
  }

  const [BankingExamStatus, setBankingExamStatus] = useState([]);

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

  const [userData, setUserData] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    SetCorporate(true);

    localStorage.setItem("userDetail", JSON.stringify(data));

    let user_token = localStorage.getItem("token");
    var userId = localStorage.getItem("applicant_id");
    setUserData(data);

    var formdata = new FormData();
    formdata.append("is_insurance_exam_passed", InsuranceExamStatus);
    formdata.append("is_banking_exam_passed", BankingExamStatus);
    formdata.append("applicant_id", userId);

    for (let a = 0; a < data.posp_certificate.length; a++) {
      if (InsuranceExamStatus == false) {
        formdata.append("posp_certificate", []);
      } else {
        formdata.append("posp_certificate", data.posp_certificate[a]);
      }
    }

    for (let b = 0; b < data?.bank_certificate?.length; b++) {
      if (BankingExamStatus == false) {
        formdata.append("bank_certificate", []);
      } else {
        formdata.append("bank_certificate", data.bank_certificate[b]);
      }
    }

    for (let c = 0; c < data.police_verification_certificate.length; c++) {
      formdata.append(
        "police_verification_certificate",
        data.police_verification_certificate[c]
      );
    }

    formdata.append("ui_section_id", "4");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: { Authentication: `Token ${user_token}` },
    };

    fetch(`${Api_Url}/api/certification-details/`, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        console.log(result, "check result")
        
        result.status === 200 || result.status === 201
          ? Swal.fire({
              icon: "success",
              title: result.message,
              buttons: false,
              timer: 1500,
            }) && setCertificate(true)
          : 
          Swal.fire({
            icon: "warning",
            title: result.message,
            timer: 3000,
          })
         

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
            Fill the Certification Details in
            <span className="f_700"> Application</span>
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
                      value={
                        InsuranceExamStatus === undefined
                          ? InsuranceExamStatus
                          : InsuranceExamStatus.label
                      }
                      onChange={(InsuranceExamStatus) => {
                        handelInsuranceExamStatus(InsuranceExamStatus.value);
                      }}
                      options={ExamStatusData}
                      classNamePrefix="select2-selection"
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
                      value={
                        BankingExamStatus === undefined
                          ? BankingExamStatus
                          : BankingExamStatus.label
                      }
                      onChange={(BankingExamStatus) => {
                        handelBankingExamStatus(BankingExamStatus.value);
                      }}
                      options={ExamStatusData}
                      classNamePrefix="select2-selection"
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
                      disabled: changeEvent == null ? true : false,
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
                      disabled: Change == null ? true : false,
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
                  Save
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
