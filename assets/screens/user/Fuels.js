import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import PrivateResources from "../../hooks/PrivateResources";

export default function Fuels() {
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/fuels/price-histories`)
    
    useEffect(() => {
        load()
    }, [])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Fuels</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Fuels</span>
                    </div>
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    {loading && (
                        <Notification classname={"information"} message={"Loading"} />
                    )}

                    {!loading && (
                        <>
                            {Object.keys(error).length > 0 && (
                                <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                            )}
                            
                            {Object.keys(items ?? {}).length > 0 && Object.keys(error).length == 0 && (
                                <table className={"table"}>
                                    <thead className={"-secondary"}>
                                        <tr>
                                            <th className={"bg-site-body"}></th>
                                            <th>Current Price (€ / L)</th>
                                            <th>Last price (€ / L)</th>
                                            <th>Augmentation (€ / L)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.values(items.results).map((item, index) => {
                                            let calcDiff = item.currentPrice - item.lastPrice
                                            return (
                                                <tr key={index}>
                                                    <td className={"bg-black c-white fw-bold"}>{item.title}</td>
                                                    <td className={"txt-center"}>{item.currentPrice}</td>
                                                    <td className={"txt-center"}>{item.lastPrice}</td>
                                                    <td className={"txt-center fw-bold"}>
                                                        <span className={calcDiff <= 0 ? "c-green" : "c-red"}>{calcDiff > 0 ? "+" : ""}{new Intl.NumberFormat('fr-FR').format(calcDiff)}</span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>
            </section>
        </Header>
    )
}