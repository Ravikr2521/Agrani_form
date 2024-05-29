import React, { createContext, useContext, useState } from 'react'

const context = createContext()
const FarmerContext = ({ children }) => {
   const [state,setState]=useState(false)
  const [personal,setPersonal]=useState(false)
  const [KycDetail , setKycDetail] =useState(false)
  const [education, setEducation] = useState(false)
  const [bank, setBank] = useState(false)
  const [certificate,setCertificate] =useState(false)
  const [business,setBusiness]=useState(false)
  const [corporate,SetCorporate]=useState(false)
  const [loginModal,setLoginModal]=useState(true)
  const [userDetails, setUserDetails] = useState({});
  const [completedSection, setCompletedSection] = useState("0");
  const [logoutbutton,setLogoutButton]=useState(false)
  
  return (
    <context.Provider value={{state,setState,personal,setPersonal,KycDetail,setKycDetail,education, setEducation, bank, setBank,certificate,setCertificate,business,setBusiness ,corporate,SetCorporate,loginModal,setLoginModal,userDetails, setUserDetails, completedSection, setCompletedSection ,logoutbutton,setLogoutButton}}>
      {children}
    </context.Provider>
  )
};
export default FarmerContext;

export const CryptoState = () => {
  return useContext(context)
}