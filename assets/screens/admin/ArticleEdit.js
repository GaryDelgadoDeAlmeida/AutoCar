import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin"
import ArticleForm from "../../forms/ArticleForm"

export default function ArticleEdit() {

    const { blogID } = useParams()
    if(isNaN(blogID)) {
        return <Navigate to={"/admin/blog"} />
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
                            <div className={"card"}>
                                <div className={"-content"}>
                                    <ArticleForm article={items} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </HeaderAdmin>
    )
}