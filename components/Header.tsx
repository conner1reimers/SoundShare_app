import React, { Fragment } from 'react'
import GlobalMsg from '../components/GlobalMsg';
import Media from 'react-media';
import SideContain from '../components/shared/SideDrawer/SideContain'
import TopNav from '../components/shared/SideDrawer/TopNav'



interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({}) => {
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
    );
}