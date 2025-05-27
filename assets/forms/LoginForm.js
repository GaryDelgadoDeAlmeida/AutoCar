import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { validateCaptcha } from "react-simple-captcha";
import CaptchaField from "./parts/CaptchaField";
import Notification from "../components/Notification"
import axios from "axios";

export default function LoginForm() {

    const [logged, setLogged] = useState(false)
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        captcha: "",
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(credentials.captcha.length == 0) {
            setFormResponse({classname: "danger", message: "Veuillez renseigner le captcha"})
            return
        }

        if (validateCaptcha(credentials.captcha) !== true) {
            setFormResponse({classname: "danger", message: "Le captcha est incorrect"})
            return
        }

        axios
            .post(`${window.location.origin}/api/login_check`, credentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                setLogged(true)
                localStorage.setItem("token", response.data.token ?? "")
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please, retry more later"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }

                setFormResponse({classname: "danger", message: errorMessage})
            })
    }

    return (
        <>
            {logged && (
                <Navigate to={"/admin"} />
            )}
            
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <input 
                        type="email"
                        value={credentials.email}
                        placeholder={"Your email address"}
                        onChange={(e) => handleChange(e, "email")}
                        required
                    />
                </div>
                <div className={"form-field"}>
                    <input 
                        type="password"
                        value={credentials.password}
                        placeholder={"Your password ..."}
                        onChange={(e) => handleChange(e, "password")}
                        required
                    />
                </div>
                <div className={"form-field"}>
                    <CaptchaField 
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentials({
                                ...credentials,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-secondary btn-m"}>Submit</button>
                </div>
            </form>
        </>
    )
}