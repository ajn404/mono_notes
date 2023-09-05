import * as d3 from "d3";
import { useEffect, useRef } from "react"


const Template = () => {
    const ref = useRef<SVGSVGElement | null>(null);
    useEffect(() => {

    })

    return (
        <svg ref={ref} >
        </svg>
    )
}

export default Template;
