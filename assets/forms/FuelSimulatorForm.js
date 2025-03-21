import React, { useState } from "react";
import Notification from "../components/Notification";
import VehicleField from "./parts/VehicleField";
import axios from "axios";

export default function FuelSimulatorForm({vehicleID = null}) {

    const [calculResponse, setCalculResponse] = useState(0)
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        vehicle: vehicleID,
        km: 0,
        round_trip: false,
        calcul_week: false,
        calcul_month: false,
        calcul_year: false
    })

    const handleChange = (e, fieldName) => {
        let fieldValue = e.currentTarget.value
        if(fieldName == "fuel_type") {
            let fuel = fuels.filter((item) => item.value == fieldValue)
            if(fuel.length == 0) {
                setFormResponse({classname: "danger", message: "Veuillez sélectionner un type de carburant dans la liste donnée"})
                return
            }
            fuel = fuel[0]
        } else if(fieldName == "km") {
            if(fieldValue < 0) {
                setFormResponse({classname: "danger", message: "Veuillez renseigner un kilomètrage supérieur à 0"})
                return
            }

            fieldValue = parseFloat(fieldValue)
        } else if(fieldName == "vehicul_median_fuel_conso") {
            if(fieldValue < 0) {
                setFormResponse({classname: "danger", message: "Veuillez renseigner une consommation de carburant moyen, selon votre véhicule, supérieur à 0"})
                return
            }

            fieldValue = parseFloat(fieldValue)
        } else if(["round_trip", "calcul_week", "calcul_month", "calcul_year"].indexOf(fieldName) != -1) {
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

        if(!credentials.vehicle) {
            setFormResponse({classname: "danger", message: "The vehicle must be select in order to processed to the simulation"})
            return
        }

        axios
            .post(`${window.location.origin}/api/fuel-simulator`, credentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                setCalculResponse(response.data.calcOneshotTrip)
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please retry later"
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
                {!vehicleID && (
                    <div className={"form-field"}>
                        <label>Voiture</label>
                        <VehicleField
                            updateCredentials={(fieldName, fieldValue) => {
                                setCredentials({
                                    ...credentials,
                                    [fieldName]: fieldValue
                                })
                            }}
                        />
                    </div>
                )}

                <div className={"form-field"}>
                    <label>Kilomètre à parcourir</label>
                    <input 
                        type={"number"} 
                        min={0}
                        step={".001"}
                        value={credentials.km}
                        onChange={(e) => handleChange(e, "km")} 
                    />
                </div>

                <div className={"form-field"}>
                    <label>
                        <input type={"checkbox"} onChange={(e) => handleChange(e, "round_trip")} checked={credentials.round_trip} />
                        <span>Calculer sur un trajet aller-retour</span>
                    </label>
                    <label>
                        <input type={"checkbox"} onChange={(e) => handleChange(e, "calcul_week")} checked={credentials.calcul_week} />
                        <span>Caculer sur le trajet sur 1 semaine (aller-retour)</span>
                    </label>
                    <label>
                        <input type={"checkbox"} onChange={(e) => handleChange(e, "calcul_month")} checked={credentials.calcul_month} />
                        <span>Calculer le trajet sur 1 mois</span>
                    </label>
                    <label>
                        <input type={"checkbox"} onChange={(e) => handleChange(e, "calcul_year")} checked={credentials.calcul_year} />
                        <span>Calculer le trajet sur 1 an</span>
                    </label>
                </div>

                <div className={"form-actions"}>
                    <button className={"btn btn-secondary btn-rounded btn-m"} type={"submit"}>Simuler</button>
                </div>

                {calculResponse > 0 && (
                    <div className={"form-simulator-response"}>
                        <span>Pour un aller simple, il faudra déboursé : <b>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(calculResponse)}</b></span>
                        
                        {credentials.round_trip && (
                            <span>Pour le trajet aller-retour, il faudra déboursé : <b>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(calculResponse * 2)}</b></span>
                        )}

                        {credentials.calcul_week && (
                            <span>Pour le trajet sur 1 semaine (aller-retour), il faudra déboursé : <b>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format((calculResponse * 2) * 5)} / semaine (5j)</b></span>
                        )}

                        {credentials.calcul_month && (
                            <span>Pour le trajet sur 1 mois (aller-retour), il faudra déboursé : <b>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format((calculResponse * 2) * (5 * 4))} / mois</b></span>
                        )}

                        {credentials.calcul_year && (
                            <span>Pour le trajet sur 1 an (aller-retour), il faudra déboursé : <b>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(((calculResponse * 2) * ((5 * 4) * 12)))} / année</b></span>
                        )}
                    </div>
                )}
            </form>
        </>
    )
}