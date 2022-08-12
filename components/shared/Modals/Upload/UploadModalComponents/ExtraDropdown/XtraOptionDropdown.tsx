import React from 'react'

const XtraOptionDropdown: React.FC = (props: any) => {
  return (
  <div className="xtraOption-dropdown--wrapper">
    <ul className="globalList xtraOption-dropdown--container">
      {props.children}
    </ul>
  </div>)
}

export default XtraOptionDropdown
