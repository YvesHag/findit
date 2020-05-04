import React, { PureComponent } from 'react'
import * as d3 from 'd3'
import Data from '../data/data'
import BisElKasten from '../data/locations_BIS_el_cabinets'
import AddBisElModal from './addBisElModal'
class LearnD3 extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            barChart: Data,
            bisElKasten: BisElKasten,
            cabinetX:"",
            cabinetY:"",
            toggleModalOpen :false
        };

        console.log(this.state.conva)
    }

    componentDidMount() {
        this.drawBisElKabinets(this.state.bisElKasten)
    }

    drawBisElKabinets(data) {
        const canvasHeight = 400
        const canvasWidth = 600
        const svgCanvas = d3.select(this.refs.canvas)
            .append("svg")
            .attr('id', "BIS_el_cabinets")
            .attr('xmlns', "http://www.w3.org/2000/svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
            .style("border", "1px solid black")
            .style("fill", "red")
        svgCanvas.selectAll("rect")
            .data(data).enter()
            .append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", "orange")
            .attr("x", (datapoint, iteration) => datapoint.cx)
            .attr("y", (datapoint) => datapoint.cy)
            .append("title")
            .text(function (datapoint) { return datapoint.PLC + ": " + datapoint.name });
    }

    add_BIS_el_cabinet = () => {

        var
            svg = document.getElementById('BIS_el_cabinets'),
            NS = svg.getAttribute('xmlns');
        svg.addEventListener('click', function (e) {
            var
                t = e.target,
                x = e.clientX,
                y = e.clientY,
                target = (t == svg ? svg : t.parentNode),
                svgP = svgPoint(target, x, y),
                // visualistation to see where was clicked
                circle = document.createElementNS(NS, 'circle');
            circle.setAttributeNS(null, 'cx', Math.round(svgP.x));
            circle.setAttributeNS(null, 'cy', Math.round(svgP.y));
            circle.setAttributeNS(null, 'r', 10);
            target.appendChild(circle);

            this.setState({
                cabinetX: svgP.x, 
                cabinetY: svgP.y,
            }, ()=>{
                this.showToggleModal()
            })


            /* newCabinet = document.createElementNS(NS, 'rect');
            newCabinet.setAttributeNS(null, 'x', Math.round(svgP.x));
            newCabinet.setAttributeNS(null, 'y', Math.round(svgP.y));
            newCabinet.setAttributeNS(null, 'width', 10);
            newCabinet.setAttributeNS(null, 'height', 10);
            target.appendChild(newCabinet); */

           /*   */

            return(svgP.x, svgP.y)
            
        }.bind(this), false);
        // translate page to SVG co-ordinate
        function svgPoint(element, x, y) {
            var pt = svg.createSVGPoint();
            pt.x = x;
            pt.y = y;
            return pt.matrixTransform(element.getScreenCTM().inverse());
        }
    }


    hideItems = () => {
        var itemName = document.getElementById("targetNode").value;
        if (itemName != "") {
            var theNode = d3.selectAll("rect")
                .filter(function (d) {
                    return d.name == itemName
                });
            d3.selectAll("rect").style("opacity", "0");
            theNode.style("opacity", "1");
            console.log(itemName)
        }
    }

    showAll = () => {
        var theNode = d3.selectAll('rect')
        theNode.style("opacity", "1");
    }

    hideAll = () => {
        var theNode = d3.selectAll("rect")
        theNode.style("opacity", "0");
    }

    showToggleModal=() =>{
        console.log("dddd")
        this.setState({
            toggleModalOpen :!this.state.toggleModalOpen
            }, ()=>{
                var newElCabinet = {
                    id: "EL08888",
                    name: "bis kast new",
                    PLC: "5120",
                    cx: this.state.cabinetX,
                    cy: this.state.cabinetY,
                    level: 1,
                }
                this.setState(prevState => ({
                    bisElKasten: [...prevState.bisElKasten, newElCabinet]
                }), () => {
                    //deleting the svg and reloding it with new added items
                    d3.selectAll('svg').remove()
                   this.drawBisElKabinets(this.state.bisElKasten)
                })
            }, ()=>{
                
            }
        )
    }

    render() {
        return (
            <div>

                <div>{this.state.test}</div>
                <div ref="canvas"></div>
                <input id="targetNode" name="targetNode" type="text" />
                <button onClick={this.hideItems} >show One</button>
                <button onClick={this.showAll} >show all</button>
                <button onClick={this.hideAll} >hide all</button>
                <button onClick={(event) => { this.add_BIS_el_cabinet(event) }} >Add Element Mode</button>
                <br></br>
                <AddBisElModal toggleModalOpen={this.state.toggleModalOpen} toggleModal={this.showToggleModal}></AddBisElModal>

            </div>
        )
    }
}
export default LearnD3 