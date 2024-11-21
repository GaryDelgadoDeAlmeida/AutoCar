import React, { useEffect } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link, Navigate, useParams } from "react-router-dom";
import PrivateRessource from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";

export default function MakerSingle() {

    const { makerID } = useParams()
    if(isNaN(makerID)) {
        return <Navigate to={"/admin/makers"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/maker/${makerID}`)

    useEffect(() => {
        load()
    }, [makerID])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/makers"}>Return</Link>
            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items ?? {}).length > 0 && Object.keys(error).length == 0 && (
                            <h1>Hello world</h1>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}