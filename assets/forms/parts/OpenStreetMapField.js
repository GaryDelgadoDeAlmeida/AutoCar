import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapRouting from "../../hooks/MapRouting";
import AutocompleteField from "./AutoCompleteField";
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



export default function OpenStreetMapField({updateCredentials}) {
    
    const [credentials, setCredentials] = useState({
        sourceCity: {},
        destinationCity: {}
    })

    return (
        <div className={"w-100"}>
            <div className={"form-field-inline --mobile"}>
                <AutocompleteField 
                    fieldName={"sourceCity"}
                    placeholder={"Départ"}
                    updateCredentials={(fieldName, fieldValue) => {
                        setCredentials({
                            ...credentials,
                            [fieldName]: fieldValue
                        })
                    }}
                />
                
                <AutocompleteField
                    fieldName={"destinationCity"}
                    placeholder={"Arrivée"}
                    updateCredentials={(fieldName, fieldValue) => {
                        setCredentials({
                            ...credentials,
                            [fieldName]: fieldValue
                        })
                    }}
                />
            </div>

            {Object.keys(credentials.sourceCity).length > 0 && Object.keys(credentials.destinationCity).length > 0 && (
                <MapContainer
                    center={{
                        lng: ((credentials.sourceCity.lng + credentials.destinationCity.lng) / 2),
                        lat: ((credentials.sourceCity.lat + credentials.destinationCity.lat) / 2) 
                    }}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "600px", width: "100%", position: "relative" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    />
                    
                    <MapRouting
                        sourceCity={credentials.sourceCity}
                        destinationCity={credentials.destinationCity}
                        updateCredentials={(fieldValue) => updateCredentials(fieldValue)}
                    />

                    <Marker position={credentials.sourceCity}>
                        {/* <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup> */}
                    </Marker>

                    <Marker position={credentials.destinationCity}>
                        {/* <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup> */}
                    </Marker>
                </MapContainer>
            )}
        </div>
    )
}