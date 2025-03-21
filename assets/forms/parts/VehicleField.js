import React, { useEffect } from "react"
import Select from "react-select"
import Notification from "../../components/Notification"
import PrivateResources from "../../hooks/PrivateResources"
import { generateVehicleOptions } from "../../hooks/DomControl"

export default function VehicleField({fieldName = "vehicle", updateCredentials}) {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/vehicles?request=all`)

    useEffect(() => {
        load()
    }, [])

    const handleChange = (e) => {
        updateCredentials(fieldName, e.value)
    }

    return (
        <>
            {!loading && (
                <>
                    {Object.keys(error).length > 0 && (
                        <Notification classname={"danger"} message={""} />
                    )}

                    {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                        <Select 
                            placeholder={"Select a vehicle"}
                            onChange={(e) => handleChange(e)}
                            options={generateVehicleOptions(Object.values(items.results ?? {}))}
                        />
                    )}
                </>
            )}
        </>
    )
}