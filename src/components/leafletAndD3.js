import React, { Component } from "react";
import L from "leaflet"
import { Map, TileLayer, Marker, Popup, Rectangle, ImageOverlay } from 'react-leaflet'
import MarkerIcon from '../img/Marker.png';
import Battel from '../img/battel.PNG';
//import PfizerMap from '../img/pfizerPlant.jpg'
import PfizerMap from '../img/pfizerPlantD.JPG'
import * as d3 from 'd3'
import BisElKasten from '../data/locations_BIS_el_cabinets.json'

var myIcon = L.icon({
    iconUrl:MarkerIcon,
    iconSize:[25,41],
    iconAnchor:[12.5,41],
    popupAnchor:[0,41]
})



const outer = [
    /* [51.032814, 4.455352],
    [51.033517, 4.458471], 
    [51.063263, 4.311063],
    [51.070827, 4.306186],*/
    [51.065929, 4.314142],
    [51.065807, 4.307255],
  ]
class LeafletAndD3 extends Component {

    constructor(props) {
        super(props);
        this.mapRef= React.createRef
        this.state = {
            lat: 51.066599,
            lng: 4.309680,
            zoom: 13,
            bisElKasten: BisElKasten,
        };
    
}
    
    
componentDidUpdate(){
   // this.drawMap(this.state.bisElKasten)
}

    handleClick = (e) => {
        console.log(e.latlng)
       
      }

      drawMap(data) {
                const canvasWidth =window.innerWidth / 2   //497 huis X
                const canvasHeight = window.innerHeight / 2    //1132 huis Y
             /*    const svg = d3.select(this.refs.mapRef)
        
                    .append("svg")
                    .attr('id', "map")
                    .attr('xmlns', "http://www.w3.org/2000/svg")
                    .attr("width", canvasWidth)
                    .attr("height", canvasHeight)
                    .style("border", "3px solid red")
                    .append("g") */
        
                    	/* We simply pick up the SVG from the map object */
    
                        this.refs.mapRef['_initPathRoot']()
    var svg = d3.select(this.refs.mapRef).select("svg"),
	g = svg.append("g");
        
    d3.json({"objects":[
        {"circle":{"coordinates":[51.0332964,4.45293419]}},
        {"circle":{"coordinates":[51.0334964,4.45493419]}},
        {"circle":{"coordinates":[51.0336964,4.45693419]}},
        {"circle":{"coordinates":[51.0338964,4.45893419]}},
        {"circle":{"coordinates":[51.0342964,4.45993419]}}
        ]}, function(collection) {
            /* Add a LatLng object to each item in the dataset */
            collection.objects.forEach(function(d) {
                d.LatLng = new L.LatLng(d.circle.coordinates[0],
                                        d.circle.coordinates[1])
            })
            
            var feature = g.selectAll("circle")
                .data(collection.objects)
                .enter().append("circle")
                .style("stroke", "black")  
                .style("opacity", .6) 
                .style("fill", "red")
                .attr("r", 20);  
            
                this.refs.mapRef.on("viewreset", update);
            update();
    
            function update() {
                feature.attr("transform", 
                function(d) { 
                    return "translate("+ 
                    this.refs.mapRef.latLngToLayerPoint(d.LatLng).x +","+ 
                    this.refs.mapRef.latLngToLayerPoint(d.LatLng).y +")";
                    }
                )
            }
        })
		
	
        
               /*  svgCanvas.append("image")
                    .attr("xlink:href", this.state.pfizerLayout)// this.state.bisElKasten.bk[0]  of this.state.pfizerLayout
                    .attr("width", canvasWidth)
                    .attr("height", canvasHeight)
                    .attr("id", "piggy")
         
                svgCanvas.selectAll("rect")
                    .data(data.points).enter()
                    .append("rect")
                    .attr("width", 20)
                    .attr("height", 20)
                    .attr("fill", "red")
                    .attr("x", (datapoint, iteration) => 51.0332964)
                    .attr("y", (datapoint) =>	4.45793419)
                    .append("title")
                    .text(function (datapoint) { return datapoint.PLC + ": " + datapoint.name });
            */
                }
                

            

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <Map  attributionControl={false} ref={this.mapRef} className="map" center={position} zoom={this.state.zoom} onClick={this.handleClick}>
            {/* <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            <Marker position={position} icon={myIcon} >
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <ImageOverlay url={PfizerMap} bounds={outer} color= 'red' ></ImageOverlay>
        </Map>
        );
    }
}

export default LeafletAndD3