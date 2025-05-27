import React, { useEffect } from "react"
import Select from "react-select"
import Notification from "../../components/Notification"
import PrivateResources from "../../hooks/PrivateResources"

export default function VehicleField({fieldName = "vehicle", fieldValue, updateCredentials}) {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/vehicles?request=all`)

    useEffect(() => {
        load()
    }, [])
    
    const generateOptions = (vehicleOptions) => {
        let options = Object.values(vehicleOptions).map((item) => {
            return {
                label: `${item.name} (${(new Date(item.buildAt)).getFullYear()})`,
                value: item.id
            }
        })

        return options
    }

    const handleChange = (e) => {
        updateCredentials(fieldName, e.value)
    }

    return (
        <>
            {!loading && (
                <>
                    {Object.keys(error).length > 0 && (
                        <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                    )}

                    {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                        <Select 
                            value={generateOptions(Object.values(items.results ?? {})).filter((option) => option.value == fieldValue)}
                            placeholder={"Select a vehicle"}
                            onChange={(e) => handleChange(e)}
                            options={generateOptions(Object.values(items.results ?? {}))}
                        />
                    )}
                </>
            )}
        </>
    )
}