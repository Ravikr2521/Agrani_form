import React, { useState } from "react";
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { SaathiService } from "../../../service/saathi.service";
import { CryptoState } from "../../FarmerContext";
import { useHistory } from "react-router-dom";


const BankDetails = (urlid) => {

  var Api_Url =process.env.REACT_APP_API_URL
  // console.clear()
  const history =useHistory()
  
  const {setBank,SetCorporate} = CryptoState()
  

  const [AccountType, setAccountType] = useState([]);
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
 
  function handleAccountType(AccountType) {
    setAccountType(AccountType);
  }

  // handle input change event
  const handleInputChange = (value) => {
    setValue(value);
  };

  // handle selection
  const handleChange = (value) => {
    setSelectedValue(value);

  };
  // load options using API call
  const loadOptions = (inputValue) => {
    return SaathiService.getMBankwithifsc(inputValue).then((res) => res.data)
    .catch(error => {
      console.warn("Not data fetch :(")
    });
  };

  // console.log(JSON.stringify(selectedValue) + " adddres " + JSON.stringify(SearchIfsccode))
  const [BankingDtails, editBankingDtails] = useState({})
  const onInputChange = (event) => {
    BankingDtails({
      ...BankingDtails,
      [event.target.name]: event.target.value,
    });
  };
  // AccountType
  const AccountTypeListData = [
    {
      label: "Account Type",
      options: [
        { value: "saving", label: "Savings Account " },
        { value: "current", label: "Current Account" },
        { value: "others", label: "Other Account" },
      ],
    },
  ];


  const [userData, setUserData] = useState()
  //react hook form
  const {
    register, handleSubmit, formState: { errors },} = useForm({ mode: "onChange", })
  

    const onSubmit = (data) => {
      SetCorporate(true)
      localStorage.setItem("userDetail", JSON.stringify(data))
      let user_token = localStorage.getItem("token")
      console.log(user_token,"token")
      setUserData(data)
  
      var userId =localStorage.getItem("applicant_id")
       
      var formdata = new FormData();
      formdata.append("account_holder_name", data.account_holder_name);
      formdata.append("account_number", data.account_number);
      formdata.append("account_type", AccountType);
      formdata.append("ifsc_code", selectedValue.ifsc);
      formdata.append("bank_name", selectedValue.bank_name);
      formdata.append("bank_branch", selectedValue.branch_name);

      for (let a = 0; a < data.bank_document.length; a++) {
        formdata.append("bank_document", data.bank_document[a]);
      };

      formdata.append("applicant_id", userId);
      formdata.append("ui_section_id", "3");
       for (var pair of formdata.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
  
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
        headers: { Authentication: `Token ${user_token}`,}   
      };
  
      fetch(`${Api_Url}/api/bank-details/`, requestOptions)
  
      .then(r => r.json())
      .then(result=> {  

        result.status == 201 || result.status ==200
        ? Swal.fire({
            icon: "success",
            title: result?.message,
            timer: 1500,
          }) && setBank(true)
        : Swal.fire({
          icon: "warning",
          title: result.message,
          timer: 2000,
        })
       
        if('detail' in result.result){
          Swal.fire("Please Fill your Application");
          history.push("/")
          return
        }
      
      },)   
    };

  return (
    <section className="sign_in_area col-lg-12">
      <div className="px-5">
        <div className="login_info pl-0">
          <h2 className="f_p f_600 f_size_24 t_color3 mb_40 mt_20 text-center">
            Fill the Banking Details in
            <span className="f_700"> Application </span>
          </h2>
          <div className="">
          <form action="#" className="login-form sign-in-form">
            <div className="row">
              <div className="col-lg-6 form-group text_box">
                <label className="f_p text_c f_400">Account Holder Name <small style={{color:"#ff0000"}}>*</small></label>
                <input
                  name='account_holder_name'
                  type="text"
                  placeholder="Enter Account Holde Name"
                  required
                  {...register("account_holder_name", {
                    required: true,
                  })}
                />
              {errors.account_holder_name && <p className='m input-error'>Enter Name</p>}
              </div>

              <div className="col-lg-6 form-group text_box">
                <label className="f_p text_c f_400">Account No <small style={{color:"#ff0000"}}>*</small></label>
                <input
                
                   name='account_number'
                  type="text"
                  placeholder="Enter Account No."
                  required
                  {...register("account_number", {
                    required: true,

                  })}
                />
                {errors.account_number && <p className='m input-error'>Enter Account No</p>}
              </div>

              <div className="col-lg-6 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">
                    Select Account Type<small style={{color:"#ff0000"}}>*</small>
                  </label>
                  <Select
                     
                     {...register("account_type")}
                    value={
                      AccountType === undefined
                        ? AccountType
                        : AccountType.label
                    }
                    onChange={(AccountType) => {
                      handleAccountType(AccountType.value);
                   console.log(AccountType) }}
                    options={AccountTypeListData}
                    classNamePrefix="select2-selection"
                  />
                </div>
              </div>
              <div className="col-lg-6 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">Select IFSC Code <small style={{color:"#ff0000"}}>*</small></label>
                  <AsyncSelect
                  {...register("ifsc_code")}
                    cacheOptions
                    defaultOptions
                    name='ifsc_code'
                    value={selectedValue}
                    getOptionLabel={(e) => e.ifsc}
                    getOptionValue={(e) => e.id}
                    loadOptions={(e)=>loadOptions(e)}
                    onInputChange={handleInputChange}
                    onChange={(ifsc)=>{handleChange(ifsc)
                    console.log(ifsc["ifsc"])}}
                  />
                   {errors.ifsc_code && <p className='m input-error'>Enter IFSC code</p>}
                </div>
              </div>

              <div className="col-lg-6 form-group text_box">
                <label className="f_p text_c f_400">Bank Name <small style={{color:"#ff0000"}}>*</small></label>
                <input
                    {...register("bank_name")}
                  type="text"
                  name="bank_name"
                 
                  onChange={(e) => {
                    onInputChange(e);
                  }}
                  value={selectedValue !== null ? selectedValue.bank_name : " "}
             
                  disabled
                />
              </div>
              <div className="col-lg-6 form-group text_box">
                <label className="f_p text_c f_400">Branch Name <small style={{color:"#ff0000"}}>*</small></label>
                <input
                    {...register("bank_branch")}
                  type="text"
                  name="branch_name"
                  onChange={(e) => {
                    onInputChange(e);
                  }}
               
                  value={
                    selectedValue !== null ? selectedValue.branch_name : " "
                  }
             
                  disabled
                />
              </div>
              <div className="col-lg-6 form-group mb-4">
                <label className="f_p text_c f_400">
                  Upload Cancel Cheque
                  <small style={{color:"#ff0000"}}>*</small>
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="OtherDocImg"
                  name="bank_document"
                
                  accept="image/jpeg,image/png,application/pdf"
                  {...register("bank_document", {
                    required: true,

                  })}
                />
               <small>(image or Pdf Format Only)</small>  <small style={{color:"#ff0000"}}>max 5mb</small>
                {errors.bank_document && <p className='m input-error'>please upload Cancelled cheque</p>}
              </div>

             
            </div>

           
                  <div className="col-lg-4 m-auto pb-5 justify-content-center text-center">
                    <button type="submit" className="saved_btn" onClick={handleSubmit(onSubmit)}>
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
export default BankDetails;
