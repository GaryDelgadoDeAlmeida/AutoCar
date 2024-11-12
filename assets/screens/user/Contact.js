import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import ContactForm from "../../forms/ContactForm"
import Map from "./parts/Map";

export default function Contact() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Contact</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Contact</span>
                    </div>
                </div>
            </section>
            
            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <div className={"card"}>
                        <div className={"-header"}>
                            <label className={"-title"}>Your need an information ?</label>
                            <span>Feel free to contact us.</span>
                        </div>
                        <div className={"-content"}>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <div className={"page-section p-0-force hm-500px"}>
                <Map />
            </div>
        </Header>
    )
}