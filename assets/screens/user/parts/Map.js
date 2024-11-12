
import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map() {
    const defaultProps = {
        center: {
            lat: 48.8311209,
            lng: 2.3066091
        },
        zoom: 15
    };

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            sensor={false}
            style={{"width": "100%", "min-height": "500px", "margin": "0", "padding": "0", "position": "relative"}}
        >
            <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
            />
        </GoogleMapReact>
    );
}