import React from 'react'
import { useHistory } from 'react-router-dom'
import Preview from './Preview'
import {MdOutlineKeyboardBackspace} from "react-icons/md"



const UserPreview = () => {
  return (
    
    <section className="software_service_area sec_pad mt-4">
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-md-10 col-11 bg-white p-0 Form_BG m-auto">
                    <div className="tab-content software_service_tab_content mt-5 mb-0">
                       
                        <div
                            className="tab-pane fade show active"
                            id="monitor"
                            role="tabpanel"
                            aria-labelledby="Preview"
                        > 
                        
                        
                        <a className='mt-3 color' href="./final-preview"><MdOutlineKeyboardBackspace/> back</a>
                            <div className="row">
                               
                                <Preview />
                            </div>
                            
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </section>


  )
}

export default UserPreview
