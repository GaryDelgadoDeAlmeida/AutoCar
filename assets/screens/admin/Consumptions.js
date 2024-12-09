import React, { useState, useEffect } from "react";
import TableCard from "../../components/TableCard"
import Pagination from "../../components/Pagination"
import HeaderAdmin from "../../components/HeaderAdmin"
import Notification from "../../components/Notification"
import PrivateResources from "../../hooks/PrivateResources"

export default function Consumptions() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/backoffice/consumptions?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <section className={"page-hero-2nd"}>
                <div className={"hero-wrapper"}>
                    <h1>Consumptions</h1>
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
                            Object.keys(items.results ?? {}).length > 0 ? (
                                <>
                                    <div className={"table-list"}>
                                        {Object.values(items.results).map((item, index) => (
                                            <TableCard 
                                                key={index} 
                                                title={item.title}
                                                description={item.description}
                                                link={"/admin/consumption/" + item.id}
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
                                <Notification classname={"warning"} message={"There is no consumptions details regitered"} />
                            )
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}