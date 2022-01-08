import { React, useState } from "react";
import axios from "axios";


const SignUp = () => {
    
    const initState = {
        username: "",
        email: "",
        password: ""
    }

    const [userData, setUserData] = useState(initState);

    const handleInput = (e) => {
        let { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }
    
    const handleRegister = (e) => {
        e.preventDefault()
        console.log(userData);
        axios.post("http://localhost:2222/users/signin", userData)
        .then((res) => {
            console.log(res.data)
        })
    }
    //6tGgAGQFx7y8D3xMXEicjM01
    return (
        <>
            <div className="signin-container">
                <div className="signin-box">
                    <div className="siginin-title">Sign Up</div>
                    <form onSubmit = {handleRegister}>
                    <input type="text" name="username" onChange={handleInput} placeholder="Enter Username" />
                    <input type="text" name="email" onChange={handleInput} placeholder="Enter Email" />
                    <input type="password" name="password" onChange={handleInput} placeholder="Enter Password" />
                    <input type="submit" />
                    </form>
                </div>
            </div>
        </>
    );
}

export { SignUp };