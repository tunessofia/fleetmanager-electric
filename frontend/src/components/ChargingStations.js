import { useEffect, useState } from "react";
import { ChargingStationsService } from '../services/ChargingStations';
import Marker from './Marker';

const ChargingStations = (props) => {

    const {map, directions, type} = props;

    const [chargingStations, setChargingStations] = useState(null);
    const [filteredStations, setFilteredStations] = useState([]);

    useEffect(() => {
        if(map && directions){
            ChargingStationsService.getChargingStations()
            .then((r) => {
                const routePoints = directions.routes[0].legs;
                const filteredStations = ChargingStationsService.filterStationsByRoute(routePoints, r);
                setChargingStations(filteredStations);
                setFilteredStations(filteredStations);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, directions]);


    useEffect(() => {
        if(type && chargingStations && chargingStations.length > 0){
            const filteredStations = ChargingStationsService.filterStationsByType(type, chargingStations);
            setFilteredStations(filteredStations);    
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);


    return <Marker map={map} items={filteredStations}/>;
}

export default ChargingStations;