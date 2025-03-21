import React, { useEffect } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import PrivateResources from "../../hooks/PrivateResources"

export default function FuelsHistory() {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/fuels/price-histories`)

    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <section className={"page-section"}>
                <table className={"table"}>
                    <thead className={"-secondary"}>
                        <tr>
                            <th className={"bg-site-body"}></th>
                            <th>Last price (€ / L)</th>
                            <th>Current Price (€ / L)</th>
                            <th>Augmentation (€ / L)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && (
                            <>
                                {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                                    Object.values(items.results).map((item, index) => {
                                        let calcDiff = item.lastPrice - item.price
                                        return (
                                            <tr key={index}>
                                                <td className={"bg-black c-white fw-bold"}>{item.title}</td>
                                                <td className={"txt-center"}>{item.lastPrice}</td>
                                                <td className={"txt-center"}>{item.price}</td>
                                                <td className={"txt-center fw-bold"}>
                                                    <span className={calcDiff > 0 ? "c-green" : "c-red"}>{new Intl.NumberFormat('fr-FR').format(calcDiff)}</span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </>
                        )}
                    </tbody>
                </table>
            </section>
        </HeaderAdmin>
    )
}