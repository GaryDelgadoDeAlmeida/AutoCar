import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import ArticleForm from "../../forms/ArticleForm"
import PrivateRessources from "../../hooks/PrivateResources";

export default function ArticleEdit() {

    const { blogID } = useParams()
    if(isNaN(blogID)) {
        return <Navigate to={"/admin/blog"} />
    }

    const { loading, items, load, error } = PrivateRessources(`${window.location.origin}/api/blog/${blogID}`)
    
    useEffect(() => {
        load()
    }, [blogID])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-secondary"} to={"/admin/blog"}>Return</Link>

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
                                <div className={"-content"}>
                                    <ArticleForm article={items.article} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}