import React from 'react'
import { useDispatch } from 'react-redux'

const TestAd: React.FC = () => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch({ type: "SHOW_AD" });
  }
  return (
    <div className="terms-conditions">
      <div className="terms-inner policy-inner">
        <button onClick={open} className="btn nohover">click</button>
      </div>

      <div className="ad-hm-slot">
                <div id="div-gpt-ad-skyscraper-1" className="ad-slot"/>
             </div>
    </div>
  )
}


export default TestAd
