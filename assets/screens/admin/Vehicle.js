import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import PrivateResources from "../../hooks/PrivateResources"

export default function Vehicle() {

    const { vehicleID } = useParams()
    if(isNaN(vehicleID)) {
        return <Navigate to={"/admin/cars"} />
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/vehicle/${vehicleID}`)

    useEffect(() => {
        load()
    }, [vehicleID])

    return (
        <HeaderAdmin>
            <section className={"page-section"}>
                <h2 className={"page-title"}>Vehicles</h2>
            </section>
        </HeaderAdmin>
    )
}