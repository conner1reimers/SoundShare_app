import React, { Fragment } from 'react'
import MouseOverLabel from '../../../../util/MouseOverLabel'
import save1 from '/public/save.svg';
import Image from 'next/image';
import back1 from '/public/back-arrow.svg';
import refresh1 from '/public/refresh2.svg';

interface Props {
    back?: any,
    click?: any,
    refresh?: any,
    save?: any
}
const FXCircleBtn: React.FC<Props> = ({back, click, refresh, save}) => {


    return (
        <Fragment>
            {back && (
                <MouseOverLabel  
                label='Go back & discard changes'
                labelClass="user-page--loopList--item--moreBtn--mouse--label circlebtn-fx--mouseover--label"
                classname="user-page--loopList--item--moreBtn--mouse circlebtn-fx--mouseover  goback-fxbtn"
            >
                <div className="circleSave" >
                    <button onClick={click} className="btn nohover"><Image src={back1} alt=""/></button>
                </div>
            </MouseOverLabel>
            )}
            {save && (
                <MouseOverLabel  
                label='Save FX & go back'
                labelClass="user-page--loopList--item--moreBtn--mouse--label circlebtn-fx--mouseover--label"
                classname="user-page--loopList--item--moreBtn--mouse circlebtn-fx--mouseover"
            >
                <div className="circleSave" >
                    <button onClick={click} className="btn nohover"><Image src={save1} alt=""/></button>
                </div>
            </MouseOverLabel>
            )}
            {refresh && (
                <MouseOverLabel  
                label='Refresh FX'
                labelClass="user-page--loopList--item--moreBtn--mouse--label circlebtn-fx--mouseover--label"
                classname="user-page--loopList--item--moreBtn--mouse circlebtn-fx--mouseover refresh-fxbtn"
            >
                <div className="circleSave" >
                    <button onClick={click} className="btn nohover"><Image src={refresh1} alt=""/></button>
                </div>
            </MouseOverLabel>
            )}
        </Fragment>
    )
}

export default FXCircleBtn
