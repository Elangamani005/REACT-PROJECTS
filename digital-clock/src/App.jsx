import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [currentTime, setCurrenTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrenTime(new Date())
    }, 1000)

    return () => clearInterval(timer);
    // setCurrenTime(new Date()) 
    // console.log(timer)
    
  }, [])

  const FormatHour = (hour) => {
    return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  };

  const formattimewithzero = (num) => {
    return num < 10 ? `0${num}` : num;
  }
  
  const formatDate = (date) => {
    const options = { weekday: "long", year: "numeric", month:"long", day:"numeric"}
    return date.toLocaleDateString(undefined, options);
  }
  
  return (
    <>
      <div className="digital-Clock">
        <h2>Digital Clock</h2>
        <div className='time'>
          {formattimewithzero(FormatHour(currentTime.getHours()))} :
          {formattimewithzero(currentTime.getMinutes())} :
          {formattimewithzero(currentTime.getSeconds())}
          {currentTime.getHours() >= 12 ? " PM" : " AM"}
        </div>
        <div className="date">{formatDate(currentTime)}</div>
      </div>
    </>
  )
}

export default App
