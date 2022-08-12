import { Box, Typography } from '@material-ui/core';
import React from 'react'
import { Fragment } from 'react';
import { useState } from 'react';
import BrowseOptionModal from '../shared/Modals/BrowseOptions/BrowseOptionModal'
import listening3 from '../../public/listening-new2.svg';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

const BrowseBox: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const dispatch = useDispatch();


    const openBrowseOptions = (e) => {
        setModalOpen(true);
        dispatch({type: "SET_BROWSE_MODAL_OPEN"})
    }
    

    return (
        <Fragment>
            <Box onClick={openBrowseOptions} className="firstpage--box firstpage--box1 ">
                <Typography color="primary" component="h1" variant="h3">Browse sounds...</Typography>

                
                <button className="btn nohover firstpage--box1--btn" type="button">
                    <div>
                        <Image
                            src={listening3}
                            alt=""
                            height={60}
                            width={60}
                        />
                    </div>
                </button>
            </Box>

            <BrowseOptionModal mobile setOpen={setModalOpen} open={modalOpen}/> 

        </Fragment>
    )
}

export default BrowseBox
