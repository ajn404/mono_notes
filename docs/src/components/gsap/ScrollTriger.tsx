import gsap from 'gsap';
import { useEffect } from 'react';


const App = () => {
    const items = ['color-warm-frame', 'color-spring-warmth', 'color-night-fade']

    useEffect(() => {
        import('gsap/ScrollTrigger').then(res => {
            const ScrollTrigger = res.default
            gsap.registerPlugin(ScrollTrigger)
            gsap.to(`.${items[items.length - 1]}`, {
                x: "40vmin", duration: 3, rotation: 360,
                scrollTrigger: {
                    trigger: `.${items[items.length - 1]}`,
                    start: "top center",
                    end: "top 100px",
                    scrub: true,
                    markers: true,
                    id: "box3"
                }
            })

            const anim = gsap.to(`.${items[0]}`, {
                x: 400,
                rotation: 360,
                duration: 3
            });


            ScrollTrigger.create({
                trigger: `.${items[0]}`,
                animation: anim,
                start: "top 500px",
                end: "top 50px",
                scrub: true,
                markers: true,
                id: "box1"

            })
        })
    })
    return <div>
        <ul className="grid grid-cols-1 gap-5 content-center">
            {items.map((item, index) => (
                <li key={index} className={`min-h-[40vmin] max-w-[40vmin] rounded-md flex items-center hover:scale-105 transition-all justify-center ${item}`}>box{index + 1}</li>
            ))}
        </ul>
    </div>
}
export default App;