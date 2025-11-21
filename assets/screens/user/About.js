import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

export default function About() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>About</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>About</span>
                    </div>
                </div>
            </section>

            <section className={"page-about"}>
                <div className={"page-wrapper"}>
                    <div className={"about-widget"}>
                        <div className={"-left"}>
                            <img src={`${window.location.origin}/content/img/background-about-1.png`} alt={""} />
                            <img src={`${window.location.origin}/content/img/background-about-2.png`} alt={""} />
                            <div className={"d-flex jf-start"}>
                                <div className={"bubble bubble-secondary"}>
                                    <label className={"-title"}>24</label>
                                    <span className={"-description"}>Years of Experience</span>
                                </div>
                            </div>
                            <div className={"d-flex jf-end mt-100"}>
                                <div className={"bubble bubble-secondary"}>
                                    <label className={"-title"}>240</label>
                                    <span className={"-description"}>Special Expert Team</span>
                                </div>
                            </div>
                        </div>
                        <div className={"-right"}>
                            <h2>Want to buy or sell a vehicle ?</h2>
                            <p>You can put your vehicles for sales by registering on our website. Whether your are a dealer or sell personally. Sell your vehicle in the most profitable way. With this system, which has million of members, you will be able to buy and sell vehicles quickly.</p>
                            <div className={"d-col -g-25 py-25"}>
                                <div className={"d-flex -g-15"}>
                                    <img className={"w-50px"} src={`${window.location.origin}/content/svg/car.svg`} alt={""} />
                                    <div className={"d-col -g-5 mx-auto -item"}>
                                        <label className={"fw-bold fs-20"}>Model vehicles</label>
                                        <span>We are sure that you will find vehicles of suitable models on our website.</span>
                                    </div>
                                </div>
                                <div className={"d-flex -g-15"}>
                                    <img className={"w-50px"} src={`${window.location.origin}/content/svg/car-repair.svg`} alt={""} />
                                    <div className={"d-col -g-5 mx-auto -item"}>
                                        <label className={"fw-bold fs-20"}>2nd Hand Vehicules</label>
                                        <span>You put your used vehicles for sale bu adding them to our website.</span>
                                    </div>
                                </div>
                            </div>

                            {/* <div className={"mt-25"}>
                                <Link className={"btn btn-secondary btn-m fw-bold btn-mx"} to={"/about"}>Get to know us</Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <div className={"d-grid -col-4 -g-25"}>
                        <div className={"card"}>
                            <div className={"-content txt-center"}>
                                <div className={"-svg my-auto"}>
                                    <img src={`${window.location.origin}/content/svg/safety-protection-helmet-white.svg`} alt={""} />
                                </div>
                                <span className={"fw-bold fs-18"}>Reliability</span>
                                <div className={"d-none"}>
                                    <p>We provide accurate, reliable and ethical services with our expert staff. We apply the fastest and most reliable methods for your brand.</p>
                                </div>
                            </div>
                        </div>
                        <div className={"card"}>
                            <div className={"-content txt-center"}>
                                <div className={"-svg my-auto"}>
                                    <img src={`${window.location.origin}/content/svg/medal-white.svg`} alt={""} />
                                </div>
                                <span className={"fw-bold fs-18"}>Loyalty</span>
                                <div className={"d-none"}>
                                    <p>Our long-term work continues until the job is finished. We establish solid and long-term relationships with all the companies we work with.</p>
                                </div>
                            </div>
                        </div>
                        <div className={"card"}>
                            <div className={"-content txt-center"}>
                                <div className={"-svg my-auto"}>
                                    <img src={`${window.location.origin}/content/svg/recommended-like-white.svg`} alt={""} />
                                </div>
                                <span className={"fw-bold fs-18"}>Experience</span>
                                <div className={"d-none"}>
                                    <p>Thanks to the experience we have gained over the years, the specialist provides service with the latest technology devices.</p>
                                </div>
                            </div>
                        </div>
                        <div className={"card"}>
                            <div className={"-content txt-center"}>
                                <div className={"-svg my-auto"}>
                                    <img src={`${window.location.origin}/content/svg/support-white.svg`} alt={""} />
                                </div>
                                <span className={"fw-bold fs-18"}>Support</span>
                                <div className={"d-none"}>
                                    <p>We accelerate your business processes by providing professional support. We solve your problems and provide instant solutions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Header>
    )
}