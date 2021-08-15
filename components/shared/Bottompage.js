import { Link } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { Fragment} from 'react'

const Bottompage = ({ }) => {
  const router = useRouter();


  const goToCookie = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push('/cookiepolicy', undefined, { shallow: true })
  }
  const goToTerms = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push('/termsofservice', undefined, { shallow: true })
  }

  return (
  <Fragment>
    <div className="policy-btn-holder">
      <div className="policy-btn-main" onClick={goToCookie}>
          <button className="btn nohover upload-sound-button"
            
          >
            Privacy Policy
        </button>
      </div>
      <div className="policy-btn-main" onClick={goToCookie}>
          <button className="btn nohover upload-sound-button"
            
          >
            Cookies
        </button>
      </div>
      <div className="policy-btn-main terms-btn">
          <button onClick={goToTerms} className="btn nohover upload-sound-button"
          >
            Terms of Service
          </button>
      </div>
    </div>
  </Fragment>
    );
}

export default Bottompage;