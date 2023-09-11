import { useEffect } from "react"


export default () => {

    useEffect(() => {

        let aId = 0;

        const init = () => {
            const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
            const wrapButton = document.getElementById('wrapButton') as HTMLButtonElement;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

            const width = canvas.clientWidth as number;
            const height = canvas.clientHeight as number;
            class Particle {
                x: number;
                y: number;
                size: number;
                effect: Effect;
                vx: number;
                vy: number;
                originY: number;
                originX: number;
                color: string;
                ease: number = 0.1;
                constructor(effect: Effect, color: string, j: number, i: number) {
                    this.effect = effect;
                    this.x = Math.random() * this.effect.width;
                    this.y = Math.random() * this.effect.height;
                    this.originX = Math.floor(j);
                    this.originY = i;
                    // this.x =this.originX;
                    // this.y = this.originY;
                    this.color = color;
                    this.size = this.effect.gap;
                    this.ease = 0.1;
                    // this.vx = Math.random()  - 0.5;
                    // this.vy = Math.random()  - 0.5;

                    this.vx = 0;
                    this.vy = 0;
                }

                draw(contex: CanvasRenderingContext2D) {
                    contex.fillStyle = this.color;
                    contex.fillRect(this.x, this.y, this.size, this.size);
                }
                update() {
                    //妙
                    this.x += (this.originX - this.x) * this.ease;
                    this.y += (this.originY - this.y) * this.ease;
                    // this.y += this.vy;
                }

                wrap() {
                    this.x = Math.random() * this.effect.width;
                    this.y = Math.random() * this.effect.height;
                    this.ease = 0.05;
                }
            }


            class Effect {
                width: number;
                height: number;
                particles: Array<Particle>;
                imgae: HTMLImageElement;
                centerX: number;
                centerY: number;
                x: number;
                y: number;
                gap: number;
                constructor(width: number, height: number) {
                    this.width = width;
                    this.height = height;
                    this.particles = [];
                    this.imgae = document.getElementById("image1") as HTMLImageElement;
                    this.centerX = this.width * 0.5;
                    this.centerY = this.height * 0.5;
                    this.x = this.centerX - this.imgae.width * 0.5;
                    this.y = this.centerY - this.imgae.height * 0.5;
                    this.gap = 1;
                }

                init(context: CanvasRenderingContext2D) {
                    context.drawImage(this.imgae, this.x, this.y);
                    const pixels = context.getImageData(0, 0, this.width, this.height).data;
                    for (let i = 0; i < this.height; i += this.gap) {
                        for (let j = 0; j < this.width; j += this.gap) {
                            const index = (i * this.width + j) * 4;
                            const red = pixels[index];
                            const green = pixels[index + 1];
                            const blue = pixels[index + 2];
                            const alpha = pixels[index + 3];

                            let color = `rgb(${red},${green},${blue})`;
                            if (alpha > 0) {
                                this.particles.push(new Particle(this, color, j, i))
                            }
                        }

                    }
                }
                draw(context: CanvasRenderingContext2D) {
                    this.particles.forEach(item => item.draw(context))
                }
                update() {
                    this.particles.forEach(item => item.update())
                }

                wrap() {
                    this.particles.forEach(item => item.wrap())
                }
            }

            const effect = new Effect(width, height);
            effect.init(ctx);
            const animate = () => {
                ctx.clearRect(0, 0, width, height);
                effect.draw(ctx);
                effect.update();
                aId = requestAnimationFrame(animate);
            }
            animate();
            wrapButton.addEventListener('click', () => {
                effect.wrap();
            })
        }

        init();
    })

    return <div className="demo ">
        <canvas id="canvas1" className="m-auto" style={{ background: "inear-gradient(to right,rgb(251, 254, 251),rgb(33, 39, 55));" }}></canvas>
        <img className="hidden w-[200px]" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDg4LjU5OTk2MDMyNzE0ODQ0IDcwIiB3aWR0aD0iMTc3LjE5OTkyMDY1NDI5Njg4IgogICAgaGVpZ2h0PSIxNDAiPgogICAgPCEtLSBzdmctc291cmNlOmV4Y2FsaWRyYXcgLS0+CgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlIGNsYXNzPSJzdHlsZS1mb250cyI+CiAgICAgICAgICAgIEBmb250LWZhY2UgewogICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6ICJWaXJnaWwiOwogICAgICAgICAgICAgICAgc3JjOiB1cmwoImh0dHBzOi8vZXhjYWxpZHJhdy5jb20vVmlyZ2lsLndvZmYyIik7CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIEBmb250LWZhY2UgewogICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6ICJDYXNjYWRpYSI7CiAgICAgICAgICAgICAgICBzcmM6IHVybCgiaHR0cHM6Ly9leGNhbGlkcmF3LmNvbS9DYXNjYWRpYS53b2ZmMiIpOwogICAgICAgICAgICB9CiAgICAgICAgPC9zdHlsZT4KCiAgICA8L2RlZnM+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCAxMCkgcm90YXRlKDAgMzQuMjk5OTgwMTYzNTc0MjIgMjUpIj4KICAgICAgICA8dGV4dCB4PSIwIiB5PSIwIiBmb250LWZhbWlseT0iVmlyZ2lsLCBTZWdvZSBVSSBFbW9qaSIgZm9udC1zaXplPSIyMHB4IiBmaWxsPSIjMWUxZTFlIiB0ZXh0LWFuY2hvcj0ic3RhcnQiCiAgICAgICAgICAgIHN0eWxlPSJ3aGl0ZS1zcGFjZTogcHJlOyIgZGlyZWN0aW9uPSJsdHIiIGRvbWluYW50LWJhc2VsaW5lPSJ0ZXh0LWJlZm9yZS1lZGdlIj5ham40MDQ8L3RleHQ+CgogICAgPC9nPgo8L3N2Zz4=" id="image1" />

        <div className="controls text-center">
            <button id="wrapButton" className="p-[20px] m-[20px] text-lg font-mono">Wrap</button>
            <button id="start" className="p-[20px] m-[20px] text-lg font-mono">init</button>
        </div>
    </div>
}