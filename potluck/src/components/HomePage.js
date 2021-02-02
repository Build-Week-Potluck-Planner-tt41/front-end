import React from 'react'
import {Link} from 'react-router-dom'
const  HomePage = () => {

    const handleSubmit= () =>{
        window.location.href = "/login"
    }
return(
    <header>
        <h1>Potluck Planner</h1>
        <p>Welcome to the Potluck Finder Application!</p>
        <button onClick={handleSubmit}>Log in!</button>
        <p>Dont have an account with us yet? <Link to ="/sign-up">Sign Up Here</Link> </p>
    </header>
    
)
}


export default HomePage;