import React, { useContext, useEffect, useState, useRef } from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingButton from './SettingButton';
import SettingsContext from './SettingsContext';


let red= '#9e129e';

const Timer = () => {
  const [isPaused,setIsPaused] = useState(true);
  const settingsInfo = useContext(SettingsContext);
  const [secondsLeft,setSecondsLeft] = useState(0);
  const [mode,setMode] = useState('work')

  const modeRef = useRef(mode)
  const isPausedRef = useRef(isPaused)
  const secondsLeftRef = useRef(secondsLeft)

  const switchMode =()=>{
    const nextMode = modeRef.current === "work" ? "break" : "work";
    setMode(nextMode);
    const nextSeconds = nextMode === "work" ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
    setSecondsLeft(nextSeconds);

    modeRef.current = nextMode;
    secondsLeftRef.current = nextSeconds;
  }

  const tick =() =>{
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  const initTimer = ()=>{
    secondsLeftRef.current = settingsInfo.workMinutes * 60
    setSecondsLeft(secondsLeftRef.current)
  }

  useEffect (()=>{
    initTimer();

    const interval = setInterval(()=>{
      if(isPausedRef.current){
        return;
      }
      if(secondsLeftRef.current === 0){
        switchMode();
      }

      tick();
    },1000)

    return ()=> clearInterval(interval);
  },[settingsInfo]);

    const Total = mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;  
    const percentage = Math.round(secondsLeft / Total * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if(seconds < 10) seconds = '0' +seconds;

  return (
    <div>
  <CircularProgressbar 
    value={percentage} 
    text={minutes + ':' + seconds} 
    styles={buildStyles({
      rotation: 0.25,
      strokeLinecap: 'round',
      textSize: '16px',
      pathColor: mode === 'work' ? red : "#0aadb9",
      textColor: '#fff',
      trailColor: '#d6d6d6',
      backgroundColor: '#3e98c7',
        })}/> 
        <div style={{marginTop: "20px", textAlign: "center"}}>
          { isPaused 
          ? <PlayButton onClick={()=> {setIsPaused(false); isPausedRef.current = false}} /> 
          : <PauseButton onClick={()=> {setIsPaused(true); isPausedRef.current = true}}/> }            
        </div>  
        <div style={{marginTop: "20px", textAlign: "center"}}>
           <SettingButton onClick={()=> settingsInfo.setShowSettings(true)}/>  
        </div>     
    </div>
  )
}

export default Timer