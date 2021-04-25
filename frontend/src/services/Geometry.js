export const GeoService = {
    getPolygonFromDirections: (directions) => {
        //get all path points
        const paths = [];
        for (let i = 0; i < directions.length; i++) {
            const steps = directions[i].steps;
            for (let j = 0; j < steps.length; j++) {
                paths.push(window.google.maps.geometry.encoding.decodePath(steps[j].polyline.points));
            }
        }
    
        return new window.google.maps.Polygon({ paths: paths });
    },
    polygonContainsLocation: (location, polygon) => {
        return window.google.maps.geometry.poly.containsLocation(location, polygon);
    }
};