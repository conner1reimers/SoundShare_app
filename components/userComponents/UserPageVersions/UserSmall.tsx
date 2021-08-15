import React, {
  useEffect,
  useState,
  useReducer,
  Fragment,
  useRef,
} from "react";
import { useHttpClient } from "../../../util/hooks/http-hook";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../store/actions";
import unknown from "/public/question3.jpg";
import { isUserPageLoading } from "../../../store/selectors";
import edit from "/public/edit.svg";
import SocialFollow from "../SocialFollow";
import MouseOverLabel from "../../../util/MouseOverLabel";
import EditSocial from "../EditComponents/EditSocial";
import Media from "react-media";
import RepostList from "../UserpageComponents/RepostList";
import FavList from "../UserpageComponents/LikeList";
import SoundList from "../UserpageComponents/SoundList";
import FollowBtnSmall from "../UserpageComponents/FollowBtnSmall";
import FollowBtn from "../UserpageComponents/FollowBtn";
import RecentActivity from "../UserpageComponents/RecentActivity";
import NoUserFound from "../UserpageComponents/NoUserFound";
import { UserpageState } from "../../../store/reducers/userPageInfo";
import { UserState } from "../../../store/reducers/user";
import EditUserOptions from '../UserpageComponents/EditUserOptions';
import SoundStore from "../UserpageComponents/SoundStore";
import Image from "next/image";
import FollowerModal from "../../shared/Modals/FollowerModal";
import EditDesc from "../../singleSound/EditComponents/EditDesc";
import { useRouter } from "next/router";

interface Root {
  user: UserState,
  userPage: UserpageState
}

const userPageReducer = (state: any, action: any) => {
  switch (action.type) {
    case "sounds":
      return {
        sounds: true,
        favs: false,
        reposts: false,
        all: false,
        bio: false
      };
    case "reposts":
      return {
        sounds: false,
        favs: false,
        reposts: true,
        all: false,
        bio: false
      };
    case "all":
      return {
        sounds: false,
        favs: false,
        reposts: false,
        all: true,
        bio: false
      };
    case "favs":
      return {
        sounds: false,
        favs: true,
        reposts: false,
        all: false,
        bio: false
      };
    case "bio":
      return {
        sounds: false,
        favs: false,
        reposts: false,
        all: false,
        bio: true
      };
    default:
      return state;
  }
};

