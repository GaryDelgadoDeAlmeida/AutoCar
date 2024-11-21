import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PrivateRessource from "../../hooks/PrivateResources";
import Header from "../../components/Header";

export default function Brand() {

    const { makerID } = useParams()
    if(isNaN(makerID)) {
        return <Navigate to={"/makers"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/maker/${makerID}`)
    useEffect(() => {
        load()
    }, [makerID])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Maker</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/makers"}>Makers</Link>
                        <span>Maker</span>
                    </div>
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Maker personnal datas</h2>
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Maker products model</h2>
                </div>
            </section>
        </Header>
    )
}