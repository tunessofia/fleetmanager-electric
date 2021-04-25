import { useEffect, useState } from "react"

const Marker = (props) => {

    const {map, items} = props;
    const [infoWindow, setInfoWindow] = useState(null);
    const [renderedItems, setRenderedItems] = useState([]);

    useEffect(() => {
        if(map){
            let infoWindow = new window.google.maps.InfoWindow({
                content: null,
                maxWidth: 200,
            });

            setInfoWindow(infoWindow);
        }
    }, [map]);

    useEffect(() => {
        const open = (marker, content) => {
            infoWindow.close();
            infoWindow.setContent(content)
            infoWindow.open(map, marker);
        } 

        if(map && items){
            renderedItems.forEach(e => e.setMap(null));
            const newRender = [];
            items.forEach(e => {
                const newMarker = new window.google.maps.Marker({
                    position: e.location
                });
                    
                if(e.content){
                    newMarker.addListener("click", () => open(newMarker, e.content));
                }
                
                newRender.push(newMarker);
                newMarker.setMap(map);
            });
    
            setRenderedItems(newRender);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, items, infoWindow]);

    return null;
}


export default Marker;