import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import CarCard from "../../components/CarCard";
import ArticleCard from "../../components/ArticleCard";
import TestimonialCard from "../../components/TestimonialCard";
import FuelSimulatorForm from "../../forms/FuelSimulatorForm";
import VehiculeTypeCard from "../../components/VehicleTypeCard";
import Notification from "../../components/Notification";

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

                    <div className={"d-grid -col-4 mt-50"}>
                        <CarCard carItem={{
                            id: 1,
                            imgPath: "/content/img/cars/2019-vw-t-cross.jpg",
                            title: "VW T Cross"
                        }} />
                        <CarCard carItem={{
                            id: 2,
                            imgPath: "/content/img/cars/bmw88.jpg",
                            title: "BMW"
                        }} />
                        <CarCard carItem={{
                            id: 3,
                            imgPath: "/content/img/cars/bmw-8-series-convertible-technical-data-sp-desktop.jpg",
                            title: "BMW S8"
                        }} />
                        <CarCard carItem={{
                            id: 4,
                            imgPath: "/content/img/cars/makyajli-2022-seat-arona-1.jpg",
                            title: "Makyajli"
                        }} />
                        <CarCard carItem={{
                            id: 1,
                            imgPath: "/content/img/cars/2019-vw-t-cross.jpg",
                            title: "VW T Cross"
                        }} />
                        <CarCard carItem={{
                            id: 2,
                            imgPath: "/content/img/cars/bmw88.jpg",
                            title: "BMW"
                        }} />
                        <CarCard carItem={{
                            id: 3,
                            imgPath: "/content/img/cars/bmw-8-series-convertible-technical-data-sp-desktop.jpg",
                            title: "BMW S8"
                        }} />
                        <CarCard carItem={{
                            id: 4,
                            imgPath: "/content/img/cars/makyajli-2022-seat-arona-1.jpg",
                            title: "Makyajli"
                        }} />
                    </div>

                    <div className={"txt-center mt-50"}>
                        <Link className={"btn btn-secondary fw-bold btn-m"} to={"/cars"}>
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

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Recent articles</h2>
                    <p className={"page-description"}>Usefull information about cars</p>

                    <div className={"mt-25 d-grid -col-4 -g-25"}>
                        <ArticleCard article={{
                            id: 0,
                            title: "Why is BMW loved ?",
                            content: "BMWs have a differebt kube with their designs and almost [...]",
                            imgPath: "/content/img/cars/bmw-8-series-convertible-technical-data-sp-desktop.jpg",
                            created_at: "2024-07-06"
                        }} />
                        <ArticleCard article={{
                            id: 0,
                            title: "How solid is Audi ?",
                            content: "According to Euro NCAP data with different test organizations, there [...]",
                            imgPath: "/content/img/cars/bmw88.jpg",
                            created_at: "2024-07-06"
                        }} />
                        <ArticleCard article={{
                            id: 0,
                            title: "What brand is Skoda ?",
                            content: "Skoda is one the leading automotive manufacturers on the [...]",
                            imgPath: "/content/img/cars/volkswagen-passat-1280x720-1.jpg",
                            created_at: "2024-07-06"
                        }} />
                        <ArticleCard article={{
                            id: 0,
                            title: "Is the Auris diesel ?",
                            content: "You will have a quieter vechile that burns less than [...]",
                            imgPath: "/content/img/cars/yeni-ibiza-2.jpg",
                            created_at: "2024-07-06"
                        }} />
                    </div>
                    
                    <div className={"txt-center mt-50"}>
                        <Link className={"btn btn-secondary fw-bold btn-m"} to={"/blog"}>
                            <span>Show More</span>
                        </Link>
                    </div>
                </div>
            </section>

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