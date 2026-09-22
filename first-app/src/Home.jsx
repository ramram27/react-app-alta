import {useEffect} from 'react'

function Home(props) {

useEffect(() =>{

},[])

    return (
        <div style={{"border":"2px solid white","marginTop":"10px"}}>
            <h2>{props.name}</h2>
            <h2>{props.roll}</h2>
        </div>
    )
}

export default Home;