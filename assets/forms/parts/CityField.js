import React, { useEffect } from "react";
import PrivateResources from "../../hooks/PrivateResources";
import Select from "react-select/base";
import Notification from "../../components/Notification";

export default function CityField({fieldValue, fieldName = "city", updateCredentials}) {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/stations/cities`)

    useEffect(() => {
        load()
    }, [])

    const generateOptions = (makerOptions) => {
        let options = Object.values(makerOptions).map((item) => {
            console.log(item)
            return {
                label: item,
                value: item
            }
        })
    
        return options
    }

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
                    <Select 
                        value={generateOptions(Object.values(items ?? {})).filter((option) => option == fieldValue)}
                        placeholder={"Select a city"}
                        onChange={(e) => handleChange(e)}
                        options={generateOptions(Object.values(items ?? {}))}
                    />
                )}
            </>
        )
    )
}