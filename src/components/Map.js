import React, { Component } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import worldmap from "../img/testdrawing.svg"

 
class Map extends Component {
  
  render() {
    return (
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={100}
        defaultPositionY={100}
        minScale={2}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div className="tools">
              <button onClick={zoomIn}>+</button>
              <button onClick={zoomOut}>-</button>
              <button onClick={resetTransform}>x</button>
            </div>
            <TransformComponent>
              <img src={worldmap} />
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    );
  }
}

export default Map