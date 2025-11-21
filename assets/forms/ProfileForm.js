import React, { useState } from "react";
import Notification from "../components/Notification"
import axios from "axios";

export default function ProfileForm({profile = null}) {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        firstname: profile ? profile.firstname : "",
        lastname: profile ? profile.lastname : "",
        email: profile ? profile.email : ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .put(`${window.location.origin}/api/backoffice/profile`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + storageUser
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: "Your profile has been successfully updated"})
            })
            .catch((error) => {
                let errorMessage = ""
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }

                setFormResponse({classname: "danger", message: errorMessage})
            })
        ;
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field-inline"}>
                    <div className={"form-field --full -no-flex w-200px"}>
                        <label className={"mx-auto"} htmlFor={"firstname"}>Firstname</label>
                    </div>
                    <div className={"form-field --full"}>
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
                    <div className={"form-field --full -no-flex w-200px"}>
                        <label className={"mx-auto"} htmlFor={"lastname"}>Lastname</label>
                    </div>
                    <div className={"form-field --full"}>
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
                    <div className={"form-field --full -no-flex w-200px"}>
                        <label className={"mx-auto"} htmlFor={"email_address"}>Email address</label>
                    </div>
                    <div className={"form-field --full"}>
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