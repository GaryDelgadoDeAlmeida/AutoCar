
import React, { useCallback, useRef, useState } from "react";
import { DirectionsRenderer, DirectionsService, GoogleMap, MarkerF, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import Notification from "../../components/Notification";
import PlacesField from "./PlacesField";

export default function Map() {
    let counter = useRef(0)
    const [map, setMap] = useState(null)
    const [response, setResponse] = useState(null)
    const [credentials, setCredentials] = useState({
        // origin: "",
        // destination: "",
        origin: {lat: 48.831226809996956, lng: 2.309226913061123},
        destination: {lat: 48.6887581502866, lng: 2.3839435832294447},
    })

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: ""
    //     // googleMapsApiKey: env.parsed.GOOGLE_MAP_APIKEY ? JSON.stringify(env.parsed.GOOGLE_MAP_APIKEY) : ""
    // })
    
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: '',
        libraries: ["places", "directions"]
    })

    const defaultProps = {
        center: {
            lat: 48.759992480141778,
            lng: 2.346585247677785
        },
        zoom: 11
    };

    const onLoad = useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            // [fieldName]: new google.maps.places.SearchBox(e.currentTarget.value)
            [fieldName]: e.currentTarget.value
        })
    }

    return (
        isLoaded ? (
            <>
                <div className={"form-field-inline --mobile"}>
                    <div className={"form-field --full"}>
                        <input 
                            type={"text"}
                            value={credentials.origin}
                            placeholder={"Departure address"}
                            onChange={(e) => handleChange(e, "origin")}
                        />
                    </div>
                    
                    <div className={"form-field --full"}>
                        <input 
                            type={"text"}
                            value={credentials.destination}
                            placeholder={"Arrival address"}
                            onChange={(e) => handleChange(e, "destination")}
                        />
                    </div>
                </div>

                <div className={"mb-15"}>
                    <GoogleMap
                        mapContainerStyle={{width: "100%", height: "500px", margin: "0", padding: "0", position: "relative"}}
                        {...defaultProps}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        {/* Home */}
                        <MarkerF position={credentials.origin} />

                        {/* Workplace */}
                        <MarkerF position={credentials.destination} />

                        <DirectionsService 
                            options={{
                                origin: credentials.origin,
                                destination: credentials.destination,
                                // origin: "189 Rue Vercingétorix, 75014 Paris, France",
                                // destination: "59 Rue Monttessuy, 91260 Juvisy-sur-Orge, France",
                                travelMode: "DRIVING",
                                provideRouteAlternatives: true,
                                avoidFerries: false,
                                avoidHighways: false,
                                avoidTolls: false,
                                drivingOptions: {
                                    departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
                                    trafficModel: "bestguess"
                                }
                            }}
                            callback={(res) => {
                                if (res !== null && counter.current < 2) {
                                    if (res.status === "OK") {
                                        counter.current += 1;
                                        setResponse(res);
                                    } else {
                                        counter.current = 0;
                                        console.log("res: ", res);
                                    }
                                }
                            }}
                        />

                        {response !== null && (
                            <DirectionsRenderer
                                options={{
                                    directions: response
                                }}
                            />
                        )}
                    </GoogleMap>
                </div>
            </>
        ) : (
            <div className={"mb-15"}>
                <Notification classname={"information"} message={"Loading"} />
            </div>
        )
    )
}