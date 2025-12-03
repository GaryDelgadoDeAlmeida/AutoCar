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
            <div className={"page-hero-2nd"}>
                <div className={"hero-background"}></div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Station</h1>
                </div>
            </div>

            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && Object.keys(items).length == 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                            <>
                                <Notification classname={"information"} message={"Page under construction"} />

                                {console.log(items)}

                                <div className={""}>
                                    <table className={"table"}>
                                        <tbody>
                                            {Object.values(items.fuels).map((item, index) => (
                                                <tr key={index}>
                                                    <td data-column={"Fuel"}>{item.fuel}</td>
                                                    <td data-column={"Price"}>{item.price}</td>
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
                            </>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}