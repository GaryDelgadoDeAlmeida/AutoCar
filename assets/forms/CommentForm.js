import React, { useState } from "react";
import Notification from "../components/Notification";
import axios from "axios";

export default function CommentForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        comment: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(credentials.comment.length == 0) {
            setFormResponse({classname: "danger", message: ""})
            return
        }

        axios
            .post(`${window.location.origin}/api/client/comment`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + (localStorage.getItem("token") ?? "")
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: "Success"})
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }

                setFormResponse({classname: "danger", message: errorMessage})
            })
        ;
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <textarea 
                        onChange={(e) => handleChange(e, "comment")}
                        placeholder={"Your comment"}
                    >{credentials.comment}</textarea>
                </div>
                <div className={"form-actions"}>
                    <button className={"btn btn-secondary"} type={"submit"}>Send</button>
                </div>
            </form>
        </>
    )
}