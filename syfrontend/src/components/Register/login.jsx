import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginValidation } from "./loginValidation";
import loginApi from "../../API/login";
import { useDispatch, useSelector } from 'react-redux';
import { renderAction } from "../../Redux/Slices/RenderingSlice";


const initialValues = {
    email: "",
    password: ""
};

const Login = () => {
    const dispatch = useDispatch();
    const userdata = useSelector((state) => state.Rendering.user);
    const loginBtn = useSelector((state)=>state.Rendering.loginBtn)
    // Log-In Validation
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: loginValidation,
        onSubmit: async (values) => {
            await handleLogin(values);
        }
    });

    // API
    const handleLogin = async (values) => {
        const userData = await loginApi(values);
        const err = userData.result.message;
        if (userData.status !== 200) {
            toast.warning(err);
        } else {
            toast.success("Logged In Successfully");
            console.log(userData.result)
            dispatch(renderAction.setUser(userData.result));
            dispatch(renderAction.setLogin(!loginBtn))
            console.log(userdata)
            // Add necessary navigation logic if needed
        }
    };

    return (
        <>
            <div className="login-form">
                <div className="title">Login</div>
                <form onSubmit={handleSubmit}>
                    <div className="input-boxes">
                        <div className="input-box">
                            <FontAwesomeIcon icon={faEnvelope} className="icon" />
                            <input
                                name="email"
                                type="text"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && <small style={{ color: "#ed4337" }}>{errors.email}</small>}
                        <div className="input-box" >
                            <FontAwesomeIcon icon={faLock} className="icon" />
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Enter your password" />
                        </div>
                        {errors.password && <small style={{ color: "#ed4337" }}>{errors.password}</small>}
                        <div className="button input-box">
                            <input type="submit" value="submit" />
                        </div>
                        <div className="text login-text">Don't have an account?
                            <label htmlFor="flip"> Signup now</label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
