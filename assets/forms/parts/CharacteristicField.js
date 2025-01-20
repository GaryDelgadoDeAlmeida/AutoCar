import React, { useEffect, useState } from "react";
import PrivateRessource from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";

export default function CharacteristicField({index, fieldName = "characteristics", characteristic, updateCredentials}) {

    const [credentials, setCredentials] = useState(characteristic ?? {
        characteristic: null,
        value: "",
    })
    
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/characteristics?request=all`)

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        updateCredentials(index, fieldName, credentials)
    }, [credentials])

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    return (
        !loading && (
            <>
                {Object.keys(error).length > 0 && (
                    <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                )}

                {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                    <div className={"form-field-inline"}>
                        <div className={"form-field"}>
                            <select onChange={(e) => handleChange(e, "characteristic")} value={credentials.characteristic} required>
                                <option value={""}>Select a characteristic</option>
                                {Object.values(items.results).map((item, index) => (
                                    <option key={index} value={item.id}>{item.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className={"form-field"}>
                            <input 
                                type={"text"}
                                value={credentials.value}
                                maxLength={255}
                                placeholder={"Characteristic value"}
                                onChange={(e) => handleChange(e, "value")}
                                required
                            />
                        </div>
                    </div>
                )}
            </>
        )
    )
}