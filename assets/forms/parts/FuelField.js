import React, { useEffect } from "react";
import PrivateResources from "../../hooks/PrivateResources"

export default function FuelField() {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/vehicle-types`)

    useEffect(() => {
        load()
    }, [])

    return (
        <select>
            <option value={""}>Select a vehicle type</option>
            {!loading && Object.keys(items ?? {}).length > 0 && (
                Object.values(items.results ?? {}).map((item, index) => (
                    <option value={item.id}>{item.type}</option>
                ))
            )}
        </select>
    )
}