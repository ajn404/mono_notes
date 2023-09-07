import { useEffect } from "react";
import wrapREGL from "regl";

export default () => {
    useEffect(() => {
        const regl = wrapREGL("#demo");
        const drawTriangle = regl({
            frag: `
  void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
  }`,
            vert: `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0, 1);
  }`,
            attributes: {
                position: [[0, -1], [-1, 0], [1, 1]]
            },

            count: 3
        })
        regl.frame(() => {
            regl.clear({
                color: [0, 0, 0, 1],
            })
            drawTriangle()
        })
        const destroy = () => {
            regl.destroy()
        }
        return () => {
            console.log('hh');

            destroy()
        }



    })
    return <canvas className="w-full" id="demo"></canvas>
}