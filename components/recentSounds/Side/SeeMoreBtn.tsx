import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';

type Props = {}

const SeeMoreBtn = (props: Props) => {
  const offset = useSelector((state: RootState) => state.recentSounds.offset);
  const category = useSelector((state: RootState) => state.recentSounds.category)

  const dispatch = useDispatch();

  const getMoreSounds = () => {
    const header: any = document.querySelector(".recent-sounds--head");
    header.classList.add("recent-sounds--moreSoundsOpen");
    dispatch({ type: "FETCH_RECENT_MORE", offset: offset, category: category });
  };

  return (
    <div className="recent-sounds--seemore">
      <button
        onClick={getMoreSounds}
        className="btn nohover upload-sound-button"
        type="button"
      >
        SEE MORE
      </button>
    </div>
  )
}

export default SeeMoreBtn