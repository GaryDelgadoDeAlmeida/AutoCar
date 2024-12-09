import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableCard from "../../components/TableCard";
import Pagination from "../../components/Pagination";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification"
import PrivateResources from "../../hooks/PrivateResources"

export default function Makers() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/makers?offset=${offset}`)
    
    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-green"} to={"/admin/makers/add"}>Add a maker</Link>

            <section className={"page-section"}>
                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items ?? {}).length > 0 && Object.keys(error).length == 0 && (
                            Object.keys(items.results ?? {}).length > 0 ? (
                                <>
                                    <div className={"table-list"}>
                                        {Object.values(items.results ?? {}).map((item, index) => (
                                            <TableCard 
                                                key={index}
                                                title={item.name}
                                                description={item.description}
                                                link={"/admin/brand/" + item.id}
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
                                <Notification classname={"warning"} message={"There is makers registered"} />
                            )
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}