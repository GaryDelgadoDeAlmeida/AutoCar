import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import ConsumptionForm from "../../forms/ConsumptionForm";
import PrivateResources from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";

export default function ConsumptionEdit() {

    const { consumptionID } = useParams()
    if(isNaN(consumptionID)) {
        return <Navigate to={"/consumptions"} />
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/backoffice/consumption/${consumptionID}`)

    useEffect(() => {
        load()
    }, [consumptionID])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/consumptions"}>Return</Link>

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
                                    <ConsumptionForm consumption={items} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}