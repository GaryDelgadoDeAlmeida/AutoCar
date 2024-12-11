import React, { useState } from "react";
import Notification from "../components/Notification";
import axios from "axios";

export default function FuelForm({fuel}) {

    const storageUser = localStorage.getItem("token") ?? ""
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        title: null,
        price: null,
        key: null
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("Hello world")

        if(fuel == null) {
            axios
                .post(`${window.location.origin}/api/backoffice/fuel`, credentials, {
                    headers: {
                        "Content-Length": "application/json",
                        "Accept": "application/json+ld",
                        "Authorization": "Bearer " + (storageUser.length > 0 ? storageUser : "")
                    }
                })
                .then((response) => {
                    setFormResponse({classname: "success", message: "The fuel has been successfully added to the database"})
                })
                .catch((error) => {
                    let errorMessage = "An error has been encountered. Please retry later"
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
                .put(`${window.location.origin}/api/backoffice/fuel/${fuel.id}/update`, credentials, {
                    headers: {
                        "Content-Length": "application/json",
                        "Accept": "application/json+ld",
                        "Authorization": "Bearer " + (storageUser.length > 0 ? storageUser : "")
                    }
                })
                .then((response) => {
                    setFormResponse({classname: "success", message: "The fuel has been successfully updated in the database"})
                })
                .catch((error) => {
                    let errorMessage = "An error has been encountered. Please retry later"
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

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <input 
                            type={"text"}
                            maxLength={255}
                            value={credentials.title}
                            placeholder={"Name of the fuel"}
                            onChange={(e) => handleChange(e, "title")}
                            required
                        />
                    </div>

                    <div className={"form-field"}>
                        <input 
                            type={"text"}
                            maxLength={255}
                            value={credentials.key}
                            placeholder={"Key of the fuel"}
                            onChange={(e) => handleChange(e, "key")}
                            required
                        />
                    </div>
                    
                    <div className={"form-field"}>
                        <input
                            type={"number"}
                            step={"any"}
                            min={0}
                            value={credentials.price}
                            placeholder={"Price of the fuel"}
                            onChange={(e) => handleChange(e, "price")}
                            required
                        />
                    </div>
                </div>
                
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-secondary"}>Submit</button>
                </div>
            </form>
        </>
    )
}