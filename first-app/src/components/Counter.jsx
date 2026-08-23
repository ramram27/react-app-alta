import {useState} from "react";
function Counter() {
const [counter,setCounter] = useState(0);

const CounterFun = () =>{
    setCounter(counter + 1)
}
    return (
        <div>
            <h2>{counter}</h2>
          <button onClick={()=> CounterFun()}>Counter + </button>
        </div>
    )
}
export default Counter