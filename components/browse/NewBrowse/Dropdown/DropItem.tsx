import React from 'react'

interface Props {
  type?: string,
  curOptions?: any,
  open?: any,
  setIsBigger?: any,
  optionSelect?: any,
  children?: any,
  option?: any,
  rightIcon?: any
}


const DropItem: React.FC<Props> = ({type, curOptions, open, setIsBigger, optionSelect, children, option, rightIcon}) => {
  
    const clickHandler = (event: any, option: any, type: any) => {
        event.preventDefault();
        
          if (type === "genre") {
            if (curOptions.genre.verify === option) {
              optionSelect({ type: "reset-genre" });
              setIsBigger(false);
              open(null, "remove");
            } else {
              optionSelect({ type: option });
              if (curOptions.time.text && curOptions.type.text) {
                setIsBigger(true);
                open(null, "add");
              } else if (curOptions.genre.text) {
                open(null, "change");
              } else if (!curOptions.genre.text) {
                open(null, "add");
              }
            }
          } else if (type === "type") {
            if (curOptions.type.verify === option) {
              optionSelect({ type: "reset-type" });
              setIsBigger(false);
              open(null, "remove");
            } else {
              optionSelect({ type: option });
              if (curOptions.time.text && curOptions.type.text) {
                setIsBigger(true);
                open(null, "add");
              } else if (curOptions.type.text) {
                open(null, "change");
              } else if (!curOptions.type.text) {
                open(null, "add");
              }
            }
          } else if (type === "time") {
            if (curOptions.time.verify === option) {
              optionSelect({ type: "reset-time" });
              setIsBigger(false);
              open(null, "remove");
            } else {
              optionSelect({ type: option });
              if (curOptions.time.text && curOptions.type.text) {
                setIsBigger(true);
                open(null, "add");
              } else if (curOptions.time.text) {
                open(null, "change");
              } else if (!curOptions.time.text) {
                open(null, "add");
              }
            
          }
        }
      };
    return (
      <a
        href=""
        className="menu-item"
        onClick={(event) => clickHandler(event, option, type)}
      >
        {children}

        {rightIcon && (
          <div className="menu-item--check">
            {rightIcon}
          </div>
        )}
      </a>
    );
  };

export default DropItem
