import React from "react";
import { Link } from "react-router-dom";

export default function CarCard({carItem}) {

    let vehicleThumbnail = "/content/img/vehicle-thumbnail.jpg"
    if(carItem.photo) {
        vehicleThumbnail = carItem.photo
    }

    return (
        <Link to={"/vehicle/" + carItem.id} className={"vehicule-card"}>
            <div className={"-header"}>
                <img src={`${window.location.origin}/${vehicleThumbnail}`} alt={""} />
            </div>
            <div className={"-content"}>
                <label className={"-title"}>{carItem.name + " (" + (new Date(carItem.buildAt)).getFullYear() + ")"}</label>
                <span className={"-sub-title"}></span>
                <div className={"-caracteristics"}>
                    <label className={"-caracteristic"}>
                        <img src={`${window.location.origin}/content/svg/dollar-sign.svg`} alt={""} />
                        <span>{carItem.price > 0 ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(carItem.price) : "N/A"}</span>
                    </label>
                    <label className={"-caracteristic"}>
                        <img src={`${window.location.origin}/content/svg/car.svg`} alt={""} />
                        <span>{carItem.maker_name}</span>
                    </label>
                    <label className={"-caracteristic"}>
                        <img src={`${window.location.origin}/content/svg/gas-pump.svg`} alt={""} />
                        <span>{Object.values(carItem.fuels ?? {}).map((item, index) => (
                            (index > 0 ? ", " : "") + item.title
                        ))}</span>
                    </label>
                </div>
            </div>
        </Link>
    )
}