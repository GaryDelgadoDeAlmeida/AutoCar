import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import VehicleTypeForm from "../../forms/VehicleTypeForm";
import PrivateResources from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";

export default function VehicleTypeEdit() {

    const { vehicleTypeID } = useParams()
    if(isNaN(vehicleTypeID)) {
        return <Navigate to={"/admin/vehicle-type"} />
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/vehicle-type/${vehicleTypeID}`)

    useEffect(() => {
        load()
    }, [vehicleTypeID])

    return (
        <HeaderAdmin>
            <section className={"page-hero-2nd"}>
                <div className={"hero-wrapper"}>
                    <h1>Edit a vehicle type</h1>
                    <Link className={"btn btn-secondary"} to={"/admin/vehicle-types"}>Return</Link>
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
                                    <VehicleTypeForm vehicle_type={items} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}