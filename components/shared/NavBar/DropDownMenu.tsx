import React from "react";
import {  useDispatch } from "react-redux";
import padlock from "/public/padlock.svg";
import feed from "/public/feed.svg";
import help from "/public/question.svg";
import cloud from "/public/cloud2.svg";
import Image from "next/image";
import Link from 'next/link';




interface DropDownProps{
  openUpload: any,
  userId: any,
  logout: any,

}

const DropDown: React.FC<DropDownProps> = React.memo(({openUpload, userId, logout}) => {
  const dispatch = useDispatch();

  const closeNav = () => {
    dispatch({ type: "CLOSE_NAVBAR_OPTIONS" });
  };

  const DropDownItem: React.FC<DropItemProp> = ({click, rightIcon, children, link, leftIcon}) => {
    const clickItem = () => {
      click();
    };
    return (
      <>
        {link ? (
          <div className="dropdown-top--item">
            <Link
              href={link || "#"}
            >
              <a className="dropdown-top--item--link">
              {leftIcon && (
                <span className="dropdown-top--item--icon">
                  {leftIcon}
                </span>
              )}
              <span className="dropdown-top--item--text">{children}</span>
              {rightIcon && (
                <span className="dropdown-top--item--icon">
                  {rightIcon}
                </span>
              )}
              </a>
            </Link>
          </div>
        ) : (
          <div onClick={clickItem} className="dropdown-top--item">
            <a className="dropdown-top--item--link">
              {leftIcon && (
                <span className="dropdown-top--item--icon">
                  {leftIcon}
                </span>
              )}
              <span className="dropdown-top--item--text">{children}</span>
              {rightIcon && (
                <span className="dropdown-top--item--icon">
                  {rightIcon}
                </span>
              )}
            </a>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="dropdown-top">
        <DropDownItem
          click={openUpload}
          leftIcon={<Image height={20} width={20} layout="intrinsic" src={cloud} alt="" />}
        >
          Upload Sound
        </DropDownItem>
        <DropDownItem
          link={`/feed/${userId}`}
          leftIcon={<Image height={20} width={20} layout="intrinsic" src={feed} alt="" />}
        >
          Following Feed
        </DropDownItem>
        <DropDownItem link="/about" leftIcon={<Image height={20} width={20} layout="intrinsic" src={help} alt="" />}>
          Contact
        </DropDownItem>
        <DropDownItem
          click={logout}
          leftIcon={<Image height={20} width={20} layout="intrinsic" src={padlock} alt="" />}
        >
          Logout
        </DropDownItem>
        
      </div>
      <div onClick={closeNav} className="notifications-list--close"></div>

    </>
  );
});

DropDown.displayName = "ddmenu";

interface DropItemProp{
  click?: any,
  children?: any,
  rightIcon?: any,
  leftIcon?: any,
  link?: any,
}


export default DropDown;