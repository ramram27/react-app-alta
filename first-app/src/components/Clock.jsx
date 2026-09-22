import { useState,useEffect } from "react";

function Clock() {
    const [timerval,setTimerval] = useState(new Date());
    useEffect(()=>{
        const interval = setInterval(()=>{
           setTimerval(new Date())
        },1000)
        return () => clearInterval(interval)
    },[])

    return(
        <div>
            <h2>Digital Clock</h2>
            <h2>{timerval.toLocaleTimeString("en-US",{
                hour:"2-digit",
                minute:"2-digit",
                second:"2-digit",
                hour12:"true"
            })}</h2>
            <h2>{timerval.toLocaleDateString()}</h2>
        </div>
    )
}
export default Clock;


