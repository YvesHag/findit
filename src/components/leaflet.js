import React, { Component } from "react";
import L from "leaflet"
import { Map, TileLayer, Marker, Popup, Rectangle, ImageOverlay } from 'react-leaflet'
import MarkerIcon from '../img/Marker.png';
import Battel from '../img/battel.PNG';


var myIcon = L.icon({
    iconUrl:MarkerIcon,
    iconSize:[25,41],
    iconAnchor:[12.5,41],
    popupAnchor:[0,41]
})
const outer = [
    [51.032814, 4.455352],
    [51.033517, 4.458471], 
   
  ]

class Leaflet extends Component {

    constructor(props) {
        super(props);
        this.mapRef= React.createRef
        this.state = {
            lat: 51.0332445,
            lng: 4.4583994,
            zoom: 18,
        };
    }
    
    

    handleClick = (e) => {
        console.log(e.latlng)
       
      }


    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <Map attributionControl={false} ref={this.mapRef} className="map" center={position} zoom={this.state.zoom} onClick={this.handleClick}>
                {/* <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> */}
                <Marker position={position} icon={myIcon} >
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <ImageOverlay url={Battel} bounds={outer} color= 'red'  ></ImageOverlay>
            </Map>
        );
    }
}

export default Leaflet