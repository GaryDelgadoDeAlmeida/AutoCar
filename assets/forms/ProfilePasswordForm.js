import React, { useState } from "react";

export default function ProfilePasswordForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        current_password: "",
        new_password: "",
        confirm_new_password: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("Hi handleSubmit")
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field-inline"}>
                    <div className={"form-field --full -no-flex w-200px"}>
                        <label className={"mx-auto"} htmlFor={"current_password"}>Current password</label>
                    </div>
                    <div className={"form-field --full"}>
                        <input
                            id={"current_password"}
                            type={"password"}
                            value={credentials.current_password}
                            onChange={(e) => handleChange(e, "current_password")}
                            placeholder={"Your current password"}
                            required
                        />
                    </div>
                </div>
                <div className={"form-field-inline"}>
                    <div className={"form-field --full -no-flex w-200px"}>
                        <label className={"mx-auto"} htmlFor={"new_password"}>New password</label>
                    </div>
                    <div className={"form-field --full"}>
                        <input
                            id={"new_password"}
                            type={"password"}
                            value={credentials.new_password}
                            onChange={(e) => handleChange(e, "new_password")}
                            placeholder={"Your new password"}
                            required
                        />
                    </div>
                </div>
                <div className={"form-field-inline"}>
                    <div className={"form-field --full -no-flex w-200px"}>
                        <label className={"mx-auto"} htmlFor={"confirm_new_password"}>Confirm your new password</label>
                    </div>
                    <div className={"form-field --full"}>
                        <input
                            id={"confirm_new_password"}
                            type={"password"}
                            value={credentials.confirm_new_password}
                            onChange={(e) => handleChange(e, "confirm_new_password")}
                            placeholder={"Confirmation of your new password"}
                            required
                        />
                    </div>
                </div>
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-secondary"}>Update</button>
                </div>
            </form>
        </>
    )
}