const UserSmall: React.FC = () => {
  const params: any = useRouter().query;
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();
  const [isMyPage, setIsMyPage] = useState<any>(false);
  const [editState, setEditState] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<any>();
  const [file, setFile] = useState<any>(null);
  const [fileIsValid, setFileIsValid] = useState<any>(null);
  const [followerModalOpen, setFollowModalOpen] = useState<any>(false);
  const imgPickRef = useRef<any>();

  const token = useSelector((state: Root) => state.user.token);
  const loaded = useSelector((state: Root) => state.userPage.loaded);
  const userFollowers = useSelector((state: Root) => state.userPage.user.followers);
  const userInfo = useSelector((state: Root) => state.userPage);
  const loggedInUser = useSelector((state: Root) => state.user);


  const [pageState, dispatchPage] = useReducer(userPageReducer, {
    sounds: true,
    favs: false,
    reposts: false,
    all: false,
    bio: false
  });

  const isPageLoading = useSelector((state) => {
    return isUserPageLoading(state);
  });

  useEffect(() => {
    if (!isPageLoading && params.uid) {
      if (!userInfo.user) {
        dispatch(fetchUser(params.uid));
      } else if (userInfo.user.id !== params.uid) {
          dispatch(fetchUser(params.uid));
       } 
    }

    if (loggedInUser.userId) {
      if (params.uid === loggedInUser.userId.toString()) {
        setIsMyPage(true);
      }

    }
    
    return () => {
      setIsMyPage(false);
    };
  }, [params.uid, loggedInUser.userId]);
  
  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

  useEffect(() => {
    if (loaded) {
      document.title = `${userInfo.user.username} - Soundshare`
    }
  }, [loaded, userInfo]);

  const pickedHandler = () => {
    imgPickRef.current && imgPickRef.current.click();
    
  };

  const changeProfilePic = (e: any) => {
    if (e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0]);
      setFileIsValid(true);
    } else {
      setFileIsValid(false);
    }
  };

  const postNewPic = async () => {
    let response;
    let formData = new FormData();
    formData.append("image", file);
    try {
      response = await sendRequest(
        `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/user-img/${params.uid}/${userInfo.user.user_img_path}`,
        "POST",
        formData,
        {'Authorization': 'Bearer '+token});
      
        dispatch({type: "NEW_USER_PIC", path: response});
        dispatch({type: "NEW_MAIN_USER_PIC", path: response});
      
    } catch (err) {}
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    if (file && fileIsValid) {
      postNewPic();
    }
  }, [file]);

  // useEffect(() => {
  //   return () => {
  //     if (userInfo.loaded) {
  //       dispatch({ type: "RESET_USER" });
  //     }
  //   };
  // }, [dispatch]);

  const seeFollowers = () => {
    setFollowModalOpen(true);
  };

  const closeFollowerModal = () => {
    setFollowModalOpen(false);
  };

  let username;
  let last;
  let longUsername = false;

  if (loaded && userInfo.user.username) {
    if (userInfo.user.username.length > 12) {
      longUsername = true;
      username = userInfo.user.username.substring(0, 12); //cuts to 25
      
      username = username + `...`; //adds (...) at the end to show that it's cut
    } else {
      username = userInfo.user.username;
    }
  }

  const myLoader = ({ src, width, quality }) => {
    return `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${userInfo.user.user_img_path}`;
  }

  useEffect(() => {
    let try1: any = document.querySelector('.userpage-info-smaller--userimg');

    if (try1) {
      let el: any = try1.children[0];
      el.style.overflow = "visible";
      let newImg: any = el.querySelector('img');
      if (newImg) {
        newImg.style.boxShadow = 'none';      }      
      }
  }, [userInfo]);
  

  return (
    <Fragment>
      
      {loaded && (
        <Fragment>

            <FollowerModal
              closeModal={closeFollowerModal}
              open={followerModalOpen}
              followers={userFollowers}
              header={`Following ${userInfo.user.username}`}
            />
            <div className="user-page">
                    <div className="top-nav-big--links user-page--nav">
             
                  <a
                    onClick={() => dispatchPage({ type: "sounds" })}
                    className={`top-nav-big--links--item user-page--nav--link ${
                      pageState.sounds ? "user-page--nav--link--active" : ""
                    }`}
                    href="#sounds"
                  >
                    Sounds/Loops
                  </a>
                  <a
                    onClick={() => dispatchPage({ type: "favs" })}
                    className={`top-nav-big--links--item user-page--nav--link ${
                      pageState.favs ? "user-page--nav--link--active" : ""
                    }`}
                    href="#favs"
                  >
                    Favorites
                  </a>
                  <a
                    onClick={() => dispatchPage({ type: "reposts" })}
                    className={`top-nav-big--links--item user-page--nav--link ${
                      pageState.reposts ? "user-page--nav--link--active" : ""
                    }`}
                    href="#reposts"
                  >
                    Reposts
                  </a>
                  <a
                    onClick={() => dispatchPage({ type: "bio" })}
                    className={`top-nav-big--links--item user-page--nav--link ${
                      pageState.bio ? "user-page--nav--link--active" : ""
                    }`}
                    href="#info"
                  >
                    User Info
                  </a>
                  <EditUserOptions small goToDesc={() => dispatchPage({ type: "bio" })} setEdit={setEditState} isMyPage={isMyPage} />
                    </div>
                    
        
              
                    <EditSocial
                      setEditMode={setEditState}
                      open={editState === "social"}
                      id={userInfo.user.id}
                    />
        
                    {isMyPage && (
                    <div className="userpage-info-smaller">
                      <div className="user-page--userpic user-page--userpic--mypage">

                        <div onClick={pickedHandler} className="userpage-info-smaller--userimg">
                            <input
                              type="file"
                              ref={imgPickRef}
                              id="imgPicker"
                              style={{ display: "none" }}
                              accept=".jpeg,.png,.jpg,.svg,.gif"
                              onChange={changeProfilePic}
                            />

                            {userInfo.user.user_img_path ? (
                                <Image
                                  loader={myLoader}
                                  height={130}
                                  width={130}
                                  className="user-page--userpic--main"
                                  src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${userInfo.user.user_img_path}`}
                                  alt=""
                                />
                              ) : (
                                <Image
                                  height={130}
                                  width={130}
                                  className="user-page--userpic--main"
                                  src={unknown}
                                  alt=""
                                />
                                )}

                            <div className="user-page--userpic--edit-contain">
                              <Image height={25}
                                  width={25} className="userpage-edit-img" src={edit} alt="" />
                            </div>

                        </div>

                        <div className="userpage-info-smaller--info">

                          <div className="user-page--info--username moveright">
                            <span className={`${longUsername ? 'userinfo-username-longuser' : ''}`}>{userInfo.user.username}</span>
                          </div>

                          <div className="user-page--info--joined moveright">
                            {userInfo.user.days === 0 ? (
                              <span>Joined Today!</span>
                            ) : userInfo.user.days === 1 ? (
                              <span>Joined 1 Day Ago</span>
                            ) : (
                              <span>Joined {userInfo.user.days} days ago</span>
                            )}
                          </div>

                          <div className="user-page--info--followers moveright">
                            <MouseOverLabel
                              label="See followers"
                              classname="circle-btn-mouseover userpage-followers-mouseover"
                              labelClass="singlesound-options-mouseover--label"
                              circle
                            >
                              <span onClick={seeFollowers}>
                                {userInfo.user.followers.length} Followers
                              </span>
                            </MouseOverLabel>
                            </div>
                            
                           

                          </div>
                          
                      </div>

                      
                    </div>
                    )}

                    {!isMyPage && (
                      <div className="userpage-info-smaller">
                          <div className="user-page--userpic">

                            <div  className="userpage-info-smaller--userimg">
                              {userInfo.user.user_img_path ? (
                                <Image
                                  className="user-page--userpic--main"
                                  loader={myLoader}
                                  height={130}
                                  width={130}
                                  src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${userInfo.user.user_img_path}`}
                                  alt=""
                                />
                              ) : (
                                <Image
                                  className="user-page--userpic--main"
                                  src={unknown}
                                  alt=""
                                  height={130}
                                  width={130}
                                />
                              )}
                            
                          </div>
                          
                        
                      <div className="userpage-info-smaller--info">
                          <div className="user-page--info--username moveright">
                          <span className={`${longUsername ? 'userinfo-username-longuser' : ''}`}>{userInfo.user.username}</span>
                        </div>
            
                        <div className="user-page--info--joined moveright">
                          {userInfo.user.days === 0 ? (
                            <span>Joined Today!</span>
                          ) : userInfo.user.days === 1 ? (
                            <span>Joined 1 Day Ago</span>
                          ) : (
                            <span>Joined {userInfo.user.days} days ago</span>
                          )}
                        </div>
            
                        <div className="user-page--info--followers moveright">
                          <MouseOverLabel
                            label="See followers"
                            classname="circle-btn-mouseover userpage-followers-mouseover"
                            labelClass="singlesound-options-mouseover--label"
                            circle
                          >
                            <span onClick={seeFollowers}>
                              {userInfo.user.followers.length} Followers
                            </span>
                          </MouseOverLabel>
                        </div>

                            <FollowBtnSmall id={userInfo.user.id} isMyPage={isMyPage} />
                            
                      </div>
                    
                  </div>
                        

                  </div>
                    )}
        
                {pageState.sounds && (
                  <div className="user-page--loops">
                    <SoundList/>
                  </div>
                )}
                {pageState.favs && (
                  <div className="user-page--loops">
                    <FavList/>
                  </div>
                )}
                {pageState.reposts && (
                  <div className="user-page--loops">
                    <RepostList/>
                  </div>
                )}
                {pageState.bio && (
                  <div className="user-page--loops">
                    
                    <div className="social-follow--contain">
                      <SocialFollow
                        isMyPage={isMyPage}
                        setEdit={setEditState}
                      />
                    </div>
                
                  <SoundStore id={userInfo.user.id} isMyPage={isMyPage}/>
                    
                    
        
                    {editState !== "desc" && (
                      <div className="user-page--info--desc--contain">
                        <div className="user-page--info--desc">
                          <p>
                            {userInfo.user.bio
                              ? userInfo.user.bio
                              : "This user has not left any information about themselves."}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="edit-user-bio edit-user-bio-med">
                      <EditDesc
                        setEditMode={setEditState}
                        user
                        open={editState === "desc"}
                        desc={userInfo.user.bio ? userInfo.user.bio : ""}
                        id={userInfo.user.id}
                      />
                    </div>
                    
                  </div>)}
          </div>
        </Fragment>)}
      
        {!loaded && !userInfo.user.username && (
        <Fragment>
            <NoUserFound/>
        </Fragment>
        )}
    
      </Fragment>
              )
  
}

export default React.memo(UserSmall);
