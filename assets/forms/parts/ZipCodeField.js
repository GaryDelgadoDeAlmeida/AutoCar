import React, { useEffect, useState } from "react";
import PrivateResources from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";

export default function ZipCodeField({fieldValue, fieldName = "zipCode", updateCredentials}) {

    const [zipCode, setZipCode] = useState(fieldValue)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/stations/zip-codes`)

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        updateCredentials(fieldName, zipCode)
    }, [zipCode])

    const handleChange = (e) => {
        let selectedValue = e.currentTarget.value
        if(items.indexOf(selectedValue) == -1) {
            return false
        }

        setZipCode(selectedValue)
    }

    return (
        <>
            {loading && (
                <Notification classname={"information"} message={"Loading ..."} />
            )}
            
            {!loading && (
                <>
                    <select name={fieldName} onChange={(e) => handleChange(e)}>
                        <option value={""}>Veuillez sélectionner un département</option>
                        {Object.values(items).map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </>
            )}
        </>
    )
}