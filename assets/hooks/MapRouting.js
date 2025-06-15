import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet-routing-machine';

export default function MapRouting({sourceCity, destinationCity, updateCredentials}) {

    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(sourceCity.lat, sourceCity.lng),
                L.latLng(destinationCity.lat, destinationCity.lng),
            ],
            lineOptions: {
                styles: [{ color: "#6FA1EC", weight: 4 }]
            },
            routeWhileDragging: true,
            show: false,
            showAlternatives: true,
            addWaypoints: true,
            fitSelectedRoutes: true,
            // serviceUrl: ""
        })

        routingControl.on('routesfound', function (e) {
            // Distance is given in meter
            let distance = e.routes[0].summary.totalDistance;
            updateCredentials(distance / 1000)
        });

        routingControl.addTo(map);

        return () => map.hasLayer(routingControl) ? map.removeLayer(routingControl) : null;
    }, [map, sourceCity, destinationCity]);

    return null;
}