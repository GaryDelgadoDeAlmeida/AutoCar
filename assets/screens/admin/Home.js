import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TableCard from "../../components/TableCard";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateResources from "../../hooks/PrivateResources";
import { stripHTML } from "../../hooks/DomControl";

export default function Home() {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/backoffice/home`)
    
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            {loading && (
                <Notification classname={"information"} message={"Loading ..."} />
            )}

            {!loading && (
                <>
                    {Object.keys(error).length > 0 && (
                        <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                    )}

                    {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                        <>
                            <div className={"d-grid -col-4 -g-10"}>
                                <div className={"card"}>
                                    <div className={"-content d-col -g-5"}>
                                        <label className={"fw-bold"}>Vehicles</label>
                                        <span className={"fs-20"}>{items.nbrVehicles}</span>
                                    </div>
                                </div>
                                <div className={"card"}>
                                    <div className={"-content d-col -g-5"}>
                                        <label className={"fw-bold"}>Makers / Brands</label>
                                        <span className={"fs-20"}>{items.nbrMakers}</span>
                                    </div>
                                </div>
                                <div className={"card"}>
                                    <div className={"-content d-col -g-5"}>
                                        <label className={"fw-bold"}>Vehicle types</label>
                                        <span className={"fs-20"}>{items.nbrVehicleTypes}</span>
                                    </div>
                                </div>
                                <div className={"card"}>
                                    <div className={"-content d-col -g-5"}>
                                        <label className={"fw-bold"}>Fuels</label>
                                        <span className={"fs-20"}>{items.nbrFuels}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Lastest vehicles */}
                            <div className={"page-section"}>
                                {Object.keys(items.latestVehicles).length > 0 ? (
                                    <>
                                        <div className={"table-list"}>
                                            {Object.values(items.latestVehicles).map((item, index) => (
                                                <TableCard
                                                    key={index}
                                                    imgPath={item.photo ?? "/content/img/vehicle-thumbnail.jpg"}
                                                    title={`${item.name} (${(new Date(item.buildAt)).getFullYear()})`}
                                                    description={item.maker_name}
                                                    link={"/admin/vehicle/" + item.id}
                                                />
                                            ))}
                                        </div>
                                        <div className={"mt-25 txt-right"}>
                                            <Link className={"btn btn-secondary btn-m fw-bold"} to={"/admin/vehicles"}>See all vehicles</Link>
                                        </div>
                                    </>
                                ) : (
                                    <Notification classname={"warning"} message={"There is no vehicles registered"} />
                                )}
                            </div>

                            {/* Lastest activities */}
                            <div className={"page-section"}>
                                <div className={"d-grid -col-2 -g-25"}>

                                    {/* Lastest received messages */}
                                    <div className={"item"}>
                                        <div className={"card -no-background"}>
                                            <div className={"-header"}>
                                                <label className={"-title"}>The lastest inboxes</label>
                                            </div>
                                            <div className={"-content"}>
                                                {Object.keys(items.latestInboxes).length > 0 ? (
                                                    <>
                                                        <div className={""}>
                                                            {Object.values(items.latestInboxes).map((item, index) => (
                                                                <TableCard
                                                                    key={index}
                                                                    title={item.subject}
                                                                    description={item.email}
                                                                    link={`/admin/inbox/${item.id}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <Notification classname={"warning"} message={"There is no message received"} />
                                                )}
                                            </div>
                                        </div>
                                        <div className={"mt-25 txt-right"}>
                                            <Link className={"btn btn-secondary btn-m fw-bold"} to={"/admin/inboxes"}>See all inboxes</Link>
                                        </div>
                                    </div>

                                    {/* Lastest testimonials */}
                                    <div className={"item"}>
                                        <div className={"card -no-background"}>
                                            <div className={"-header"}>
                                                <label className={"-title"}>The lastest testimonials</label>
                                            </div>
                                            <div className={"-content"}>
                                                {Object.keys(items.latestTestimonials).length > 0 ? (
                                                    <>
                                                        <div className={""}>
                                                            {Object.values(items.latestTestimonials).map((item, index) => (
                                                                <TableCard
                                                                    key={index}
                                                                    title={`${item.firstname} ${item.lastname}`}
                                                                    description={stripHTML(item.comment).slice(0, 150)}
                                                                    link={`/admin/testimonial/${item.id}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <Notification classname={"warning"} message={"There is no testimonial registered"} />
                                                )}
                                            </div>
                                        </div>

                                        <div className={"mt-25 txt-right"}>
                                            <Link className={"btn btn-secondary btn-m fw-bold"} to={"/admin/testimonials"}>See all testimonials</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </HeaderAdmin>
    )
}