import React, {
    useState,
    useEffect,
    useCallback,
    Fragment,
    useReducer,
  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowseState } from '../../../store/reducers/browseReducer';

interface Props {
  openMenu: boolean,
  curOptions: any,
  children: any,
  icon: any

}

interface RootStateConst {
  browse: BrowseState
};

const NavItem: React.FC<Props> = ({curOptions, children, openMenu, icon}) => {
    const [open, setOpen] = useState(false);
    const [elDims, setElDims] = useState<any | null>(null);
    const [isBigger, setIsBigger] = useState(false);
  
    const dispatch = useDispatch();
    const browseState = useSelector((state: RootStateConst) => state.browse);
  
    const openUp: any = useCallback(
      (event: any, option: any) => {
        let el:any = document.querySelector(
          ".main-browse--chartSection--head--dropdown--container"
        );
  
        if (event) event.preventDefault();
  
        if (openMenu && !open) {
          if (!elDims) {
            setElDims({
              height: el.offsetHeight - 4,
              width: el.offsetWidth - 4,
              biggerWidth: el.offsetWidth + 116,
            });
          }
          if (
            curOptions.genre.text &&
            curOptions.type.text &&
            curOptions.time.text
          ) {
            //
          } else if (
            !isBigger &&
            !(
              curOptions.genre.text &&
              curOptions.type.text &&
              curOptions.time.text
            )
          ) {
            if (elDims) {
              el.style.width = elDims.width + 120 + "px";
            } else {
              el.style.width = el.offsetWidth + 120 + "px";
            }
          }
  
          if (
            curOptions.genre.text &&
            curOptions.type.text &&
            curOptions.time.text
          ) {
            el.style.transform = "translateY(" + 190 + "px ) scale(" + 1 + ")";
            el.style.height = el.offsetHeight + 400 + "px";
            setOpen(true);
            dispatch({ type: "OPEN_MAIN_BROWSE_OPTIONS" });
          } else {
            setTimeout(() => {
              el.style.transform = "translateY(" + 190 + "px ) scale(" + 1 + ")";
              el.style.height = el.offsetHeight + 400 + "px";
              setOpen(true);
              dispatch({ type: "OPEN_MAIN_BROWSE_OPTIONS" });
            }, 180);
          }
        } else if (openMenu && open) {
          setOpen(false);
          dispatch({ type: "CLOSE_MAIN_BROWSE_OPTIONS" });
          el.style.height = elDims.height + "px";
  
          el.style.transform = "translateY(" + 0 + "px ) scale(" + 1 + ")";
  
          setTimeout(() => {
            if (
              curOptions.genre.text &&
              curOptions.type.text &&
              curOptions.time.text
            ) {
              if (option === "add") {
                setElDims((prev: any) => {
                  return {
                    ...prev,
                    width: el.offsetWidth - 4,
                  };
                });
              } else if (option === "remove") {
                setElDims((prev: any) => {
                  return {
                    ...prev,
                    width: prev.width - 120,
                  };
                });
                el.style.width = elDims.width - 120 + "px";
              } else if (!option) {
                el.style.width = elDims.width + "px";
              }
            } else if (
              ((curOptions.type.text && curOptions.genre.text) ||
                (curOptions.genre.text && curOptions.time.text) ||
                (curOptions.type.text && curOptions.time.text)) &&
              !isBigger
            ) {
              if (option === "add") {
                setElDims((prev: any) => {
                  return {
                    ...prev,
                    width: prev.width + 120,
                  };
                });
              } else if (option === "remove") {
                setElDims((prev: any) => {
                  return {
                    ...prev,
                    width: prev.width,
                  };
                });
                el.style.width = elDims.width + "px";
              } else if (!option || option === "change") {
                el.style.width = elDims.width + "px";
              }
            } else {
              el.style.width = elDims.width + "px";
            }
          }, 200);
        }
      },
      [open, curOptions, elDims, isBigger]
    );
  
    const updateChildWprops = React.Children.map(children, (child: any, i) => {
      return React.cloneElement(child, {
        open: openUp,
        curOptions: curOptions,
        setIsBigger,
      });
    });
  
    useEffect(() => {
      if (!browseState.mainOpen && open) {
        openUp();
      }
    }, [browseState.mainOpen]);
  
    return (
      <li className="navtest--item">
        <a
          href="#"
          className={`icon-button ${open ? "icon-button--open" : ""}`}
          onClick={openUp}
        >
          {!curOptions.genre.text &&
          !curOptions.type.text &&
          !curOptions.time.text ? (
            icon
          ) : (
            <div className="drop-label">
              <div className="dropdown-text">
                <div
                  className="dropdown-text--1"
                  style={
                    !curOptions.genre.text
                      ? {
                          display: "none",
                        }
                      : {}
                  }
                >
                  {curOptions.genre.text && (
                    <Fragment>
                      <span className="dropdown-text--main-text">
                        {curOptions.genre.text}
                      </span>
                    </Fragment>
                  )}
                </div>
                {((curOptions.type.text && curOptions.genre.text) ||
                  (curOptions.genre.text &&
                    curOptions.time.text)) && (
                  <span className="dropdown-text--dash-text dropdown-text--dash-text--1">
                    /
                  </span>
                )}
  
                <div
                  className="dropdown-text--2"
                  style={
                    !curOptions.type.text
                      ? {
                          display: "none",
                        }
                      : {}
                  }
                >
                  {curOptions.type.text && (
                    <Fragment>
                      <span className={`dropdown-text--main-text ${!curOptions.time.text ? 'dropdown-text--typetext' : ''}`}>
                        {curOptions.type.text}
                      </span>
                    </Fragment>
                  )}
                </div>
  
                {curOptions.type.text && curOptions.time.text && (
                  <span className="dropdown-text--dash-text dropdown-text--dash-text--2">
                    /
                  </span>
                )}
  
                <div
                  className="dropdown-text--3"
                  style={
                    !curOptions.time.text
                      ? {
                          display: "none",
                        }
                      : {}
                  }
                >
                  {curOptions.time.text && (
                    <Fragment>
                      <span className="dropdown-text--main-text dropdown-text--timetext">
                        {curOptions.time.text}
                      </span>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          )}
        </a>
  
        {open && updateChildWprops}
      </li>
    );
  };

export default NavItem
