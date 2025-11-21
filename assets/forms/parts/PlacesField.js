import React from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";

export default function PlacesField({fieldName = "place", updateCredentials}, props) {

    const handleSearchSuggestionClick = (e) => {}

    const handleChange = (e) => {
        updateCredentials(fieldName, e.currentTarget.value)
    }

    return (
        <>
            <StandaloneSearchBox>
                <div className={"form-field"}>
                    <input 
                        type={"text"}
                        value={""}
                        placeholder={"Departure address"}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </StandaloneSearchBox>
            <ol>
                {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
                    <li key={place_id}>{formatted_address} {" at "} ({location.lat()}, {location.lng()})</li>
                )}
            </ol>
        </>
    )
}