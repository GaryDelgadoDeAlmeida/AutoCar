import React, { useState } from "react";
import ImageField from "./parts/ImageField"
import WyziwigField from "./parts/WyziwigField"
import Notification from "../components/Notification"

export default function MakerForm({maker = null}) {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        logo: "",
        name: "",
        description: "",
        founded_at: "",
        location: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setFormResponse({classname: "success", message: "Form submitted"})
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}
            
            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <ImageField
                        fieldName={"logo"}
                        fieldValue={credentials.logo}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentials({
                                ...credentials,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>
                
                <div className={"form-field"}>
                    <input
                        type={"text"}
                        maxLength={255}
                        value={credentials.name}
                        placeholder={"Car brand name"}
                        onChange={(e) => handleChange(e, "name")}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <WyziwigField
                        fieldName={"description"}
                        fieldValue={credentials.description}
                        placeholder={"About the brand"}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentials({
                                ...credentials,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>
                
                <div className={"form-field"}>
                    <input 
                        type={"date"}
                        value={credentials.founded_at}
                        onChange={(e) => handleChange(e, "founded_at")}
                    />
                </div>
                
                <div className={"form-field"}>
                    <select value={credentials.location} onChange={(e) => handleChange(e, "location")}>
                        <option value={""}>Select the brand current location</option>
                    </select>
                </div>
                
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-secondary"}>Submit</button>
                </div>
            </form>
        </>
    )
}