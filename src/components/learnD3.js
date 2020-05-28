import React, { PureComponent } from 'react'
import * as d3 from 'd3'
import Data from '../data/data'
import BisElKasten from '../data/locations_BIS_el_cabinets.json'
import pfizer from '../img/huisLayoutB.png'
////import AddBisElModal from './addBisElModal'
//import Background from "./Map"


class LearnD3 extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            pfizerLayout: pfizer,
            barChart: Data,
            bisElKasten: BisElKasten,
            layoutWidth: "",
            layoutHeight: "",
            canvasImageLayoutRatioX: 1.885,
            canvasImageLayoutRatioY: 0.6678,
            realityCoefficient : 59.25, // 1cm in reality = 59.25px
            xStartingPoint:"",
            yStartingPoint:"",
            cabinetX: "",
            cabinetY: "",
            toggleModalOpen: false
        };
    }

    componentWillMount(){
        this.getImageDimensions()
    }

    componentDidUpdate(){
        this.drawBisElKabinets(this.state.bisElKasten)
    }

    getImageDimensions() {
        let layoutWidth='';
        let layoutHeight='';
        let canvasImageLayoutRatioX='';
        let canvasImageLayoutRatioY='';
        let xStartingPoint='';
        
        let img = new Image();
        img.src = pfizer;
        img.onload = () => {

            layoutWidth= img.width
            layoutHeight= img.height
            canvasImageLayoutRatioX= (window.innerWidth/2)/img.width
            canvasImageLayoutRatioY= (window.innerHeight / 2)/img.height
            xStartingPoint= ((window.innerWidth/2)-(layoutWidth*canvasImageLayoutRatioY))/2

            this.setState({
                layoutWidth: img.width,
                layoutHeight: img.height,
                canvasImageLayoutRatioX: (window.innerWidth/2)/img.width,
                canvasImageLayoutRatioY: (window.innerHeight / 2)/img.height,
                xStartingPoint: xStartingPoint
            })
            console.log("canvasWidth: ", window.innerWidth/2, "---image width: ", this.state.layoutWidth, "----Xratio: ", this.state.canvasImageLayoutRatioX)
            console.log("canvasHeight: ", window.innerHeight/2, "---image height: ", this.state.layoutHeight, "----Yratio: ", this.state.canvasImageLayoutRatioY)
            console.log("xOffset: ", this.state.xOffset)
            console.log("new image width: ",this.state.canvasImageLayoutRatioY*this.state.layoutWidth)
            console.log("XstartingPoint: ",xStartingPoint)
            console.log("client height: ", document.body.clientHeight)
        }
    }



    drawBisElKabinets(data) {
/// convert reality coordinates to Image Cordinates
/// In reality my surface is 10 X 20 cm
/// In Pic Coordinates this is 593 X 1184 px
/// --> 1cm = 59.25px = RealityCoefficient
        //const realityCoefficient = 59.25
        const canvasWidth =window.innerWidth / 2   //497 huis X
        const canvasHeight = window.innerHeight / 2    //1132 huis Y
        const svgCanvas = d3.select(this.refs.canvasBIScabinets)

            .append("svg")
            .attr('id', "BIS_el_cabinets")
            .attr('xmlns', "http://www.w3.org/2000/svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
            .style("border", "3px solid red")
            .call(d3.zoom().on("zoom", function () {
                svgCanvas.attr("transform", d3.event.transform)
            }))
            .append("g")


        svgCanvas.append("image")
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
            .attr("x", (datapoint, iteration) => this.state.xStartingPoint + (datapoint.cx*this.state.realityCoefficient*this.state.canvasImageLayoutRatioY)/* /this.state.canvasImageLayoutRatioX */)
            .attr("y", (datapoint) => datapoint.cy*this.state.realityCoefficient*this.state.canvasImageLayoutRatioY/* /this.state.canvasImageLayoutRatioY */)
            .append("title")
            .text(function (datapoint) { return datapoint.PLC + ": " + datapoint.name });
    }

    add_BIS_el_cabinet = () => {
        console.log(this.state.bisElKasten)
        let realityCoordinateX=""
        let realityCoordinateY=""
        
        var
            svg = document.getElementById('BIS_el_cabinets'),
            NS = svg.getAttribute('xmlns');
        svg.addEventListener('click', function (e) {
            var
                t = e.target,
                x = e.clientX,
                y = e.clientY,
                target = (t === svg ? svg : t.parentNode),
                svgP = svgPoint(target, x, y),
                // visualistation to see where was clicked
                circle = document.createElementNS(NS, 'circle');
            circle.setAttributeNS(null, 'cx', Math.round(svgP.x));
            circle.setAttributeNS(null, 'cy', Math.round(svgP.y));
            circle.setAttributeNS(null, 'r', 10);
            target.appendChild(circle);

        realityCoordinateX= (svgP.x-this.state.xStartingPoint)/(this.state.realityCoefficient*this.state.canvasImageLayoutRatioY)
        realityCoordinateY= (svgP.y)/(this.state.realityCoefficient*this.state.canvasImageLayoutRatioY)
            
        this.setState({
                cabinetX: realityCoordinateX, //svgP.x,//*this.state.canvasImageLayoutRatioX,
                cabinetY: realityCoordinateY //svgP.y,//*this.state.canvasImageLayoutRatioY,
            }, () => {
                this.showToggleModal()
                console.log(this.state.cabinetX, this.state.cabinetY)
            })

            return (svgP.x, svgP.y)

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
        if (itemName !== "") {
            var theNode = d3.selectAll("rect")
                .filter(function (d) {
                    return d.name === itemName
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

    showToggleModal = () => {
        this.setState({
            toggleModalOpen: !this.state.toggleModalOpen
        }, () => {
            var newElCabinet = {
                id: "EL08888",
                name: "bis kast new",
                PLC: "5120",
                cx: this.state.cabinetX,
                cy: this.state.cabinetY,
                level: 1,
            }
            this.setState(prevState => ({
                ...prevState, bisElKasten: {
                    ...prevState.bisElKasten, points: [...prevState.bisElKasten.points, newElCabinet]
                }
            }), () => {
                //deleting the svg and reloding it with new added items
                d3.selectAll('svg').remove()
                this.drawBisElKabinets(this.state.bisElKasten)
            })
        }, () => {

        }
        )
    }


    render() {

        //console.log(this.state.bisElKasten.points)
      

        return (
            <div >


                <div className="row bg-dark container_canvas" >
                    <div ref="canvasBIScabinets" className="col-6  BIS_Canvas" style={{ backgroundColor: 'rgb(255,255,255)' }}></div>
                </div>

                <p></p>
                <div className="row" style={{ backgroundColor: 'rgb(0,99,117)' }}>
                    <input id="targetNode" name="targetNode" type="text" />
                    <button onClick={this.hideItems} >show One</button>
                    <button onClick={this.showAll} >show all</button>
                    <button onClick={this.hideAll} className='testbtn'>hide all</button>
                    <button onClick={(event) => { this.add_BIS_el_cabinet(event) }} >Add Element Mode</button>
                    <br></br>
                </div>
                <p>coord X: {this.state.cabinetX}</p>
                <p>coord Y: {this.state.cabinetY}</p>

                {/* <img src={this.state.pfizerLayout}></img> */}
                {/* <AddBisElModal toggleModalOpen={this.state.toggleModalOpen} toggleModal={this.showToggleModal}></AddBisElModal> */}

            </div >
        )
    }
}
export default LearnD3 