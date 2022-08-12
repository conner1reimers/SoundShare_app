import React from 'react'

interface Props {
  classProp?: string,
  children: any,
  indx?: any
}

const DropdownBar: React.FC<Props> = React.memo(({ children, classProp, indx }) => {
  
  return (
    <div className={`uploadmodal-big--dropdown ${classProp} ${(indx || indx >= 0) ? `uploadmodal-big--dropdown-${indx}` : '' }`}>
      <ul className="globalList uploadmodal-big--dropdown--ul">
        {children}
      </ul>
    </div>
  )
})

DropdownBar.displayName = "DropdownBar";

export default DropdownBar
