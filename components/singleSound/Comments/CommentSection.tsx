import React from 'react'
import CommentInput from './CommentInput'
import Comments from './Comments'

interface Props {
    soundInfo: any,
    setSoundInfo: any
}

const CommentSection: React.FC<Props> = ({soundInfo, setSoundInfo}) => {
    return (
        <div className="single-sound--comments">
            <div className="single-sound--comments--head">
            {soundInfo.comments.length === 1 ? <h1>1 Comment</h1> : <h1>{soundInfo.sound.comments.length} Comments</h1>}
            </div>
            <CommentInput setSoundInfo={setSoundInfo} soundInfo={soundInfo}/>
            <Comments setSoundInfo={setSoundInfo} soundInfo={soundInfo}/>
        </div>
    )
}

export default CommentSection
