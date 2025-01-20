import React, { useState } from "react";
import ImageField from "./parts/ImageField"
import WyziwigField from "./parts/WyziwigField"
import Notification from "../components/Notification"

export default function TestimonialForm({testimonial = null}) {
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        fullname: "",
        comment: ""
    })
    const [credentialPhotos, setCredentialPhotos] = useState({
        photo: null
    })

    const handleChange = (e, fieldName) => {}

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Hello handleSubmit")
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
                <div className={"form-field"}>
                    <input 
                        type={"text"}
                        value={credentials.fullname}
                        onChange={(e) => handleChange(e, "fullname")}
                        placeholder={"Fullname of the testimonial"}
                        maxLength={255}
                        required
                    />
                </div>
                <div className={"form-field"}>
                    <WyziwigField
                        fieldName={"comment"}
                        fieldValue={credentials.comment}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentials({
                                ...credentials,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>
                <div className={"form-actions"}>
                    <button className={"btn btn-secondary"} type={"button"}>Submit</button>
                </div>
            </form>
        </>
    )
}