import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import LinearChart from "../../components/LinearChart";

export default function FuelsHistory() {

    return (
        <HeaderAdmin>
            <section className={"page-section"}>
                <LinearChart />
            </section>
        </HeaderAdmin>
    )
}