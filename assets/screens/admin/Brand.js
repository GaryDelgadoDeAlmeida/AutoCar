import React, { useEffect } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link, Navigate, useParams } from "react-router-dom";
import PrivateRessource from "../../hooks/PrivateResources";

export default function Brand() {

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
                <div className={"card"}>
                    <div className={"-header"}></div>
                    <div className={"-content"}>
                        {/*  */}
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}