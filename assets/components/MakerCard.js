import React from "react";

export default function MakerCard({name}) {

    return (
        <div className={"maker-card"}>
            <div className={"-header"}></div>
            <div className={"-content"}>
                <label>{name}</label>
            </div>
        </div>
    )
}