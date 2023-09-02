
import type p5 from 'p5';
import { DOMAttributes, ReactPropTypes, useEffect, useRef } from 'react';

type Sketch = (p: p5) => void

const defaultSketch: Sketch = (p: p5) => {
    let xoff = 0.0
    p.setup = () => {
        p.createCanvas(100, 100)
        p.frameRate(60)
    }

    p.draw = () => {
        let noise = p.noise(xoff) * (p.width - 50);
        p.background(255);
        p.noStroke();
        p.fill(34, 39, 54)
        xoff += 0.01;
        p.ellipse(noise, p.height / 2, 25, 25)

    }

}

interface Props {
    sketch: Sketch,
}

const Basic = ({
    sketch,
}: Props) => {
    const container = useRef(null);
    let p: p5;
    let collection: p5[] = [];

    const start = () => {
        import('p5').then(p5 => {
            if (container.current) {
                p = new p5.default(sketch || defaultSketch, container.current);
                collection.push(p);
            }
        })
    }
    const stop = () => {
        while (collection.length > 0) collection.pop()?.remove()
    }


    useEffect(() => {
        start();
        return () => {
            stop();
        }
    })


    return <div ref={container} id="container" className=' flex flex-wrap  w-full min-h-10 content-center'>
    </div>
}

export default Basic;