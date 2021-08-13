import { Link } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { Fragment} from 'react'

const Bottompage = ({ }) => {
  const router = useRouter();


  const goToCookie = (e) => {
    console.log('ger')

    e.preventDefault();
    e.stopPropagation();
    router.push('/cookiepolicy', undefined, { shallow: true })
    console.log('his')
  }

  return (
  <Fragment>
    <div className="policy-btn-holder">
      <div className="policy-btn-main" onClick={goToCookie}>
          <button className="btn nohover"
            
          >
            Privacy Policy
        </button>
      </div>
      <div className="policy-btn-main">
          <button
          >
            Terms of Service
          </button>
      </div>
    </div>
  </Fragment>
    );
}

export default Bottompage;