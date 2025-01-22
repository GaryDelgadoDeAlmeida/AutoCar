import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableCard from "../../components/TableCard"
import HeaderAdmin from "../../components/HeaderAdmin"
import Notification from "../../components/Notification"
import PrivateResources from "../../hooks/PrivateResources"

export default function VehicleTypes() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/vehicle-types?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-green"} to={"/admin/vehicle-types/add"}>Add a car type</Link>

            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items ?? {}).length > 0 && Object.keys(error).length == 0 && (
                            Object.keys(items.results).length > 0 ? (
                                <div className={"table-list"}>
                                    {Object.values(items.results).map((item, index) => (
                                        <TableCard
                                            key={index}
                                            title={item.type}
                                            link={"/admin/vehicles-type/" + item.id}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Notification classname={"warning"} message={"There is no vehicle type registered"} />
                            )
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}