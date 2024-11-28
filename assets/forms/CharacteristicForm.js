import React, { useState } from "react";
import Notification from "../components/Notification";
import axios from "axios";

export default function CharacteristicForm({vehicle_type = null}) {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        title: "",
        description: ""
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