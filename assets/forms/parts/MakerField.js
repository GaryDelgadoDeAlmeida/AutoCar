import React, { useEffect, useState } from "react";
import PrivateResources from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";
import Select from "react-select";

export default function MakerField({fieldName = "maker", fieldValue, updateCredentials}) {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/makers?request=all`)

    useEffect(() => {
        load()
    }, [])

    const generateOptions = (makerOptions) => {
        let options = Object.values(makerOptions).map((item) => {
            return {
                label: item.name,
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
                    <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                )}

                {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                    <Select 
                        value={generateOptions(Object.values(items.results ?? {})).filter((option) => option.value == fieldValue)}
                        placeholder={"Select a maker"}
                        onChange={(e) => handleChange(e)}
                        options={generateOptions(Object.values(items.results ?? {}))}
                    />
                )}
            </>
        )
    )
}