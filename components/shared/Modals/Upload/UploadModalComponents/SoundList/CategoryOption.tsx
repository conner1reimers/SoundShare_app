import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { changeListSingleCategory } from '../../../../../../store/actions/uploadActions';
import DropdownBar from '../ChooseGenre/DropdownBar';
import DropdownClick from '../ChooseGenre/DropdownClick';
import CategoryDropdown from './CategoryDropdown';


interface Props {
  soundType: string,
  duration: number,
  indx: number
}


const CategoryOption: React.FC<Props> = ({ soundType, duration, indx }) => {
  const dispatch = useDispatch();

  const click = (el: any) => {
    dispatch(changeListSingleCategory(el, indx));
  }


  return (
    <Fragment>
        <div className="upload-list-edit-options-category">
          {soundType && (
            
            <DropdownBar indx={indx} classProp="category-dropdown-bar">
              <DropdownClick chosen={soundType} cat_list indx={indx}>
                  <CategoryDropdown duration={duration} setGenre={click}/>
              </DropdownClick>
            </DropdownBar>
            )}
      </div>
      
    </Fragment>
  )
}

export default CategoryOption
