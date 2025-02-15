import React from "react";
import { Link } from "react-router-dom";
import { stripHTML } from "../hooks/DomControl"

export default function ArticleCard({article}) {

    return (
        <div className={"article-card"}>
            <div className={"-header"}>
                <img src={`${window.location.origin}${article.photo}`} alt={""} />
            </div>
            <div className={"-content"}>
                <label className={"-title"}>{article.title}</label>
                <p className={"-description"}>{stripHTML(article.content).slice(0, 150)}</p>
            </div>
            <div className={"-footer"}>
                <Link className={"btn btn-secondary btn-m fw-bold"} to={"/blog/" + article.id}>See more</Link>
            </div>
        </div>
    )
}