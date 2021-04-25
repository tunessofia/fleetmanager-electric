import { GeoService } from './Geometry';

const TYPES = {
    NORMAL:"normal",
    FAST:"rápido"
}

const endpoint = "https://tblx-daimler-trucks-and-buses.getsandbox.com/charging-stations";

export const ChargingStationsService = {
    getChargingStations: () => {
        const cache = localStorage.getItem('stations');
        if(cache){
            return Promise.resolve(JSON.parse(cache));
        }

        return fetch(endpoint, {
            method: 'GET'
        })
            .then(response => {
                return response.json().then(data => {
                    localStorage.setItem('stations', JSON.stringify(data.results));
                    return data;
                })
            })
    },
    filterStationsByRoute: (directions, stations) => {

        const cache = localStorage.getItem('filteredStations');
        if(cache){
            return JSON.parse(cache);
        }

        const poly = GeoService.getPolygonFromDirections(directions);

        //filter stations that are inside the polygon 
        const filter = stations.reduce((result, e) => {
           const coord = new window.google.maps.LatLng(Number(e.latitude), Number(e.longitude));
           if(GeoService.polygonContainsLocation(coord, poly)){
                const content = `<div class="caption line-20"><span>Address: ${e.address  || '-'}</span><br><span>Location: ${e.localization || '-'}</span><br><span>Socket Type: ${e.socket_type|| '-'}</span><br><span>Socket Number: ${e.socket_number || '-'}</span></div>`;
                result.push({ location: { lat: Number(e.latitude), lng: Number(e.longitude) }, content, socket_type: e.socket_type });
           }
           return result;
        }, []);

        localStorage.setItem('filteredStations', JSON.stringify(filter));
        return filter;
    },
    filterStationsByType: (type, stations) => {
        const selectedType = TYPES[type];
        if(selectedType){
            return stations.filter(e => {
                return e.socket_type.toLowerCase().includes(selectedType);
            });
        }

        return stations;
    }
}