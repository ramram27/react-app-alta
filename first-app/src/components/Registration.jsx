import {useState} from 'react'

function Registration() {
const [form,setForm] = useState({
    name:'',
    rollNum:'',
    emailId:'',
    possword:'',
})
    return (
        <div>
           <form>
            <div>
                <label>Name:</label>
                <input type='text' value={form.name} 
                onChange={handleChange} />
            </div>
            <div>
                <label>Roll Number</label>
                <input type='text' value={form.rollNum}
                 onChange={handleChange} />
            </div>
           </form>
        </div>
    )
}

export default Registration;