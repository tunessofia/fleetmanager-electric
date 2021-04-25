import React, { Fragment, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { DirectionsService } from '../services/Directions';
import MapControl from './MapControl';
import Directions from './Directions';
import ChargingStations from './ChargingStations';

const Map = () => {

    const [map, setMap] = useState(null);
    const [selectedChargingType, setSelectedChargingType] = useState('ALL');
    const [directions, setDir] = useState(null);

    const initMapDefaults = {
        center: { lat: 37.9609398, lng: -8.4668295 }, zoom: 9
    };

    useEffect(() => {
        if(map){
            const init = { origin: "Aeroporto de Lisboa", destination: "Autódromo Internacional do Algarve" }
            DirectionsService.getDirections(init.origin, init.destination, (directions) => setDir(directions))    
        }
    }, [map])


    const updateMap = (value) => {
        if (!map) {
            setMap(value);
        }
    }

    const onSelectedChargingType = (selectedType) => {
        setSelectedChargingType(selectedType);
        return;
    }

    return (
        <div style={{ height: '100vh', width: '100%' }} role="application" aria-label="Map with vehicles charging stations">
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY, libraries: ['places', 'geometry', 'directions'] }}
                center={initMapDefaults.center}
                zoom={initMapDefaults.zoom}
                onGoogleApiLoaded={({ map, maps }) => { updateMap(map) }}
                yesIWantToUseGoogleMapApiInternals>
            </GoogleMapReact>
            { map && directions && (<Fragment>
                <MapControl position={window.google.maps.ControlPosition.LEFT_TOP} map={map} className="map-controlers">
                    <nav className="navbar navbar-light bg-light min-w">
                        <div className="container m-2">
                            <span className="f-14">Charging Stations</span>
                            <select className="form-select form-select-sm mt-2" aria-label="Charging Stations" value={selectedChargingType} onChange={(e) => onSelectedChargingType(e.target.value)}>
                                <option value="ALL">All</option>
                                <option value="FAST">Fast</option>
                            </select>
                        </div>
                    </nav>
                </MapControl>
                <Directions map={map} directions={directions} />
                <ChargingStations map={map} directions={directions} type={selectedChargingType} />
            </Fragment>)}
        </div>
    )
}

export default Map;