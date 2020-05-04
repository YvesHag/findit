/* import React, { Component } from "react";

class geoloaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
        xCoord: "",
        yCoord: "",
    };
    this.getlocation()
  }

  componentDidMount() {
    console.log("coponenet didid mount");
  }

getlocation(){
    var coordX=""; 
    var coordY="";
    navigator.geolocation.getCurrentPosition(function(position) {
      coordX=position.coords.latitude;
      coordY= position.coords.longitude;
      console.log("Latitude is :", position);
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  }
  
  , ()=>{
      this.setState({
          xCoord: coordX,
          yCoord: coordY,
      })

      console.log('done getting locations')
  });
  }

  render() {
    return (
      <div>
        <h4>Using geolocation JavaScript API in React</h4>
        <p>xCoord:  {this.state.xCoord}</p>
        <p>yCoord:  {this.state.yCoord}</p>
      </div>
    );
  }
}

export default geoloaction */

//-------------------------------------------------------------------------------

import React from "react";
import { geolocated } from "react-geolocated";
 
class Demo extends React.Component {
    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <table>
                <tbody>
                    <tr>
                        <td>latitude</td>
                        <td>{this.props.coords.latitude}</td>
                    </tr>
                    <tr>
                        <td>longitude</td>
                        <td>{this.props.coords.longitude}</td>
                    </tr>
                    <tr>
                        <td>altitude</td>
                        <td>{this.props.coords.altitude}</td>
                    </tr>
                    <tr>
                        <td>heading</td>
                        <td>{this.props.coords.heading}</td>
                    </tr>
                    <tr>
                        <td>speed</td>
                        <td>{this.props.coords.speed}</td>
                    </tr>
                </tbody>
            </table>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}
 
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Demo);