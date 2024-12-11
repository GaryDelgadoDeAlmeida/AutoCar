import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  HeaderAdmin from "../../components/HeaderAdmin"
import PrivateResources from "../../hooks/PrivateResources"
import Notification from "../../components/Notification";
import Pagination from "../../components/Pagination";
import TableCard from "../../components/TableCard";

export default function Fuels() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/fuels?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-green"} to={"/admin/fuels/add"}>Add a fuel</Link>

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
                            Object.keys(items.results ?? {}).length > 0 ? (
                                <>
                                    <div className={"table-list"}>
                                        {Object.values(items.results).map((item, index) => (
                                            <TableCard
                                                key={index}
                                                title={item.title}
                                                description={item.price + " €/L"}
                                                link={"/admin/fuel/" + item.id}
                                                removalLink={`${window.location.origin}/api/backoffice/fuel/${item.id}/remove`}
                                            />
                                        ))}
                                    </div>

                                    <Pagination
                                        offset={offset}
                                        setOffset={setOffset}
                                        maxOffset={items.maxOffset}
                                    />
                                </>
                            ) : (
                                <Notification classname={"danger"} message={"There is no fuels registered"} />
                            )
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}