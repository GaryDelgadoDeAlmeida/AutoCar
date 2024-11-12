import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import PrivateRessource from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";

export default function Article() {

    const { blogID } = useParams()
    if(isNaN(blogID)) {
        return <Navigate to={"/admin/blogs"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/blog/${blogID}`)

    useEffect(() => {
        load()
    }, [blogID])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/blog"}>Return</Link>
            
            <div className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items ?? {}).length > 0 && Object.keys(error).length == 0 && (
                            <h1>Hello single</h1>
                        )}
                    </>
                )}
            </div>
        </HeaderAdmin>
    )
}