import React, { useState } from "react";
import ImageField from "./parts/ImageField"
import WyziwigField from "./parts/WyziwigField"
import Notification from "../components/Notification"
import axios from "axios";

export default function MakerForm({maker = null}) {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        name: "",
        description: "",
        founded_at: "",
        location: ""
    })

    const [credentialsPhoto, setCredentialsPhoto] = useState({
        logo: "",
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
            .post(`${window.location.origin}/api/backoffice/maker`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + (localStorage.getItem("token") ?? "")
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: "The car maker has been successfully added into the database"})
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
                <div className={"form-field"}>
                    <ImageField
                        fieldName={"logo"}
                        fieldValue={credentialsPhoto.logo}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentialsPhoto({
                                ...credentialsPhoto,
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