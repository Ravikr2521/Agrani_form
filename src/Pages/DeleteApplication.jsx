import React, { useState,useRef } from 'react'
import { Col,Row, Card,CardBody} from "reactstrap"
import { Button } from "@mui/material";
import { Label } from "reactstrap"
import emailjs from '@emailjs/browser';
import { Spinner } from "react-bootstrap";
import unnamed from "./unnamed.png"
import Swal from 'sweetalert2'
const DeleteApplication = () => {
    const form = useRef();
    const[loading,setLoading]=useState(false)
    const sendEmail = (e) => {
        e.preventDefault(); // prevents the page from reloading when you hit “Send”
        setLoading(true)
        console.log("form",form.current)
        emailjs.sendForm('service_hiayu8t', 'template_dfq9x0v', form.current, 'A5luKHIpn88Y2372P')
          .then((result) => {
              // show the user a success message
              console.log(result.text)
              setLoading(false)
              Swal.fire({
                icon: "success",
                title: `Request has been submitted Successfully`,
                showConfirmButton: true,
              });
              form.current.reset();
          }, (error) => {
              // show the user an error
              console.log(error.text)
              setLoading(false)
          });
      };
    return (
        <div>
        <nav class="navbar navbar-expand-lg navbar-light  row d-flex justify-content-around p-lg-3 bg-light ">
        <div className='mt-2'>
        <b className="navbar-brand" style={{fontWeight:"600"}} >
          Agrani Saathi
          <br />
          <p className=' fontSizeMobile' style={{color:"#D98D13",fontWeight:"600"}}>LeadsConnect Services Pvt Ltd.</p>
        </b>
        </div>
        <div  id="navbarText">
          <img src={unnamed} width="120px"  alt="Saathi Logo" style={{objectFit: "contain", height:"60px"}} />
      </div>
      </nav>
        <div className="container d-flex justify-content-center align-items-center  mt-lg-5 mt-5">
            <Card style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }} className='mt-lg-5 mt-2' >
                <CardBody style={{padding:"1.5rem"}} className='mt-2'>
                <h5 className='text-gray'>Request for Account and Data Deletion</h5>
                <form ref={form} onSubmit={sendEmail}>
                    <Row className="text-gray mt-4">
                    <Col lg="1"></Col>
                            <div className="col-lg-3 form-group mb-2 text_box mt-1">
                            <Label className="f_p text_c f_400">
                                Your Name <small className="text-danger">*</small>
                            </Label>
                            <input
                                name="user_name"
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                required
                                style={{ height: '47px', fontSize: '14px', color: '#333' }}
                                />
                            </div>
                        <div className="col-lg-3 form-group mb-2 text_box mt-1" >
                        <Label className="f_p text_c f_400">
                             Mobile Number / LoginId <small className="text-danger">*</small>
                        </Label>
                        <div className='d-flex'>
                        <div style={{width:"25%"}}>
                        <input
                        name="user_zipcode"
                        type="text"
                        className="form-control"
                        maxLength="3"
                        placeholder="+91"
                        defaultValue="+91"
                        disabled
                        style={{ height: '47px',width:"100%", fontSize: '14px', color: '#333',background:"#FAFAFA",boxShadow: "0px 2px 4px 0px rgba(12, 0, 46, 0.04)",border: "1px solid #E7E7E7" }}
                      />
                      </div>
                      <div style={{width:"75%"}}>
                      <input
                            name="user_mobile"
                            type="tel"
                            className="form-control"
                            maxLength="10"
                            placeholder="Enter Number"
                            required
                            style={{ height: '47px', fontSize: '14px', color: '#333',background:"#FAFAFA",boxShadow: "0px 2px 4px 0px rgba(12, 0, 46, 0.04)",border: "1px solid #E7E7E7",borderLeft: "1px solid transparent" }}
                          />
                          </div>
                          </div>
                    </div>
                    <div className="col-lg-3 form-group mb-2 text_box mt-1">
                    <Label className="f_p text_c f_400">
                        Alternate Mobile Number
                    </Label>
                    <div className='d-flex'>
                    <div style={{width:"25%"}}>
                    <input
                    name="userAlt_zipcode"
                    type="text"
                    className="form-control"
                    maxLength="3"
                    placeholder="+91"
                    defaultValue="+91"
                    disabled
                    style={{ height: '47px',width:"100%", fontSize: '14px', color: '#333',background:"#FAFAFA",boxShadow: "0px 2px 4px 0px rgba(12, 0, 46, 0.04)",border: "1px solid #E7E7E7" }}
                  />
                  </div>
                  <div style={{width:"75%"}}>
                  <input
                        name="alternate_mobile"
                        type="tel"
                        className="form-control"
                        maxLength="10"
                        placeholder="Enter Number"
                        style={{ height: '47px', fontSize: '14px', color: '#333',background:"#FAFAFA",boxShadow: "0px 2px 4px 0px rgba(12, 0, 46, 0.04)",border: "1px solid #E7E7E7",borderLeft: "1px solid transparent" }}
                      />
                      </div>
                      </div>
                </div>
                </Row>
                <Row className="text-gray mt-4">
                <Col lg="1"></Col>
                    <div className="col-lg-3 form-group mb-2 text_box mt-1">
                            <Label className="f_p text_c f_400">
                                Your Email Id <small className="text-danger">*</small>
                            </Label>
                            <input
                                name="user_email"
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                                required
                                style={{ height: '47px', fontSize: '14px', color: '#333' }}
                            />
                        </div>
                    </Row>
                    <div className=""> <p className="text-gray text-italic text-bottom  mt-4 mb-0"><strong>Note : </strong>
                    We will delete your data and account forever after
                   verifying your account on your  given mobile number and email ID.
                   <br/> We will call you and send you a mail for account verification.
                    <br/>
                  <strong className='mt-3'> Account deletion TAT : 24 hours</strong>
                   </p></div>
                    <Button
                    variant="contained"
                    color="success"
                    className={`btn btn-success me-2 px-3 custom-btn-fs mt-4 float-right`}
                    type="submit">
                    Submit &nbsp;{loading?<Spinner animation="border" size="sm" />:""}
                 </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
        </div>
    )
}
export default DeleteApplication