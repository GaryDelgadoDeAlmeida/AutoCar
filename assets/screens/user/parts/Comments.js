import React, { useEffect } from "react";
import CommentForm from "../../../forms/CommentForm";
import PrivateRessource from "../../../hooks/PrivateResources";
import CommentCard from "../../../components/CommentCard";
import Notification from "../../../components/Notification";

export default function Comments(articleID) {

    const storedUser = localStorage.getItem("token")
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/article/${articleID}/comments`, false)

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
                                <p>Be the first to comment this article</p>
                            )
                        )}
                    </>
                )}
            </div>
            
            {storedUser.length > 0 && (
                <div className={"comments-form"}>
                    <CommentForm />
                </div>
            )}
        </div>
    )
}