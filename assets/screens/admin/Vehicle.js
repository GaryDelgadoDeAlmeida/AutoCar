import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateResources from "../../hooks/PrivateResources"

export default function Vehicle() {

    const { vehicleID } = useParams()
    if(isNaN(vehicleID)) {
        return <Navigate to={"/admin/cars"} />
    }

    const [currentOnglet, setCurrentOnglet] = useState("consumptions")
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/vehicle/${vehicleID}`)

    useEffect(() => {
        load()
    }, [vehicleID])

    const handleClick = (onglet = "consumptions") => {
        setCurrentOnglet(onglet)
    }

    return (
        <HeaderAdmin>
            <Link className={"btn btn-secondary"} to={"/admin/vehicles"}>Return</Link>
            {!loading && Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                <Link className={"btn btn-orange ml-5"} to={`/admin/vehicle/${items.id}/edit`}>Edit</Link>
            )}
            
            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                            <div className={"page-vehicle"}>
                                <div className={"vehicle-presentation"}>
                                    <div className={"-header"}>
                                    {items.photo && (
                                        <img src={`${window.location.origin}${items.photo}`} alt={items.basemodel} />
                                    )}
                                    </div>
                                    <div className={"-content"}>
                                        <label className={"d-flex jf-between"}>
                                            <span>{items.name}</span>
                                            <span>{items.price > 0 ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(items.price) : "N/A"}</span>
                                        </label>
                                        <p>{items.maker.name}</p>
                                    </div>
                                </div>

                                <div className={"vehicle-block"}>
                                    <div className={"-header"}>
                                        <label>Description</label>
                                    </div>
                                    <div className={"-content"}>
                                        <div className={"-markup"}>
                                            <p>Lorem ipsum dolor sit amet. Aut dignissimos molestias ut totam reiciendis est vero accusantium! In repellat incidunt At reprehenderit provident id commodi quasi? </p><p>Et nisi recusandae et ipsa beatae aut galisum quaerat. Qui nihil delectus et nesciunt aliquam sed mollitia galisum est iure voluptas. Quo harum consequatur ea saepe aperiam non veniam quia sed quia laudantium id natus numquam et quis voluptatem. </p><p>Sed numquam iste nam perspiciatis odio sit maiores aperiam et suscipit quia est sint nemo est minus quis. Qui consequatur dolor eos ipsam nemo cum consequatur quod. </p><p>Qui dolorum possimus est nihil officiis in numquam iure non atque fuga et nobis aliquam hic incidunt voluptate. Id minima earum aut laudantium maxime est expedita labore ut rerum voluptas nam veritatis quia. Ut rerum impedit aut maiores temporibus qui praesentium expedita qui praesentium mollitia est rerum corrupti. Qui repellat dolorem qui esse molestias sit dolore labore aut ipsam quis non nostrum atque ut quas excepturi ut accusantium repudiandae? </p><p>Vel maxime molestiae et Quis galisum quo labore dicta aut dolores molestias et enim libero. Non cupiditate corrupti ut omnis quia est quia facilis est quae quaerat non quod dolor sed quidem illum. Qui deserunt sunt qui quia eaque id ipsa consectetur. Ex minus dicta sed perspiciatis dolor quo debitis quia. </p>
                                        </div>
                                    </div>
                                </div>
                                
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
                                            <div className={"d-flex -g-5 jf-start"}>
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
                                <div className={"vehicle-block"}>
                                    <div className={"-header"}>
                                        <label>Client reviews</label>
                                    </div>
                                    <div className={"-content"}>
                                        <div className={"mt-25"}>
                                            <Notification classname={"information"} message={"There is no reviews for this car"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}