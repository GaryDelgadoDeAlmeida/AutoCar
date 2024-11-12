import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateResources from "../../hooks/PrivateResources";
import { Link } from "react-router-dom";

export default function Articles() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/blogs?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-green"} to={"/admin/blog/add"}>Add an article</Link>

            <div className={"page-section"}>
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
                                    {Object.values(items.results).map((item, index) => (
                                        <Link key={index} className={"table-card"} to={"/admin/blog/" + item.id}>{item.title}</Link>
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
            </div>
        </HeaderAdmin>
    )
}