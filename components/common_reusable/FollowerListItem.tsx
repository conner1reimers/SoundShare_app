import Image from 'next/image';
import React, { Fragment, useEffect, } from 'react'
import Media from 'react-media';
import { useChangePage } from '../../util/hooks/changePage';
import { useFollowUser } from '../../util/hooks/useFollowUser';
import follow from "../../public/followers.svg";
import unknown from "../../public/question3.jpg";
import BallLoader from '../animatedLoaders/BallLoader/BallLoader';

interface Props {
  id: any,
  imgPath: any,
  closeModal: any,
  desc2?: any,
  username: any
}

const FollowerListItem: React.FC<Props> = ({id, desc2, imgPath, closeModal, username}) => {
    const {goToUserPage} = useChangePage();
    const {isFollowing, followUser, isLoading} = useFollowUser(id, 'follow-modal')


    const gotoUser = (e: any) => {
        closeModal();
        goToUserPage(e, id);
    }
    
    let desc: any;
    let smallDesc: any;
    let smallestDesc: any;
    let last: any;
    if (desc2) {
        if (desc2.length > 225) {
            desc = desc2.substring(0, 225); //cuts to 25
            last = desc.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
            desc = desc.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
            desc = desc + `...`; //adds (...) at the end to show that it's cut
          } else {
            desc = desc2;
          }
        if (desc2.length > 175) {
            smallDesc = desc2.substring(0, 175); //cuts to 25
            last = smallDesc.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
            smallDesc = smallDesc.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
            smallDesc = smallDesc + `...`; //adds (...) at the end to show that it's cut
          } else {
            smallDesc = desc2;
          }
        if (desc2.length > 100) {
            smallestDesc = desc2.substring(0, 100); //cuts to 25
            last = smallestDesc.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
            smallestDesc = smallestDesc.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
            smallestDesc = smallestDesc + `...`; //adds (...) at the end to show that it's cut
          } else {
            smallestDesc = desc2;
          }
    } else {
        desc = 'This user has not left any information about themselves';
        smallDesc = 'This user has not left any information about themselves';
        smallestDesc = 'This user has not left any information about themselves';
    }


    const myLoader = () => {
      return `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${imgPath}`;
    }

    useEffect(() => {
      let try1: any = document.getElementsByClassName('followers-modal--list--item--img');
      
      if (try1) {
        for (let i = 0; i < try1.length; i++) {
          let el: any = try1[i].children[0];
          el.style.overflow = "visible";
          let newImg: any = el.querySelector('img');
          if (newImg) {
            newImg.style.boxShadow = 'none';      }      
          }
        }
        
    }, []);
  
    useEffect(() => {
      let try1: any = document.getElementsByClassName('follower-modal-followbtn-contain');
  
      if (try1) {
        for (let i = 0; i < try1.length; i++) {
          let el: any = try1[i].children[0].children[0].children[0];
          el.style.overflow = "visible";
          let newImg: any = el.querySelector('img');
          let newFollow: any = el.children[1]
          let newFollow2: any = el.children[2]

          if (newImg) {
            newImg.style.boxShadow = 'none';
          }
          if (newFollow) {
            newFollow.style.marginLeft = '0.7vw';
          }
          if (newFollow2) {
            newFollow2.style.marginLeft = '0.7vw';
          }
        }
        
        }
    }, []);

    return (
      <Fragment>
      <Media queries={{
        smallest: "(max-width: 475px)",
        small: "(min-width: 476px) and (max-width: 675px)",
        big: "(min-width: 676px)"
      }}> 
      {matches => (
     
            <li  onClick={gotoUser}
                className="followers-modal--list--item"
            >
                <div className="followers-modal--list--item--contain">
                    {/* USER IMAGE */}
                    <div className="followers-modal--list--item--img">
                        {imgPath ? (
                    <Image
                      width={50}
                      height={50}
                      loader={myLoader}
                      className="img-shine" src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${imgPath}`}
                      alt="" />
                        ) : (
                          <Image width={50}
                          height={50} className="img-shine" src={unknown} alt=""/>
                        )}
                    </div>
                    {/* USERNAME */}
                    <div className="followers-modal--list--item--name">
                        <span>{username}</span>
                    </div >

                   

                    <div className="user-page--info--followBtn outline-btn follower-modal-followbtn-contain">
                          <button
                            onClick={followUser}
                            className="btn nohover"
                            type="button"
                          >
                            {isFollowing ? (
                              <span>
                                Unfollow <Image width={20} layout="intrinsic" unoptimized={true}
                      height={20} src={follow} alt="" />
                              </span>
                            ) : (
                              <span>
                                Follow <Image width={20} layout="intrinsic" unoptimized={true}
                      height={20} src={follow} alt="" />
                              </span>
                            )}
                          </button>
                          <div className="follower-ball-loader">
                          <BallLoader loading={isLoading}/>
                          </div>
                          
                    </div>
                    <div className="followers-modal--list--item--desc">
                        <Fragment>
                            
                        {matches.big ? (
                            <p>{desc}</p>
                            ) 
                            : matches.small ? (
                            <p>{smallDesc}</p>
                            )
                            : (
                              <p>{smallestDesc}</p>
                            )
                        }
                         </Fragment>
                        
                    </div>

                </div>
                
            </li>
        
      )}
        
        </Media>
        </Fragment>
    )
}


export default React.memo(FollowerListItem);
