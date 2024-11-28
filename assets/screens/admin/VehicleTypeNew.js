import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import VehicleTypeForm from "../../forms/VehicleTypeForm";
import { Link } from "react-router-dom";

export default function VehicleTypeNew() {

    return (
        <HeaderAdmin>
            <section className={"page-hero-2nd"}>
                <div className={"hero-wrapper"}>
                    <h1>Add a vehicle type</h1>
                    <Link className={"btn btn-secondary"} to={"/admin/vehicle-types"}>Return</Link>
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"card"}>
                    <div className={"-content"}>
                        <VehicleTypeForm />
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}