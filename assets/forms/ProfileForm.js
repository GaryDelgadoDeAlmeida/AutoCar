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
        setFormResponse({})
        
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
                <div className={"form-field-inline"}>
                    <div className={"form-field -no-flex w-200px"}>
                        <label htmlFor={"firstname"}>Firstname</label>
                    </div>
                    <div className={"form-field"}>
                        <input
                            type={"text"}
                            id={"firstname"}
                            maxLength={100}
                            value={credentials.firstname}
                            placeholder={"Your firstname"}
                            onChange={(e) => handleChange(e, "firstname")}
                            required
                        />
                    </div>
                </div>

                <div className={"form-field-inline"}>
                    <div className={"form-field -no-flex w-200px"}>
                        <label htmlFor={"lastname"}>Lastname</label>
                    </div>
                    <div className={"form-field"}>
                        <input
                            id={"lastname"}
                            type={"text"}
                            maxLength={255}
                            value={credentials.lastname}
                            placeholder={"Your lastname"}
                            onChange={(e) => handleChange(e, "lastname")}
                            required
                        />
                    </div>
                </div>
                
                <div className={"form-field-inline"}>
                    <div className={"form-field -no-flex w-200px"}>
                        <label htmlFor={"email_address"}>Email address</label>
                    </div>
                    <div className={"form-field"}>
                        <input
                            id={"email_address"}
                            type={"email"}
                            maxLength={255}
                            value={credentials.email}
                            placeholder={"Your email"}
                            onChange={(e) => handleChange(e, "email")}
                            required
                        />
                    </div>
                </div>
                
                <div className={"form-actions"}>
                    <button className={"btn btn-secondary"} type={"submit"}>Submit</button>
                </div>
            </form>
        </>
    )
}