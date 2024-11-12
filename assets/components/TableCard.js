import React from "react";
import { Link } from "react-router-dom";

export default function TableCard({imgPath, title, description, link}) {

    return (
        <div className={"table-card"}>
            <div className={"-content"}>
                <img src={""} alt={""} />
                <div className={"-infos"}>
                    <label className={"-title"}>{title}</label>
                    <span className={"-description"}>{description}</span>
                </div>
            </div>
            <div className={"-footer"}>
                <Link className={"btn btn-secondary"} to={link}>See more</Link>
            </div>
        </div>
    )
}