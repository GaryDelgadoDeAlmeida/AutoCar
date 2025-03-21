import React, { useState } from "react";
import ImageField from "./parts/ImageField"
import WyziwigField from "./parts/WyziwigField"
import Notification from "../components/Notification"
import axios from "axios";

export default function TestimonialForm({testimonial = null}) {

    const storageUser = localStorage.getItem("token") ?? ""
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        firstname: testimonial ? testimonial.firstname : "",
        lastname: testimonial ? testimonial.lastname : "",
        comment: testimonial ? testimonial.comment : ""
    })
    const [credentialPhotos, setCredentialPhotos] = useState({
        photo: null
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
        console.log("Hello handleSubmit")

        if(testimonial == null) {
            axios
                .post(`${window.location.origin}/api/backoffice/testimonial`, credentials, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${storageUser}`
                    }
                })
                .then((response) => {
                    setFormResponse({classname: "success", message: "The testimonial has been created successfully"})

                    if(response.status == 204 && credentialPhotos.photo !== null) {
                        axios
                            .post(`${window.location.origin}/api/backoffice/testimonial/${response.data.id}/photo/update`, credentialPhotos, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    "Authorization": `Bearer ${storageUser}`
                                }
                            })
                            .then((response) => {
                                setFormResponse({classname: "success", message: "The testimonial photo has been updated"})
                            })
                            .catch((error) => {
                                let errorMessage = "An error has been encountered during the testimonial registration process. Please, retry laterP"
                                if(error.response.data.message) {
                                    errorMessage = error.response.data.message
                                } else if(error.response.data.detail) {
                                    errorMessage = error.response.data.detail
                                }

                                setFormResponse({classname: "danger", message: errorMessage})
                            })
                        ;
                    }
                })
                .catch((error) => {
                    let errorMessage = "An error has been encountered during the testimonial registration process. Please, retry laterP"
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
                .put(`${window.location.origin}/api/backoffice/testimonial/${testimonial.id}/update`, credentials, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${storageUser}`
                    }
                })
                .then((response) => {
                    setFormResponse({classname: "success", message: "The testimonial has been updated successfully"})

                    if(response.status == 202 && credentialPhotos.photo !== null) {
                        axios
                            .post(`${window.location.origin}/api/backoffice/testimonial/${testimonial.id}/photo/update`, credentialPhotos, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    "Authorization": `Bearer ${storageUser}`
                                }
                            })
                            .then((response) => {
                                setFormResponse({classname: "success", message: "The testimonial photo has been updated"})
                            })
                            .catch((error) => {
                                let errorMessage = "An error has been encountered during the testimonial registration process. Please, retry laterP"
                                if(error.response.data.message) {
                                    errorMessage = error.response.data.message
                                } else if(error.response.data.detail) {
                                    errorMessage = error.response.data.detail
                                }

                                setFormResponse({classname: "danger", message: errorMessage})
                            })
                        ;
                    }
                })
                .catch((error) => {
                    let errorMessage = "An error has been encountered during the testimonial registration process. Please, retry laterP"
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
                    <ImageField
                        fieldName={"photo"}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentialPhotos({
                                ...credentialPhotos,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <input 
                            type={"text"}
                            value={credentials.firstname}
                            onChange={(e) => handleChange(e, "firstname")}
                            placeholder={"Firstname of the testimonial"}
                            maxLength={255}
                            required
                        />
                    </div>
                    <div className={"form-field"}>
                        <input 
                            type={"text"}
                            value={credentials.lastname}
                            onChange={(e) => handleChange(e, "lastname")}
                            placeholder={"Lastname of the testimonial"}
                            maxLength={255}
                            required
                        />
                    </div>
                </div>
                <div className={"form-field"}>
                    <WyziwigField
                        fieldName={"comment"}
                        fieldValue={credentials.comment}
                        placeholder={"Comment of the testimonial"}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentials({
                                ...credentials,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>
                <div className={"form-actions"}>
                    <button className={"btn btn-secondary"} type={"submit"}>Submit</button>
                </div>
            </form>
        </>
    )
}