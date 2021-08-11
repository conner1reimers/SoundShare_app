import React, { Fragment } from 'react'
import GlobalMsg from './GlobalMsg';
import Media from 'react-media';
import SideContain from './shared/SideDrawer/SideContain'
import TopNav from './shared/SideDrawer/TopNav'



const MainHead = () => {
    return (
        <Fragment>
      <GlobalMsg/>
            
            <Media
              queries={{
                small: "(max-width: 1099px)",
                big: "(min-width: 1100px)",
              }}
            >
              {(matches) => (
                <Fragment>
                  {matches.small && (<SideContain/>)}

                  {matches.big && <TopNav />}

                  {/* <Analytics/> */}
                </Fragment>
              )}
            </Media>
      </Fragment>
    )
}

export default MainHead
