import React, { useEffect, useState } from "react";
import FuelField from "./parts/FuelField";
import MakerField from "./parts/MakerField";
import Notification from "../components/Notification";
import VehicleModelField from "./parts/VehicleModelField";

export default function SearchVehicleForm({searchCredentials, updateCredentials}) {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState(searchCredentials ? {...searchCredentials} : {
        search: "",
        price: "",
        maker: "",
        fuel: "",
        model: ""
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(Object.keys(credentials).length == 0) {
            setFormResponse({classname: "danger", message: "You must fill search form to process a research"})
            return
        }

        updateCredentials(credentials)
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form form-search-vehicle"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field-inline --mobile"}>
                    <div className={"form-field --full"}>
                        <input 
                            className={"field"}
                            type={"text"}
                            value={credentials.search}
                            placeholder={"Search a vehicle"}
                            onChange={(e) => handleChange(e, "search")}
                        />
                    </div>
                    <div className={"form-field --full"}>
                        <input 
                            className={"field"}
                            type={"number"}
                            min={0}
                            step={".01"}
                            value={credentials.price}
                            placeholder={"Max price of the vehicle"}
                            onChange={(e) => handleChange(e, "price")}
                        />
                    </div>
                </div>
                <div className={"form-field-inline --mobile"}>
                    <div className={"form-field --full"}>
                        <MakerField
                            fieldName={"maker"}
                            fieldValue={credentials.maker}
                            updateCredentials={(fieldName, fieldValue) => {
                                setCredentials({
                                    ...credentials,
                                    [fieldName]: fieldValue
                                })
                            }}
                        />
                    </div>
                    <div className={"form-field --full"}>
                        <FuelField
                            fieldValue={credentials.fuel}
                            updateCredentials={(fieldName, fieldValue) => {
                                setCredentials({
                                    ...credentials,
                                    [fieldName]: fieldValue
                                })
                            }}
                        />
                    </div>
                    <div className={"form-field --full"}>
                        <VehicleModelField
                            fieldValue={credentials.model}
                            updateCredentials={(fieldName, fieldValue) => {
                                setCredentials({
                                    ...credentials,
                                    [fieldName]: fieldValue
                                })
                            }}
                        />
                    </div>
                </div>
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-secondary w-100 h-100"}>Search</button>
                </div>
            </form>
        </>
    )
}