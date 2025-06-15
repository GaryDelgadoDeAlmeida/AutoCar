import React, { useState } from "react";
import { findParent } from "../../hooks/DomControl";
import axios from "axios";

/**
 * Site URL: https://myprojects.geoapify.com/api/tyhIzrVbIDrwj2nFKCkL/statistics
 * 
 * @param {*} param0 
 * @param {*} param1 
 * @param {*} param2 
 * @returns 
 */
export default function AutocompleteField({fieldName = "destination", placeholder = "", updateCredentials}) {

    const APIKEY = ""
    const [suggestions, setSuggestions] = useState({})

    const handleChange = (e) => {
        if(e.currentTarget.value.length > 2) {
            axios
                .get(`https://api.geoapify.com/v1/geocode/search?apiKey=${APIKEY}&text=` + encodeURI(e.currentTarget.value))
                .then((response) => {
                    if(response.data.features.length > 0) {
                        setSuggestions(response.data.features)
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
            ;
        }
    }

    const handleSuggestionClick = (e) => {
        updateCredentials(fieldName, {
            lng: parseFloat(e.currentTarget.getAttribute("data-lng")), 
            lat: parseFloat(e.currentTarget.getAttribute("data-lat"))
        })

        document.getElementById(`autocomplete-field-${fieldName}`).value = e.currentTarget.innerText

        setSuggestions({})
    }

    return (
        <div className={"form-field --full"}>
            <input 
                id={`autocomplete-field-${fieldName}`}
                type={"text"}
                placeholder={placeholder}
                onChange={(e) => handleChange(e)}
            />

            {Object.keys(suggestions).length > 0 && (
                <div className={"form-field-options"}>
                    {Object.values(suggestions).map((item, index) => (
                        <li 
                            key={index}
                            className={"field-option"}
                            onClick={(e) => handleSuggestionClick(e)}
                            data-lng={item.properties.lon}
                            data-lat={item.properties.lat}
                        >{item.properties.formatted}</li>
                    ))}
                </div>
            )}
        </div>
    )
}