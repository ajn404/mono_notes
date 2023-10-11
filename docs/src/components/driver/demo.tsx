import { useEffect } from "react"
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// interface Element {
//     title: string,
//     description: string,
//     element: string
// }

interface Pros {
    // elements?: Array<Element>
    elements?: string
}
export default ({ elements }: Pros) => {

    const click = () => {
        if (elements && elements?.length > 0) {
            // JSON.parse(elements).map((item: Element) => {
            //     const driverObj = driver({
            //         showProgress: true,
            //         steps: JSON.parse(elements)
            //     });
            //     driverObj.highlight({
            //         element: item.element,
            //         popover: {
            //             title: item.title,
            //             description: item.description
            //         }
            //     });
            // })

            const driverObj = driver({
                showProgress: true,
                animate: true,
                steps: JSON.parse(elements)
            });
            driverObj.drive();
        }
    }
    useEffect(() => {
        return () => {
        }
    })

    return <div onClick={click} className=" cursor-pointer p-3 rounded-md text-red hover:underline">
        点击这里触发demo
    </div>
}