import React from 'react';
import facebook from '../../public/facebook.svg';
import Image from 'next/image';

const FacebookIcon = () => {
    return (
        <div className="facebook-login-contain--icon">
            <Image src={facebook} alt=""/>
        </div>
    )
}

export default FacebookIcon
