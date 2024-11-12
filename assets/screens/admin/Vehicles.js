import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import PrivateResources from "../../hooks/PrivateResources"
import Notification from "../../components/Notification"

export default function Vehicles() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/backoffice/vehicles?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            {loading && (
                <Notification classname={"information"} message={"Loading ..."} />
            )}

            {!loading && (
                <>
                    {Object.keys(error).length > 0 && (
                        <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                    )}

                    {Object.keys(items ?? {}).length > 0 && (
                        <section className={"page-section"}></section>
                    )}
                </>
            )}
        </HeaderAdmin>
    )
}