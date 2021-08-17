import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import dots from "../../../public/more3.svg";
import unknown from '../../../public/question3.jpg';
import { useChangePage } from '../../../util/hooks/changePage';
import { useSelector } from 'react-redux';
import EditComment from './EditComment';
import { cancel } from 'redux-saga/effects';
import { useHttpClient } from '../../../util/hooks/http-hook';
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg';
import ReportComment from './ReportComment';
import { UserState } from "../../../store/reducers/user";
import { UiState } from "../../../store/reducers/uiStateReducer";
import BallLoader from '../../animatedLoaders/BallLoader/BallLoader';
import MobileModal from '../../shared/Modals/MobileModal';
import Image from 'next/image';


interface Root {
    user: UserState,
    ui: UiState
}

interface Props {
    creator_id: any,
    indx: any,
    soundInfo: any,
    setSoundInfo: any,
    message: any,
    id: any,
    path: any,
    username: any,
    date: any

}

const SingleComment: React.FC<Props> = ({indx, id, creator_id, soundInfo, setSoundInfo, message, path, username, date}) => {
    const [myComment, setMyComment] = useState(false);
    const [commentOptionsOpen, setCommentOptionsOpen] = useState(false);
    const [editCommentOpen, setEditCommentOpen] = useState(false);
    const [reportOptionsOpen, setReportOptionsOpen] = useState(false);

    const fullUser = useSelector((state: Root) => state.user.full);
    const {goToUserPage} = useChangePage();
    const isLoggedIn = useSelector((state: Root) => state.user.isLoggedIn);
    const token = useSelector((state: Root) => state.user.token);
    const setGlobalMsg = useGlobalMsg();
    const [fullCom, setFullCom] = useState(false);
    const [littleComment, setLittleComment] = useState(false)
    const gpuTier = useSelector((state: Root) => state.ui.gpuTier)
    const {isLoading, sendRequest} = useHttpClient();

    
    const goToUser = useCallback((e: any) => {
        goToUserPage(e, creator_id)
    }, [])

    const openCommentOptions = (e: any) => {
        if (!commentOptionsOpen) {
            setCommentOptionsOpen(prevState => !prevState);
        }
    } 

    const closeOptions = (e: any) => {
        if (commentOptionsOpen) {
            setCommentOptionsOpen(prevState => !prevState);
        }
    }

    const openEditComment = () => {
        if (!editCommentOpen) {
            setCommentOptionsOpen(false);
            setEditCommentOpen(prevState => !prevState);
        }
    }

    const deleteComment = async () => {
        let result;
        try {
            result = await sendRequest(
                `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/delete-comment/${soundInfo.sound.id}/${creator_id}/${id}`, 'DELETE', 
                null,
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                });
           
            
            if (result.msg === "comment-deleted") {
             
                let items = [...soundInfo.comments];

                let newComments = items.filter(el => {
                    return el !== items[indx]
                })
                setSoundInfo((prevState: any) => {
                    return {
                        ...prevState,
                        comments: newComments,
                        offset: prevState.offset - 1
                    }
                });
                
    
            } else {
                setGlobalMsg('There was some sort of error', 'error')
            }
        } catch (err) {

        }
        
    }

    const cancelEditComment = () => {
        if (editCommentOpen) {
            setEditCommentOpen(prevState => !prevState);
        }
    }

    useEffect(() => {
        if (fullUser) {
            
          if (fullUser.comments.indexOf(id.toString()) !== -1) {
            setMyComment(true);
          } else if (myComment) {
            setMyComment(false);
          }
        }
      }, [fullUser, id]);


      let msg;
      let last;
      let msgLong = false;
      if (message.length > 190) {
        msg = message.substring(0, 190); //cuts to 25
        last = message.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
        msg = msg.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
        msg = msg + `...`; //adds (...) at the end to show that it's cut
        msgLong = true;
      } else {
        msg = message;
      }

      const setSeeFullComment = () => {
          setFullCom(true);

      }
      const ref = useRef<any>(null);

      useEffect(() => {
        const height = ref.current.getBoundingClientRect().height;
        if (height <= 30) {
            setLittleComment(true);
        }
      }, [ref])
      
    const reportComment = () => {
        setCommentOptionsOpen(false);
        setReportOptionsOpen(true);
    }

    const closeReport = useCallback(() => {
        setReportOptionsOpen(false);
    }, []);


    const myLoader = () => {
        return (`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${path}`)
    }


    


    return (
        
        <li className={`single-sound-comments--item ${fullCom ? 'long-comment-singlesound' : '' } ${littleComment ? 'little-comment' : ''}`}>

            <div onClick={goToUser} className="single-sound-comments--item--pic">
                {path ? <Image loader={myLoader} height={30} width={30} src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${path}`} alt=""/> : <Image height={30} width={30} src={unknown} alt=""/>}
            </div>

            {!editCommentOpen && (
            <Fragment>
                <div onClick={goToUser} className="single-sound-comments--item--info">
                    <span className="single-sound-comments--item--info--username comment-user">{username}</span>
                    <span className="single-sound-comments--item--info--time">{date}</span>
                </div>
                
                

                <span className="single-sound-comments--item--msg">
                    {!fullCom ? 
                    (<span ref={ref} className={`comment-msg`}>
                        {msg} 
                    </span>) : (
                        <span className="comment-msg">
                            {message}
                        </span>
                    )}
                    
                    {msgLong && !fullCom && (
                        <Fragment>
                            
                            <span onClick={setSeeFullComment} className="comment-readmore">
                                Read more
                            </span>
                        </Fragment>
                        )} 
                </span>

                <div className="single-sound-comments--dots">
                    <Image onClick={openCommentOptions} alt="" src={dots}/>
                </div>



                {gpuTier && !gpuTier.isMobile ? (
                <div className="comment-options-contain">
                    {commentOptionsOpen && <div className={`comment-options ${myComment ? 'comment-options-mycomment' : ''}`}>
                        <Fragment>
                            {myComment ? (
                                <div className="comment-options--list mycomment-list">
                                    <span onClick={openEditComment} className="comment-options--list--item">
                                        <p>Edit</p>
                                    </span>
                                    <span onClick={deleteComment} className="comment-options--list--item">
                                        <p>Delete</p>
                                    </span>
                                </div>
                            ) : (
                                <div className="comment-options--list">
                                    <span onClick={reportComment} className="comment-options--list--item">
                                        <p>Report</p>
                                    </span>
                                </div>
                            )}
                        </Fragment>
                    </div>}
                </div> ) : (
                    <MobileModal open={commentOptionsOpen} cancel={closeOptions}>
                        <div className="mobile-comment-options-contain">
                        {myComment ? (
                                <div className="comment-options--list mycomment-list mobile-comment-options">
                                    <span onClick={openEditComment} className="comment-options--list--item">
                                        <p>Edit</p>
                                    </span>
                                    <span onClick={deleteComment} className="comment-options--list--item">
                                        <p>Delete</p>
                                    </span>
                                </div>
                            ) : (
                                <div className="comment-options--list mobile-comment-options">
                                    <span onClick={reportComment} className="comment-options--list--item">
                                        <p>Report</p>
                                    </span>
                                </div>
                            )}
                        </div>
                    </MobileModal>
                )}
                
            

            </Fragment>)}

            {editCommentOpen && (
                <EditComment   
                    setSoundInfo={setSoundInfo} 
                    soundInfo={soundInfo} 
                    indx={indx}
                    id={id} 
                    close={cancelEditComment}
                />)}
            
            {commentOptionsOpen && <div onClick={closeOptions} className="close-filters"></div>}

            {reportOptionsOpen && <ReportComment close={closeReport} id={id}/>}

            <div className="comment-loader">
                <BallLoader loading={isLoading}/>
            </div>
        </li>
    )
}


export default SingleComment
