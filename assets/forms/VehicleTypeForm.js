import React, { useState } from "react";
import Notification from "../components/Notification";
import axios from "axios";

export default function VehicleTypeForm({vehicle_type = null}) {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        type: ""
    })

    const handleChange = (e, fieldName) => {}

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/backoffice/characteristics`, credentials, {
                headers: {}
            })
            .then((response) => {})
            .catch((error) => {})
        ;
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
                        value={credentials.type}
                        onChange={(e) => handleChange(e, "type")}
                        placeholder={"Vehicle type"}
                        required
                    />
                </div>
                
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-secondary"}>Submit</button>
                </div>
            </form>
        </>
    )
}