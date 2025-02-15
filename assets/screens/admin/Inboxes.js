import React, { useEffect, useState } from "react";
import TableCard from "../../components/TableCard"
import Pagination from "../../components/Pagination"
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateRessource from "../../hooks/PrivateResources";

export default function Inboxes() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/backoffice/inboxes?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
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
                            Object.keys(items.results).length > 0 ? (
                                <>
                                    <div className={"table-list"}>
                                        {Object.values(items.results).map((item, index) => (
                                            <TableCard
                                                key={index}
                                                title={item.subject}
                                                description={item.email}
                                                link={`/admin/inbox/${item.id}`}
                                                removalLink={`${window.location.origin}/api/backoffice/inbox/${item.id}/remove`}
                                            />
                                        ))}
                                    </div>

                                    <Pagination />
                                </>
                            ) : (
                                <Notification classname={"danger"} message={"There is no message"} />
                            )
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}