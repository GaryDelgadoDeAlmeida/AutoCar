import React, { useEffect } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link, Navigate, useParams } from "react-router-dom";
import PrivateRessource from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";

export default function BrandSingle() {

    const { brandID } = useParams()
    if(isNaN(brandID)) {
        return <Navigate to={"/admin/brands"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/backoffice/brand/${brandID}`)

    useEffect(() => {
        load()
    }, [brandID])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/brands"}>Return</Link>
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