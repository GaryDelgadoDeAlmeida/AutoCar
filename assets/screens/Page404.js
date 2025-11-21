import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Page404() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-wrapper"}>
                    <h1>404 Page not found</h1>
                </div>
            </section>
            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h1 className={"txt-left"}>404 Page not found</h1>
                    <p>My bad, the page your are looking for don't exist.</p>
                    <div className={"mt-25"}>
                        <Link className={"btn btn-secondary"} to={"/"}>Back to home</Link>
                    </div>
                </div>
            </section>
        </Header>
    )
}