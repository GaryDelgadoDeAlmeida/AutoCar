import React, { useState } from "react";
import Notification from "../components/Notification"
import axios from "axios";

export default function StationForm({station = null}) {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        address: "",
        zipCode: "",
        city: "",
        country: "",
        latitude: "",
        longitude: "",
        stationFuels: []
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormResponse({})

        axios
            .post(`${window.location.origin}/api/backoffice/station`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + (localStorage.getItem("token") ?? "")
                }
            })
            .then((response) => {})
            .catch((error) => {
                setFormResponse({
                    ...formResponse,
                    classname: "danger",
                    message: error.response.data.message || error.response.data.detail
                })
            })
        ;
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}></div>
                <div className={"form-field"}></div>
                <div className={"form-field"}></div>
                <div className={"form-field"}></div>
                <div className={"form-field"}></div>
                <div className={"form-field"}></div>
                <div className={"form-field"}></div>
                <div className={"form-action"}>
                    <button type={"submit"} className={"btn btn-primary"}>Submit</button>
                </div>
            </form>
        </>
    )
}