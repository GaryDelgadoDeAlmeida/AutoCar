import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import FuelSimulatorForm from "../../forms/FuelSimulatorForm";
import VehiculeTypeCard from "../../components/VehicleTypeCard";
import Notification from "../../components/Notification";
import HomeRecentArticles from "./parts/HomeRecentArticles";
import RecentTestimonials from "./parts/RecentTestimonials";
import RecentVehicles from "./parts/RecentVehicles";

export default function Home() {

    return (
        <Header>
            <section className={"page-hero"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-1.jpg`} alt={""} />
                    <div className={"hero-superposition"}></div>
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>AutoCar</h1>
                    <p className={"-hero-description"}>Looking for a new car ? This is the place !</p>
                    <div className={"mt-25"}>
                        <Link className={"btn btn-primary btn-m fw-bold"} to={"/about"}><span>Learn More</span></Link>
                    </div>
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <div className={"mt-50"}>
                        <div className={"d-flex -m-column"}>
                            <VehiculeTypeCard
                                imgPath={"/content/img/cars-types/cabrio.jpg"}
                                title={"Cabrio"}
                                description={"8 Listings"}
                            />
                            <VehiculeTypeCard
                                imgPath={"/content/img/cars-types/coupe.jpg"}
                                title={"Coupe"}
                                description={"8 Listings"}
                            />
                            <VehiculeTypeCard
                                imgPath={"/content/img/cars-types/hatchback.jpg"}
                                title={"Hatchback"}
                                description={"8 Listings"}
                            />
                            <VehiculeTypeCard
                                imgPath={"/content/img/cars-types/pickup.jpg"}
                                title={"Pickup"}
                                description={"8 Listings"}
                            />
                            <VehiculeTypeCard
                                imgPath={"/content/img/cars-types/sedan.jpg"}
                                title={"Sedan"}
                                description={"8 Listings"}
                            />
                            <VehiculeTypeCard
                                imgPath={"/content/img/cars-types/suv.jpg"}
                                title={"SUV"}
                                description={"8 Listings"}
                            />
                        </div>
                    </div>

                    <RecentVehicles />

                    <div className={"txt-center mt-50"}>
                        <Link className={"btn btn-secondary fw-bold btn-m"} to={"/vehicles"}>
                            <span>Show All Cars</span>
                        </Link>
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

                            <div className={"mt-25"}>
                                <Link className={"btn btn-secondary btn-m fw-bold btn-mx"} to={"/about"}>Get to know us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <RecentTestimonials />

            <HomeRecentArticles />

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Fuel Simulator</h2>
                    <p className={"page-description"}>Calculate your potential costs on fuels</p>

                    <div className={"card"}>
                        <Notification classname={"information"} message={"Any information displayed in this simulation is an estimation. Cost on fuels can be a little bit higher."} />
                    </div>
                    
                    <div className={"card"}>
                        <div className={"-content"}>
                            <FuelSimulatorForm />
                        </div>
                    </div>
                </div>
            </section>
        </Header>
    )
}