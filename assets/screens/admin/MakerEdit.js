import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import MakerForm from "../../forms/MakerForm";
import HeaderAdmin from "../../components/HeaderAdmin";
import PrivateResources from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";

export default function MakerNew() {

    const { makerID } = useParams()
    if(isNaN(makerID)) {
        return <Navigate to={"/admin/makers"} />
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/maker/${makerID}`)

    useEffect(() => {
        load()
    }, [makerID])

    return (
        <HeaderAdmin>
            {!loading && Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                <Link className={"btn btn-blue"} to={`/admin/maker/${items.maker.id}`}>Return</Link>
            )}

            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                            <div className={"card"}>
                                <div className={"-header"}>
                                    <label className={"-title"}>Update a car maker</label>
                                </div>
                                <div className={"-content"}>
                                    <MakerForm maker={items.maker} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}