import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link } from "react-router-dom";
import FuelForm from "../../forms/FuelForm";

export default function FuelNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/fuels"}>Return</Link>

            <section className={"page-section mt-25"}>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label className={"-title"}>Add a new fuel type</label>
                    </div>
                    <div className={"-content"}>
                        <FuelForm />
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}