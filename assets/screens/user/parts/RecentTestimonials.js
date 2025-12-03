import React, { useEffect } from "react";
import TestimonialCard from "../../../components/TestimonialCard";
import PrivateResources from "../../../hooks/PrivateResources";
import Notification from "../../../components/Notification";

export default function RecentTestimonials() {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/testimonials`)

    useEffect(() => {
        load()
    }, [])

    return (
        <>
            {!loading && (
                <>
                    {Object.keys(error).length > 0 && (
                        <section className={"page-section"}>
                            <div className={"page-wrapper"}>
                                <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                            </div>
                        </section>
                    )}

                    {Object.keys(items.results ?? []).length > 0 && Object.keys(error).length == 0 && (
                        <section className={"page-section"}>
                            <div className={"page-background"}>
                                <img src={`${window.location.origin}/content/img/background-testimonials.jpg`} alt={""} />
                            </div>
                            <div className={"page-wrapper"}>
                                <h2 className={"page-title"}>What are our customers saying ?</h2>
                                <p className={"page-description"}>Opinions from happy customers</p>
                
                                <div className={"d-flex -g-25"}>
                                    {Object.values(items.results).map((item, index) => (
                                        <TestimonialCard 
                                            key={index}
                                            testimonial={item} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    )
}