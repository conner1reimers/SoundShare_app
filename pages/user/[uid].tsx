import { useRouter } from 'next/router'
import React, {Fragment, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { isUserPageLoading } from "../../store/selectors";
import Media from "react-media";
import LoadingAnimation from '../../components/animatedLoaders/LoadingAnimation/LoadingAnimation';
import UserBig from '../../components/userComponents/UserPageVersions/UserBig';
import UserSmall from '../../components/userComponents/UserPageVersions/UserSmall';
import useWindowSize from '../../util/useWindowSize';



export default function User() {
 const isPageLoading = useSelector((state: any) => {
  return isUserPageLoading(state);
 });
  const [loaded, setLoaded] = useState<any>(false);
  const browserDims = useWindowSize()
  
  useEffect(() => {
    if (browserDims) {
      setLoaded(true);
    }
  }, [browserDims])
  
  

  return (
    <Fragment>

        <Fragment>
          <LoadingAnimation loading={isPageLoading} />

        <Media queries={{
              small: "(max-width: 1099px)",
              big: "(min-width: 1100px)",
             
            }}>

            {(matches) => (
              <Fragment>
                
                {matches.big && (
                  <UserBig/>)}
                  
                {matches.small && (
                  <UserSmall/>)}

                
                </Fragment>)}
          </Media>
        </Fragment>

        </Fragment>
  )
}