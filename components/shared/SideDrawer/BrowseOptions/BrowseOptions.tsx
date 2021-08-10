import React, { useState } from 'react'
import { Fragment } from 'react';
import browse from "../../../../util/img/browse.svg";
import MouseOverLabel from '../../../../util/MouseOverLabel';
import BrowseOptionModal from './BrowseOptionModal';
import Image from 'next/image';

const BrowseOptions: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<any>(false);

    const openBrowseOptions = () => {
        setModalOpen(true);
    }

    return (
        <Fragment>
            <MouseOverLabel
                classname="topnav-mouseover browse-mouseover topnav-mouseover--label--browse"
                labelClass="topnav-mouseover--label" 
                label="Browse sounds"
              >
                <a onClick={openBrowseOptions} className="top-nav-big--links--item">
                    <div className="bell-icon--contain">
                        <Image src={browse} alt="" />
                    </div>
                </a>
            </MouseOverLabel>

            <BrowseOptionModal setOpen={setModalOpen} open={modalOpen}/>

        </Fragment>
    )
}

export default BrowseOptions
