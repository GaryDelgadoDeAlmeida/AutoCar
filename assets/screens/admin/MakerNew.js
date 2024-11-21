import React from "react";
import { Link } from "react-router-dom";
import MakerForm from "../../forms/MakerForm";
import HeaderAdmin from "../../components/HeaderAdmin";

export default function MakerNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/makers"}>Return</Link>

            <section className={"page-section"}>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label className={"-title"}>Add a car maker</label>
                    </div>
                    <div className={"-content"}>
                        <MakerForm />
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}