import { useRef ,useEffect} from "react";

function UseRefCom() {
const inputRef = useRef(null);
useEffect(() =>{
    console.log(inputRef)
    inputRef.current.focus();
})

    return (
     <div>
      <input ref={inputRef} placeholder="Enter a number" />
     </div>
    )
}
export default UseRefCom;