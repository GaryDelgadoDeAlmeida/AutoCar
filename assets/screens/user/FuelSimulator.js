import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import FuelSimulatorForm from "../../forms/FuelSimulatorForm";

export default function FuelSimulator() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Fuel Simulator</h1>
                    <p className={"-hero-description"}>Calculate your potential costs on fuels</p>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Fuel Simulator</span>
                    </div>
                </div>
            </section>
            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <div className={"card"}>
                        <Notification classname={"information"} message={"Any information displayed in this simulation is an estimation. Cost on fuels can be a little bit different."} />
                    </div>

                    <div className={"card"}>
                        <div className={"-header"}>
                            <label className={"-title"}>Calculate your potential costs on fuels</label>
                        </div>
                        <div className={"-content"}>
                            <FuelSimulatorForm />
                        </div>
                    </div>
                </div>
            </section>
        </Header>
    )
}