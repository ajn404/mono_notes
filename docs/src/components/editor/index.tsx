import '@blocksuite/editor/themes/affine.css';
import { useEffect, useRef } from 'react';
const isDev = import.meta.env.DEV;

export default () => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (isDev)
            import('@blocksuite/editor').then((res) => {
                const editor = new res.SimpleAffineEditor();
                ref.current?.appendChild(editor)
            })
    })
    return <>
        <div className="editor" ref={ref}></div>
    </>
}