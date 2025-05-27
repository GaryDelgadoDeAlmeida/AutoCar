import React, { useEffect } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import LinearChart from "../../components/LinearChart";
import Notification from "../../components/Notification"
import PrivateResources from "../../hooks/PrivateResources"

export default function FuelsHistory() {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/fuels/price-histories`)

    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading"} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}
                        
                        {Object.keys(items ?? {}).length > 0 && Object.keys(error).length == 0 && (
                            <>
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
                                                    <td data-column={"Label"} className={"bg-black c-white fw-bold"}>{item.title}</td>
                                                    <td data-column={"Current Price (€ / L)"} className={"txt-center"}>{item.currentPrice}</td>
                                                    <td data-column={"Last price (€ / L)"} className={"txt-center"}>{item.lastPrice}</td>
                                                    <td data-column={"Augmentation (€ / L)"} className={"txt-center fw-bold"}>
                                                        <span className={calcDiff <= 0 ? "c-green" : "c-red"}>{calcDiff > 0 ? "+" : ""}{new Intl.NumberFormat('fr-FR').format(calcDiff)}</span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}