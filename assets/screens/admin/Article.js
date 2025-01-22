import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Comments from "./parts/Comments";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateRessource from "../../hooks/PrivateResources";

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
                            <>
                                {/* Article content */}
                                <div className={"card"}>
                                    <div className={"-content"}>
                                        {items.photo && (
                                            <img src={`${window.location.origin}${items.photo}`} alt={items.title} />
                                        )}
                                        <h2 className={"fs-26 txt-left mb-25"}>{items.title}</h2>
                                        <div className={"markup"} dangerouslySetInnerHTML={{__html: items.content}}></div>
                                    </div>
                                </div>

                                {/* Comments sections */}
                                <div className={"card mt-25"}>
                                    <div className={"-header"}>
                                        <label className={"-title"}>Comments</label>
                                    </div>
                                    <div className={"-content"}>
                                        <Comments 
                                            articleID={items.id}
                                            allowArticleComments={false} 
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </HeaderAdmin>
    )
}