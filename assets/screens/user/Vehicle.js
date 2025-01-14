import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import PrivateRessource from "../../hooks/PrivateResources";

export default function Vehicle() {

    const { vehicleID } = useParams()
    if(isNaN(vehicleID)) {
        return <Navigate to={"/vehicles"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/vehicle/${vehicleID}`)

    useEffect(() => {
        load()
    }, [vehicleID])

    const [currentOnglet, setCurrentOnglet] = useState("general")
    const handleClick = (onglet = "general") => {
        setCurrentOnglet(onglet)
    }

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Vehicle</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/vehicles"}>Vehicles</Link>
                        <span>Vehicle</span>
                    </div>
                </div>
            </section>
            
            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <Link className={"btn btn-secondary"} to={"/vehicles"}>Return</Link>
                    <div className={"page-vehicle"}>
                        <div className={"vehicle-presentation"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/cars/toyota-corolla-side-view.jpg`} alt={""} />
                            </div>
                            <div className={"-content"}>
                                <label className={"d-flex jf-between"}>
                                    <span>Vehicle name</span>
                                    <span>Price €</span>
                                </label>
                                <p>Maker name</p>
                            </div>
                        </div>

                        {/* Start - To remove ??? */}
                        <div className={"vehicle-block"}>
                            <div className={"-header"}>
                                <label>Car Overview</label>
                            </div>
                            <div className={"-content"}>
                                {/*  */}
                            </div>
                        </div>
                        {/* End - To remove ??? */}

                        <div className={"vehicle-block"}>
                            <div className={"-header"}>
                                <label>Car Description</label>
                            </div>
                            <div className={"-content"}>
                                <div className={"-markup"}>
                                    <p>Lorem ipsum dolor sit amet. Aut dignissimos molestias ut totam reiciendis est vero accusantium! In repellat incidunt At reprehenderit provident id commodi quasi? </p><p>Et nisi recusandae et ipsa beatae aut galisum quaerat. Qui nihil delectus et nesciunt aliquam sed mollitia galisum est iure voluptas. Quo harum consequatur ea saepe aperiam non veniam quia sed quia laudantium id natus numquam et quis voluptatem. </p><p>Sed numquam iste nam perspiciatis odio sit maiores aperiam et suscipit quia est sint nemo est minus quis. Qui consequatur dolor eos ipsam nemo cum consequatur quod. </p><p>Qui dolorum possimus est nihil officiis in numquam iure non atque fuga et nobis aliquam hic incidunt voluptate. Id minima earum aut laudantium maxime est expedita labore ut rerum voluptas nam veritatis quia. Ut rerum impedit aut maiores temporibus qui praesentium expedita qui praesentium mollitia est rerum corrupti. Qui repellat dolorem qui esse molestias sit dolore labore aut ipsam quis non nostrum atque ut quas excepturi ut accusantium repudiandae? </p><p>Vel maxime molestiae et Quis galisum quo labore dicta aut dolores molestias et enim libero. Non cupiditate corrupti ut omnis quia est quia facilis est quae quaerat non quod dolor sed quidem illum. Qui deserunt sunt qui quia eaque id ipsa consectetur. Ex minus dicta sed perspiciatis dolor quo debitis quia. </p>
                                </div>
                            </div>
                        </div>
                        <div className={"vehicle-block"}>
                            <div className={"-header"}>
                                <label>Car Features</label>
                            </div>
                            <div className={"-content"}>
                                <div className={"d-flex -g-25 mt-50"}>
                                    <div className={"w-200px"}>
                                        <div className={"card"}>
                                            <div className={"-content d-col -g-5"}>
                                                <button className={"btn"} onClick={() => handleClick()}>General details</button>
                                                <button className={"btn"} onClick={() => handleClick("consumptions")}>Consumptions</button>
                                                <button className={"btn"} onClick={() => handleClick("characteristics")}>Characteristics</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"w-100"}>
                                        <div className={"card"}>
                                            <div className={"-content"}>
                                                {currentOnglet == "general" && (
                                                    <>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Maker</span></div>
                                                            <div className={"w-100 py-10"}><span>Toyota</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Builded year</span></div>
                                                            <div className={"w-100 py-10"}><span>2024</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Base model</span></div>
                                                            <div className={"w-100 py-10"}><span>Description</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Model</span></div>
                                                            <div className={"w-100 py-10"}><span>Description</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Vehicle Weight (t)</span></div>
                                                            <div className={"w-100 py-10"}><span>5t</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Max speed</span></div>
                                                            <div className={"w-100 py-10"}><span>130 km/h</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Fuel</span></div>
                                                            <div className={"w-100 py-10"}><span>Diesel</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Fuel tank capacity</span></div>
                                                            <div className={"w-100 py-10"}><span>50 L</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Average fuel consumption (100km/L)</span></div>
                                                            <div className={"w-100 py-10"}><span>5.7 L</span></div>
                                                        </li>
                                                    </>
                                                )}

                                                {currentOnglet == "consumptions" && (
                                                    <div className={""}>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Title</span></div>
                                                            <div className={"w-100 py-10"}><span>Description</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Title</span></div>
                                                            <div className={"w-100 py-10"}><span>Description</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Title</span></div>
                                                            <div className={"w-100 py-10"}><span>Description</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Title</span></div>
                                                            <div className={"w-100 py-10"}><span>Description</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Title</span></div>
                                                            <div className={"w-100 py-10"}><span>Description</span></div>
                                                        </li>
                                                    </div>
                                                )}
                                                {currentOnglet == "characteristics" && (
                                                    <div className={""}>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Title</span></div>
                                                            <div className={"w-100 py-10"}><span>Description</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Title</span></div>
                                                            <div className={"w-100 py-10"}><span>Description</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Title</span></div>
                                                            <div className={"w-100 py-10"}><span>Description</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Title</span></div>
                                                            <div className={"w-100 py-10"}><span>Description</span></div>
                                                        </li>
                                                        <li className={"d-flex jf-evenly"}>
                                                            <div className={"w-100 py-10"}><span className={"fw-bold"}>Title</span></div>
                                                            <div className={"w-100 py-10"}><span>Description</span></div>
                                                        </li>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Header>
    )
}