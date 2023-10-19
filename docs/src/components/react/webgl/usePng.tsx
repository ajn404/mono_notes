import { useParticle } from "./useParticle.tsx"

export default () => {

    useParticle("canvas2", "image2", "wrapButton2", "start2");

    return <div className="demo ">
        <canvas id="canvas2" className="m-auto" style={{ background: "inear-gradient(to right,rgb(251, 254, 251),rgb(33, 39, 55));" }}></canvas>
        <img className="hidden w-[200px]" src="/mono_notes/assets/xiao.jpg" id="image2" />

        <div className="controls text-center">
            <button id="wrapButton2" className="p-[20px] m-[20px] text-lg font-mono">Wrap</button>
            <button id="start2" className="p-[20px] m-[20px] text-lg font-mono">init</button>
        </div>
    </div>
}