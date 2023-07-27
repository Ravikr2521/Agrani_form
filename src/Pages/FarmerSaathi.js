import React, { useState, useEffect } from "react";
import FooterTwo from "../components/AgraniLanding/FooterTwo";
import Swal from "sweetalert2";
import FooterData from "../components/Footer/FooterData";
import CloudServiceTab from "../components/AgraniLanding/SaathiForm/CloudServiceTab";
import OnepageMenu from "../components/AgraniLanding/OnepageMenu";
import { useForm } from 'react-hook-form';
import { Link, useHistory } from "react-router-dom";

import { CgLogIn } from "react-icons/cg"
import Existinguser from "../components/AgraniLanding/SaathiForm/PreviewPage/Existinguser";


const FarmerSaathi = () => {
  // console.clear()
  var applicantID = localStorage.getItem("applicant_id")
  var urlid = localStorage.getItem("urlid")



  const [Verify, setVerify] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();

  const [otp, setOtp] = useState("")

  const history = useHistory()

  const [btnState, setbtnState] = useState(false)
  const [btnState1, setbtnState1] = useState(true)

  const [usertype, setusertype] = useState(false);
 

  const [edit, setEdit] = useState(false);
  const [EntityType, setEntityType] = useState("Individual");
  const [radioValue, setRadioValue] = useState(1);
  var usertypepart = usertype;


  const { register, handleSubmit, formState: { errors }, } = useForm({ mode: "onChange", })

  const editFunction = (e) => {
    setEdit(true);
    setbtnState(true)
    setbtnState1(false)

  };

  var phone = localStorage.getItem("phoneNumber")
  const verifyNumber = (e) => {
    setPhoneNumber(e.target.value);

  };
  const verifyFunction = (e) => {
    setVerify(true);

  };
  const NewFunction = (e) => {
    setEdit(false);
    setbtnState1(true)
    setbtnState(false)
  };

  const onChange = (ev) => {
    console.log(ev.target.value + EntityType);
    setRadioValue(ev.target.value);

  };
  function handleLogout() {
    localStorage.removeItem(urlid)
    localStorage.clear();
    history.push("/")
    window.location.reload()
  }

  function sendOtp(e) {
    const data = {
      phoneNumber: phoneNumber
    }
    var formdata = new FormData();
    formdata.append("email_or_phone", phone);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://saathi-api.agrani.io/api/existing-user-form/?email_or_phone=${phoneNumber}`, requestOptions)
      .then(r => r.json())
      .then(result => {
        result.status == 200 ? Swal.fire({
          position: "bottom-end",
          icon: 'success',
          title: 'Otp sent',
          showConfirmButton: false,
          timer: 1000
        }) && verifyFunction(true) : Swal.fire({
          title: result.message
        })
      })
  }
  // useEffect(() => {
  //     sendOtp()
  // }, []);



  const onSubmit = () => {

    var formdata = new FormData();
    formdata.append("email_or_phone", phoneNumber);
    formdata.append("otp_code", otp);

    var requestOptions = {
      method: 'POST',
      body: formdata,
    };


    fetch(`https://saathi-api.agrani.io/api/existing-user-form/`, requestOptions)
      .then(r => r.json())
      .then(result => {
        console.log(result, result.token)
        // seturlid(result.ui_section_id);
        if (result.status == 200) {
          localStorage.setItem("applicant_id", (result.applicant_id));
          localStorage.setItem("token", (result.token));
          Swal.fire({ icon: 'success', title: 'Logged In', showConfirmButton: false, timer: 1000 });
          setusertype(true);
        }

        if (result.status != 200) {
          Swal.fire(result.message)
        }

        if (result.ui_section_id == 5) {
          history.push('/final-preview')
        }


      },)
  };
  return (
    <div className="body_wrapper bg-light-org">
      <OnepageMenu
        slogo="sticky_logo"
        mClass="menu_four"
        nClass="w_menu"
        hbtnClass="btn_get_radious menu_custfive"
      />
      <div className="col-lg-12 mt_130">
        <div className="sign_info_content text-center mb_50">
          <h3 className="f_p f_600 f_size_40 t_color mb_20">
            Welcome to Agrani Saathi

          </h3>


          {urlid === undefined || urlid === "undefined" || urlid === null || urlid === 0 ? (
            <>
              <Link to="/Existinguser"
                type="submit"
                className={btnState === true ? "btn_three mr-4 mt-3" : "btn_three sign_btn_transparent mr-4 mt-3"}
                Name={applicantID ? 'tab active' : 'tab'}
              >
                Existing User
              </Link>


              <button
                type="submit"

                className={btnState1 === true ? "btn_three mr-4 mt-3 " : "btn_three sign_btn_transparent mr-4 mt-3 active"}

                onClick={(e) => NewFunction(true)}
              >
                New User
              </button></>
          ) :


            (
              <button
                type="submit"
                className={btnState1 === true ? "btn_three mr-4 mt-3" : "btn_three sign_btn_transparent mr-4 mt-3"}
                onClick={(e) => handleLogout()}
              >
                Logout
              </button>
            )}

        </div>
      </div>

      <div className="bg-shd col-lg-11 m-auto">
        <section className="software_service_area sec_pad ">
          <div className="container">
            {edit === false || usertypepart === true ? (

              <CloudServiceTab urlid={urlid} />
            ) : (
              // <section className="sign_in_area">
              //   <div className="container">
              //     <div className="sign_info">
              //       <div className="row">
              //         <div className="col-lg-7 m-auto border bg-white p-5">
              //           <div className="login_info pl-0 ">
              //             <h2 className="f_p f_600 f_size_24 t_color3 mb_40 mt_20 text-center">
              //               Login now to view your
              //               <span className="f_700"> Application </span>
              //             </h2>
              //             <form action="#" className="login-form sign-in-form">
              //               <div className="row">
              //               <div className="col-lg-9">
              //               <label className="f_p text_c f_400">
              //                 Mobile No.
              //               </label>

              //                 <div className="form-group text_box  ">

              //                   <input
              //                     className=" form-control1"
              //                     type="text"
              //                     placeholder="Enter Mobile No."
              //                     required
              //                     {...register("phoneNumber", {
              //                       onChange: (e) => { verifyNumber(e) },
              //                       required: true,
              //                       minLength: 10,
              //                       maxLength: 10,
              //                     })}
              //                   />
              //                   {errors.phoneNumber && <p className='m input-error'>Please enter Valid No</p>}
              //                   </div>

              //               </div>
              //               <div className="col-lg-3 button_m">

              //               {Verify === true ? (
              //                   <button
              //                     id="sendotp"
              //                     type="button"
              //                     onClick={(e) => sendOtp()}
              //                     name="otp_code"
              //                     className="otp_btn mt-1 py-3 w-100"
              //                     disabled={!phoneNumber}
              //                   >
              //                     Resend Otp
              //                   </button>) :
              //                   <button
              //                     id="sendotp"
              //                     type="button"
              //                     onClick={(e) => sendOtp()}
              //                     name="otp_code"
              //                     className="otp_btn mt-1  py-3 w-100"
              //                     disabled={!phoneNumber}
              //                   >
              //                     Send Otp
              //                   </button>}
              //               </div>


              //               {Verify == true ? (

              //                 <div className=" col-lg-12 text-center justify-content-center">
              //                   <div className="form-group text_box ">
              //                     <input type="number " 
              //                     className="form-control otp_field"
              //                       id="otp"
              //                       placeholder="Enter Otp"
              //                       name="otp_code"

              //                       {...register("otp_code", {
              //                         onChange: (e) => { setOtp(e.target.value) },
              //                         required: true,
              //                         maxLength: 4,
              //                         minLength: 4,
              //                       })}
              //                     />
              //                     {errors.otp_code && <p className='m input-error'>Please enter valid otp</p>}

              //                   </div>
              //                   <div className="col-lg-12 text-center ">
              //                     <button
              //                       type="submit"
              //                       className="btn btn-success mt-1 py-3 w-25"
              //                       onClick={handleSubmit(onSubmit)}
              //                     >
              //                       Login <CgLogIn />
              //                     </button>
              //                   </div>
              //                 </div>
              //                 ) : null}
              //                 </div>
              //             </form>

              //           </div>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              // </section>

              <Existinguser urlid={urlid}/>
            )}
          </div>
        </section>
      </div >

      <FooterTwo FooterData={FooterData} />
    </div >
  );
};
export default FarmerSaathi;
