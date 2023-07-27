import React, { useState, useEffect } from "react";
//Import Flatepicker
import "flatpickr/dist/themes/confetti.css";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

const Preview = () => {
  const [modalShow, setModalShow] = useState(false);
  var Api_Url =process.env.REACT_APP_API_URL
  const [isEffects, setisEffects] = useState(false);
  const [showFinalimage, setShowFinalImage] = useState({});
  // console.clear()
  let user_token = localStorage.getItem("token")
  const [userDetails, setUserDetails] = useState();
  var data = localStorage.getItem("userDetail");

  var id = localStorage.getItem("applicant_id");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: { Authentication: `Token ${user_token}`,}   

  };

  useEffect(() => {
    try {
      setTimeout(() => {
        fetch(`${Api_Url}/api/user-info/${id}`, requestOptions)
          .then((r) => r.json())
          .then((result) => {
            setUserDetails(result.data);
          });
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }, [data]);

  if (userDetails) {
    var dataimg = userDetails.all_media;
  } else {
    // console.log("User Details", userDetails);
  }

  return (
    <section className="sign_in_area col-lg-12">
      <div className="px-4">
        <div className="login_info pl-0">
          <h2 className="f_p f_600 f_size_24 t_color3 mb_40 mt_20 text-center">
            Preview
            <span className="f_700"> Application</span> Details
          </h2>
          <div className="formdetails">
            <div className="row">
              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Legal Entity Type</label>
                <input
                  name="EntityType"
                  type="text"
                  defaultValue={
                    userDetails ? userDetails?.personal_details?.individuals : ""
                  }
                  disabled
                />
              </div>
              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">First Name</label>
                <input
                  name=""
                  type="text"
                  defaultValue={userDetails ? userDetails?.firstName : ""}
                  disabled
                />
              </div>
              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Last Name</label>
                <input
                  name=""
                  type="text"
                  defaultValue={userDetails ? userDetails.lastName : ""}
                  disabled
                />
              </div>
              <div className=" col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Phone Number</label>
                <input
                  name=""
                  type="text"
                  defaultValue={userDetails ? userDetails?.phoneNumber : ""}
                  disabled
                />
              </div>

              <div className=" col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Alternate Phone No.</label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails
                      ? userDetails.personal_details?.alternatePhoneNumber
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Email ID</label>
                <input
                  name=""
                  type="text"
                  defaultValue={userDetails ? userDetails?.email : ""}
                  disabled
                />
              </div>

              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Date Of Birth</label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails ? userDetails.personal_details?.dateOfBirth : ""
                  }
                  disabled
                />
              </div>

              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Gender</label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails ? userDetails?.personal_details?.gender : ""
                  }
                  disabled
                />
              </div>

              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Marital Status</label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails
                      ? userDetails?.personal_details?.martialStatus
                      : ""
                  }
                  disabled
                />
              </div>
            </div>
            <div className="row highlightpart text-left mb-3">
              <div className="col-lg-12">
                <h4 className="mb-1">Residential Details</h4>
                <hr />
              </div>
              <div className="col-lg-4 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">State</label>
                  <input
                    name=""
                    type="text"
                    defaultValue={
                      userDetails ? userDetails?.personal_details?.state : ""
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-4 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">District</label>
                  <input
                    name=""
                    type="text"
                    defaultValue={
                      userDetails ? userDetails?.personal_details?.district : ""
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-4 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">City</label>
                  <input
                    name=""
                    type="text"
                    defaultValue={
                      userDetails ? userDetails?.personal_details?.city : ""
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Pin Code</label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails ? userDetails?.personal_details?.pincode : ""
                  }
                  disabled
                />
              </div>

              <div className="col-lg-8 form-group text_box">
                <label className="f_p text_c f_400">Address</label>
                <input
                  name=""
                  type="text"
                  defaultValue={userDetails ? userDetails.address : ""}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h4 className="mb-1">Other Details</h4>
                <hr />
              </div>
              <div className=" col-lg-6 form-group text_box">
                <label className="f_p text_c f_400">
                  No. of Family Member{" "}
                </label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails ? userDetails?.personal_details?.noOfMember : ""
                  }
                  disabled
                />
              </div>
              <div className=" col-lg-6 form-group text_box">
                <label className="f_p text_c f_400">Nominee</label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails ? userDetails?.personal_details?.nomineeName : ""
                  }
                  disabled
                />
              </div>

              <div className="col-lg-6 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">
                    Relationship of Nominee
                  </label>
                  <input
                    name=""
                    type="text"
                    defaultValue={
                      userDetails
                        ? userDetails?.personal_details?.nomineeRelationship
                        : ""
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-6 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">Occupation</label>
                  <input
                    name=""
                    type="text"
                    defaultValue={
                      userDetails
                        ? userDetails?.personal_details?.martialStatus
                        : ""
                    }
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row highlightpart text-left mb-3">
              <div className="col-lg-12">
                <h4 className="mb-1">Document Details</h4>
                <hr />
              </div>
              <div className=" col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Aadhar Number</label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails ? userDetails?.personal_details?.aadharNumber : ""
                  }
                  disabled
                />
              </div>
              <div className=" col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">PAN Number</label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails ? userDetails?.personal_details?.panNumber : ""
                  }
                  disabled
                />
              </div>
              <div className="col-lg-4 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">Other Document No</label>
                  <input
                    name=""
                    type="text"
                    defaultValue={
                      userDetails
                        ? userDetails?.personal_details?.otherDocumentNumber
                        : ""
                    }
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h4 className="mb-1">Education Details</h4>
                <hr />
              </div>
              <div className="col-lg-4 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">
                    Highest Qualification
                  </label>
                  <input
                    name=""
                    type="text"
                    defaultValue={
                      userDetails && userDetails.education_details
                        ? userDetails.education_details.highest_qualification
                        : ""
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Year of Passing</label>

                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails && userDetails.education_details
                      ? userDetails.education_details.year_of_passing
                      : ""
                  }
                  disabled
                />
              </div>
            </div>
            <div className="row highlightpart text-left mb-3">
              <div className="col-lg-12">
                <h4 className="mb-1">Banking Details</h4>
                <hr />
              </div>
              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Account Holder Name</label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails && userDetails.bank_details
                      ? userDetails.bank_details.account_holder_name
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Account No</label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails && userDetails.bank_details
                      ? userDetails.bank_details.account_number
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="col-lg-4 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">Account Type</label>
                  <input
                    name=""
                    type="text"
                    defaultValue={
                      userDetails && userDetails.bank_details
                        ? userDetails.bank_details.account_type
                        : ""
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-4 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">IFSC Code</label>
                  <input
                    name=""
                    type="text"
                    defaultValue={
                      userDetails && userDetails.bank_details
                        ? userDetails.bank_details.ifsc_code
                        : ""
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Bank Name </label>

                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails && userDetails.bank_details
                      ? userDetails.bank_details.bank_name
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Branch Name </label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails && userDetails.bank_details
                      ? userDetails.bank_details.bank_branch
                      : ""
                  }
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h4 className="mb-1">Certification Details</h4>
                <hr />
              </div>
              <div className="col-lg-6 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">
                    Insurance Exam Passed
                  </label>

                  <input
                    name=""
                    type="text"
                    defaultValue={
                      userDetails && userDetails.certification_details
                        ? userDetails.certification_details
                            .is_insurance_exam_passed
                          ? "yes"
                          : "No"
                        : ""
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-6 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">Bank Exam Passed</label>

                  <input
                    name=""
                    type="text"
                    defaultValue={
                      userDetails && userDetails.certification_details
                        ? userDetails.certification_details
                            .is_banking_exam_passed
                          ? "Yes"
                          : "No"
                        : ""
                    }
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="row highlightpart text-left mb-3">
              <div className="col-lg-12">
                <h4 className="mb-1">Business Details</h4>
                <hr />
              </div>
              <div className="col-lg-4 form-group text_box">
                <div className="mb-3">
                  <label className="f_p text_c f_400">Source of Income</label>
                  <input
                    name=""
                    type="text"
                    defaultValue={
                      userDetails && userDetails.business_details
                        ? userDetails.business_details.income_source
                        : ""
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">Income</label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails && userDetails.business_details
                      ? userDetails.business_details.income
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="col-lg-4 form-group text_box">
                <label className="f_p text_c f_400">
                  {" "}
                  Experience in Insurance
                </label>

                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails && userDetails.business_details
                      ? userDetails.experiences.experience_in_insurance
                        ? "Yes"
                        : "No"
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="col-lg-6 form-group text_box">
                <label className="f_p text_c f_400">
                  {" "}
                  Experience in Banking
                </label>

                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails && userDetails.business_details
                      ? userDetails.experiences.experience_in_banking
                        ? "Yes"
                        : "No"
                      : ""
                  }
                  disabled
                />
              </div>

              <div className="col-lg-6 form-group text_box">
                <label className="f_p text_c f_400" htmlFor="Yes">
                  Experience in agri input
                </label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails && userDetails.business_details
                      ? userDetails.experiences.experience_in_agri_input
                        ? "Yes"
                        : "No"
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="col-lg-6 form-group text_box">
                <label className="f_p text_c f_400" htmlFor="Yes">
                  Experience in agri output
                </label>
                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails && userDetails.business_details
                      ? userDetails.experiences.experience_in_agri_output
                        ? "Yes"
                        : "No"
                      : ""
                  }
                  disabled
                />
              </div>

              <div className="col-lg-12 form-group text_box">
                <label className="f_p text_c f_400">
                  Have you taken professional training for insurance or banking
                  products
                </label>

                <input
                  name=""
                  type="text"
                  defaultValue={
                    userDetails && userDetails.business_details
                      ? userDetails.business_details
                          .is_sold_insurance_and_bank_product
                        ? "Yes"
                        : "No"
                      : ""
                  }
                  disabled
                />
              </div>
            </div>
            <div className=" form-group mb-4">
              <label className="f_p text_c f_400">Your Documents</label>

              <div className="row">
                {dataimg &&
                  dataimg.map((res,index) => (
                    // console.log(res.file_extension ,"check img")

                   res.file_extension === ".pdf" ?  <div className="col-lg-2 document_div mt-3 " key={index}>
                   <p className="text-center m-0">{res.document_type}</p>
                   <div
                     key={res.id}
                     className="card"
                   >
                     <iframe
                       src={res ? res.filename : ""}
                       className="documents"
                      
                     />

                     {/* {res.file_extension === '.pdf'? <iframe src={res.filename} width="100%" height="100" allow="autoplay"></iframe> : <img  src={res ? res.filename : "" } alt="" ></img>} */}
                   </div>
                 </div>:
                    <div className="col-lg-2 document_div mt-3 " key={index}>
                      <p className="text-center m-0">{res.document_type}</p>
                      <div
                        key={res.id}
                        className="card"
                      >
                        <img
                          src={res ? res.filename : ""}
                          className="documents"
                          onClick={(e) => {
                            setisEffects(true);
                            setShowFinalImage(
                              res.filename
                            );
                          }}
                        />

                      </div>
                    </div>
                  ))}
              </div>
              {isEffects ? (
                        <Lightbox
                          image={showFinalimage}
                          onClose={() => {
                            setisEffects(!isEffects);
                          }}
                        />
                      ) : null}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Preview;
