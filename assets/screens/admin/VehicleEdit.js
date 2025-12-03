import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PrivateResources from "../../hooks/PrivateResources";
import HeaderAdmin from "../../components/HeaderAdmin";
import VehicleForm from "../../forms/VehicleForm";
import Notification from "../../components/Notification";

export default function VehicleEdit() {

    const { vehicleID } = useParams()
    if(isNaN(vehicleID)) {
        return <Navigate to={"/admin/vehicles"} />
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/vehicle/${vehicleID}`)

    useEffect(() => {
        load()
    }, [vehicleID])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-secondary"} to={"/admin/vehicles"}>Return</Link>

            <section className={"page-hero-2nd"}>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Vehicle edit</h1>
                </div>
            </section>

            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}
                
                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                            <div className={"card"}>
                                <div className={"-content"}>
                                    <VehicleForm 
                                        vehicle={items} 
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}