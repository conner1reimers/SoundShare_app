import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { isBrowseLoading, isBrowseRefreshing } from "../../../store/selectors";
import Media from "react-media";
import { useGlobalMsg } from "../../../util/hooks/useGlobalMsg";
import { BrowseState } from '../../../store/reducers/browseReducer';
import InPageLoadSpinner from "../../animatedLoaders/InPageLoad/InPageLoadSpinner";
import SoundListItem from "../../common_reusable/SoundListItem";
import Dropdown from "./Dropdown/Dropdown";
import MoreFilters from "./MoreFilters";
import NavBar from "./NavBar";
import NavItem from "./NavItem";


interface Props {
  type: string,
  dispatch: any,
  optionState: any


}

interface RootStateConst {
  browse: BrowseState
};

const ChartSection: React.FC<Props> = ({type, dispatch, optionState}) => {
    const browseResults = useSelector((state: RootStateConst) => state.browse.results);

    const isLoading = useSelector((state) => {
        return isBrowseLoading(state);
      });

    const isRefreshing = useSelector((state) => {
        return isBrowseRefreshing(state);
    });
  
    useEffect(() => {
      
    }, [])
    
    return (
        <div className="main-browse--chartSection">
        <div className="main-browse--chartSection--listContain">
          
          <header className="main-browse--chartSection--head">
            <span className="headings main-browse--chartSection--head--undertext">
              Search for sounds by type
            </span>

            {/* <Media query="(max-width: 450px)" render={() =>
              (
                <div className="more-filters-browse-smaller">
                  {/* <MoreFilters category={type} /> */}
                
            

            <div className="main-browse--chartSection--head--dropdown">
              <div className="main-browse--chartSection--head--dropdown--wrapper">
                <div className="main-browse--chartSection--head--dropdown">
                  <div className="main-browse--chartSection--head--dropdown--container">
                    <NavBar type={type}>
                      <NavItem
                        openMenu
                        curOptions={optionState}
                        icon={<div className="drop-label">SEE OPTIONS</div>}
                      >
                        <Dropdown
                          types
                          menuLabel="TAGS"
                          curOptions={optionState}
                          optionSelect={dispatch}
                          browseType={type}
                        />
                        <Dropdown
                          curOptions={optionState}
                          genres
                          menuLabel="GENRES"
                          optionSelect={dispatch}
                          browseType={type}
                        />
                        <Dropdown
                          times
                          curOptions={optionState}
                          menuLabel="TIME"
                          optionSelect={dispatch}
                          browseType={type}
                        />
                      </NavItem>
                    </NavBar>
                  </div>
                </div>
              </div>
            </div>
            

          </header>


          <div className="globalList main-browse--chartSection--listDiv">
            <InPageLoadSpinner loading={isLoading} />

            <ul className="globalList main-browse--chartSection--list">
              {!isLoading &&
                browseResults &&
                browseResults.map((el: any) => {
                  return (
                    <SoundListItem
                      key={el.id}
                      category={el.category}
                      sound_id={el.id}
                      img_path={el.img_path}
                      date={el.date_time}
                      name={el.name}
                      creator={el.creator_id}
                      path={el.path}
                      el={el}
                      browse
                      location="browse"
                      favCount={el.favs.length}
                      repostCount={el.reposts.length}
                      downloadCount={el.downloads}
                    />
                  );
                })}
            </ul>

            {!isLoading && browseResults && (
              <div className="refresh-browse-spinner">
                <InPageLoadSpinner loading={isRefreshing} />
              </div>
            )}
          </div>
        </div>
      </div>

    )
}

export default ChartSection
