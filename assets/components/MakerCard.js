import React from "react";
import { Link } from "react-router-dom";

export default function MakerCard({item}) {

    return (
        <Link className={"maker-card"} to={`/maker/${item.id}`}>
            <div className={"-header"}>
                {item.logo && (
                    <img src={`${window.location.origin}/content/img/makers/${item.id}`} alt={item.name} />
                )}
            </div>
            <div className={"-content"}>
                <label className={"-title"}>{item.name}</label>
                <span>0 vehicles</span>
            </div>
        </Link>
    )
}