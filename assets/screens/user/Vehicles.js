import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import CarCard from "../../components/CarCard"
import Pagination from "../../components/Pagination"
import Notification from "../../components/Notification"
import PrivateRessource from "../../hooks/PrivateResources"

export default function Vehicles() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/vehicles?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Vehicles</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Vehicles</span>
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
                                    {Object.keys(items.results ?? {}).length > 0 ? (
                                        <div className={"d-grid -col-4 -g-25"}>
                                            {Object.values(items.results).map((item, index) => (
                                                <CarCard key={index} carItem={item} />
                                            ))}
                                        </div>
                                    ) : (
                                        <Notification classname={"warning"} message={"No vehicle has been found"} />
                                    )}

                                    <Pagination
                                        offset={offset}
                                        setOffset={setOffset}
                                        maxOffset={items.maxOffset}
                                    />
                                </>
                            )}
                        </>
                    )}

                    {/* Temporaire */}
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

                    <Pagination
                        offset={offset}
                        setOffset={setOffset}
                        maxOffset={10}
                    />
                    {/* Fin Temporaire */}
                </div>
            </section>
        </Header>
    )
}