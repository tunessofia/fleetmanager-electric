import { useEffect } from "react";

const Directions = (props) => {

    const { directions, map } = props;
    useEffect(() => {
        if(map && directions){
            const renderer = new window.google.maps.DirectionsRenderer();
            renderer.setDirections(directions);
            renderer.setMap(map)
        }
    }, [directions, map]);

    return null;
}

export default Directions;