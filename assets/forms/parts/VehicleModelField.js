import React, { useEffect } from "react";
import Select from "react-select";
import PrivateRessource from "../../hooks/PrivateResources";

export default function VehicleModelField({fieldName = "model", fieldValue, updateCredentials}) {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/vehicle/models`)

    useEffect(() => {
        load()
    }, [])

    const generateOptions = (modelsOptions) => {
        let options = Object.values(modelsOptions).map((item) => {
            return {
                label: item.basemodel,
                value: item.basemodel
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
                            placeholder={"Select a model"}
                            onChange={(e) => handleChange(e)}
                            options={generateOptions(Object.values(items.results ?? {}))}
                        />
                    )}
                </>
            )}
        </>
    )
}