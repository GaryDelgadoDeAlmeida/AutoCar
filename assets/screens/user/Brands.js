import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import PrivateRessource from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";

export default function Brands() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/brands?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Brands</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Brands</span>
                    </div>
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    {loading && (
                        <Notification classname={"information"} message={"Loading ..."} />
                    )}

                    {!loading && (
                        <>
                            {Object.keys(error).length > 0 && (
                                <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                            )}

                            {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                                <>
                                    {Object.keys(items.results ?? {}).length > 0 ? (
                                        <div className={""}>
                                            {Object.values(items.results ?? {}).map((item, index) => (
                                                <div key={index} className={"brand-card"}></div>
                                            ))}
                                        </div>
                                    ) : (
                                        <Notification classname={"danger"} message={"No brands has been found"} />
                                    )}
                                    
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
            </section>
        </Header>
    )
}