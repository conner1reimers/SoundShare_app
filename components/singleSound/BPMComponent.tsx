import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch } from 'react-redux';

interface Props {
    bpm?: any,
    category?: any

}

const BPMComponent: React.FC<Props> = ({bpm, category}) => {
    const history = useRouter();
    const dispatch = useDispatch();

    const searchBPM = async (e: any) => {
        e.preventDefault();
        dispatch({ type: 'SEARCH_BPM', bpm: bpm});
        history.push(`/browse${category}`, undefined, {shallow: true});
    }

    return <span onClick={searchBPM} className="repost-singlesound-count">BPM: {bpm ? `${bpm}` : 'Unknown'}</span>
    
}

export default BPMComponent;
