import React, { useEffect, useState } from "react";
import FuelField from "./parts/FuelField";
import axios from "axios";
import Notification from "../components/Notification";

export default function SearchStationsForm({updateParentCredentials}) {

    const [locations, setLocations] = useState({})
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        use_position: false,
        address: "",
        radius: "",
        fuel: "",
    })
    
    // Added 13/20/2026 => Not added in git
    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.permissions.query({name:'geolocation'}).then(permissionStatus => {
            if (permissionStatus.state === 'denied') {
                alert('Please allow location access.');
                window.location.href = "app-settings:location";
            } else {
                navigator.geolocation.getCurrentPosition((pos) => {
                    var crd = pos.coords;

                    console.log("Votre position actuelle est :");
                    console.log(`Latitude : ${crd.latitude}`);
                    console.log(`Longitude : ${crd.longitude}`);
                    console.log(`La précision est de ${crd.accuracy} mètres.`);
                    setLocations({
                        latitude: crd.latitude,
                        longitude: crd.longitude,
                        accuracy: crd.accuracy
                    })
                }, (err) => {
                    console.warn(`ERREUR (${err.code}): ${err.message}`);
                });
            }
            });
        } else {
            alert('Geolocation is not supported in your browser.');
        }

        console.log(navigator.geolocation)
    }
    // End Added 13/20/2026 => Not added in git

    const handleChange = (e, fieldName) => {
        setFormResponse({})

        let fieldValue = e.currentTarget.value
        if(fieldName == "address") {
            if(fieldValue.length > 255) {
                setFormResponse({
                    classname: "danger",
                    message: "The address can't exceed 255 characters length"
                })
                return
            }
        } else if(fieldName == "radius") {
            if(isNaN(fieldValue)) {
                setFormResponse({
                    classname: "danger",
                    message: "The radius must be numeric"
                })
                return
            }

            if(fieldValue <= 0) {
                setFormResponse({
                    classname: "danger",
                    message: "The radius must be a positif integer"
                })
                return
            }
        } else if(fieldName == "use_position") {
            if(Object.keys(locations).length == 0) {
                setFormResponse({
                    classname: "danger",
                    message: "We don't have the necessary authorization to use your location"
                })
                return
            }
            fieldValue = e.currentTarget.checked
        }

        setCredentials({
            ...credentials,
            [fieldName]: fieldValue
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormResponse({})

        updateParentCredentials(credentials)
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form bg-white p-25"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-checkbox"}>
                    <label>
                        <input type={"checkbox"} name={"use_position"} onChange={(e) => handleChange(e, "use_position")} checked={credentials.use_position ? "checked" : ""} />
                        <span>Use current position</span>
                    </label>
                </div>

                {!credentials.use_position && (
                    <div className={"form-field-inline"}>
                        <div className={"form-field"}>
                            <input 
                                type={"text"} 
                                name={"address"}
                                value={credentials.address}
                                placeholder={"Address"}
                                onChange={(e) => handleChange(e, "address")} 
                                maxLength={255}
                            />
                        </div>

                        <div className={"form-field"}>
                            <input 
                                type={"text"} 
                                value={credentials.city} 
                                onChange={(e) => handleChange(e, "city")}
                                placeholder={"City to do a research"}
                                maxLength={255} 
                            />
                        </div>
                    </div>
                )}

                <div className={"form-field-inline mt-5"}>
                    <div className={"form-select"}>
                        <select name={"radius"} value={credentials.radius} onChange={(e) => handleChange(e, "radius")}>
                            <option value={""}>Veuillez sélectionner un rayon de recherche (en KM)</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                        </select>
                    </div>

                    <div className={"form-select"}>
                        <FuelField
                            fieldValue={credentials.fuel}
                            fieldName={"fuel"}
                            updateCredentials={(fieldName, fieldValue) => {
                                setCredentials({
                                    ...credentials,
                                    [fieldName]: fieldValue
                                })
                            }}
                        />
                    </div>
                </div>
                
                <button type={"submit"} className={"btn btn-secondary w-100"}>Search</button>
            </form>
        </>
    )
}