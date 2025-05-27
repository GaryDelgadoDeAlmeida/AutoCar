import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import CharacteristicForm from "../../forms/CharacteristicForm";
import HeaderAdmin from "../../components/HeaderAdmin";
import PrivateResources from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";

export default function CharacteristicEdit() {

    const { characteristicID } = useParams()
    if(isNaN(characteristicID)) {
        return <Navigate to={"/admin/characteristics"} />
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/backoffice/characteristic/${characteristicID}`)

    useEffect(() => {
        load()
    }, [characteristicID])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-secondary"} to={"/admin/characteristics"}>Return</Link>

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
                                    <CharacteristicForm
                                        vehicle_type={items}
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