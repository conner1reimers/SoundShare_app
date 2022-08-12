import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserpageState } from "../../../store/reducers/user/userPageInfo";
import FollowerListItem from '../../common_reusable/FollowerListItem';

interface Root {
  userPage: UserpageState
}

interface Props {
  favs2: any,
  reposts: any,
  option: any,
  closeModal: any
}

const LikeSoundList: React.FC<Props> = ({favs2, reposts, option, closeModal}) => {
  const favs = useSelector((state: Root) => state.userPage.followers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (option === 'likes') {
      if (favs2) {
            dispatch({type: 'FETCH_FOLLOWERS', followers: favs2});
      }
    } else if (option === 'reposts') {
      if (reposts) {
            dispatch({type: 'FETCH_FOLLOWERS', followers: reposts});
      }}
  }, [favs2, option, reposts]);


  let shortList = false;
  if (favs && favs.length <= 5) {
    shortList = true;
  }

  return (
      <ul className={`globalList followers-modal--list ${shortList ? 'followers-modal--list--short' : ''}`}>
        {favs && favs.map((el: any) => {
          return (
            <FollowerListItem 
                key={el.id}
                username={el.username}
                imgPath={el.user_img_path}
                id={el.id}
                closeModal={closeModal}
            />
          )
        })}
      </ul>

  )
}
export default LikeSoundList
