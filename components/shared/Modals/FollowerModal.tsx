import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import close from '../../../public/close.svg';
import { useSelector, useDispatch } from 'react-redux';
import { isUserGetFollowersLoading } from '../../../store/selectors';
import BackdropMain from './BackdropMain';
import Media from 'react-media';
import { setModalClosed, setModalOpen } from '../../../store/actions';
import InPageLoadSpinner from '../../animatedLoaders/InPageLoad/InPageLoadSpinner';
import FollowerListItem from '../../common_reusable/FollowerListItem';
import Image from 'next/image';




interface Props {
    open?: any,
    likeList?: any,
    children?: any,
    closeModal: any,
    followers?: any,
    header: any

}

const FollowerModal: React.FC<Props> = ({open, likeList, children, closeModal, followers, header}) => {
    const dispatch = useDispatch();

    const isLoading = useSelector((state: any) => {
        return isUserGetFollowersLoading(state);
    })

    useEffect(() => {
        if (open) dispatch(setModalOpen());
        else if (!open) dispatch(setModalClosed());
    }, [open])


    const finalEl = typeof window != 'undefined' ? ReactDOM.createPortal(
        <Fragment>
            {open && <BackdropMain onClick={closeModal}/>}
            {open && (
            <div className="followers-modal">

                <InPageLoadSpinner loading={isLoading}/>

                <div className="followers-modal--head">
                    <h1 className="headings">{header}</h1>
                </div>

                <Media queries={{
                        small: "(max-width: 1099px)",
                        big: "(min-width: 1100px)"}}
                > 
                    {matches => (
                        <Fragment>
                            {matches.small && (
                            <div className="followers-modal--close--small">
                                <div className="outline-btn" onClick={closeModal}>
                                    <button className="btn nohover" type="button">Close</button>
                                </div>
                            </div>
                            )}

                            {matches.big && (
                            <div className="followers-modal--close">
                                <div onClick={closeModal}>
                                    <Image height={40} width={40} className="xtraoptions-close" src={close} alt=""/>
                                </div>
                            </div>
                            )}
                        </Fragment>
                    )}
                    
                </Media>
                {!likeList ? (
                    <FollowerList closeModal={closeModal} followers={followers}/>
                )
                : ( <Fragment>
                        {children}
                    </Fragment>
                )}
            </div>)}
            
        </Fragment>, document.getElementById('modal-hook') as HTMLElement) : null
    


    return finalEl
}


interface FollowerListProps {
    followers: any,
    closeModal: any,

}
const FollowerList: React.FC<FollowerListProps> = ({followers: followProp, closeModal, }) => {
    const followers = useSelector((state: any) => state.userPage.followers);
    const dispatch = useDispatch();

    useEffect(() => {
        if (followProp) {
            if (!followers) {
                dispatch({type: 'FETCH_FOLLOWERS', followers: followProp})
            }
           
        }
    }, [followProp]);


    let shortList = false;
    if (followers && followers.length <= 5) {
      shortList = true;
    } else if (!followers) {
        shortList = true;
    }
  
    return (
        <ul className={`globalList followers-modal--list ${shortList ? 'followers-modal--list--short' : ''}`}>
                    {followers && followers.map((el: any) => {
                        return (
                        <FollowerListItem 
                            key={el.id}
                            username={el.username}
                            imgPath={el.user_img_path}
                            desc2={el.bio}
                            id={el.id}
                            closeModal={closeModal}
                        />
                            
                        )
                    })}
    </ul>
    )
}

export default FollowerModal
