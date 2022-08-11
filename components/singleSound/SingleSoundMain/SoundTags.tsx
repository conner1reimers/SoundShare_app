import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHttpClient } from '../../../util/hooks/http-hook';

interface Props {
  tag: any,
  category: any,
  notLast: any
}


const SoundTags: React.FC<Props> = ({tag, category, notLast}) => {
  const history = useRouter();
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();

  const searchTag = async (e: any) => {
    e.preventDefault();

    let searchTxt = tag;
    let res;
    
    try {
      res = await sendRequest(`/users/searchsounds/${category}/${searchTxt}`);
      dispatch({ type: "SEARCH_BROWSE_HOME", results: res });

      history.push("/browse"+category);
    } catch (err) {}
  };

  return (
    <div className="single-tag" onClick={searchTag}>
      <span>{tag}{notLast ? ',' : ''} </span>
    </div>
  );
};
export default SoundTags
