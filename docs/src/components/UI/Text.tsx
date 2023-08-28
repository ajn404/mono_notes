import type { ReactElement, ReactNode } from 'react';
import './text.scss'
interface Props {
    children: ReactNode
}

export default function Text({ children }: Props) {
    let value = (children as ReactElement).props.value;
    
    if (value.length > 0) {
        return (
            <div className="text-container">
                <div className="container">
                    <span  className="txt anim-text-flow ">
                        {
                            value.split('').map((str: string) => <span key={str}>{str}</span>)
                        }
                    </span>
                </div>
            </div>
        )
    }
    return (<div className='red '>add text</div>)


}