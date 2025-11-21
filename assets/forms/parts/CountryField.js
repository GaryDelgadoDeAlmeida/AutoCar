import React from "react";

export default function CountryField({fieldName = "country", fieldValue = null, updateCredentials}) {

    return (
        <select onChange={(e) => updateCredentials(fieldName, e.currentTarget.value)} value={fieldValue}>
            <option value={""}>Select a country</option>
        </select>
    )
}