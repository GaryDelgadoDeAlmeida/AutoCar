import React, { useEffect } from "react";
import Select from "react-select";
import Notification from "../../components/Notification";
import PrivateResources from "../../hooks/PrivateResources"

export default function FuelField({fieldName = "fuel", fieldValue, updateCredentials}) {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/fuels`)

    useEffect(() => {
        load()
    }, [])

    const generateOptions = (makerOptions) => {
        let options = Object.values(makerOptions).map((item) => {
            return {
                label: item.title,
                value: item.id
            }
        })
    
        return options
    }

    const handleChange = (e) => {
        updateCredentials(fieldName, e.value)
    }

    return (
        !loading && (
            <>
                {Object.keys(error).length > 0 && (
                    <Notification classname={"danger"} message={error.responsa.data.message ?? error.responsa.data.detail} />
                )}

                {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                    <Select 
                        value={generateOptions(Object.values(items.results ?? {})).filter((option) => option.value == fieldValue)}
                        placeholder={"Select a fuel"}
                        onChange={(e) => handleChange(e)}
                        options={generateOptions(Object.values(items.results ?? {}))}
                    />
                )}
            </>
        )
    )
}