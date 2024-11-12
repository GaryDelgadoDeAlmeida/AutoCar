import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import PrivateRessource from "../../hooks/PrivateResources";
import Header from "../../components/Header";

export default function Brand() {

    const { brandID } = useParams()
    if(isNaN(brandID)) {
        return <Navigate to={"/brands"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/brand/${brandID}`)
    useEffect(() => {
        load()
    }, [brandID])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Brand</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Brand</span>
                    </div>
                </div>
            </section>
        </Header>
    )
}