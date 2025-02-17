import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import FarmerContext, { CryptoState } from "../../FarmerContext";

const EducationDetails = () => {
  const history = useHistory();
  const { setEducation, SetCorporate, userDetails, dropdownData } =
    CryptoState();
  const [loading, setLoading] = useState(false);

  var Api_Url = process.env.REACT_APP_API_URL;
  const MasterDropDown = dropdownData?.data?.results[0];

  const [Qualification, setQualification] = useState([]);
  function handleQualification(Qualification) {
    setQualification(Qualification);
    SetChangeEvent(Qualification);
  }

  const QualificationListData = [
    {
      label: "Document",
      options:
        MasterDropDown &&
        MasterDropDown.education?.map((qlf) => ({
          label: `${qlf}`,
          value: `${qlf}`,
        })),
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [get, setData] = useState([]);
  const [changeEvent, SetChangeEvent] = useState(null);

  const onSubmit = (data) => {
    setLoading(true);
    SetCorporate(true);
    let user_token = localStorage.getItem("token");

    localStorage.setItem("userDetail", JSON.stringify(data));
    var userId = localStorage.getItem("user-info-id");
    console.log(userId);

    var formdata = new FormData();
    formdata.append("highest_qualification", Qualification);
    formdata.append("year_of_passing", data.year_of_passing);

    for (let b = 0; b < data.degree_certificate.length; b++) {
      formdata.append("degree_certificate", data.degree_certificate[b]);
    }
    formdata.append("ui_section_id", "3");
    formdata.append("applicant_id", userId);
    formdata.append("created_by", "0");
    formdata.append("created_by_name", "Self");

    for (var pair of formdata.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: { Authentication: `Token ${user_token}` },
    };

    fetch(`${Api_Url}/api/education-details/`, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        if (result.status === 201 || result.status === 200) {
          Swal.fire({
            icon: "success",
            title: result?.message,
            timer: 1500,
          });
          setEducation(true);
          setLoading(false);
        } else {
          Swal.fire({
            icon: "warning",
            title: result?.message,
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

  useEffect(() => {
    async function fetchUsers() {
      var userId = localStorage.getItem("applicant_id");
      const fullResponse = await fetch(
        `${Api_Url}/api/existing-user/${userId}`
      );
      const responseJson = await fullResponse.json();
      setData(responseJson.data);
    }
    fetchUsers();
  }, []);

  return (
    <FarmerContext>
      <section className="sign_in_area col-lg-12">
        <div className="px-5 mb-5 pb-5">
          <div className="login_info pl-0">
            <h2 className="f_p f_600 f_size_24 t_color3 mb_40 mt_20 text-center">
              Fill the <span className="f_700 orange">Education Details</span>{" "}
              in Application
            </h2>
            <div className="">
              <form
                action="#"
                className="login-form sign-in-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="row">
                  <div className="col-lg-6 form-group text_box">
                    <div className="mb-3">
                      <label className="f_p text_c f_400">
                        Select Highest Qualification{" "}
                        <small style={{ color: "#ff0000" }}>*</small>
                      </label>
                      <Select
                        required
                        {...register("highest_qualification")}
                        value={
                          Qualification === undefined
                            ? Qualification
                            : Qualification.label
                        }
                        onChange={(Qualification) => {
                          handleQualification(Qualification.label);
                          console.log(Qualification);
                        }}
                        options={QualificationListData}
                        placeholder={
                          userDetails?.education_details
                            ?.highest_qualification || "Select Qualification"
                        }
                        classNamePrefix=""
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 form-group text_box">
                    <label className="f_p text_c f_400">
                      Year of Passing{" "}
                      <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      className="form-control w"
                      name="year_of_passing"
                      type="number"
                      placeholder="Enter Year of Passing"
                      required
                      {...register("year_of_passing", {
                        disabled: changeEvent == null ? true : false,
                        required: true,

                        maxLength: 4,
                        minLength: 4,
                      })}
                      defaultValue={
                        userDetails?.education_details?.year_of_passing
                      }
                    />
                    {errors.year_of_passing && (
                      <p className="m input-error">Invalid passing year</p>
                    )}
                  </div>

                  <div className="col-lg-12 form-group mb-4">
                    <label className="f_p text_c f_400">
                      Degree Certificate
                      <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <input
                      required
                      type="file"
                      className="form-control"
                      id="OtherDocImg"
                      accept="image/*,.pdf"
                      {...register("degree_certificate", {
                        disabled: changeEvent == null ? true : false,
                        required: true,
                      })}
                    />
                    <small>(image or Pdf Format Only)</small>{" "}
                    <small style={{ color: "#ff0000" }}>max 5mb</small>
                    {errors.degree_certificate && (
                      <p className="m input-error">
                        please upload Degree certificate
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-lg-4  m-auto pb-5 justify-content-center text-center">
                  <button
                    type="submit"
                    className="saved_btn"
                    onClick={handleSubmit(onSubmit)}
                  >
                    {userDetails?.education_details == null ? "Save" : "Update"}
                    &nbsp; {loading ? <Spinner size="sm"></Spinner> : ""}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </FarmerContext>
  );
};
export default EducationDetails;
