import React from "react";
import { Link } from "react-router-dom";
import Notification from "../../../components/Notification";

export default function RecentArticles({recent_articles = []}) {

    return (
        Object.keys(recent_articles).length > 0 ? (
            Object.values(recent_articles).map((item, index) => (
                <Link key={index} className={"d-flex -g-10"} to={"/blog/" + item.id}>
                    <div className={"w-50px"}>
                        <img className={"h-100 w-50px"} src={`${window.location.origin}${item.photo}`} alt={item.title} />
                    </div>
                    <div className={"mx-auto"}>
                        <span>{item.title}</span>
                    </div>
                </Link>
            ))
        ) : (
            <Notification classname={"warning"} message={"There is no recent posts"} />
        )
    )
}