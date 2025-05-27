import React from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import CharacteristicForm from "../../forms/CharacteristicForm";

export default function CharacteristicNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-secondary"} to={"/admin/characteristics"}>Return</Link>

            <section className={"page-section"}>
                <div className={"card"}>
                    <div className={"-content"}>
                        <CharacteristicForm />
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}