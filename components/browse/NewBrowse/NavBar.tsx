import React from 'react';
import MoreFilters from './MoreFilters';

interface Props {
  type: any,
  children?: React.ReactNode
}

const NavBar: React.FC<Props> = ({ type, children }) => {
    return (
      <nav className="navtest">
        <ul className="navtest--nav">{children}</ul>
          <MoreFilters category={type} />
        
      </nav>
    );
  };
export default NavBar
