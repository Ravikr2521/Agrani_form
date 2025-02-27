import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { FaFileUpload } from "react-icons/fa";

import swal from "sweetalert";
import Swal from "sweetalert2";

const UploadSignedDoc = () => {
  const applicaintId = localStorage.getItem("user-info-id");
  const [selectedFile, setSelectedFile] = useState("");
  const [loader, setLoader] = useState(false);

  const handleUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadAgreement = (e) => {
    e.preventDefault();
    let user_token = localStorage.getItem("token");
    // console.log(selectedFile, "8888855555");
    setLoader(true);

    if (selectedFile === "") {
      Swal.fire({
        icon: "warning",
        title: "Please Upload Document first",
        timer: 1500,
      });

      setLoader(false);
    } else {
      const formData = new FormData();
      formData.append("e_form", selectedFile);
      formData.append("created_by", "0");
      var requestOptions = {
        method: "PATCH",
        body: formData,
        redirect: "follow",
        headers: { Authentication: `Token ${user_token}` },
      };

      fetch(
        `${process.env.REACT_APP_API_URL}/api/empanelment-form/upload/${applicaintId}`,
        requestOptions
      )
        .then((result) => {
          console.log(result);
          if (result.status === 200 || result.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Form Uploaded Successfully",
              timer: 1500,
            });
            setLoader(false);
          } else {
            Swal.fire({
              icon: "warning",
              title: "Something went wrong",
              buttons: false,
              timer: 3000,
            });
            setLoader(false);
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "warning",
            title: "Something went wrong",
            timer: 1500,
          });
          setLoader(false);
        });
    }
  };
  return (
    <div className="d-flex flex-lg-row flex-column  justify-content-center align-items-center">
      <div className="col-lg-6 col-12 form-group mt-1">
        <label className="f_p text_c f_400 m-0 mb-1">
          Upload Signed Document <small style={{ color: "#ff0000" }}>*</small>
          {/* <small>(Image Or Pdf Format Only*)</small> */}
        </label>
        <input
          type="file"
          className="form-control"
          id="AddharImg"
          multiple
          name="aadhar_card"
          accept=".pdf"
          onChange={handleUpload}
        />
        <small>(image or Pdf Format Only)</small>{" "}
        <small style={{ color: "#ff0000" }}>max 5mb</small>
        {/* {errors.aadhar_card && (
                    <p className="m input-error">
                      Choose front and back side of Aadhar
                    </p>
                  )} */}
      </div>
      <div className="col-lg-2 col-4 mb-lg-0 mb-2">
        <button
          type="submit"
          className="btn btn-success d-flex justify-content-center align-items-center"
          onClick={(e) => handleUploadAgreement(e)}
        >
          Upload <FaFileUpload className="mx-1" /> &nbsp;{" "}
          {loader ? <Spinner size="sm"></Spinner> : ""}
        </button>
      </div>
    </div>
  );
};

export default UploadSignedDoc;
