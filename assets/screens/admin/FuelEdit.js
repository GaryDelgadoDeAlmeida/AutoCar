import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import FuelForm from "../../forms/FuelForm";
import PrivateResources from "../../hooks/PrivateResources"
import Notification from "../../components/Notification";

export default function FuelEdit() {

    const { fuelID } = useParams()
    if(isNaN(fuelID)) {
        return <Navigate to={"/admin/fuels"} />
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/fuel/${fuelID}`)
    useEffect(() => {
        load()
    }, [fuelID])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/fuels"}>Return</Link>

            <section className={"page-section mt-25"}>
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
                                <div className={"-header"}>
                                    <label className={"-title"}>Edit the fuel</label>
                                </div>
                                <div className={"-content"}>
                                    <FuelForm fuel={items} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}