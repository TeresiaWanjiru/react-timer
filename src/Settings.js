import React, { useContext, useState } from 'react'
import ReactSlider from "react-slider";
import SettingsContext from './SettingsContext';
import BackButton from './BackButton';


const Settings = () => {
const settingsInfo = useContext(SettingsContext)

  return (
    <div style={{textAlign: "left"}}>
        <label>Working Time: {settingsInfo.workMinutes} minutes</label>
        <ReactSlider className={"slider"}
         trackClassName={"track"}
         thumbClassName={"thumb"}
         value={settingsInfo.workMinutes}
         onChange={newValue =>  settingsInfo.setWorkMinutes(newValue)}
         min={1}
         max={120} 
         />
        <label>Break Time: {settingsInfo.breakMinutes} minutes</label>
        <ReactSlider className={"slider break"}
         trackClassName={"track"}
         thumbClassName={"thumb"}
         value={settingsInfo.breakMinutes}
         onChange={newValue =>  settingsInfo.setBreakMinutes(newValue)}
         min={1}
         max={120} 
         />
         <div style={{textAlign:"center",marginTop:"20px",fontSize:"8px"}}>
          <BackButton onClick={()=>settingsInfo.setShowSettings(false)}/>
         </div>
    </div>
  )
}

export default Settings