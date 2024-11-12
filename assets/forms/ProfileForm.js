import React, { useState } from "react";
import Notification from "../components/Notification"

export default function ProfileForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        firstname: "",
        lastname: "",
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
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <input
                        type={"text"}
                        maxLength={100}
                        value={credentials.firstname}
                        placeholder={"Your firstname"}
                        onChange={(e) => handleChange(e, "firstname")}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <input
                        type={"text"}
                        maxLength={255}
                        value={credentials.lastname}
                        placeholder={"Your lastname"}
                        onChange={(e) => handleChange(e, "lastname")}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <input
                        type={"email"}
                        maxLength={255}
                        value={credentials.email}
                        placeholder={"Your email"}
                        onChange={(e) => handleChange(e, "email")}
                        required
                    />
                </div>
                
                <div className={"form-actions"}>
                    <button className={"btn btn-secondary"} type={"submit"}>Submit</button>
                </div>
            </form>
        </>
    )
}