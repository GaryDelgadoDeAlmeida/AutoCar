import React from "react";
import { Link } from "react-router-dom";
import Notification from "../../../components/Notification";

export default function RecentArticles({articles = []}) {

    return (
        articles.length > 0 ? (
            <div className={"d-col -g-10"}>
                {articles.map((item, index) => (
                    <Link key={index} className={"d-flex -g-15 py-25 bg-black"} to={"/blog/" + item.id}>
                        {item.photo && (
                            <div className={"w-50px"}>
                                <img className={"h-100 w-50px"} src={`${window.location.origin}${item.photo}`} alt={item.title} />
                            </div>
                        )}
                        
                        <div className={"mx-auto"}>
                            <span>{item.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <Notification classname={"warning"} message={"There is no recent posts"} />
        )
    )
}