import React from "react";
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export default function Map({lat, lng}) {

    console.log(lat, lng)

    return (
        <MapContainer
            key={`${lat}-${lng}-map`} // Adding this property change who the object is set. This allow the component to refresh when value changes. Else, the component MapContainer won't update but the Marker will
            center={{
                lat: lat, 
                lng: lng
            }}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", position: "relative" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            />

            <Marker 
                position={{
                    lat: lat, 
                    lng: lng
                }} 
                icon={L.icon({iconUrl: `${window.location.origin}/content/svg/pinpoint.svg`})}
                // icon={L.icon({iconUrl: `${window.location.origin}/content/img/pin-point.png`})}
            />
        </MapContainer>
    )
}
