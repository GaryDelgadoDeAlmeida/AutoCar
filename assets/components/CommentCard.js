import React from "react";

export default function CommentCard(comment) {

    return (
        <div className={"comment-card"}>
            <img src={`${window.location.origin}/content/img/avatar.png`} alt={""} />
            <div className={"-content"}>
                <label>{comment.firstname + comment.lastname}</label>
                <p>{comment.description}</p>
            </div>
        </div>
    )
}