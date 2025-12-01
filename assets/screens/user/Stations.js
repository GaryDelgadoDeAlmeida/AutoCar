import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map from "../../components/Map";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination"
import Notification from "../../components/Notification";
import PrivateResources from "../../hooks/PrivateResources";

export default function Stations() {

    const [offset, setOffset] = useState(1)
    const [coordinate, setCoordinate] = useState({})
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/stations?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handleClick = (e, station) => {
        e.preventDefault()

        setCoordinate({
            lat: station.latitude,
            lng: station.longitude
        })
    }

    console.log(coordinate)

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Stations</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Stations</span>
                    </div>
                </div>
            </section>

            <section className={"page-section"}>
                {loading && (
                    <div className={"page-wrapper"}>
                        <Notification classname={"information"} message={"Loading ..."} />
                    </div>
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && Object.keys(items).length == 0 && (
                            <div className={"page-wrapper"}>
                                <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                            </div>
                        )}

                        {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                            <div className={"stations"}>
                                <div className={"-list"}>
                                    {Object.values(items.results).map((item, index) => (
                                        <li className={"station-item"} key={index} onClick={(e) => handleClick(e, item)}>
                                            <span>{item.address}, {item.zipCode} {item.city}</span>
                                        </li>
                                    ))}

                                    <div className={"mt-25px"}>
                                        <Pagination
                                            offset={offset}
                                            setOffset={setOffset}
                                            maxOffset={items.maxOffset}
                                        />
                                    </div>
                                </div>
                                <div className={"-map"}>
                                    {Object.keys(coordinate).length > 0 && (
                                        <Map {...coordinate} />
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>
        </Header>
    )
}