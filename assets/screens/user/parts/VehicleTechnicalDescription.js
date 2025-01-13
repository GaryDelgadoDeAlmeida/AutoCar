import React, { useState } from "react";

export default function VehicleTechnicalDescription() {

    const [currentOnglet, setCurrentOnglet] = useState("consumption")

    const handleClick = (onglet = "consumption") => {
        setCurrentOnglet(onglet)
    }

    return (
        <div className={"vehicle-technical-description"}>
            <div className={"-top"}>
                <nav>
                    <li><button type={"button"} onClick={() => handleClick()}>Consumption</button></li>
                    <li><button type={"button"} onClick={() => handleClick("characteristics")}>Characteristics</button></li>
                </nav>
            </div>
            <div className={"-bottom"}>
                {currentOnglet == "consumption" && (
                    <div className={""}>consumption</div>
                )}
                
                {currentOnglet == "characteristics" && (
                    <div className={""}>characteristics</div>
                )}
            </div>
        </div>
    )
}