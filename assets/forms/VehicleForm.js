import React, { useRef, useState } from "react";
import Notification from "../components/Notification";
import FuelField from "./parts/FuelField";
import MakerField from "./parts/MakerField";
import ImageField from "./parts/ImageField";
import ConsumptionField from "./parts/ConsumptionField";
import CharacteristicField from "./parts/CharacteristicField";
import axios from "axios";

export default function VehicleForm({vehicle = null}) {

    const rowConsumptionsCounter = useRef(1)
    const rowCharacteristicsCounter = useRef(1)
    let storedUser = localStorage.getItem("token") ?? ""
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        maker: null,
        model: "",
        basemodel: "",
        fuel: null,
        fuelTank: null,
        vehiculeWeight: null,
        maxSpeed: null,
        averageFuelConsumption: null,
        price: null,
        buildAt: null,
        consumptions: {
            0: {
                consumption: null,
                value: "",
            }
        },
        characteristics: {
            0: {
                characteristic: null,
                value: "",
            }
        },
    })
    const [credentialsImgs, setCredentialsImgs] = useState({
        photo: ""
    })

    const handleChange = (e, fieldName) => {
        setFormResponse({})
        
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleCharacteristics = (e) => {
        setCredentials({
            ...credentials,
            characteristics: {
                ...credentials.characteristics,
                [rowCharacteristicsCounter.current]: {}
            }
        })
        rowCharacteristicsCounter.current += 1
    }

    const handleConsumptions = (e) => {
        setCredentials({
            ...credentials,
            consumptions: {
                ...credentials.consumptions,
                [rowConsumptionsCounter.current]: {}
            }
        })
        rowConsumptionsCounter.current++
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/backoffice/vehicle`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + storedUser
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: ""})
                
                if(response.status == 201) {
                    axios
                        .post(`${window.location.origin}/api/backoffice/vehicle/${response.data.id}/photo`, credentialsImgs, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                "Authorization": "Bearer " + storedUser
                            }
                        })
                        .then((response) => {
                            setFormResponse({classname: "success", message: "The vehicle image has been successfully saved into the database"})
                        })
                        .catch((error) => {
                            let errorMessage = "An error has been encountered. Unfortunatly, images couldn't be saved."
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

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <MakerField
                        fieldValue={credentials.maker}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentials({
                                ...credentials,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>

                <div className={"form-field"}>
                    <ImageField
                        fieldName={"photo"}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentialsImgs({
                                ...credentialsImgs,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"text"}
                        maxLength={255}
                        value={credentials.basemodel}
                        placeholder={"Vehicle base model"}
                        onChange={(e) => handleChange(e, "basemodel")}
                    />
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"text"}
                        maxLength={255}
                        value={credentials.model}
                        placeholder={"Vehicle model"}
                        onChange={(e) => handleChange(e, "model")}
                    />
                </div>
                
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
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

                    <div className={"form-field"}>
                        <input 
                            type={"number"}
                            min={0}
                            value={credentials.fuelTank}
                            placeholder={"Fuel tank capacity (L)"}
                            onChange={(e) => handleChange(e, "fuelTank")}
                        />
                    </div>
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"number"}
                        min={0}
                        value={credentials.vehiculeWeight}
                        placeholder={"Vehicule weight (t)"}
                        onChange={(e) => handleChange(e, "vehiculeWeight")}
                    />
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"number"}
                        min={0}
                        value={credentials.maxSpeed}
                        placeholder={"Vehicule max speed"}
                        onChange={(e) => handleChange(e, "maxSpeed")}
                    />
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"number"}
                        min={0}
                        value={credentials.averageFuelConsumption}
                        placeholder={"Vehicule average fuel consumption (per 100km/h)"}
                        onChange={(e) => handleChange(e, "averageFuelConsumption")}
                    />
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"number"}
                        min={0}
                        value={credentials.price}
                        placeholder={"Price"}
                        onChange={(e) => handleChange(e, "price")}
                    />
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"date"}
                        value={credentials.buildAt}
                        placeholder={"Vehicle builded at"}
                        onChange={(e) => handleChange(e, "buildAt")}
                    />
                </div>

                <div className={"card mx-25"}>
                    <div className={"-content"}>
                        <div className={"form-field"}>
                            <label className={"fw-bold"}>Consumptions</label>

                            <div className={"mt-15"}>
                                {Object.values(credentials.consumptions).map((item, index) => (
                                    <ConsumptionField
                                        fieldName={"consumptions"}
                                        index={index}
                                        consumption={item}
                                        updateCredentials={(row, fieldName, fieldValue) => {
                                            setCredentials({
                                                ...credentials,
                                                [fieldName]: {
                                                    ...credentials[fieldName],
                                                    [row]: fieldValue
                                                }
                                            })
                                        }}
                                    />
                                ))}
                            </div>
                            <button type={"button"} className={"btn btn-secondary"} onClick={(e) => handleConsumptions(e)}>+</button>
                        </div>
                    </div>
                </div>

                <div className={"card mx-25"}>
                    <div className={"-content"}>
                        <div className={"form-field"}>
                            <label className={"fw-bold"}>Characteristics</label>
                            <div className={"mt-15"}>
                                {Object.values(credentials.characteristics).map((item, index) => (
                                    <CharacteristicField
                                        fieldName={"characteristics"}
                                        index={index}
                                        characteristic={item}
                                        updateCredentials={(row, fieldName, fieldValue) => {
                                            setCredentials({
                                                ...credentials,
                                                [fieldName]: {
                                                    ...credentials[fieldName],
                                                    [row]: fieldValue
                                                }
                                            })
                                        }}
                                    />
                                ))}
                            </div>
                            <button type={"button"} className={"btn btn-secondary"} onClick={(e) => handleCharacteristics(e)}>+</button>
                        </div>
                    </div>
                </div>
                
                <div className={"form-actions"}>
                    <button type={"submit"} className={"btn btn-secondary"}>Submit</button>
                </div>
            </form>
        </>
    )
}