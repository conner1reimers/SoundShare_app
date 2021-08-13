import React from 'react'
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalMsg } from '../../util/hooks/useGlobalMsg';
import { useSelector } from 'react-redux';

interface Props {
    isMyPage: boolean,
    setEdit: any
}

const SocialFollow: React.FC<Props> = ({ isMyPage, setEdit }) => {
    const setGlobalMsg = useGlobalMsg();

    const noLink = (link: string) => {
        if (isMyPage) {
            setEdit("social");
        } else {
            setGlobalMsg(`Creator hasn't set a ${link} link`, 'error');
        }
    }

    const youtubeLink = useSelector((state: any) => state.userPage.user.youtube_link);
    const instagramLink = useSelector((state: any) => state.userPage.user.instagram_link);
    const twitterLink = useSelector((state: any) => state.userPage.user.twitter_link);
    const facebookLink = useSelector((state: any) => state.userPage.user.facebook_link);
    

    return (
        <div className="social-follow">
            {youtubeLink ? (
                <a className="social-btn youtube" rel="noreferrer" target="_blank" href={youtubeLink}>
                    <FontAwesomeIcon icon={faYoutube} size="2x"/>
                </a>) : (
                <a className="social-btn youtube" href="#" onClick={() => noLink("Youtube")}>
                    <FontAwesomeIcon icon={faYoutube} size="2x"/>
                </a>)
            }

            {instagramLink ? (
                <a className="social-btn instagram" rel="noreferrer" target="_blank" href={instagramLink}>
                    <FontAwesomeIcon icon={faInstagram} size="2x"/>
                </a>) : (
                <a className="social-btn instagram" href="#" onClick={() => noLink("Instagram")}>
                    <FontAwesomeIcon icon={faInstagram} size="2x"/>
                </a>)
            }

            {twitterLink ? (
                <a className="social-btn twitter" rel="noreferrer" target="_blank" href={twitterLink}>
                    <FontAwesomeIcon icon={faTwitter} size="2x"/>
                </a>) : (
                <a className="social-btn twitter" href="#" onClick={() => noLink("Twitter")}>
                    <FontAwesomeIcon icon={faTwitter} size="2x"/>
                </a>)
            }

            {facebookLink ? (
                <a className="social-btn facebook" rel="noreferrer" target="_blank" href={facebookLink}>
                    <FontAwesomeIcon icon={faFacebook} size="2x"/>
                </a>) : (
                <a className="social-btn facebook" href="#" onClick={() => noLink("Facebook")}>
                    <FontAwesomeIcon icon={faFacebook} size="2x"/>
                </a>)
            }
        </div>
    )
}

export default SocialFollow;
