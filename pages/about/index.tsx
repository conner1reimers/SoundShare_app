import React, { useEffect } from 'react'
import me from '../../public/me.jpg';
import Image from 'next/image';

const About: React.FC = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
	    document.body.style.position = 'fixed';
        document.body.style.height = '100vh';
    
        document.title = "Soundshare - About/Contact"
    
        return () => {
            document.body.style.overflowY = 'visible';
			document.body.style.overflowX = 'hidden';
			document.body.style.position = 'relative';
			document.body.style.height = '100%';
        }
    }, []);

    return (
        <div className="about-page-contain">
            <div className="about-page">
                <div className="about-square">

                    <div className="about-square--img">
                        <Image height={250} width={250} src={me} alt=""/>
                    </div>

                    <div className="about-square--desc">
                        <p>
                        As the developer / designer of SoundShare, I handle all of the technical details along with design. If you run into any bugs or issues send me an 
                        email to get it fixed.

                        
                        </p>
                        <p className="email-about">
                            connerreimers@gmail.com
                        </p>
                        
                    </div>

                    <div className="about-square--background">

                    </div>

                    <div className="about-square--innerBack">

                    </div>
                </div>

            </div>
        </div>
    )
}


export default About
