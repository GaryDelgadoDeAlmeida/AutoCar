import React, { useEffect, useState } from "react";
import TableCard from "../../components/TableCard"
import Pagination from "../../components/Pagination"
import HeaderAdmin from "../../components/HeaderAdmin"
import Notification from "../../components/Notification"
import PrivateResources from "../../hooks/PrivateResources"

export default function Newsletters() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/backoffice/newsletters?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <section className={"page-hero-2nd"}>
                <div className={"hero-wrapper"}>
                    <h1>Newsletters</h1>
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

                        {Object.keys(items ?? {}).length > 0 && Object.keys(error).length == 0 && (
                            Object.keys(items.results ?? {}).length > 0 ? (
                                <>
                                    <div className={"table-list"}>
                                        {Object.values(items.results).map((item, index) => (
                                            <TableCard
                                                key={index}
                                                title={item.email}
                                                removalLink={`${window.location.origin}/api/backoffice/newsletter/${item.id}/remove`}
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
                                <Notification classname={"warning"} message={"There is no one registered in the newsletters"} />
                            )
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}