import React, { useEffect } from "react"
import Notification from "../../components/Notification"
import PrivateResources from "../../hooks/PrivateResources"

export default function VehicleField({fieldName = "vehicle", fieldValue = null, updateCredentials}) {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/vehicles?request=all`)

    useEffect(() => {
        load()
    }, [])

    const handleChange = (e) => {
        updateCredentials(fieldName, e.currentTarget.value)
    }

    return (
        <>
            {!loading && (
                <>
                    {Object.keys(error).length > 0 && (
                        <Notification classname={"danger"} message={""} />
                    )}

                    {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                        <select onChange={(e) => handleChange(e)} value={fieldValue}>
                            <option value={""}>Select a vehicle</option>
                            {Object.values(items.results).map((item, index) => (
                                <option value={item.id}>{`${item.name} (${(new Date(item.buildAt)).getFullYear()})`}</option>
                            ))}
                        </select>
                    )}
                </>
            )}
        </>
    )
}