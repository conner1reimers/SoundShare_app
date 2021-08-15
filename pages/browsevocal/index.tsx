import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BrowseHead from '../../components/browse/BrowseHead';
import ChartSection from '../../components/browse/NewBrowse/ChartSection';
import { BrowseState } from '../../store/reducers/browseReducer';
import { isBrowseLoading, isBrowseRefreshing } from '../../store/selectors';
import { useGlobalMsg } from '../../util/hooks/useGlobalMsg';


const optionsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "hip":
      return {
        ...state,
        genre: {
          hip: true,
          pop: false,
          elect: false,
          rnb: false,
          other: false,
          rock: false,
          all: false,
          text: "Hip-Hop",
          verify: "hip",
        },
      };
    case "reset-genre":
      return {
        ...state,
        genre: {
          hip: false,
          pop: false,
          elect: false,
          rnb: false,
          other: false,
          rock: false,
          all: false,
          text: null,
          verify: null,
        },
      };
    case "pop":
      return {
        ...state,
        genre: {
          hip: false,
          pop: true,
          elect: false,
          rnb: false,
          other: false,
          rock: false,
          all: false,
          text: "Pop",
          verify: "pop",
        },
      };
    case "elect":
      return {
        ...state,
        genre: {
          hip: false,
          pop: false,
          elect: true,
          rnb: false,
          other: false,
          rock: false,
          all: false,
          text: "Electronic",
          verify: "elect",
        },
      };
    case "rnb":
      return {
        ...state,
        genre: {
          hip: false,
          pop: false,
          elect: false,
          rnb: true,
          other: false,
          rock: false,
          all: false,
          text: "RnB",
          verify: "rnb",
        },
      };
    case "other":
      return {
        ...state,
        genre: {
          hip: false,
          pop: false,
          elect: false,
          rnb: false,
          other: true,
          rock: false,
          all: false,
          text: "other",
          verify: "other",
        },
      };
    case "rock":
      return {
        ...state,
        genre: {
          hip: false,
          pop: false,
          elect: false,
          rnb: false,
          other: false,
          rock: true,
          all: false,
          text: "Rock",
          verify: "rock",
        },
      };
    case "all-genre":
      return {
        ...state,
        genre: {
          hip: false,
          pop: false,
          elect: false,
          rnb: false,
          other: false,
          rock: false,
          all: true,
          text: "All",
          verify: "all-genre",
        },
      };
    case "loop":
      return {
        ...state,
        type: {
          loop: true,
          acapella: false,
          samples: false,
          synth: false,
          guitar: false,
          unique: false,
          all: false,
          text: "Loops",
          verify: "loop",
        },
      };

    case "acapella":
      return {
        ...state,
        type: {
          loop: false,
          acapella: true,
          samples: false,
          synth: false,
          guitar: false,
          unique: false,
          all: false,
          text: "Accapella",
          verify: "acapella",
        },
      };
    case "samples":
      return {
        ...state,
        type: {
          loop: false,
          acapella: false,
          samples: true,
          synth: false,
          guitar: false,
          unique: false,
          all: false,
          text: "samples",
          verify: "samples",
        },
      };
    case "synth":
      return {
        ...state,
        type: {
          loop: false,
          acapella: false,
          samples: false,
          synth: true,
          guitar: false,
          unique: false,
          all: false,
          text: "Samples",
          verify: "synth",
        },
      };
    case "reset-type":
      return {
        ...state,
        type: {
          loop: false,
          acapella: false,
          samples: false,
          synth: false,
          guitar: false,
          unique: false,
          all: false,
          text: null,
          verify: null,
        },
      };
    case "guitar":
      return {
        ...state,
        type: {
          loop: false,
          acapella: false,
          samples: false,
          synth: false,
          guitar: true,
          unique: false,
          all: false,
          text: "Guitar",
          verify: "guitar",
        },
      };
    case "unique":
      return {
        ...state,
        type: {
          loop: false,
          acapella: false,
          samples: false,
          synth: false,
          guitar: false,
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
          loop: false,
          acapella: false,
          samples: false,
          synth: false,
          guitar: false,
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
      loop: false,
      acapella: false,
      samples: false,
      synth: false,
      guitar: false,
      unique: false,
      all: true,
      text: null,
    },
    genre: {
      hip: false,
      pop: false,
      elect: false,
      rnb: false,
      other: false,
      rock: false,
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


  
  const reduxDispatch = useDispatch();
  const setGlobalMsg = useGlobalMsg();

  const browseError = useSelector((state: RootStateConst) => state.browse.error);
  const browseFinish = useSelector((state: RootStateConst) => state.browse.refreshFinish);
  const browseLastQuery = useSelector((state: RootStateConst) => state.browse.lastQuery);
  const browseOffset = useSelector((state: RootStateConst) => state.browse.offset);

  const isLoading = useSelector((state) => {
    return isBrowseLoading(state);
  });

  const [refreshing, setRefreshing] = useState(false);

  const isRefreshing = useSelector((state) => {
    return isBrowseRefreshing(state);
  });

  useEffect(() => {
    if (browseError) {
      setGlobalMsg(browseError, 'error');
      setTimeout(() => {
        reduxDispatch({type: 'CLEAR_BROWSE_ERROR'});
      }, 2000);
    }
  }, [browseError]);

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
          params: {...optionState, category: 'vocal'},
          browseType: "search",
        },
      });
    } else {
      if (refreshing) setRefreshing(false);
      reduxDispatch({ type: "RESET_BROWSE" });
    }
  }, [optionState]);


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
    document.title = "Browse Vocals - Soundshare";


  }, []);

  useEffect(() => {
    if (!browseFinish) window.addEventListener("scroll", handleScroll);
    else if (browseFinish) {
      window.removeEventListener("scroll", handleScroll);
      if (!browseLastQuery.finishMsgShown) {
        setGlobalMsg('No more sounds available.', 'error');
        reduxDispatch({type: 'BROWSE_FINISH_MSG'})
      }
    } 

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [browseLastQuery.lastQueryForRefresh, browseLastQuery.finishMsgShown, handleScroll])




  useEffect(() => {
    if (refreshing && browseLastQuery && !browseFinish) {
      
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
      <BrowseHead type="vocals" />
      <ChartSection type="vocal" optionState={optionState} dispatch={dispatch}/>
      </div>
    );
}


export default BrowseLoops;