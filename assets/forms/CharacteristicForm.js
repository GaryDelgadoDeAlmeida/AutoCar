import React, { useState } from "react";
import Notification from "../components/Notification";
import axios from "axios";

export default function CharacteristicForm({vehicle_type = null}) {

    const userToken = localStorage.getItem("token")
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        title: vehicle_type ? vehicle_type.title : "",
        description: vehicle_type ? vehicle_type.description : ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(vehicle_type == null) {
            axios
                .post(`${window.location.origin}/api/backoffice/characteristics`, credentials, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + (userToken ?? "")
                    }
                })
                .then((response) => {
                    setFormResponse({classname: "success", message: "The characteristic '" + credentials.title + "' has been successfully registered"})
                    setCredentials({
                        ...credentials,
                        title: "",
                        description: ""
                    })
                })
                .catch((error) => {
                    let errorMessage = "An error has been encountered. Please retry more later"
                    if(error.response.data.message) {
                        errorMessage = error.response.data.message
                    } else if(error.response.data.detail) {
                        errorMessage = error.response.data.detail
                    }

                    setFormResponse({classname: "danger", message: errorMessage})
                })
            ;
        } else {
            axios
                .put(`${window.location.origin}/api/backoffice/characteristic/${vehicle_type.id}/update`, credentials, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + (userToken ?? "")
                    }
                })
                .then((response) => {
                    setFormResponse({classname: "success", message: "The characteristic '" + credentials.title + "' has been successfully updated"})
                })
                .catch((error) => {
                    let errorMessage = "An error has been encountered. Please retry more later"
                    if(error.response.data.message) {
                        errorMessage = error.response.data.message
                    } else if(error.response.data.detail) {
                        errorMessage = error.response.data.detail
                    }

                    setFormResponse({classname: "danger", message: errorMessage})
                })
            ;
        }
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
                        value={credentials.title}
                        onChange={(e) => handleChange(e, "title")}
                        placeholder={"Data key to store into database"}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <textarea 
                        onChange={(e) => handleChange(e, "description")} 
                        placeholder={"Description of the data key"}
                    >{credentials.description}</textarea>
                </div>
                
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-secondary"}>Submit</button>
                </div>
            </form>
        </>
    )
}