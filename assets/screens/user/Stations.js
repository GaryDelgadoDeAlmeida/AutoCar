import React, { useEffect, useState } from "react";
import StationMap from "../../components/StationMap";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination"
import Notification from "../../components/Notification";
import PrivateResources from "../../hooks/PrivateResources";
import SearchStationsForm from "../../forms/SearchStationsForm";

export default function Stations() {

    const [offset, setOffset] = useState(1)
    const [coordinate, setCoordinate] = useState({})
    const [credentials, setCredentials] = useState({})
    const { loading, items, load, error } = PrivateResources(
        Object.keys(credentials).length === 0 
            ? `${window.location.origin}/api/stations?offset=${offset}` 
            : `${window.location.origin}/api/stations/search?offset=${offset}` + "&" + new URLSearchParams(credentials).toString()
    )

    useEffect(() => {
        load()
    }, [offset, credentials])

    const handleClick = (e, station) => {
        e.preventDefault()

        setCoordinate({
            lat: station.latitude,
            lng: station.longitude,
            stationID: station.id
        })
    }


    return (
        <Header>
            <section className={"page-section p-0-force"}>
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
                                    <SearchStationsForm 
                                        searchCredentials={credentials}
                                        updateParentCredentials={(childCredentials) => {
                                            setCredentials({
                                                ...credentials,
                                                ...childCredentials,
                                                request: "search"
                                            })
                                            setOffset(1)
                                        }}
                                    />

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
                                        <StationMap {...coordinate} />
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