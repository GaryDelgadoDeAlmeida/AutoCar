import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import VehicleForm from "../../forms/VechicleForm";
import { Link } from "react-router-dom";

export default function VehicleNew() {

    return (
        <HeaderAdmin>
            <section className={"page-hero-2nd"}>
                <div className={"hero-wrapper"}>
                    <h1>Add a vehicle</h1>
                </div>
            </section>

            <section className={"page-section"}>
                <Link className={"btn btn-blue"} to={"/admin/vehicles"}>Return</Link>
                <div className={"card mt-25"}>
                    <div className={"-content"}>
                        <VehicleForm />
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}