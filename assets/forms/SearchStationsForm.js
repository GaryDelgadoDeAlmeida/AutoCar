import React, { useEffect, useState } from "react";
import ZipCodeField from "./parts/ZipCodeField";
import axios from "axios";
import FuelField from "./parts/FuelField";

export default function SearchStationsForm() {

    const [locations, setLocations] = useState({})
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        address: "",
        radius: "",
        zipCode: "",
        fuel: "",
        use_position: false
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

        console.log(credentials)

        // Search
        axios
            .post(`${window.location.origin}/api/stations/search`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then((response) => {})
            .catch((error) => {})
        ;
    }

    return (
        <>
            <form className={"form bg-white p-25"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-checkbox"}>
                    <label>
                        <input type={"checkbox"} name={"use_position"} onChange={(e) => handleChange(e, "use_position")} checked={credentials.use_position ? "checked" : ""} />
                        <span>Use current position</span>
                    </label>
                </div>

                {!credentials.use_position && (
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
                )}

                <div className={"form-field-inline"}>
                    <div className={"form-select"}>
                        <select name={"radius"} value={credentials.radius} onChange={(e) => handleChange(e, "radius")}>
                            <option value={""}>Veuillez sélectionner un rayon de recherche (en KM)</option>
                            <option value={"1"}>1</option>
                            <option value={"2"}>2</option>
                            <option value={"3"}>3</option>
                            <option value={"5"}>5</option>
                            <option value={"10"}>10</option>
                        </select>
                    </div>
                    <div className={"form-select"}>
                        <ZipCodeField
                            fieldValue={credentials.zipCode}
                            fieldName={"zipCode"}
                            updateCredentials={(fieldName, fieldValue) => {
                                setCredentials({
                                    ...credentials,
                                    [fieldName]: fieldValue
                                })
                            }}
                        />
                    </div>
                </div>

                <div className={"form-field"}>
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
                
                <button type={"submit"} className={"btn btn-secondary w-100"}>Search</button>
            </form>
        </>
    )
}