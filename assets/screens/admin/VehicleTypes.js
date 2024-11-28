import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableCard from "../../components/TableCard"
import HeaderAdmin from "../../components/HeaderAdmin"
import Notification from "../../components/Notification"
import PrivateResources from "../../hooks/PrivateResources"
import Pagination from "../../components/Pagination";

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
                            <>
                                <div className={"table-list"}>
                                    <TableCard
                                        title={"SUV"}
                                        link={""}
                                    />
                                    <TableCard
                                        title={"Pick-up"}
                                        link={""}
                                    />
                                    <TableCard
                                        title={"Coupe"}
                                        link={""}
                                    />
                                    <TableCard
                                        title={"Sport cars"}
                                        link={""}
                                    />
                                    <TableCard
                                        title={"Sedan"}
                                        link={""}
                                    />
                                    <TableCard
                                        title={"Hatchback"}
                                        link={""}
                                    />
                                </div>

                                <Pagination
                                    maxOffset={1}
                                    offset={offset}
                                    setOffset={setOffset}
                                />
                            </>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}