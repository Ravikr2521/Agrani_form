import React from 'react'
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

const FinalPreview = () => {
   
  
    var id=localStorage.getItem("applicant_id")
    window.history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        window.history.pushState(null, null, document.URL);
    });

    return (
    <>
            <div className='col-lg-12 col-md-12 text-center'>
               <h3 className='submitheading '>Your form is Submitted Successfully <BsFillPatchCheckFill /></h3>
               <h5 className=' margin'>Your Applicant ID is :- {id} </h5> 
               <p className='paragraph margin '> Download your Form, Sign it and send it to the given address :- </p> 

               
                <div className='d-flex justify-content-center mt-5 row'>
                    <div className='col-lg-5 col-md-5 p-5 address_box'>
                    <h3 >Address Details</h3>
                    <label className='bold'>Office Address :-</label> <span className='paragraph'> 1601, 16th Floor, World Trade Tower, Plot No. C-001, Sector 16, Noida, UP - 201301   </span>

                    </div>
                    <div className='col-lg-5 col-md-5 p-5 address_box ml-3'>
                        <h3 className=''>For Support</h3>
                        <label className='bold'>contact :</label><span className='paragraph'> +91 6390640749 </span><br></br>
                        <label className='bold'>Email :</label><span className='paragraph'> info@leadsconnect.in </span>

                    </div>
                </div>
                </div>

            </>
            )}

            export default FinalPreview
