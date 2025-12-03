import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { formatDate } from "../../hooks/DomControl";
import Header from "../../components/Header";
import CarCard from "../../components/CarCard";
import Notification from "../../components/Notification";
import PrivateResources from "../../hooks/PrivateResources";

export default function Brand() {

    const { makerID } = useParams()
    if(isNaN(makerID)) {
        return <Navigate to={"/makers"} />
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/maker/${makerID}`)
    useEffect(() => {
        load()
    }, [makerID])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Maker</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/makers"}>Makers</Link>
                        <span>Maker</span>
                    </div>
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
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
                                    <div className={"d-grid -col-4 -g-15"}>
                                        <div className={"card"}>
                                            <div className={"-content d-col -g-5"}>
                                                <label className={"fw-bold"}>Location</label>
                                                <span>{items.maker.location}</span>
                                            </div>
                                        </div>
                                        <div className={"card"}>
                                            <div className={"-content d-col -g-5"}>
                                                <label className={"fw-bold"}>Number of vehicles</label>
                                                <span>{items.nbrVehicles}</span>
                                            </div>
                                        </div>
                                        <div className={"card"}>
                                            <div className={"-content d-col -g-5"}>
                                                <label className={"fw-bold"}>Founded at</label>
                                                <span>{formatDate(items.maker.foundedAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"mt-50"}>
                                        <h2 className={"page-title"}>{items.maker.name}</h2>
                                        <div className={"markup mt-25"} dangerouslySetInnerHTML={{__html: items.maker.description}}></div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Maker products model</h2>

                    <div className={"mt-50"}>
                        {loading && (
                            <Notification classname={"information"} message={"Loading ..."} />
                        )}

                        {!loading && (
                            <>
                                {Object.keys(error).length > 0 && (
                                    <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                                )}

                                {Object.keys(items.latestVehicles ?? {}).length > 0 && Object.keys(error).length == 0 && (
                                    <div className={"d-grid -col-4"}>
                                        {Object.values(items.latestVehicles).map((item, index) => (
                                            <CarCard
                                                key={index}
                                                carItem={item}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </Header>
    )
}