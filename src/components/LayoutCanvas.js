import React from 'react';
import { Stage } from './Stage';
import { ZoomContainer } from './ZoomContainer'

import BisElKasten from '../data/locations_BIS_el_cabinets.json'
import pfizerMap from '../img/pfizer.png'

const LayoutCanvas = () => {
    console.log(BisElKasten.points)
    return (
        <Stage width={600} height={400} >
            <ZoomContainer >
                <svg width="400" height="110">
                    <rect width="300" height="100" />
                </svg>
            </ZoomContainer>
        </Stage>
    )
}
export default LayoutCanvas