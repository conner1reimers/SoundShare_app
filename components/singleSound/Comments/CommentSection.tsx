import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/reducers'
import CommentInput from './CommentInput'
import Comments from './Comments'

interface Props {
    soundInfo: any,
    setSoundInfo: any
}

const CommentSection: React.FC = () => {
    const commentLength = useSelector((state: RootState) => state.singleSound.comments.length);

    return (
        <div className="single-sound--comments">
            <div className="single-sound--comments--head">
            {commentLength === 1 ? <h1>1 Comment</h1> : <h1>{commentLength} Comments</h1>}
            </div>
            <CommentInput />
            <Comments />
        </div>
    )
}

export default CommentSection
