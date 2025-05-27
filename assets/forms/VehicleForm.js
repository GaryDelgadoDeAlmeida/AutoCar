import React, { useRef, useState } from "react";
import Notification from "../components/Notification";
import FuelField from "./parts/FuelField";
import MakerField from "./parts/MakerField";
import ImageField from "./parts/ImageField";
import WyziwigField from "./parts/WyziwigField";
import ConsumptionField from "./parts/ConsumptionField";
import CharacteristicField from "./parts/CharacteristicField";
import { formatDate } from "../hooks/DomControl"
import axios from "axios";

export default function VehicleForm({vehicle = null}) {

    const rowConsumptionsCounter = useRef(1)
    const rowCharacteristicsCounter = useRef(1)
    let storedUser = localStorage.getItem("token") ?? ""
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        maker: vehicle && vehicle.maker ? vehicle.maker.id : "",
        model: vehicle ? vehicle.name : "",
        basemodel: vehicle ? vehicle.basemodel : "",
        fuel: vehicle ? vehicle.fuels[0].id : "",
        fuelTank: vehicle ? vehicle.fuelTank : "",
        vehiculeWeight: vehicle ? vehicle.vehiculeWeight : "",
        maxSpeed: vehicle ? vehicle.maxSpeed : "",
        averageFuelConsumption: vehicle ? vehicle.averageFuelConsumption : "",
        price: vehicle ? vehicle.price : "",
        buildAt: vehicle ? formatDate(vehicle.buildAt) : "",
        description: "",
        consumptions: vehicle ? vehicle.consumptions.map((item) => {
            return {
                id: item.id,
                consumption: item.consumption_id,
                value: item.value
            }
        }) : {
            0: {
                consumption: "",
                value: "",
            }
        },
        characteristics: vehicle ? vehicle.characteristics.map((item) => {
            return {
                id: item.id,
                characteristic: item.characteristic_id,
                value: item.value
            }
        }) : {
            0: {
                characteristic: "",
                value: "",
            }
        },
    })
    const [credentialsImgs, setCredentialsImgs] = useState({
        photo: ""
    })

    const handleChange = (e, fieldName) => {
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

        if(vehicle == null) {
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
        } else {
            axios
                .put(`${window.location.origin}/api/backoffice/vehicle/${vehicle.id}`, credentials, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + storedUser
                    }
                })
                .then((response) => {
                    setFormResponse({classname: "success", message: "The vehicle has been successfully updated"})
                    
                    if((response.status == 201 || response.status == 202) && (credentialsImgs.photo !== "" && credentialsImgs.photo !== null)) {
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
                            className={"field"}
                            type={"number"}
                            min={0}
                            value={credentials.fuelTank}
                            step={"any"}
                            placeholder={"Fuel tank capacity (L)"}
                            onChange={(e) => handleChange(e, "fuelTank")}
                        />
                    </div>
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"number"}
                        min={0}
                        step={"any"}
                        value={credentials.vehiculeWeight}
                        placeholder={"Vehicule weight (kg)"}
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
                        step={"any"}
                        value={credentials.averageFuelConsumption}
                        placeholder={"Vehicule average fuel consumption (per 100km/h)"}
                        onChange={(e) => handleChange(e, "averageFuelConsumption")}
                    />
                </div>

                <div className={"form-field"}>
                    <input 
                        type={"number"}
                        min={0}
                        step={"any"}
                        placeholder={"Price"}
                        value={credentials.price}
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

                <div className={"form-field"}>
                    <WyziwigField
                        fieldName={"description"}
                        fieldValue={credentials.description}
                        placeholder={"Description of the vehicle"}
                        updateCredentials={(fieldName, fieldValue) => {
                            setCredentials({
                                ...credentials,
                                [fieldName]: fieldValue
                            })
                        }}
                    />
                </div>

                <div className={"card mx-25"}>
                    <div className={"-content"}>
                        <div className={"form-field"}>
                            <label className={"fw-bold"}>Consumptions</label>

                            <div className={"mt-15"}>
                                {Object.values(credentials.consumptions).map((item, index) => (
                                    <ConsumptionField
                                        key={index}
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
                                        key={index}
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