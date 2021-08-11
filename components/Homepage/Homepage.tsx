import React, { Fragment } from 'react'
import { Box } from '@material-ui/core'
import FirstpageBox from './FirstpageBox'
import RecentSounds from '../recentSounds/RecentSounds'





const Homepage: React.FC = () => {
    return (
        <Fragment>
            <Box component="div" className="searchSound">
                <FirstpageBox/>
            </Box>
        
            <RecentSounds/>

        </Fragment>
    )
}

export default React.memo(Homepage);
