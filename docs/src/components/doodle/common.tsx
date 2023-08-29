import 'css-doodle';
import { useEffect, useState,type  ReactNode,type ReactElement} from 'react';

interface Props {
    children: ReactNode
}

const Doodle: React.FunctionComponent<Props> = ({ children }) => {
     let value = (children as ReactElement).props.value;
    let [show,setShow] = useState(false)
     const click = () => {
        setShow(show => !show);
    }
    useEffect(() => {
        setShow(true)
    })
  return (
      show&& <css-doodle onClick={click}>
      {value}
    </css-doodle>
  );
};

export default Doodle;