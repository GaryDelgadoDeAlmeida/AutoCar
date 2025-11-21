import React from "react";
import { stripHTML } from "../hooks/DomControl";

export default function TestimonialCard({testimonial}) {

    return (
        <div className={"testimonial-card"}>
            <div className={"-content"}>
                <p>{stripHTML(testimonial.comment)}</p>
                
                {testimonial.photo && (
                    <img src={`${window.location.origin}${testimonial.photo}`} alt={""} />
                )}

                <label>{testimonial.firstname + " " + testimonial.lastname}</label>
            </div>
        </div>
    )
}