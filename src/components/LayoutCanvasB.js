import React, {PureComponent} from 'react';
import * as d3 from 'd3'

import BisElKasten from '../data/locations_BIS_el_cabinets.json'
import pfizerMap from '../img/pfizer.png'

class LayoutCanvasB extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
           
            bisElKasten: BisElKasten,
            cabinetX: "",
            cabinetY: "",
            toggleModalOpen: false
        };

        console.log(this.state.conva)
    }

    componentDidMount() {
        this.drawCanvas(this.state.bisElKasten)
    }

    drawCanvas=()=>{
    console.log(BisElKasten.points)
   const canvasWidth =document.body.clientWidth / 1.5 //600
    const canvasHeight = 400
    const svgCanvas = d3.select(this.refs.canvasBIScabinets)
    .append("svg")
    .attr('id', "BIS_el_cabinets")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .style("border", "3px solid red")
    .call(d3.zoom().on("zoom", function () {
        svgCanvas.attr("transform", d3.event.transform)
     }))
     .append("g")

     svgCanvas.append("circle")
      .attr("cx", document.body.clientWidth / 4)
      .attr("cy", document.body.clientHeight / 2)
      .attr("r", 50)
      .style("fill", "red")

      svgCanvas.append("circle")
      .attr("cx", document.body.clientWidth / 6)
      .attr("cy", document.body.clientHeight / 2)
      .attr("r", 50)
      .style("fill", "green")
 

    }
    
render(){
    return (
        <div> trying
    
            <div ref="canvasBIScabinets" width="960" height="600" style={{backgroundColor: "lightblue"}}></div>
    
        </div>
        )

}
    
}
export default LayoutCanvasB