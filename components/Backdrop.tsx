import React from 'react';
import ReactDOM from 'react-dom';


interface Props {
    onClick: any
}
const Backdrop: React.FC<Props> = ({onClick}) => {
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={onClick}>
        </div>, document.getElementById('backdrop-hook') as HTMLElement
    )
}

export default Backdrop
