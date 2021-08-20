import React, { useEffect, useReducer, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import BrowseHead from '../../components/browse/BrowseHead';
import ChartSection from '../../components/browse/NewBrowse/ChartSection';
import { BrowseState } from '../../store/reducers/browseReducer';
import { useGlobalMsg } from '../../util/hooks/useGlobalMsg';

const optionsReducer = (state:any, action:any) => {
  switch (action.type) {
    case "aggressive":
      return {
        ...state,
        genre: {
          aggressive: true,
          nature: false,
          digital: false,
          alerts: false,
          other: false,
          calm: false,
          all: false,
          text: "Aggressive",
          verify: "aggressive",
        },
      };
    case "reset-genre":
      return {
        ...state,
        genre: {
          aggressive: false,
          nature: false,
          digital: false,
          alerts: false,
          other: false,
          calm: false,
          all: false,
          text: null,
          verify: null,
        },
      };
    case "nature":
      return {
        ...state,
        genre: {
          aggressive: false,
          nature: true,
          digital: false,
          alerts: false,
          other: false,
          calm: false,
          all: false,
          text: "Nature",
          verify: "nature",
        },
      };
    case "digital":
      return {
        ...state,
        genre: {
          aggressive: false,
          nature: false,
          digital: true,
          alerts: false,
          other: false,
          calm: false,
          all: false,
          text: "Digital",
          verify: "digital",
        },
      };
    case "alerts":
      return {
        ...state,
        genre: {
          aggressive: false,
          nature: false,
          digital: false,
          alerts: true,
          other: false,
          calm: false,
          all: false,
          text: "Alerts",
          verify: "alerts",
        },
      };
    case "other":
      return {
        ...state,
        genre: {
          aggressive: false,
          nature: false,
          digital: false,
          alerts: false,
          other: true,
          calm: false,
          all: false,
          text: "other",
          verify: "other",
        },
      };
    case "calm":
      return {
        ...state,
        genre: {
          aggressive: false,
          nature: false,
          digital: false,
          alerts: false,
          other: false,
          calm: true,
          all: false,
          text: "Calm",
          verify: "calm",
        },
      };
    case "all-genre":
      return {
        ...state,
        genre: {
          aggressive: false,
          nature: false,
          digital: false,
          alerts: false,
          other: false,
          calm: false,
          all: true,
          text: "All",
          verify: "all-genre",
        },
      };
    case "dark":
      return {
        ...state,
        type: {
          dark: true,
          crisp: false,
          pretty: false,
          harsh: false,
          loud: false,
          unique: false,
          all: false,
          text: "Dark",
          verify: "dark",
        },
      };

    case "crisp":
      return {
        ...state,
        type: {
          dark: false,
          crisp: true,
          pretty: false,
          harsh: false,
          loud: false,
          unique: false,
          all: false,
          text: "Crisp",
          verify: "crisp",
        },
      };
    case "pretty":
      return {
        ...state,
        type: {
          dark: false,
          crisp: false,
          pretty: true,
          harsh: false,
          loud: false,
          unique: false,
          all: false,
          text: "Pretty",
          verify: "pretty",
        },
      };
    case "harsh":
      return {
        ...state,
        type: {
          dark: false,
          crisp: false,
          pretty: false,
          harsh: true,
          loud: false,
          unique: false,
          all: false,
          text: "Harsh",
          verify: "harsh",
        },
      };
    case "reset-type":
      return {
        ...state,
        type: {
          dark: false,
          crisp: false,
          pretty: false,
          harsh: false,
          loud: false,
          unique: false,
          all: false,
          text: null,
          verify: null,
        },
      };
    case "loud":
      return {
        ...state,
        type: {
          dark: false,
          crisp: false,
          pretty: false,
          harsh: false,
          loud: true,
          unique: false,
          all: false,
          text: "Loud",
          verify: "loud",
        },
      };
    case "unique":
      return {
        ...state,
        type: {
          dark: false,
          crisp: false,
          pretty: false,
          harsh: false,
          loud: false,
          unique: true,
          all: false,
          text: "Unique",
          verify: "unique",
        },
      };
    case "all-type":
      return {
        ...state,
        type: {
          dark: false,
          crisp: false,
          pretty: false,
          harsh: false,
          loud: false,
          unique: false,
          all: true,
          text: "Any",
          verify: "all-type",
        },
      };
    case "day":
      return {
        ...state,
        time: {
          day: true,
          week: false,
          month: false,
          year: false,
          all: false,
          text: "Today",
          verify: "day",
        },
      };
    case "reset-time":
      return {
        ...state,
        time: {
          day: false,
          week: false,
          month: false,
          year: false,
          all: false,
          text: null,
          verify: null,
        },
      };
    case "week":
      return {
        ...state,
        time: {
          day: false,
          week: true,
          month: false,
          year: false,
          all: false,
          text: "This Week",
          verify: "week",
        },
      };
    case "year":
      return {
        ...state,
        time: {
          day: false,
          week: false,
          month: false,
          year: true,
          all: false,
          text: "This Year",
          verify: "year",
        },
      };
    case "month":
      return {
        ...state,
        time: {
          day: false,
          week: false,
          month: true,
          year: false,
          all: false,
          text: "This Month",
          verify: "month",
        },
      };
    case "all-time":
      return {
        ...state,
        time: {
          day: false,
          week: false,
          month: false,
          year: false,
          all: true,
          text: "All Time",
          verify: "all-time",
        },
      };

    default:
      return state;
  }
};

interface RootStateConst {
browse: BrowseState
};


interface indexProps {

}

const BrowseLoops: React.FC<indexProps> = ({ }) => {
  
  const [optionState, dispatch] = useReducer(optionsReducer, {
    type: {
      dark: false,
      crisp: false,
      pretty: false,
      harsh: false,
      loud: false,
      unique: false,
      all: true,
      text: null,
    },
    genre: {
      aggressive: false,
      nature: false,
      digital: false,
      alerts: false,
      other: false,
      calm: false,
      all: true,
      text: null,
    },
    time: {
      day: false,
      week: false,
      month: true,
      year: false,
      all: false,
      text: null,
    },
  });

  const browseError = useSelector((state: RootStateConst) => state.browse.error);
  const browseFinish = useSelector((state: RootStateConst) => state.browse.refreshFinish);
  const browseLastQuery = useSelector((state: RootStateConst) => state.browse.lastQuery);
  const browseOffset = useSelector((state: RootStateConst) => state.browse.offset);
  
  const reduxDispatch = useDispatch();
  const setGlobalMsg = useGlobalMsg();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (browseError) {
      setGlobalMsg(browseError, 'error');
      setTimeout(() => {
        reduxDispatch({type: 'CLEAR_BROWSE_ERROR'});
      }, 2000);
    }
  }, [browseError, reduxDispatch, setGlobalMsg]);

  

  useEffect(() => {
    if (
      optionState.type.text ||
      optionState.time.text ||
      optionState.genre.text
    ) {
      if (refreshing) setRefreshing(false);
      reduxDispatch({
        type: "FETCH_BROWSE",
        payload: {
          option: "load",
          params: {...optionState, category: 'fx'},
          browseType: "search",
          
        },
      });
    } else {
      if (refreshing) setRefreshing(false);
      reduxDispatch({ type: "RESET_BROWSE" });
    }
  }, [optionState, reduxDispatch]);



  useEffect(() => {
      reduxDispatch({type: "MAIN_LOADER_FINISH"})

  }, [reduxDispatch])


  const handleScroll = (e: any) => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    } else {
      if (!refreshing && browseLastQuery.lastQueryForRefresh && !browseFinish) setRefreshing(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Browse Short Sounds - Soundshare";

    dispatch({type: 'all-genre'});
    
  }, []);
  

  useEffect(() => {
    if (!browseFinish) window.addEventListener("scroll", handleScroll);
    else if (browseFinish) {
      window.removeEventListener("scroll", handleScroll);
      if (!browseLastQuery.finishMsgShown) {
        setGlobalMsg('No more sounds available.', 'error');
        reduxDispatch({type: 'BROWSE_FINISH_MSG'});
      }
    } 

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [browseLastQuery.lastQueryForRefresh, browseLastQuery.finishMsgShown, handleScroll])



  useEffect(() => {
    if (refreshing && browseLastQuery && (!browseFinish)) {
      
      reduxDispatch({
        type: "REFRESH_BROWSE",
        offset: browseOffset,
        vals: browseLastQuery.lastQueryForRefresh.vals,
        query: browseLastQuery.lastQueryForRefresh.text,
        order: browseLastQuery.lastOrder || 'none'
      });
      setRefreshing(false);
    }
  }, [refreshing]);

  
  return (
    <div className="main-browse">

      <BrowseHead type="Short Sounds"/>

      <ChartSection type="fx" optionState={optionState} dispatch={dispatch}/>

    </div>
    );
}


export default BrowseLoops;