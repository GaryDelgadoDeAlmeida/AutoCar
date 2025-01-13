import React, { useState } from "react";
import Notification from "../components/Notification";

export default function SearchForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        value: ""
    })

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            value: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form form-search"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field-inline -g-none"}>
                    <div className={"form-field"}>
                        <input
                            type={"text"}
                            value={credentials.value}
                            onChange={(e) => handleChange(e)}
                            placeholder={"Search an article"}
                        />
                    </div>
                    <button type={"submit"} className={"btn btn-secondary -inline-flex"}>Search</button>
                </div>
            </form>
        </>
    )
}