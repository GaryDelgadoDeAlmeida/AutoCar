import React from "react";

export default function TestimonialCard({testimonial}) {

    return (
        <div className={"testimonial-card"}>
            <div className={"-content"}>
                <p>{testimonial.comment}</p>
                <img src={`${window.location.origin}${testimonial.photo}`} alt={""} />
                <label>{testimonial.firstname + " " + testimonial.lastname}</label>
            </div>
        </div>
    )
}