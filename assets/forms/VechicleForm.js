import React, { useState } from "react";
import Notification from "../components/Notification";

export default function VehicleForm({vehicle = null}) {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({})

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
                        maxLength={255}
                        value={credentials.model}
                        placeholder={"Vehicle model"}
                        onChange={(e) => handleChange(e, "model")}
                    />
                </div>
                
                <div className={"form-field"}>
                    <input 
                        type={"text"}
                        maxLength={255}
                        value={credentials.basemodel}
                        placeholder={"Vehicle base model"}
                        onChange={(e) => handleChange(e, "basemodel")}
                    />
                </div>
                
                <div className={"form-field"}></div>
                
                <div className={"form-field"}></div>
                
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-secondary"}>Submit</button>
                </div>
            </form>
        </>
    )
}