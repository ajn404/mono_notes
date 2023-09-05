import 'css-doodle';
import {
    useEffect, useState, type ReactNode, type ReactElement, useRef
} from 'react';

interface Props {
    children: ReactNode,
    download?: Boolean,
    grid?: string
}

const Doodle: React.FunctionComponent<Props> = ({ children, download, grid }) => {
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
            {show && <css-doodle ref={doodle} onClick={click} grid={grid?.toString()}>
                {value}
            </css-doodle>}
            {download && <button className='w-[50vmin] pt-1 text-skin-base text-l hover:drop-shadow-md' onClick={downloadClick}>下载</button>}
        </div>
    );
};

export default Doodle;