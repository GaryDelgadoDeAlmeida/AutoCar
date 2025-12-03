import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin"
import Notification from "../../components/Notification";
import Pagination from "../../components/Pagination"
import PrivateResources from "../../hooks/PrivateResources"
import { Link } from "react-router-dom";
import TableCard from "../../components/TableCard";

export default function Stations() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/stations?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <div className={"page-hero-2nd"}>
                <div className={"hero-background"}></div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Stations</h1>
                </div>
            </div>

            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && Object.keys(items).length == 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                            <>
                                <div className={"table-list"}>
                                    {Object.values(items.results).map((item, index) => (
                                        <TableCard
                                            key={index}
                                            title={item.address}
                                            description={`${item.zipCode} ${item.city}`}
                                            link={`/admin/station/${item.id}`}
                                        />
                                    ))}
                                </div>
                                
                                <Pagination 
                                    offset={offset}
                                    setOffset={setOffset}
                                    maxOffset={items.maxOffset}
                                />
                            </>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}