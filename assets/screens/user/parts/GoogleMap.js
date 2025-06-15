
import React, { useCallback, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

/**
 * File outdated
 * 
 * package used : @react-google-maps/api
 * npm install @react-google-maps/api
 * @returns 
 */
export default function GoogleMap() {
    const [map, setMap] = useState(null)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: '',
    })

    const defaultProps = {
        center: {
            lat: 48.831226809996956,
            lng: 2.309226913061123
        },
        zoom: 16
    };

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        // const bounds = new window.google.maps.LatLngBounds(defaultProps.center)
        // map.fitBounds(bounds)

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={{width: '100%', height: '500px', "margin": "0", "padding": "0", "position": "relative"}}
                {...defaultProps}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* <div>
                    <img 
                        width={"35px"}
                        height={"35px"}
                        src={`${window.location.origin}/public/content/svg/pinpoint.svg`} 
                        alt="pinpoint" 
                    />
                    <span>Position Marker</span>
                </div> */}
                <MarkerF position={defaultProps.center} />
            </GoogleMap>
        ) : (
            <p>Loading failure</p>
        )
    );
}