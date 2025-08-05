import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import PrivateRessource from "../../hooks/PrivateResources";
import FuelSimulatorForm from "../../forms/FuelSimulatorForm";

export default function Vehicle() {

    const { vehicleID } = useParams()
    if(isNaN(vehicleID)) {
        return <Navigate to={"/vehicles"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/vehicle/${vehicleID}`)

    useEffect(() => {
        load()
    }, [vehicleID])

    const [currentOnglet, setCurrentOnglet] = useState("consumptions")
    const handleClick = (onglet = "consumptions") => {
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
                    
                    {loading && (
                        <Notification classname={"information mt-25"} message={"Loading ..."} />
                    )}

                    {!loading && (
                        <>
                            {Object.keys(error).length > 0 && (
                                <Notification classname={"danger mt-25"} message={error.response.data.message ?? error.response.data.detail} />
                            )}

                            {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                                <div className={"page-vehicle"}>
                                    <div className={"vehicle-presentation"}>
                                        <div className={"-header"}>
                                            <img src={`${window.location.origin}${items.photo ?? "/content/img/vehicle-thumbnail.jpg"}`} alt={""} />
                                        </div>
                                        <div className={"-content"}>
                                            <label className={"d-flex jf-between"}>
                                                <span>{items.name}</span>
                                                <span>{items.price > 0 ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(items.price) : "N/A"}</span>
                                            </label>
                                            <p>{items.maker.name}</p>
                                        </div>
                                    </div>
                                    
                                    {items.description && (
                                        <div className={"vehicle-block"}>
                                            <div className={"-header"}>
                                                <label>Description</label>
                                            </div>
                                            <div className={"-content"}>
                                                <div className={"markup"}>
                                                    <p>Lorem ipsum dolor sit amet. Aut dignissimos molestias ut totam reiciendis est vero accusantium! In repellat incidunt At reprehenderit provident id commodi quasi? </p><p>Et nisi recusandae et ipsa beatae aut galisum quaerat. Qui nihil delectus et nesciunt aliquam sed mollitia galisum est iure voluptas. Quo harum consequatur ea saepe aperiam non veniam quia sed quia laudantium id natus numquam et quis voluptatem. </p><p>Sed numquam iste nam perspiciatis odio sit maiores aperiam et suscipit quia est sint nemo est minus quis. Qui consequatur dolor eos ipsam nemo cum consequatur quod. </p><p>Qui dolorum possimus est nihil officiis in numquam iure non atque fuga et nobis aliquam hic incidunt voluptate. Id minima earum aut laudantium maxime est expedita labore ut rerum voluptas nam veritatis quia. Ut rerum impedit aut maiores temporibus qui praesentium expedita qui praesentium mollitia est rerum corrupti. Qui repellat dolorem qui esse molestias sit dolore labore aut ipsam quis non nostrum atque ut quas excepturi ut accusantium repudiandae? </p><p>Vel maxime molestiae et Quis galisum quo labore dicta aut dolores molestias et enim libero. Non cupiditate corrupti ut omnis quia est quia facilis est quae quaerat non quod dolor sed quidem illum. Qui deserunt sunt qui quia eaque id ipsa consectetur. Ex minus dicta sed perspiciatis dolor quo debitis quia. </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className={"vehicle-block"}>
                                        <div className={"-header"}>
                                            <label>Overview</label>
                                        </div>
                                        <div className={"-content"}>
                                            <div className={"mt-25"}>
                                                <li className={"d-flex jf-evenly"}>
                                                    <div className={"w-100 py-10"}><span className={"fw-bold"}>Maker</span></div>
                                                    <div className={"w-100 py-10"}><span>{items.maker.name}</span></div>
                                                </li>
                                                <li className={"d-flex jf-evenly"}>
                                                    <div className={"w-100 py-10"}><span className={"fw-bold"}>Builded year</span></div>
                                                    <div className={"w-100 py-10"}><span>{(new Date(items.buildAt)).getFullYear()}</span></div>
                                                </li>
                                                <li className={"d-flex jf-evenly"}>
                                                    <div className={"w-100 py-10"}><span className={"fw-bold"}>Base model</span></div>
                                                    <div className={"w-100 py-10"}><span>{items.basemodel}</span></div>
                                                </li>
                                                <li className={"d-flex jf-evenly"}>
                                                    <div className={"w-100 py-10"}><span className={"fw-bold"}>Model</span></div>
                                                    <div className={"w-100 py-10"}><span>{items.name}</span></div>
                                                </li>
                                                <li className={"d-flex jf-evenly"}>
                                                    <div className={"w-100 py-10"}><span className={"fw-bold"}>Vehicle Weight (kg)</span></div>
                                                    <div className={"w-100 py-10"}><span>{items.vehiculeWeight ?? "N/A"}</span></div>
                                                </li>
                                                <li className={"d-flex jf-evenly"}>
                                                    <div className={"w-100 py-10"}><span className={"fw-bold"}>Max speed (km/h)</span></div>
                                                    <div className={"w-100 py-10"}><span>{items.maxSpeed ?? "N/A"}</span></div>
                                                </li>
                                                <li className={"d-flex jf-evenly"}>
                                                    <div className={"w-100 py-10"}><span className={"fw-bold"}>Fuel</span></div>
                                                    <div className={"w-100 py-10"}><span>{items.fuels[0].title}</span></div>
                                                </li>
                                                <li className={"d-flex jf-evenly"}>
                                                    <div className={"w-100 py-10"}><span className={"fw-bold"}>Fuel tank capacity (L)</span></div>
                                                    <div className={"w-100 py-10"}><span>{items.fuelTank ?? "N/A"}</span></div>
                                                </li>
                                                <li className={"d-flex jf-evenly"}>
                                                    <div className={"w-100 py-10"}><span className={"fw-bold"}>Average fuel consumption (100km/L)</span></div>
                                                    <div className={"w-100 py-10"}><span>{items.averageFuelConsumption ?? "N/A"}</span></div>
                                                </li>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"vehicle-block"}>
                                        <div className={"-header"}>
                                            <label>Features</label>
                                        </div>
                                        <div className={"-content"}>
                                            <div className={"d-col -g-25 mt-50"}>
                                                <div className={"d-flex -g-5 jf-start -m-column"}>
                                                    <button className={`btn ${currentOnglet == "consumptions" ? "" : "btn-secondary"}`} onClick={() => handleClick()}>Consumptions</button>
                                                    <button className={`btn ${currentOnglet == "characteristics" ? "" : "btn-secondary"}`} onClick={() => handleClick("characteristics")}>Characteristics</button>
                                                </div>

                                                <div className={"card"}>
                                                    <div className={"-content"}>
                                                        {currentOnglet == "consumptions" && (
                                                            <div className={""}>
                                                                {items.consumptions.map((item, index) => (
                                                                    <li key={index} className={"d-flex jf-evenly"}>
                                                                        <div className={"w-100 py-10"}><span className={"fw-bold"}>{item.consumption_description}</span></div>
                                                                        <div className={"w-100 py-10"}><span>{item.value ?? "N/A"}</span></div>
                                                                    </li>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {currentOnglet == "characteristics" && (
                                                            <div className={""}>
                                                                {items.characteristics.map((item, index) => (
                                                                    <li key={index} className={"d-flex jf-evenly"}>
                                                                        <div className={"w-100 py-10"}><span className={"fw-bold"}>{item.characteristic_description}</span></div>
                                                                        <div className={"w-100 py-10"}><span>{item.value ?? "N/A"}</span></div>
                                                                    </li>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Client Review / Comments */}
                                    {/* <div className={"vehicle-block"}>
                                        <div className={"-header"}>
                                            <label>Client reviews</label>
                                        </div>
                                        <div className={"-content"}>
                                            <div className={"mt-25"}>
                                                <Notification classname={"information"} message={"There is no reviews for this car"} />
                                            </div>
                                        </div>
                                    </div> */}
                                    
                                    {/* Simulator */}
                                    <div className={"vehicle-block"}>
                                        <div className={"-header"}>
                                            <label>Fuel simulator</label>
                                        </div>
                                        <div className={"-content"}>
                                            {items.averageFuelConsumption > 0 ? (
                                                <>
                                                    <div className={"card mt-25"}>
                                                        <Notification classname={"information"} message={"Any information displayed in this simulation is an estimation. Cost on fuels can be a little bit different."} />
                                                    </div>
                                
                                                    <div className={"card mt-25"}>
                                                        <div className={"-header"}>
                                                            <label className={"-title"}>Calculate your potential costs on fuels</label>
                                                        </div>
                                                        <div className={"-content"}>
                                                            <FuelSimulatorForm vehicleID={items.id} />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className={"card mt-25"}>
                                                    <Notification classname={"information"} message={"The vehicle fuel consumption is unknown. We can't process a simulation"} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </Header>
    )
}