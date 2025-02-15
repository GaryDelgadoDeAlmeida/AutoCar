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
                    <div className={"form-field -no-flex w-200px"}>
                        <label htmlFor={"current_password"}>Current password</label>
                    </div>
                    <div className={"form-field"}>
                        <input
                            id={"current_password"}
                            type={"password"}
                            onChange={(e) => handleChange(e, "current_password")}
                            value={credentials.current_password}
                            required
                        />
                    </div>
                </div>
                <div className={"form-field-inline"}>
                    <div className={"form-field -no-flex w-200px"}>
                        <label htmlFor={"new_password"}>New password</label>
                    </div>
                    <div className={"form-field"}>
                        <input
                            id={"new_password"}
                            type={"password"}
                            onChange={(e) => handleChange(e, "new_password")}
                            value={credentials.new_password}
                            required
                        />
                    </div>
                </div>
                <div className={"form-field-inline"}>
                    <div className={"form-field -no-flex w-200px"}>
                        <label htmlFor={"confirm_new_password"}>Confirm your new password</label>
                    </div>
                    <div className={"form-field"}>
                        <input
                            id={"confirm_new_password"}
                            type={"password"}
                            onChange={(e) => handleChange(e, "confirm_new_password")}
                            value={credentials.confirm_new_password}
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