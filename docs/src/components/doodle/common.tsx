import 'css-doodle';
import {
    useEffect, useState, type ReactNode, type ReactElement, useRef
} from 'react';

interface Props {
    children: ReactNode,
    download?: Boolean
}

const Doodle: React.FunctionComponent<Props> = ({ children, download }) => {
    let value = (children as ReactElement).props.value;
    let doodle = useRef<any>(null)
    let [show, setShow] = useState(false)
    const click = () => {
        setShow(show => !show);
    }
    useEffect(() => {
        setShow(true)
    })
    const downloadClick = () => {
        doodle.current &&
            doodle.current.export({
                scale: 8,
                download: true
            });
    }
    return (
        <div>
            {show && <css-doodle ref={doodle} onClick={click}>
                {value}
            </css-doodle>}
            {download && <button className='w-full pt-5 decoration-sky-500 text-xl hover:drop-shadow-md' onClick={downloadClick}>下载</button>}
        </div>
    );
};

export default Doodle;