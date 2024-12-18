import React from "react";
import { Link } from "react-router-dom";

export default function CarCard({carItem}) {

    return (
        <Link to={"/vehicle/" + carItem.id} className={"vehicule-card"}>
            <div className={"-header"}>
                <img src={`${window.location.origin}/${carItem.imgPath}`} alt={""} />
            </div>
            <div className={"-content"}>
                <label className={"-title"}>{carItem.title}</label>
                <span className={"-sub-title"}>SUV</span>
                <div className={"-caracteristics"}>
                    <label className={"-caracteristic"}>
                        <img src={`${window.location.origin}/content/svg/dollar-sign.svg`} alt={""} />
                        <span>20 000</span>
                    </label>
                    <label className={"-caracteristic"}>
                        <img src={`${window.location.origin}/content/svg/car.svg`} alt={""} />
                        <span>Volsvagan</span>
                    </label>
                    <label className={"-caracteristic"}>
                        <img src={`${window.location.origin}/content/svg/gas-pump.svg`} alt={""} />
                        <span>Diesel</span>
                    </label>
                </div>
            </div>
        </Link>
    )
}