import React from 'react'
import Image from 'next/image';

const Licesnse = (props) => {
    return (
        <div className="commons-license">
          <div>
          <a rel="noreferrer"
            target="_blank"
                href="http://creativecommons.org/publicdomain/zero/1.0/">
                <div className='license-wrapper'>
                  <Image height={30} width={90} src="https://licensebuttons.net/p/zero/1.0/88x31.png" alt="CC0" />
                </div>
              </a>
              <br />
              <span>
                <a href="http://creativecommons.org/publicdomain/zero/1.0/" className="text-license-link" rel="noreferrer" target="_blank">
                  <p>This work is licensed under the Creative Commons 0 License.</p>
                </a>
              </span>
            
            </div>
          <div className="commons-license-report-sound">
            <div>
              <p>Is this sound offensive or in violation of copyright?</p>
              <button onClick={props.reportSound} className="btn nohover">Report it</button>
            </div>
          </div>

        </div>
                  
    )
}

export default Licesnse
