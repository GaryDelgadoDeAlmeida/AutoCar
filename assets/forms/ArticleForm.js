import React, { useState } from "react";
import Notification from "../components/Notification"
import WyziwigField from "./parts/WyziwigField"
import axios from "axios";
import ImageField from "./parts/ImageField";

export default function ArticleForm({article = null}) {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        title: article ? article.title : null,
        content: article ? article.content : null,
    })
    const [credentialAttachments, setCredentialAttachments] = useState({
        photo: article ? article.photo : null
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

        if(credentials.title.length == 0) {
            setFormResponse({classname: "danger", message: "The article title must be filled"})
            return
        }

        if(credentials.content.length == 0) {
            setFormResponse({classname: "danger", message: "The article content must be filled"})
            return
        }

        if(article == null) {
            axios
                .post(`${window.location.origin}/api/backoffice/blog`, credentials, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + (localStorage.getItem("token") ?? "")
                    }
                })
                .then((response) => {
                    setFormResponse({classname: "success", message: `The article ${credentials.title} has been successfully created`})

                    if(response.status == 201 && credentialAttachments.photo) {
                        axios
                            .post(`${window.location.origin}/api/backoffice/blog/${response.data.id}/photo/update`, credentialAttachments, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    "Authorization": "Bearer " + (localStorage.getItem("token") ?? "")
                                }
                            })
                            .then((response) => {
                                setFormResponse({classname: "success", message: "The article photo has been successfully updated"})
                            })
                            .catch((error) => {
                                let errorMessage = "An error has been encountered when processing the image. Please retry more later"
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
                .put(`${window.location.origin}/api/backoffice/blog/${article.id}/update`, credentials, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + (localStorage.getItem("token") ?? "")
                    }
                })
                .then((response) => {
                    setFormResponse({classname: "success", message: `The article ${credentials.title} has been successfully updated`})

                    if(response.status == 202 && credentialAttachments.photo) {
                        axios
                            .post(`${window.location.origin}/api/backoffice/blog/${response.data.id}/photo/update`, credentialAttachments, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    "Authorization": "Bearer " + (localStorage.getItem("token") ?? "")
                                }
                            })
                            .then((response) => {
                                setFormResponse({classname: "success", message: "The article photo has been successfully updated"})
                            })
                            .catch((error) => {
                                let errorMessage = "An error has been encountered when processing the image. Please retry more later"
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
                    <ImageField
                        fieldName={"photo"}
                        fieldValue={credentialAttachments.photo}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentialAttachments({
                                ...credentialAttachments,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"text"}
                        maxLength={255}
                        value={credentials.title}
                        placeholder={"Article title"}
                        onChange={(e) => handleChange(e, "title")}
                        required
                    />
                </div>
                
                <div className={"form-field"}>
                    <WyziwigField
                        fieldName={"content"}
                        fieldValue={credentials.content}
                        placeholder={"Content the article ..."}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentials({
                                ...credentials,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>
                
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-secondary btn-m fw-bold"}>Submit</button>
                </div>
            </form>
        </>
    )
}