import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Link, Navigate, useParams } from "react-router-dom";
import PrivateRessource from "../../hooks/PrivateResources";

export default function Vehicle() {

    const { vehicleID } = useParams()
    if(isNaN(vehicleID)) {
        return <Navigate to={"/vehicles"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/vehicle/${vehicleID}`)

    useEffect(() => {
        load()
    }, [vehicleID])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Vehicle</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/vehicles"}>Vehicles</Link>
                        <span>Vehicle</span>
                    </div>
                </div>
            </section>
            
            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <p>Hello world</p>
                </div>
            </section>
        </Header>
    )
}