import React, { useState } from "react";
import Notification from "../components/Notification";
import axios from "axios";

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

        axios
            .get(`${window.location.origin}/api/blogs?q=${credentials.value}`)
            .then((response) => {
                setFormResponse({classname: "success", message: "Search system is still not operational. Wait just a little longer"})
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

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form form-search"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field-inline -g-none"}>
                    <div className={"form-field --full"}>
                        <input
                            type={"text"}
                            value={credentials.value}
                            onChange={(e) => handleChange(e)}
                            placeholder={"Search an article"}
                        />
                    </div>
                    <button type={"submit"} className={"btn btn-secondary -inline-flex"}>
                        <span>Search</span>
                    </button>
                </div>
            </form>
        </>
    )
}