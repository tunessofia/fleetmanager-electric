export const DirectionsService = {
    getDirections: (origin, destination, callback) => {
        if (origin && destination) {
            const cache = localStorage.getItem('directions');
            if(cache){
                callback(JSON.parse(cache));
                return;
            }

            const request = {
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING'
            };

            const service = new window.google.maps.DirectionsService();
            service.route(request, (result, status) => {
                if (status === 'OK') {
                    localStorage.setItem('directions', JSON.stringify(result));
                    callback(result);
                }
            });
        }

        return;
    }
}   