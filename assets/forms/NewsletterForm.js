import React, { useState } from "react";
import Notification from "../components/Notification"
import axios from "axios";

export default function NewsletterForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        email: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${window.location.origin}/api/newsletters`, credentials, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            setFormResponse({classname: "success", message: "Your mail has been registered in our newsletter"})
        }).catch((error) => {
            let errorMessage = "An error has been encountered. Please retry more later"
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
                <div className={"form-field"}>
                    <input 
                        type={"email"} 
                        maxLength={255}
                        value={credentials.value} 
                        placeholder={"Your email"}
                        required
                    />
                </div>
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-primary w-100"}>Register</button>
                </div>
            </form>
        </>
    )
}