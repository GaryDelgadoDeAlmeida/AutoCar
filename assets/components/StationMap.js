import React, { useEffect } from "react";
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import PrivateResources from "../hooks/PrivateResources";

export default function StationMap({lat, lng, stationID, showMessage = true}) {

    if(isNaN(stationID)) {
        return
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/station/${stationID}/fuels`)

    useEffect(() => {
        load()
    }, [stationID])

    let popinContent
    
    {!loading && (
        <>
            {Object.keys(error).length > 0 && Object.keys(items).length == 0 && (
                popinContent = `<p>${error.response.data.message ?? error.response.data.detail}</p>`
            )}

            {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                popinContent = Object.values(items.results).map((item, index) => `<p key='${index}'>${item.fuel}: ${item.price} €</p>`).join("")
            )}
        </>
    )}

    if(popinContent) {
        popinContent = `<h3>Prix des carburants de la station</h3>` + popinContent
    } else {
        popinContent = `<p>Tarification indisponible</p>`
    }

    console.log("popinContent")
    console.log(popinContent)

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

            {!loading && (
                <Marker 
                    position={{
                        lat: lat, 
                        lng: lng
                    }} 
                    icon={L.icon({iconUrl: `${window.location.origin}/content/svg/pinpoint.svg`})}
                    // icon={L.icon({iconUrl: `${window.location.origin}/content/img/pin-point.png`})}
                >
                    {popinContent && showMessage && (
                        <Popup content={popinContent} />
                    )}
                </Marker>
            )}
        </MapContainer>
    )
}
