import React from "react";
import TestimonialCard from "../../../components/TestimonialCard";

export default function RecentTestimonials() {

    return (
        <section className={"page-section"}>
            <div className={"page-background"}>
                <img src={`${window.location.origin}/content/img/background-testimonials.jpg`} alt={""} />
            </div>
            <div className={"page-wrapper"}>
                <h2 className={"page-title"}>What are our customers saying ?</h2>
                <p className={"page-description"}>Opinions from happy customers</p>

                <div className={"d-flex -g-25"}>
                    <TestimonialCard testimonial={{
                        comment: "We are a gallery dealer. Before we met this site, our sales where sluggish.",
                        photo: "/content/img/testimonials/man1.png",
                        firstname: "Adam",
                        lastname: ""
                    }} />
                    <TestimonialCard testimonial={{
                        comment: "One of the quality websites I apply to rent a car.",
                        photo: "/content/img/testimonials/testimonial2-1.png",
                        firstname: "Cristian",
                        lastname: ""
                    }} />
                    <TestimonialCard testimonial={{
                        comment: "I was trying to sell my car. And I put it here and sold it for more that it was worth.",
                        photo: "/content/img/testimonials/man2.png",
                        firstname: "Robet",
                        lastname: ""
                    }} />
                    <TestimonialCard testimonial={{
                        comment: "A fast and reliable selling site. Rare qualite website with hundreds of model vehicles.",
                        photo: "/content/img/testimonials/testimonial4-1.png",
                        firstname: "Marie",
                        lastname: ""
                    }} />
                </div>
            </div>
        </section>
    )
}