import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin"
import PrivateResources from "../../hooks/PrivateResources"

export default function Stations() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/stations?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin></HeaderAdmin>
    )
}