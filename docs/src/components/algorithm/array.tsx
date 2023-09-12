import { useEffect, useState } from "react"

interface Props {
    array: Array<number>,
    type?: Boolean,
}

function shuffleArray(arr: Array<number>) {
    const shuffled = [...arr]; // 使用数组的 spread 属性创建一个新数组，将原始数组的值复制到新数组中
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 随机选择一个索引
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 交换两个元素
    }
    return shuffled;
}



export default ({ array, type = false }: Props) => {

    const [arr, setArr] = useState(structuredClone(array));
    if (!type) {
        setArr(shuffleArray(arr));
    }
    useEffect(() => {
        let aId = 0;
        let startTime: number;
        let tag = false;
        const animate = () => {
            // let time = new Date().getTime();
            let time = performance.now();
            if (!startTime) {
                startTime = time
            }
            if (!tag && time - startTime > 1500) {
                startTime = time;
                tag = true;
                setArr(shuffleArray(arr));
            }
            tag = false;
            aId = requestAnimationFrame(animate);

        }
        aId = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(aId)
        }
    })
    return <div className="array flex w-full" >
        {arr.map((item, index) => <div className="flex-item flex-1 text-center p-10 border-4 border-indigo-600" key={index}>{item}</div>)}
    </div>
}