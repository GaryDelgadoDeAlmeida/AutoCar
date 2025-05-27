import React from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import ConsumptionForm from "../../forms/ConsumptionForm";

export default function ConsumptionNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/consumptions"}>Return</Link>

            <section className={"page-section"}>
                <div className={"card"}>
                    <div className={"-content"}>
                        <ConsumptionForm />
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}