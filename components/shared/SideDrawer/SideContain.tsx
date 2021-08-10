import React, { useCallback } from 'react'
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hamburger from '../../Components/lotties/Hamburger';
import SideDrawer from './SideDrawer'

const SideContain: React.FC = () => {
	const dispatch = useDispatch();
    const sideDrawerOpen = useSelector((state: any) => state.sideDrawer.open);
    const modalOpen = useSelector((state: any) => state.globalMsg.aModalIsOpen);

	const setSidedrawerOpen = useCallback(() => {
		dispatch({ type: "OPEN_SIDE_DRAWER" });
	}, [dispatch]);
	
	const toggleSideDrawer = () => {
		if (!modalOpen) {
			if (!sideDrawerOpen) {
				setSidedrawerOpen();
			} else {
				dispatch({ type: "CLOSE_SIDE_DRAWER" })
			}
		}
		
	}
    

    return (
            <Fragment>
				<div onClick={toggleSideDrawer}>
					<Hamburger on={sideDrawerOpen} />
			    </div>

				<SideDrawer
					open={sideDrawerOpen}
				/>

			</Fragment>
    )
}

export default SideContain
