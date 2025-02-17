import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { SaathiService } from "../../../service/saathi.service";
import { CryptoState } from "../../FarmerContext";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const BankDetails = () => {
  var Api_Url = process.env.REACT_APP_API_URL;
  const history = useHistory();

  const { setBank, SetCorporate, setCompletedSection, userDetails } =
    CryptoState();
  const [loading, setLoading] = useState(false);

  const [AccountType, setAccountType] = useState("");
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
    return SaathiService.getMBankwithifsc(inputValue)
      .then((res) => res?.data?.results)
      .catch((error) => {
        console.warn("Not data fetch :(");
      });
  };
  useEffect(() => {
    loadOptions();
  }, []);

  const [BankingDtails, editBankingDtails] = useState({});
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

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    setLoading(true);
    SetCorporate(true);
    localStorage.setItem("userDetail", JSON.stringify(data));
    let user_token = localStorage.getItem("token");

    var userId = localStorage.getItem("user-info-id");

    var formdata = new FormData();
    formdata.append(
      "account_holder_name",
      data.account_holder_name || userDetails?.bank_details?.account_holder_name
    );
    formdata.append(
      "account_number",
      data?.account_number || userDetails?.bank_details?.account_number
    );
    formdata.append(
      "account_type",
      AccountType || userDetails?.bank_details?.account_type
    );
    formdata.append(
      "ifsc_code",
      selectedValue.IFSC || userDetails?.bank_details?.ifsc_code
    );
    formdata.append(
      "bank_name",
      selectedValue.bank_name || userDetails?.bank_details?.bank_name
    );
    formdata.append(
      "bank_branch",
      selectedValue.branch_name || userDetails?.bank_details?.bank_branch
    );

    for (let a = 0; a < data.bank_document.length; a++) {
      formdata.append("bank_document", data.bank_document[a]);
    }

    formdata.append("applicant_id", userId);
    formdata.append("ui_section_id", "4");
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

    fetch(`${Api_Url}/api/bank-details/`, requestOptions)
      .then((r) => r.json())
      .then((result) => {
        if (result?.status === 200 || result.status === 201) {
          Swal.fire({
            icon: "success",
            title: result?.message,
            timer: 1500,
          });
          setBank(true);
          setCompletedSection("4");
          setLoading(false);
        } else {
          Swal.fire({
            icon: "warning",
            title: result.message,
            timer: 2000,
          });
          setLoading(false);
        }

        if ("detail" in result.result) {
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
            Fill the <span className="f_700 orange">Banking Details</span> in
            Application
          </h2>
          <div className="">
            <form action="#" className="login-form sign-in-form">
              <div className="row">
                <div className="col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400">
                    Account Holder Name{" "}
                    <small style={{ color: "#ff0000" }}>*</small>
                  </label>
                  <input
                    name="account_holder_name"
                    type="text"
                    placeholder="Enter Account Holder Name"
                    required={
                      !userDetails?.bank_details?.account_holder_name
                        ? true
                        : false
                    }
                    {...register("account_holder_name", {})}
                    defaultValue={
                      userDetails?.bank_details?.account_holder_name
                    }
                  />
                  {errors.account_holder_name && (
                    <p className="m input-error">Enter Name</p>
                  )}
                </div>

                <div className="col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400">
                    Account No <small style={{ color: "#ff0000" }}>*</small>
                  </label>
                  <input
                    name="account_number"
                    type="text"
                    placeholder="Enter Account No."
                    required={
                      !userDetails?.bank_details?.account_number ? true : false
                    }
                    {...register("account_number", {})}
                    defaultValue={userDetails?.bank_details?.account_number}
                  />
                  {errors.account_number && (
                    <p className="m input-error">Enter Account No</p>
                  )}
                </div>

                <div className="col-lg-6 form-group text_box">
                  <div className="mb-3">
                    <label className="f_p text_c f_400">
                      Select Account Type
                      <small style={{ color: "#ff0000" }}>*</small>
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
                      }}
                      options={AccountTypeListData}
                      classNamePrefix="select2-selection"
                      placeholder={
                        userDetails?.bank_details?.account_type ||
                        "Select Account Type"
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-6 form-group text_box">
                  <div className="mb-3">
                    <label className="f_p text_c f_400">
                      Select IFSC Code{" "}
                      <small style={{ color: "#ff0000" }}>*</small>
                    </label>
                    <AsyncSelect
                      {...register("ifsc_code")}
                      cacheOptions
                      defaultOptions
                      name="ifsc_code"
                      value={selectedValue}
                      getOptionLabel={(e) => e.IFSC}
                      getOptionValue={(e) => e.id}
                      loadOptions={(e) => loadOptions(e)}
                      onInputChange={handleInputChange}
                      onChange={(ifsc) => {
                        handleChange(ifsc);
                      }}
                      placeholder={
                        userDetails?.bank_details?.ifsc_code ||
                        "Select IFSC Code"
                      }
                    />
                    {errors.ifsc_code && (
                      <p className="m input-error">Enter IFSC code</p>
                    )}
                  </div>
                </div>

                <div className="col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400">
                    Bank Name <small style={{ color: "#ff0000" }}>*</small>
                  </label>
                  <input
                    {...register("bank_name")}
                    type="text"
                    name="bank_name"
                    onChange={(e) => {
                      onInputChange(e);
                    }}
                    disabled
                    value={
                      selectedValue === undefined
                        ? selectedValue
                        : selectedValue.bank_name ||
                          userDetails?.bank_details?.bank_name
                    }
                  />
                </div>
                <div className="col-lg-6 form-group text_box">
                  <label className="f_p text_c f_400">
                    Branch Name <small style={{ color: "#ff0000" }}>*</small>
                  </label>
                  <input
                    {...register("bank_branch")}
                    type="text"
                    name="branch_name"
                    onChange={(e) => {
                      onInputChange(e);
                    }}
                    // defaultValue={ userDetails?.bank_details?.bank_branch }
                    disabled
                    value={
                      selectedValue === undefined
                        ? selectedValue
                        : selectedValue.branch_name ||
                          userDetails?.bank_details?.bank_branch
                    }
                  />
                </div>
                <div className="col-lg-6 form-group mb-4">
                  <label className="f_p text_c f_400">
                    Upload Cancel Cheque
                    <small style={{ color: "#ff0000" }}>*</small>
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
                  <small>(image or Pdf Format Only)</small>{" "}
                  <small style={{ color: "#ff0000" }}>max 5mb</small>
                  {errors.bank_document && (
                    <p className="m input-error">
                      please upload Cancelled cheque
                    </p>
                  )}
                </div>
              </div>

              <div className="col-lg-4 m-auto pb-5 justify-content-center text-center">
                <button
                  type="submit"
                  className="saved_btn"
                  onClick={handleSubmit(onSubmit)}
                >
                  {userDetails?.bank_details === null ? "Save" : "Update"}
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
export default BankDetails;
