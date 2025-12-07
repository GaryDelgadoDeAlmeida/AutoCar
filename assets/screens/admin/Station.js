import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Map from "../../components/Map";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateResources from "../../hooks/PrivateResources";

export default function Station() {

    const { stationID } = useParams()
    if(isNaN(stationID)) {
        return <Navigate to={"/admin/stations"} />
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/station/${stationID}`)

    useEffect(() => {
        load()
    }, [stationID])

    return (
        <HeaderAdmin>
            {loading && (
                <section className={"page-section"}>
                    <Notification classname={"information"} message={"Loading ..."} />
                </section>
            )}

            {!loading && (
                <>
                    {Object.keys(error).length > 0 && Object.keys(items).length == 0 && (
                        <section className={"page-section"}>
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        </section>
                    )}

                    {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                        <>
                            <div className={"page-hero-2nd"}>
                                <div className={"hero-background"}></div>
                                <div className={"hero-wrapper"}>
                                    <h1 className={"-hero-title"}>Station</h1>
                                    <p className={"-hero-description"}>{items.station.address}, {items.station.zipCode} {items.station.city}, {items.station.country}</p>
                                </div>
                            </div>

                            {console.log(items.fuelsMedian)}

                            <section className={"page-section"}>
                                <div className={"w-100"}>
                                    <table className={"table"}>
                                        <tbody>
                                            {Object.values(items.fuels).map((item, index) => (
                                                <tr key={index}>
                                                    <td data-column={"Fuel"}><b>{item.fuel}</b></td>
                                                    <td data-column={"Price"}>
                                                        <span>{item.price}</span>
                                                        <span>{Object.values(items.fuelPriceHistories ?? []).filter((fuel) => fuel.fuelKey == item.fuelKey)[0]?.price > item.price ? "-" : "+"}</span>
                                                    </td>
                                                    <td data-column={"Updated at"}>{item.updatedAt ?? item.createdAt}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={"w-100 mw-full h-500px mt-25"}>
                                    <Map
                                        lat={items.station.latitude}
                                        lng={items.station.longitude}
                                    />
                                </div>
                            </section>
                        </>
                    )}
                </>
            )}
        </HeaderAdmin>
    )
}