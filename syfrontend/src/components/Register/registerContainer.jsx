import React from "react";
import Signup from "./signup";
import Login from "./login"
import "./registerContainer.css";
import img from "./palmyra-arch_dezeen_936.jpg"
const Register = () => {
   
    return(
        <div className="Container">
            <input type="checkbox" id="flip" />
            <div className="cover">
                <div className="front" style={{opacity:'0.9'}}>
                    <img src={img} alt=""/>
                </div>
                <div className="back">
                </div>
            </div>
            <div className="form">
                <div className="form-content">
                    <Login/>
                    <Signup/>
                </div>
            </div>
        </div>
    )
}
export default Register;