import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { signupValidation } from "./signupValidation";
import { baseUrlApi } from "../../API/config";
import "./registerContainer.css";

const initialvalues = {
    username: "",
    email: "",
    password: ""
};

const Signup = () => {
    const { values, handleBlur, handleChange, errors, handleSubmit } = useFormik({
        initialValues: initialvalues,
        validationSchema: signupValidation,
        onSubmit: async (values) => {
            await Register(values);
        }
    });

    const [error, setError] = useState();

    async function Register(values) {
        try {
            let res = await fetch(baseUrlApi + "/api/auth/register", {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const result = await res.json();
            const err = result.message;
            if (res.status !== 201) {
                setError(err);
                toast.warning(err);
            } else {
                setError(err);
                toast.success(err);
            }
        } catch (err) {
            setError("An error occurred during registration.");
            toast.error("An error occurred during registration.");
        }
    }

    return (
        <div className="signup-form">
            <div className="title">Sign up</div>
            <form onSubmit={handleSubmit} className="input-boxes">
                <div className="input-box">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter User name"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                <br />
                {errors.username && <small style={{ color: "#ed4337" }} >{errors.username}</small>}
                <div className="input-box">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                <br />
                {errors.email && <small style={{ color: "#ed4337" }} >{errors.email}</small>}
                <div className="input-box">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                <br />
                {errors.password && <small style={{ color: "#ed4337" }} >{errors.password}</small>}
                <div className="button input-box">
                    <input type="submit" value="Submit" />
                </div>
                <div className="text signup-text">Already have an account?
                    <label htmlFor="flip"> Login now</label>
                </div>
            </form>
        </div>
    );
};

export default Signup;
