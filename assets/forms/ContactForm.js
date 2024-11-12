import React, { useState } from "react";
import Notification from "../components/Notification";
import axios from "axios";
import CaptchaField from "./parts/CaptchaField";
import { validateCaptcha } from "react-simple-captcha";

export default function ContactForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        captcha: "",
        email: "",
        phone_number: "",
        subject: "",
        message: ""
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
            .post(`${window.location.origin}/api/inbox`, credentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: "Thanks for contact us. We'll take contact has quick as possible."})
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
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <input 
                            type={"email"} 
                            maxLength={255}
                            value={credentials.email}
                            placeholder={"Your email*"}
                            onChange={(e) => handleChange(e, "email")}
                            required
                        />
                    </div>
                    
                    <div className={"form-field"}>
                        <input 
                            type={"tel"}
                            maxLength={20}
                            value={credentials.phone_number}
                            placeholder={"Your phone number"}
                            onChange={(e) => handleChange(e, "phone_number")}
                        />
                    </div>
                </div>
                
                <div className={"form-field"}>
                    <input 
                        type={"text"}
                        maxLength={255}
                        value={credentials.subject}
                        placeholder={"Your email subject*"}
                        onChange={(e) => handleChange(e, "subject")}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <textarea onChange={(e) => handleChange(e, "message")}>{credentials.message}</textarea>
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
                    <button type={"submit"} className={"btn btn-secondary btn-rounded btn-m"}>Send</button>
                </div>
            </form>
        </>
    )
}