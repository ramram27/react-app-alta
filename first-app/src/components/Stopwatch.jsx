import { useRef,useState } from "react";

function Stopwatch() {
    const [count,setCount] = useState(0);
const intervalRef = useRef(0)
const handleStart = () =>{
  intervalRef.current = setInterval(() =>{
    setCount((rev) => rev+1)
  },1000)

}

// box1 => add amount input number submit button

// box2 => catg type product name input ,  input enter 
// amout, add button


const handleStop = () =>{
clearInterval(intervalRef.current)
}
    return (
        <div>
          <h2>Stop watch</h2>
          <h2>Count: {count}</h2>
          <button onClick={handleStart}>start</button>
          <button onClick={handleStop}>Stop</button>
        </div>
    )
}
export default Stopwatch;