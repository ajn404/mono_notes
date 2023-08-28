import type p5 from 'p5';
import { useEffect,useRef,useState } from 'react';

const sketch = (p: p5) => { 
    p.setup = () => {
        p.createCanvas(100, 100)
        p.background(255)
        p.frameRate(60)
    }

    p.draw = () => {
        p.background(200);
        p.noStroke()
        p.fill(34,39,54)
        p.ellipse(p.mouseX, p.mouseY, 10, 10)
    }

}

const Basic = () => {
    const container = useRef(null)
    let s: p5[] = [];
    const [arr,setArr] = useState<p5[]>([])
    let p: p5;
    
    const start = () => {
        import('p5').then(p5 => {
                
            if (container.current) {
                p = new p5.default(sketch, container.current);
                s.push(p)
                arr.push(p)
              }  
        })
    }

    useEffect(() => {
        start()
    })
    const stop = () => {
        if (arr.length>0) {
            arr.pop()?.remove()
        }
    }
    return (
        <div ref={container} id="container" className='relative flex flex-wrap  w-full min-h-10 content-center cursor-none'>
            <button className='w-[100px] h-[100px]' style={{color:'rgba(var(--color-text-base), var(--tw-text-opacity)) !important'}}  onClick={stop}>-1</button>
            <button className='w-[100px] h-[100px]'  style={{color:'rgba(var(--color-text-base), var(--tw-text-opacity)) !important'}}   onClick={start}>+1</button>
        </div>
    )
}

export default Basic;