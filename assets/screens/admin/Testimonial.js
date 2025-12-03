import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import TestimonialForm from "../../forms/TestimonialForm";
import PrivateResources from "../../hooks/PrivateResources";

export default function Testimonial() {

    const { testimonialID } = useParams()
    if(isNaN(testimonialID)) {
        return <Navigate to={"/admin/testimonials"} />
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/backoffice/testimonial/${testimonialID}`)
    useEffect(() => {
        load()
    }, [testimonialID])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/testimonials"}>Return</Link>

            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items ?? {}).length > 0 && Object.keys(error).length == 0 && (
                            <div className={"card"}>
                                <div className={"-content"}>
                                    <TestimonialForm
                                        testimonial={items}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}