import React, { useEffect } from "react";
import CommentForm from "../../../forms/CommentForm";
import PrivateResources from "../../../hooks/PrivateResources";
import CommentCard from "../../../components/CommentCard";
import Notification from "../../../components/Notification";

export default function Comments({articleID, allowArticleComments = true}) {

    if(isNaN(articleID)) {
        return
    }

    const storedUser = localStorage.getItem("token")
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/blog/${articleID}/comments`, false)

    useEffect(() => {
        load()
    }, [articleID])

    return (
        <div className={"comments"}>
            <div className={"comments-list"}>
                {loading && (
                    <p>Loading ...</p>
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(error).length == 0 && Object.keys(items).length > 0 && (
                            Object.keys(items.results).length > 0 ? (
                                Object.values(items.results).map((item, index) => (
                                    <CommentCard 
                                        key={index} 
                                        comment={item} 
                                    />
                                ))
                            ) : (
                                <p>No one comment this article. Be the first to comment !</p>
                            )
                        )}
                    </>
                )}
            </div>
            
            {storedUser.length > 0 && allowArticleComments && (
                <div className={"comments-form"}>
                    <CommentForm />
                </div>
            )}
        </div>
    )
}