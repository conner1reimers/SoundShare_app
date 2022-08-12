import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import down from "/public/top-arrow.svg";
import down2 from "/public/top-arrow2.svg";
import { useRouter } from "next/router";
import Image from "next/image";



interface Props {
  children: any
}


const NavItem: React.FC<Props> = React.memo(({ children }) => {
  const isOpen = useSelector((state: any) => state.navbar.xtra);
  const dispatch = useDispatch();

  const setOpen = () => {
    dispatch({ type: "TOGGLE_NAVBAR_XTRA" });
  };

  const location = useRouter();
  const [curLoaction] = useState<any>(location.pathname);

  useEffect(() => {
    if (location.pathname !== curLoaction) {
      dispatch({ type: "CLOSE_NAVBAR_OPTIONS" });
    }
  }, [location.pathname]);

  return (
    <Fragment>
      <a onClick={setOpen} className="top-nav-big--links--item bell-icon">
        <div className="bell-icon--contain">
          <Image height={20} width={20} className="down-top" src={!isOpen ? down : down2} alt="" />
        </div>
      </a>
      {isOpen && children}
    </Fragment>
  );
});

NavItem.displayName = "Navitem";

export default NavItem;