import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';


interface Props {
    onClick?: any,
    backdropClass?: any
}
const BackdropMain: React.FC<Props> = ({onClick, backdropClass}) => {
    const fxOpen = useSelector((state: any) => state.upload.fxState.fxpageOpen);

    return ReactDOM.createPortal(
        <div className={`backdrop-main ${backdropClass} ${fxOpen ? 'backdrop-main--fxOpen' : ''}`} onClick={onClick}>

        </div>, document.getElementById('backdrop-main-hook') as HTMLElement
    )
}

export default BackdropMain;
