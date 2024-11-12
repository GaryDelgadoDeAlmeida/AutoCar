import React from "react";
import { Link } from "react-router-dom";

export default function VehiculeTypeCard({imgPath, title, description}) {

    return (
        <Link className={"car-type-card"} to={"/vehicles"}>
            <img src={`${window.location.origin}${imgPath}`} alt={title} />
            <span>{title}</span>
            <span>{description}</span>
        </Link>
    )
}