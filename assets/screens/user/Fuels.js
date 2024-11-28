import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import TableCard from "../../components/TableCard";
import Notification from "../../components/Notification";
import PrivateRessource from "../../hooks/PrivateResources";

export default function Fuels() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/fuels`)

    useEffect(() => {
        load()
    }, [])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Fuels</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Fuels</span>
                    </div>
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    {loading && (
                        <Notification classname={"information"} message={"Loading"} />
                    )}

                    {!loading && (
                        <>
                            {Object.keys(error).length > 0 && (
                                <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                            )}

                            {Object.keys(items ?? {}).length > 0 && Object.keys(error).length == 0 && (
                                Object.values(items.results ?? {}).map((item, index) => (
                                    <TableCard
                                        key={index}
                                        title={item.title}
                                        description={`${item.price} €`}
                                        link={`/fuel/${item.id}`}
                                    />
                                ))
                            )}
                        </>
                    )}
                </div>
            </section>
        </Header>
    )
}