import React from "react";
import { Link } from "react-router-dom";

export default function MakerCard({item}) {

    return (
        <Link className={"maker-card"} to={`/maker/${item.id}`}>
            <div className={"-header"}>
                {item.logo && (
                    <img src={`${window.location.origin}${item.logo}`} alt={item.name} />
                )}
            </div>
            <div className={"-content"}>
                <label className={"-title"}>{item.name}</label>
                <span>{item.nbrVehicles} vehicles</span>
            </div>
        </Link>
    )
}