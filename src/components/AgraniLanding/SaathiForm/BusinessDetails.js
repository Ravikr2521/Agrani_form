import React, { useEffect, useState } from "react";
//Import Flatepicker
import "flatpickr/dist/themes/confetti.css";
import Select from "react-select";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

import { SaathiService } from "../../../service/saathi.service";
import { CryptoState } from "../../FarmerContext";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";


const BusinessDetails = () => {
  
  var Api_Url =process.env.REACT_APP_API_URL
  // console.clear()
  const history=useHistory()
  const {setBusiness,SetCorporate}=CryptoState()
  const [Bulkdata, setBulkdata] = useState({});
  useEffect(() => {
    SaathiService.getBulkData().then((data) => setBulkdata(data))
      .catch(error => {
        console.warn("Not data fetch :(")
      });
  }, []);
  const [IncomeSource, setIncomeSource] = useState([]);
  function handleIncomeSource(IncomeSource) {
    setIncomeSource(IncomeSource);
    
  }
  // Occupation selectbox
  const IncomeListData = [
    {
      label: "Income Source",
      options:
        Bulkdata.data &&
        Bulkdata.data.income_data.map((Income) => ({
          label: `${Income.income_source}`,
          value: `${Income.id}`,
        })),
    },
  ];

  const [SoldInsBankproduct, setSoldInsBankproduct] = useState([]);
  function handelSoldInsBankproduct(SoldInsBankproduct) {
    setSoldInsBankproduct(SoldInsBankproduct);
  }
  const [professionaltraining, setprofessionaltraining] = useState([]);
  function handelprofessionaltraining(professionaltraining) {
    setprofessionaltraining(professionaltraining);
  }
  // ExamStatusData selectbox
  const PlicyData = [
    {
      label: "Status",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ],
    },
  ];

  const [userData, setUserData] = useState()

  const { register, handleSubmit,} = useForm({mode: "onChange",})

  const onSubmit = (data) => {
    SetCorporate(true)

    localStorage.setItem("userDetail", JSON.stringify(data))
    let user_token = localStorage.getItem("token")
    var userId = localStorage.getItem("applicant_id")
    setUserData(data)

    var formdata = new FormData();
    var temp = [data.experience_in_insurance, data.experience_in_banking, data.experience_in_agrani_input, data.experience_in_agrani_output]

    if (temp.indexOf(true) == -1) {
      Swal.fire({
        icon: "warning",
        title: "please select atleast one Experience",
        timer: 3000,
      })
    } else {
      formdata.append("source_of_income", IncomeSource);
      formdata.append("income", data.income);
      formdata.append("experience_in_insurance", data.experience_in_insurance);
      formdata.append("experience_in_banking", data.experience_in_banking);
      formdata.append("experience_in_agrani_input", data.experience_in_agrani_input);
      formdata.append("experience_in_agrani_output", data.experience_in_agrani_output);
      formdata.append("is_professional_training_insurance_and_bank_product", professionaltraining);
      formdata.append("interest_in_selling", data.interest_in_selling);
      formdata.append("applicant_id", userId);
      formdata.append("ui_section_id", "5");

      for (var pair of formdata.entries()) {   
        console.log(pair[0] + ', ' + pair[1]);    
      }   

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
        headers: { Authentication: `Token ${user_token}`}
      };

      fetch(`${Api_Url}/api/business-details/`, requestOptions)
        .then(r => r.json())
        .then(result => {
        result.status === 200 || result.status === 201
          ? Swal.fire({
              icon: "success",
              title: result.message,
              timer: 1500,
            }) && setBusiness(true)
          : 
          Swal.fire({
            icon: "warning",
            title: result.message,
            buttons: false,
            timer: 3000,
          })

          if('detail' in result){
            Swal.fire("Please Fill your Application");
            history.push("/");
            return
          }
        },)

    };
  }
  return (
    <section className="sign_in_area col-lg-12">
      <div className="px-5">
        <div className="login_info pl-0">
          <h2 className="f_p f_600 f_size_24 t_color3 mb_40 mt_20 text-center">
            Fill the Business Details in
            <span className="f_700"> Application </span>
          </h2>
          <div className="">
            
          <form action="#" className="login-form sign-in-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-6 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">
                    Select Primary Source of Income <small style={{color:"#ff0000"}}>*</small>
                  </label>
                  <Select
                  {...register("source_of_income")}
                    value={
                      IncomeListData === undefined
                        ? IncomeSource
                        : IncomeSource.label
                    }
                    onChange={(IncomeSource) => {
                      handleIncomeSource(IncomeSource.label);
                     
                    }}
                    options={IncomeListData}
                    classNamePrefix="select2-selection"
                  />
                </div>
              </div>

              <div className="col-lg-6 form-group text_box">
                <label className="f_p text_c f_400">Anual Income
                <small style={{color:"#ff0000"}}>*</small></label>
                <input
                  name="income"
                  type="text"
                  placeholder="Enter income"
                  required
                  {...register("income")}
                />
              </div>
              


              <div className="col-lg-12 form-group mb-4">
                  <label className="f_p text_c f_400">Experience in : </label>

                  <div className="col-lg-6 form-check text_box ">
                    <div className="form-check ">
                      <input
                        {...register("experience_in_insurance")}
                        className="form-check-input"
                        type="checkbox"
                        name="experience_in_insurance"
                        id="ExperienceinInsurance"
                      />
                      <label className="form-check-label" htmlFor="Yes">
                        Insurance
                      </label>
                    </div>


                    <div className="form-check">
                      <input
                        {...register("experience_in_banking")}
                        className="form-check-input"
                        type="checkbox"
                        name='experience_in_banking'
                      />
                      <label className="form-check-label" htmlFor="Yes">
                        Banking
                      </label>
                    </div>

                  
                    <div className="form-check">
                      <input
                        {...register("experience_in_agrani_input")}
                        className="form-check-input"
                        type="checkbox"
                        name="experience_in_agrani_input"
                      />

                      <label className="form-check-label" htmlFor="Yes">
                        Agri input
                      </label>
                    </div>


                    <div className="form-check">
                      <input
                        {...register("experience_in_agrani_output")}
                        className="form-check-input"
                        type="checkbox"
                        name="experience_in_agrani_output"

                      />
                      <label className="form-check-label" htmlFor="Yes">
                        Agri output
                      </label>
                    </div>
                  </div>
                </div>


              <div className="col-lg-12 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">
                    Have you taken professional training for insurance or
                    banking products <small style={{color:"#ff0000"}}>*</small>
                  </label>
                  <Select
               
                  {...register("is_professional_training_insurance_and_bank_product")}
                    value={
                      professionaltraining === undefined
                        ? professionaltraining
                        : professionaltraining.label
                    }
                    onChange={(professionaltraining) => {
                      handelprofessionaltraining(professionaltraining.value);
                    }}
                    options={PlicyData}
                    classNamePrefix="select2-selection"
                  />
                </div>
              </div>

             
                <div className="col-lg-12 form-check text_box">
                  <label className="f_p text_c f_400">
                    You are interested in selling <small style={{color:"#ff0000"}}>*</small>
                  </label>
                  <div className="col-lg-12 p-0">
                    <div className="form-check form-check-inline">
                      <input
                        {...register("interest_in_selling")}
                        name="interestedinselling"
                        type="radio"
                        value="InsuranceProducts"
                        defaultChecked
                        readOnly
                      />
                      <label
                        htmlFor="InsuranceProducts"
                        className="f_p text_c f_400 ml-3 mb-0"
                      >
                        Insurance Products
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        {...register("interest_in_selling")}

                        name="interestedinselling"
                        type="radio"
                        value="BankingProducts"
                        readOnly
                      />
                      <label
                        htmlFor="BankingProducts"
                        className="f_p text_c f_400 ml-3 mb-0"
                      >
                        Banking Products
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        {...register("interest_in_selling")}
                        name="interestedinselling"
                        type="radio"
                        value="Both"
                        readOnly
                      />
                      <label
                        htmlFor="Both"
                        value="both"
                        className="f_p text_c f_400 ml-3 mb-0"
                      >
                        Both
                      </label>
                    </div>
                  </div>
                </div>

               
                  <div className="col-lg-4 m-auto pb-5 justify-content-center text-center">
                    <button type="submit" className="saved_btn" >
                      Save
                    </button>
                  </div>

               
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BusinessDetails;
