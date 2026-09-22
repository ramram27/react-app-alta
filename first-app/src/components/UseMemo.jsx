import { useState,useMemo} from "react";
function UseMemo() {
const [count,setCount] = useState(0);
const [inputval,setval] = useState("")

const expensiveFun = (num) =>{
    for(let i=0;i<100000000;i++){}
    return num*num;
}
const val = useMemo(()=> expensiveFun(inputval),[inputval])
    return(
        <div>
             <h2>{count}</h2> 
             <button onClick={() => setCount(count+1)}
                >Counter + </button>
             <input type="number" 
             onChange={(e)=> setval(e.target.value)} />
             <h2>Square: {val}</h2>
        </div>
    )
}
export default UseMemo;