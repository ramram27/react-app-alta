
import { useEffect, useState } from "react";
function User() {
    const [data,setData] = useState([])

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => setData(data))
    },[])
     console.log("Data",data)
    return(
      <div>
        <h2>User Data</h2>
        <div>
            {
                data.map((val) => {
                  return  <ul key={val.id}>
                      <li>{val.name}</li>
                      <li>{val.phone}</li>
                    </ul>
                })
            }
        </div>
      </div>
    )
}

export default User;



