import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin"
import Notification from "../../components/Notification";
import Pagination from "../../components/Pagination"
import PrivateResources from "../../hooks/PrivateResources"
import TableCard from "../../components/TableCard";
import SearchStationsForm from "../../forms/SearchStationsForm";

export default function Stations() {

    const [offset, setOffset] = useState(1)
    const [credentials, setCredentials] = useState({})
    const { loading, items, load, error } = PrivateResources(
        Object.keys(credentials).length === 0 
            ? `${window.location.origin}/api/stations?offset=${offset}` 
            : `${window.location.origin}/api/stations/search?offset=${offset}` + "&" + new URLSearchParams(credentials).toString()
    )

    useEffect(() => {
        load()
    }, [offset, credentials])

    return (
        <HeaderAdmin>
            <div className={"page-hero-2nd"}>
                <div className={"hero-background"}></div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Stations</h1>
                </div>
            </div>

            <section className={"page-section"}>
                <SearchStationsForm
                    useLocationOption={false}
                    updateParentCredentials={(childCredentials) => {
                        setCredentials({
                            ...credentials,
                            ...childCredentials,
                            request: "search"
                        })
                        setOffset(1)
                    }}
                />
            </section>

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