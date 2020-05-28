import React from 'react';
import './App.css';
import LearnD3 from './components/learnD3'
import Geolocation from './components/geolocation'
/* import LayoutCanvas from './components/LayoutCanvas'
import LayoutCanvasB from './components/LayoutCanvasB'
import pfizer from "./img/pfizer.png" */

function App() {

  /* function getItemId(e) {

    var
      svg = document.getElementById('mysvg'),
      NS = svg.getAttribute('xmlns');



    //adding circle to viewbox  
    var
      t = e.target,
      x = e.clientX,
      y = e.clientY,
      target = (t == svg ? svg : t.parentNode),
      svgP = svgPoint(target, x, y),
      circle = document.createElementNS(NS, 'circle');

    circle.setAttributeNS(null, 'cx', Math.round(svgP.x));
    circle.setAttributeNS(null, 'cy', Math.round(svgP.y));
    circle.setAttributeNS(null, 'r', 10);
    target.appendChild(circle);

    console.log(target)

    // translate page to SVG co-ordinate
    function svgPoint(element, x, y) {
      var pt = svg.createSVGPoint();
      pt.x = x;
      pt.y = y;
      return pt.matrixTransform(element.getScreenCTM().inverse());
    }

  } */

 /*  function dispalyObjectId() {
    var SVG = document.getElementsByTagName('svg')[0];
    var children = SVG.childNodes;

    console.log(children)

  }
 */

  return (
    <div className="App">

      {/*  */}
      <div className='row'>
        <div className="col-10 offset-1" ><LearnD3></LearnD3> </div>
      </div>
      <div className='row'>
        <div className="col-10 offset-1" ><Geolocation></Geolocation></div>
      </div>

      {/* <LayoutCanvasB></LayoutCanvasB> */}

    </div>
  );
}

export default App;
