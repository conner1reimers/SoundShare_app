import { Box, Typography } from '@material-ui/core';
import React from 'react'
import { Fragment } from 'react';
import { useState } from 'react';
import BrowseOptionModal from '../shared/SideDrawer/BrowseOptions/BrowseOptionModal'
import listening3 from '../../util/img/listening-new2.svg';
import Image from 'next/image';

const BrowseBox: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const openBrowseOptions = () => {
        setModalOpen(true);
    }

    

    return (
        <Fragment>
            <Box onClick={openBrowseOptions} className="firstpage--box firstpage--box1 ">
                <Typography color="primary" component="h1" variant="h3">Browse sounds...</Typography>

                
                <button className="btn nohover firstpage--box1--btn" type="button">
                    <Image
                        src={listening3}
                        alt=""
                        height={30}
                        width={30}
                    />
                </button>
            </Box>

            <BrowseOptionModal mobile setOpen={setModalOpen} open={modalOpen}/> 

        </Fragment>
    )
}

export default BrowseBox
