import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import TestimonialForm from "../../forms/TestimonialForm";
import { Link } from "react-router-dom";

export default function TestimonialNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/testimonials"}>Return</Link>

            <section className={"page-section"}>
                <div className={"card"}>
                    <div className={"-content"}>
                        <TestimonialForm />
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}