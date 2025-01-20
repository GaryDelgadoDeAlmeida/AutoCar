import React, { useEffect } from "react";
import PrivateResources from "../../hooks/PrivateResources"
import Notification from "../../components/Notification";

export default function FuelField({fieldName = "fuel", fieldValue, updateCredentials}) {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/fuels`)

    useEffect(() => {
        load()
    }, [])

    const handleChange = (e) => {
        updateCredentials(fieldName, e.currentTarget.value)
    }

    return (
        !loading && (
            <>
                {Object.keys(error).length > 0 && (
                    <Notification classname={"danger"} message={error.responsa.data.message ?? error.responsa.data.detail} />
                )}

                {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                    <select onChange={(e) => handleChange(e)} value={fieldValue}>
                        <option value={""}>Select a vehicle fuel</option>
                        {Object.values(items.results ?? {}).map((item, index) => (
                            <option 
                                key={index} 
                                value={item.id}
                            >{item.title}</option>
                        ))}
                    </select>
                )}
            </>
        )
    )
}