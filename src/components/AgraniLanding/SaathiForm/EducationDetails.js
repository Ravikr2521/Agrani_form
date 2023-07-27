import React, { useEffect, useState } from "react";
//Import Flatepicker
import "flatpickr/dist/themes/confetti.css";
import Select from "react-select";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { SaathiService } from "../../../service/saathi.service";
import FarmerContext, { CryptoState } from "../../FarmerContext";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";


const EducationDetails = ({ urlid }) => {
  // console.clear()
  const history = useHistory();
  const { setEducation, SetCorporate } = CryptoState();
  
  var Api_Url = process.env.REACT_APP_API_URL;
  let user_token = localStorage.getItem("token");
  console.log("###", user_token)

  const [Qualificationlist, setQualificationlist] = useState({});
  useEffect(() => {
    SaathiService.getBulkData()
      .then((data) => setQualificationlist(data))
      .catch((error) => {
        console.warn("Not data fetch :(");
      });
  }, []);

  const [Qualification, setQualification] = useState([]);
  function handleQualification(Qualification) {
    setQualification(Qualification);
    SetChangeEvent(Qualification);
  }

  // Qualification selectbox
  const QualificationListData = [
    {
      label: "Document",
      options:
        Qualificationlist.data &&
        Qualificationlist.data.qualification.map((qlf) => ({
          label: `${qlf.qualification}`,
          value: `${qlf.id}`,
        })),
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [userData, setUserData] = useState();
  const [get, setData] = useState([]);
  const [changeEvent, SetChangeEvent] = useState(null);

  const onSubmit = (data) => {
   
    SetCorporate(true);

  
    console.log(user_token, "token ");

    localStorage.setItem("userDetail", JSON.stringify(data));
    var userId = localStorage.getItem("applicant_id");
    console.log(userId);
    setUserData(data);

    var formdata = new FormData();
    formdata.append("highest_qualification", Qualification);
    formdata.append("year_of_passing", data.year_of_passing);

    for (let b = 0; b < data.degree_certificate.length; b++) {
      formdata.append("degree_certificate", data.degree_certificate[b]);
    }
    formdata.append("ui_section_id", "2");
    formdata.append("applicant_id", userId);


  

    for (var pair of formdata.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    formdata.append("created_by", "0");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: { Authentication: `Token ${user_token}` },

    };

   

    fetch(`${Api_Url}/api/education-details/`, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        result.status === 201 || result.status === 200
          ? Swal.fire({
              icon: "success",
              title: result?.message,
              timer: 1500,
            }) && setEducation(true)
          : Swal.fire({
            icon: "warning",
            title: result?.message,
            timer: 3000,
          });

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
              Fill the Education Details in
              <span className="f_700"> Application</span>
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
                    Save
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
