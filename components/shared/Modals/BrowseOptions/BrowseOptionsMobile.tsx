import React from 'react'
import { Fragment } from 'react';
import { useState } from 'react';
import BrowseOptionModal from './BrowseOptionModal';

const BrowseOptionsMobile = (props: any) => {
    const [modalOpen, setModalOpen] = useState(false);


    const openBrowseOptions = (e: any) => {
        e.preventDefault();
        setModalOpen(true);
    }

    
    return (
        <Fragment>
            <div className={`sidedrawer-navlink ${props.locationOption === 'browse' ? 'active-sidedrawer' : ''}`}>
                <button 
                    onClick={openBrowseOptions} 
                    className="btn nohover sidedrawer--list--btn"
                    >Browse 
                </button>
            </div>
            
            <BrowseOptionModal setOpen={setModalOpen} open={modalOpen} mobile/>

        </Fragment> 
    )
}

export default BrowseOptionsMobile;
