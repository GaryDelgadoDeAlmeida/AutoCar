import React, { useState } from "react";
import Notification from "../components/Notification";

export default function FuelSimulatorForm() {

    const [calculResponse, setCalculResponse] = useState(0)
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        fuel_type: "",
        km: 0,
        vehicul_median_fuel_conso: 0,
        round_trip: false,
        calcul_week: false,
        calcul_month: false,
        calcul_year: false
    })

    const fuels = [
        {
            value: "diesel",
            text: "Diesel (B7)",
            price: 1.741
        },
        {
            value: "e5",
            text: "E5 Essence sans plomb 98 (SP98)",
            price: 1.934
        },
        {
            value: "e5",
            text: "E5 Essence sans plomb 95 (SP95)",
            price: 1.855
        },
        {
            value: "e10-s98",
            text: "Essence sans plomb E10 (SP98-E-10)",
            price: 1.897
        },
        {
            value: "e10-s95",
            text: "Essence sans plomb E10 (SP95-E-10)",
            price: 1.833
        },
        {
            value: "essence-e85",
            text: "BioEthanol (E85)",
            price: 0.857
        },
        // {
        //     value: "gazole",
        //     text: "Gazole (B7)",
        //     price: 1.741
        // },
        {
            value: "electritity",
            text: "Electricité"
        },
        {
            value: "gpl-c",
            text: "GPL-c",
            price: 0.995
        },
        {
            value: "gaz",
            text: "Gaz naturel véhicule (GNV)",
            price: 1.078
        }
        // {
        //     value: "gazole-b30",
        //     text: "Gazole B30"
        // },
        // {
        //     value: "gazole-b100",
        //     text: "Gazole B100"
        // },
        // {
        //     value: "ed95",
        //     text: "ED95"
        // },
        // {
        //     value: "hydrogene",
        //     text: "Hydrogène"
        // }
    ]

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

        let fuel = fuels.filter((item) => item.value == credentials.fuel_type)
        if(fuel.length == 0) {
            setFormResponse({
                classname: "danger",
                message: "A fuel must be select in order to processed to the simulation"
            })
            return
        }

        fuel = fuel[0]

        // Formule
        // Price to €/L
        // nombre de km x prix carburant au litre x la consommation du véhicule au km
        setCalculResponse(parseFloat(fuel.price) * (parseFloat(credentials.vehicul_median_fuel_conso) * parseFloat(credentials.km)))
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                <div className={"form-field"}>
                    <label>Type de carburant</label>
                    <select onChange={(e) => handleChange(e, "fuel_type")}>
                        <option value={""}>Select a fuel</option>
                        {fuels.map((fuel, index) => (
                            <option key={index} value={fuel.value}>{fuel.text}</option>
                        ))}
                    </select>
                </div>

                <div className={"form-field"}>
                    <label>Kilomètre à parcourir</label>
                    <input 
                        type={"number"} 
                        min={0}
                        step={".01"}
                        value={credentials.km}
                        onChange={(e) => handleChange(e, "km")} 
                    />
                </div>

                <div className={"form-field"}>
                    <label>Consommation moyen de carburant sur 1 kilomètre</label>
                    <input 
                        type={"number"}
                        min={0}
                        step={".001"}
                        value={credentials.vehicul_median_fuel_conso}
                        onChange={(e) => handleChange(e, "vehicul_median_fuel_conso")}
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
                            <span>Pour le trajet sur 1 mois (aller-retour), il faudra déboursé : <b>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(((calculResponse * 2) * 5) * 4)} / mois</b></span>
                        )}

                        {credentials.calcul_year && (
                            <span>Pour le trajet sur 1 an (aller-retour), il faudra déboursé : <b>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format((((calculResponse * 2) * 5) * 4) * 12)} / mois</b></span>
                        )}
                    </div>
                )}
            </form>
        </>
    )
}