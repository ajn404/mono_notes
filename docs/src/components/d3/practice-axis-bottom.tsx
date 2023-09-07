import * as d3 from "d3";
import { useEffect, useRef } from "react"


const Template = () => {
    const ref = useRef<SVGSVGElement | null>(null);
    useEffect(() => {


        const xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([10, 290])

        // xScale.ticks()
        //[ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ]
        const svgElement = d3.select(ref.current);
        const axisGenerator = d3.axisBottom(xScale);

        svgElement.append("g")
            .call(axisGenerator)


        return () => {
            svgElement.remove();
        }

    })

    return (
        <svg ref={ref} >
        </svg>
    )
}

export default Template;
