import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export default function OpenStreetMap() {

    const position = {
        lat: 48.831226809996956,
        lng: 2.309226913061123
    }

    return (
        <MapContainer
            center={position}
            zoom={17}
            scrollWheelZoom={false}
            style={{ height: "600px", width: "100%", position: "relative" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            />

            <Marker position={position}></Marker>
        </MapContainer>
    )
}