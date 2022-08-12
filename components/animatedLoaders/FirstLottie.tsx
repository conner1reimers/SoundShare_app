import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Lottie from "react-lottie";
import animationData from "./animationDatas/blueMain.json";
import Media from "react-media";
import useWindowSize from "../../util/useWindowSize";



interface Props {
  nav?: boolean
}

const FirstLottie: React.FC<Props> = ({nav}) => {
  let _lottieHeartRef: any;
  const [reset, setRest] = useState<any>(false);

  const browserDims = useWindowSize();

  let smallWidth = useRef<any>();
  let medHeight = useRef<any>();
  let medWidth = useRef<any>();
  let medHeight2 = useRef<any>();
  let medWidth2 = useRef<any>();
  let lgWidth = useRef<any>();
  let navWidth = useRef<any>();



  const setSizes = useCallback(() => {
      if (browserDims.width < 299) {
        smallWidth.current = browserDims.width * 0.515 + "px";
        medHeight.current = browserDims.width * 0.28 + "px";
        medWidth.current = browserDims.width * 0.5 + "px";
        lgWidth.current = browserDims.width * 0.26 + "px";
      } else if (browserDims.width >= 300 && browserDims.width <= 350) {
        smallWidth.current = browserDims.width * 0.4 + "px";
    
        medHeight.current = browserDims.width * 0.45 + "px";
        medWidth.current = browserDims.width * 0.58 + "px";
        lgWidth.current = browserDims.width * 0.4 + "px";
      } else if (browserDims.width > 350 && browserDims.width <= 400) {
        smallWidth.current = browserDims.width * 0.4 + "px";
    
        medHeight.current = browserDims.width * 0.42 + "px";
        medWidth.current = browserDims.width * 0.58 + "px";
        lgWidth.current = browserDims.width * 0.4 + "px";
      } else if (browserDims.width > 400 && browserDims.width <= 450) {
        smallWidth.current = browserDims.width * 0.37 + "px";
        medHeight.current = browserDims.width * 0.42 + "px";
        medWidth.current = browserDims.width * 0.58 + "px";
        lgWidth.current = browserDims.width * 0.4 + "px";
      } else if (browserDims.width > 450 && browserDims.width <= 500) {
        smallWidth.current = browserDims.width * 0.41 + "px";
        medHeight.current = browserDims.width * 0.44 + "px";
        medWidth.current = browserDims.width * 0.42 + "px";
        lgWidth.current = browserDims.width * 0.4 + "px";
      } else if (browserDims.width > 500 && browserDims.width <= 530) {
        smallWidth.current = browserDims.width * 0.4 + "px";
    
        medHeight.current = browserDims.width * 0.47 + "px";
        medWidth.current = browserDims.width * 0.48 + "px";
        lgWidth.current = browserDims.width * 0.4 + "px";
      } else if (browserDims.width > 530 && browserDims.width <= 600) {
        smallWidth.current = browserDims.width * 0.37 + "px";
        medHeight.current = browserDims.width * 0.48 + "px";
        medWidth.current = browserDims.width * 0.8 + "px";
        lgWidth.current = browserDims.width * 0.4 + "px";
      } else if (browserDims.width > 600 && browserDims.width <= 650) {
        smallWidth.current = browserDims.width * 0.15 + "px";
    
        medHeight.current = browserDims.width * 0.28 + "px";
        medWidth.current = browserDims.width * 0.7 + "px";
        lgWidth.current = browserDims.width * 0.37 + "px";
      } else if (browserDims.width > 650 && browserDims.width <= 715) {
        smallWidth.current = browserDims.width * 0.15 + "px";
    
        medHeight.current = browserDims.width * 0.28 + "px";
        medWidth.current = browserDims.width * 0.6 + "px";
        lgWidth.current = browserDims.width * 0.33 + "px";
      } else if (browserDims.width > 715 && browserDims.width <= 850) {
        smallWidth.current = browserDims.width * 0.15 + "px";
    
        medHeight.current = browserDims.width * 0.28 + "px";
        medWidth.current = browserDims.width * 0.55 + "px";
        lgWidth.current = browserDims.width * 0.3 + "px";
        
      } else if (browserDims.width > 850 && browserDims.width <= 915) {
        smallWidth.current = browserDims.width * 0.15 + "px";
    
        medHeight.current = browserDims.width * 0.28 + "px";
        medWidth.current = browserDims.width * 0.486 + "px";
        lgWidth.current = browserDims.width * 0.26 + "px";
    
        medHeight2.current = browserDims.width * 0.1 + "px";
        medWidth2.current = browserDims.width * 0.27 + "px";
      } else if (browserDims.width > 915 && browserDims.width <= 1099) {
        smallWidth.current = browserDims.width * 0.15 + "px";
    
        medHeight.current = browserDims.width * 0.28 + "px";
        medWidth.current = browserDims.width * 0.5 + "px";
        lgWidth.current = browserDims.width * 0.26 + "px";
    
        medHeight2.current = browserDims.width * 0.1 + "px";
        medWidth2.current = browserDims.width * 0.27 + "px";
      } else if (browserDims.width >= 1100 && browserDims.width <= 1200) {
        medWidth.current = browserDims.width * 0.58 + "px";
        lgWidth.current = browserDims.width * 0.3 + "px";
        navWidth.current = browserDims.width * 0.1 + "px";
        medHeight2.current = browserDims.width * 0.05 + "px";
        medWidth2.current = browserDims.width * 0.27 + "px";
      } else if (browserDims.width > 1200 && browserDims.width <= 1300) {
        medWidth.current = browserDims.width * 0.55 + "px";
        lgWidth.current = browserDims.width * 0.28 + "px";
        navWidth.current = browserDims.width * 0.1 + "px";
    
        medHeight2.current = browserDims.width * 0.05 + "px";
        medWidth2.current = browserDims.width * 0.27 + "px";
      } else if (browserDims.width > 1300 && browserDims.width <= 1400) {
        medWidth.current = browserDims.width * 0.49 + "px";
        lgWidth.current = browserDims.width * 0.26 + "px";
        navWidth.current = browserDims.width * 0.1 + "px";
    
        medHeight2.current = browserDims.width * 0.051 + "px";
        medWidth2.current = browserDims.width * 0.27 + "px";
      } else if (browserDims.width >= 1401 && browserDims.width <= 1550) {
        medWidth.current = browserDims.width * 0.45 + "px";
        lgWidth.current = browserDims.width * 0.24 + "px";
        navWidth.current = browserDims.width * 0.1 + "px";
    
        medHeight2.current = browserDims.width * 0.051 + "px";
        medWidth2.current = browserDims.width * 0.27 + "px";
      } else if (browserDims.width > 1551 && browserDims.width < 1699) {
        medWidth.current = browserDims.width * 0.41 + "px";
        lgWidth.current = browserDims.width * 0.21 + "px";
        medHeight2.current = browserDims.width * 0.051 + "px";
        medWidth2.current = browserDims.width * 0.27 + "px";
        navWidth.current = browserDims.width * 0.1 + "px";
      } else if (browserDims.width >= 1700) {
        medHeight.current = browserDims.width * 0.45 + "px";
        medWidth.current = 646 + "px";
        medHeight2.current = browserDims.width * 0.051 + "px";
        medWidth2.current = browserDims.width * 0.27 + "px";
        lgWidth.current = 350 + "px";
        navWidth.current = 170 + "px";
      } 
    } 
    
  , [browserDims])

  setSizes();

  useEffect(() => {
    let mounted = true;
    const resizeHandler = () => {
      if (mounted) {
        setRest((prevState: any) => !prevState);
      }
      
    };

    window.addEventListener("resize", resizeHandler, { passive: true });

    return () => {
      mounted = false;
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    setSizes()
  }, [setSizes, browserDims])

  const onRefLottie = (ref: any) => {
    _lottieHeartRef = ref;
  };

  const lottieStylesSmall: any = {
    height: medHeight.current,
    width: medHeight.current,
    minWidth: '100px',
    minHeight: '100px',
    margin: "0rem",
    position: "relative",
    left: smallWidth.current,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    bottom: "auto",
  };
  const lottieStylesMed: any = {
    height: medHeight.current,
    width: medWidth.current,
    margin: "0rem",
    position: "relative",
    left: lgWidth.current,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const lottieStylesMedSm: any = {
    height: medHeight.current,
    width: medWidth.current,
    margin: "0rem",
    position: "relative",
    left: lgWidth.current,
    justifyContent: "center",
    alignItems: "center",
  };
  let lottieStylesLarge: any;

  if (!nav) {
    lottieStylesLarge = {
      height: "140%",
      width: medWidth.current,
      margin: "0rem",
      position: "relative",
      left: lgWidth.current,
      justifyContent: "center",
      alignItems: "center",
    };
  } else {
    lottieStylesLarge = {
      height: medHeight2.current,
      width: medWidth2.current,
      margin: "0rem",
      position: "relative",
      right: navWidth.current,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      top: "0.2rem",
    };
  }


  const defaultOptions: any = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Media
      queries={{
        small: "(max-width: 599px)",
        medSm: "(min-width: 600px) and (max-width: 899px)",
        medium: "(min-width: 900px) and (max-width: 1099px)",
        large: "(min-width: 1100px)",
      }}
    >
      {(matches) => (
        <Fragment>
          {matches.small && (
            <Lottie
              ref={onRefLottie}
              options={defaultOptions}
              height={200}
              isClickToPauseDisabled={true}
              width={200}
              style={lottieStylesSmall}
            />
          )}
          {matches.medium && (
            <Lottie
              ref={onRefLottie}
              options={defaultOptions}
              height={200}
              isClickToPauseDisabled={true}
              width={200}
              style={lottieStylesMed}
            />
          )}
          {matches.medSm && (
            <Lottie
              ref={onRefLottie}
              options={defaultOptions}
              height={200}
              isClickToPauseDisabled={true}
              width={200}
              style={lottieStylesMedSm}
            />
          )}
          {matches.large && (
            <Lottie
              ref={onRefLottie}
              options={defaultOptions}
              height={200}
              isClickToPauseDisabled={true}
              width={200}
              style={lottieStylesLarge}
            />
          )}
        </Fragment>
      )}
    </Media>
  );
};

export default React.memo(FirstLottie);
