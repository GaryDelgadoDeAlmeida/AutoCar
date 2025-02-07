import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
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
            <Link className={"btn btn-secondary"} to={"/admin/vehicles"}>Return</Link>
            
            <section className={"page-section"}>
                <h2 className={"page-title"}>Vehicle</h2>
                
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                            <div className={""}>
                                <h2>{items.name}</h2>
                            </div>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}