import React, { useEffect, useState } from "react";
import PrivateRessource from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";

export default function MakerField({fieldName = "maker", fieldValue, updateCredentials}) {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/makers?request=all`)

    useEffect(() => {
        load()
    }, [])

    const handleChange = (e) => {
        updateCredentials(fieldName, e.currentTarge.value)
    }

    return (
        !loading && (
            <>
                {Object.keys(error).length > 0 && (
                    <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                )}

                {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                    <select onChange={(e) => handleChange(e)} value={fieldValue}>
                        <option value={""}>Select a maker</option>
                        {Object.values(items.results).map((item, index) => (
                            <option 
                                key={index} 
                                value={item.id}
                            >{item.name}</option>
                        ))}
                    </select>
                )}
            </>
        )
    )
}