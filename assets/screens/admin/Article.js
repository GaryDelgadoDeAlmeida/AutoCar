import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Comments from "./parts/Comments";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateRessource from "../../hooks/PrivateResources";
import axios from "axios";

export default function Article() {

    const { blogID } = useParams()
    if(isNaN(blogID)) {
        return <Navigate to={"/admin/blogs"} />
    }

    const [forceRedirect, setForRedirect] = useState(false)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/blog/${blogID}`)

    useEffect(() => {
        load()
    }, [blogID])

    const handleRemove = (e) => {
        e.preventDefault()

        if(!confirm("Are you sure ? This action is irreversible.")) {
            return
        }

        axios
            .delete(`${window.location.origin}/api/backoffice/blog/${blogID}/remove`, {
                headers: {
                    "Authorization" : "Bearer " + (localStorage.getItem("token") ?? "")
                }
            })
            .then((response) => {
                setForRedirect(true)
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please retry more later"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }

                alert(errorMessage)
            })
        ;
    }

    return (
        <HeaderAdmin>
            {forceRedirect && (
                <Navigate to={"/admin/blog"} />
            )}
            
            <div className={"d-flex -g-5"}>
                <Link className={"btn btn-blue"} to={"/admin/blog"}>Return</Link>
                <Link className={"btn btn-orange"} to={"/admin/blog/" + blogID + "/edit"}>Edit</Link>
                <button className={"btn btn-red"} onClick={(e) => handleRemove(e)}>Remove</button>
            </div>
            
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
                                        {items.article.photo && (
                                            <img src={`${window.location.origin}${items.article.photo}`} alt={items.article.title} />
                                        )}
                                        <h2 className={"fs-26 txt-left mb-25"}>{items.article.title}</h2>
                                        <div className={"markup"} dangerouslySetInnerHTML={{__html: items.article.content}}></div>
                                    </div>
                                </div>

                                {/* Comments sections */}
                                <div className={"card mt-25"}>
                                    <div className={"-header"}>
                                        <label className={"-title"}>Comments</label>
                                    </div>
                                    <div className={"-content"}>
                                        <Comments 
                                            articleID={items.article.id}
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