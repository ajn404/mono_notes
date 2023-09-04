import * as d3 from "d3";
import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3'
import { useEffect, useRef } from "react"
import data from './tree.json'
import { getCollection } from "astro:content";

import getUniqueTags from "@utils/getUniqueTags";
const Circle = () => {
    const ref = useRef<SVGSVGElement | null>(null);
    const tagsData: any = {
        name: 'tags',
        children: []
    }
    // if (1) {
    //     const posts = await getCollection("blog");
    //     let tags = getUniqueTags(posts);

    //     tags.forEach((tag: any) => {
    //         tagsData.children.push({
    //             name: tag
    //         })
    //     })
    // }

    useEffect(() => {
        const svgElement = d3.select(ref.current);
        const width = 928;
        const height = 600;

        // Compute the graph and start the force simulation.
        let root = d3.hierarchy(data);



        const links = root.links();
        const nodes = root.descendants();

        function dragstarted(event: any, d: any) {

            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event: any, d: any) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event: any, d: any) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        const drag: any = d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);


        const simulation = d3.forceSimulation(nodes as SimulationNodeDatum[])
            .force("link", d3.forceLink(links as SimulationLinkDatum<any>[]).id((d: any) => d.id).distance(0).strength(1))
            .force("charge", d3.forceManyBody().strength(-50))
            .force("x", d3.forceX())
            .force("y", d3.forceY());

        // Create the container SVG.
        svgElement
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", `width:${width}px;max-width: 100%; height: ${height}px`)

        // Append links.
        const link = svgElement.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line");

        // Append nodes.
        const node = svgElement.append("g")
            .attr("fill", "#fff")
            .attr("stroke", "#000")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("fill", (d: any) => d.children ? null : "#000 ")
            .attr("stroke", (d: any) => d.children ? null : "#fff")
            .attr("r", 4).call(drag, simulation);

        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);
            node
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);
        });

        node.append("title")
            .text((d: any) => d.data.name);


        node.on('click', async (event: PointerEvent, d: any) => {
            // window.location.href = `${import.meta.env.BASE_URL}${d.data.name}`
        })


    })

    return (
        <svg ref={ref} >
        </svg>
    )
}

export default Circle;
