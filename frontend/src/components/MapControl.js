import { createPortal } from 'react-dom'

const MapControl = (props) => {

    const {map, className, position, children } = props;
    const controlDiv = document.createElement('div');
    controlDiv.className = className;
    map.controls[position].push(controlDiv);
    
    return(
        createPortal(children, controlDiv)
    );
}

export default MapControl;