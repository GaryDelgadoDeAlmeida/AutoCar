import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin"
import PrivateResources from "../../hooks/PrivateResources"
import { Link } from "react-router-dom";
import Notification from "../../components/Notification";
import Pagination from "../../components/Pagination";
import TableCard from "../../components/TableCard";
import { stripHTML } from "../../hooks/DomControl";

export default function Testimonials() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/testimonials?offset=${offset}&limit=10`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-secondary"} to={"/admin/testimonial/add"}>Add a testimonial</Link>

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
                                <>
                                    <div className={"table-list"}>
                                        {Object.values(items.results).map((item, index) => (
                                            <TableCard
                                                key={index}
                                                imgPath={item.imgPath}
                                                title={item.firstname + " " + item.lastname}
                                                description={stripHTML(item.comment)}
                                                link={"/admin/testimonial/" + item.id}
                                                removalLink={`${window.location.origin}/api/backoffice/testimonial/${item.id}/remove`}
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
                                <Notification classname={"warning"} message={"There is no testimonials registered"} />
                            )
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}