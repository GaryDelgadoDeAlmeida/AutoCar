import React, { useEffect } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link, Navigate, useParams } from "react-router-dom";
import PrivateRessource from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";

export default function Testimonial() {

    const { testimonialID } = useParams()
    if(isNaN(testimonialID)) {
        return <Navigate to={"/admin/testimonials"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/backoffice/testimonial/${testimonialID}`)
    useEffect(() => {
        load()
    }, [testimonialID])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-secondary"} to={"/admin/testimonials"}>Return</Link>

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
                            <Notification classname={"information"} message={"Ongoing ..."} />
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}