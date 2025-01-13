import React, { useEffect } from "react";
import PrivateRessource from "../../../hooks/PrivateResources";
import Notification from "../../../components/Notification";

export default function RecentArticles() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/blogs?limit=3`)

    useEffect(() => {
        load()
    }, [])

    return (
        <>
            {loading && (
                <Notification classname={"information"} message={"Loading ..."} />
            )}

            {!loading && (
                <>
                    {Object.keys(error).length > 0 && (
                        <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                    )}

                    {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                        Object.keys(items.results).length > 0 ? (
                            Object.values(items.results).map((items, index) => (
                                <li></li>
                            ))
                        ) : (
                            <Notification classname={"warning"} message={"There is no recent posts"} />
                        )
                    )}
                </>
            )}
        </>
    )
}