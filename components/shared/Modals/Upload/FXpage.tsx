import React, {
	useEffect,
	useReducer,
	useState,
	Fragment,
	useCallback,
} from "react";
import * as Tone from "tone";
import { Slider, withStyles } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import FXBottom from "./FXBottom";
import FXSide from "./FXSide";
import right from "/public/forward.svg";
import { useSelector, useDispatch } from "react-redux";
import { uuid } from "uuidv4";
import FXCircleBtn from "./FXCircleBtn";
import fx2 from "/public/fx2.svg";
import fx3 from "/public/fx3.svg";
import ReactDOM from 'react-dom';
import Media from "react-media";
import { pauseFx } from "../../../../store/actions";
import { saveFxBuff } from "../../../../store/actions/uploadActions";
import { useGlobalMsg } from "../../../../util/hooks/useGlobalMsg";
import LoadingAnimation from "../../../animatedLoaders/LoadingAnimation/LoadingAnimation";
import PlayPauseBtns from "../../../common_reusable/playPauseBtn/PlayPauseBtns";
import Image from "next/image";
import { styled } from '@material-ui/core/styles';

const optionsVariants = {
	initial: {
		x: "-20%",
		opacity: 1,
		scale: 1,
	},
	out: {
		x: "-100%",
		opacity: 0,
		scale: 0,
	},
	in: {
		x: "0%",
		opacity: 1,
		scale: 1,
	},
};
const optionsTransition = {
	type: "spring",
	mass: 1,
	damping: 21,
	stiffness: 100,
	velocity: 1,
};

const presetImgVariants = {
	initial: {
		x: "0%",
		opacity: 1,
		scale: 1,
	},
	out: {
		x: "100%",
		opacity: 0,
		scale: 0,
	},
	in: {
		x: "0%",
		opacity: 1,
		scale: 1,
	},
};
const presetImgTransition = {
	type: "spring",
	mass: 2,
	damping: 41,
	stiffness: 300,
	velocity: 1,
};

const presetImgVariants2 = {
	initial: {
		x: "100%",
		opacity: 0.4,
		scale: 0.8,
	},
	out: {
		x: "100%",
		opacity: 0,
		scale: 0,
	},
	in: {
		x: "0%",
		opacity: 1,
		scale: 1.1,
	},
};

const msgVariants = {
	initial: {
		x: "0%",
		y: "-10%",
		opacity: 0.3,
		scale: 1,
	},
	out: {
		x: "-10%",
		y: "-10%",
		opacity: 0,
		scale: 0,
	},
	in: {
		x: "0%",
		y: "0%",
		opacity: 1,
		scale: 1,
	},
};

const msgTrans = {
	type: "spring",
	mass: 1,
	damping: 60,
	stiffness: 200,
	velocity: 1,
};

const msgVariants2 = {
	initial: {
		x: "0%",
		y: "10%",
		opacity: 0.3,
		scale: 1,
	},
	out: {
		x: "-10%",
		y: "20%",
		opacity: 0,
		scale: 0,
	},
	in: {
		x: "0%",
		y: "0%",
		opacity: 1,
		scale: 1,
	},
};

const pageStateReducer = (state: any, action: any) => {
	switch (action.type) {
		case "preset":
			return {
				presetPage: true,
				chorusPage: false,
				delayPage: false,
				distortionPage: false,
				phaserPage: false,
				reverbPage: false,
				filterPage: false,
				pingPong: false,
				pitchShift: false,
			};
		case "delay":
			return {
				presetPage: false,
				chorusPage: false,
				delayPage: true,
				distortionPage: false,
				phaserPage: false,
				reverbPage: false,
				filterPage: false,
				pingPong: false,
				pitchShift: false,
			};
		case "chorus":
			return {
				presetPage: false,
				chorusPage: true,
				delayPage: false,
				distortionPage: false,
				phaserPage: false,
				reverbPage: false,
				filterPage: false,
				pingPong: false,
				pitchShift: false,
			};
		case "chorus":
			return {
				presetPage: false,
				chorusPage: true,
				delayPage: false,
				distortionPage: false,
				phaserPage: false,
				reverbPage: false,
				filterPage: false,
				pingPong: false,
				pitchShift: false,
			};
		case "dist":
			return {
				presetPage: false,
				chorusPage: false,
				delayPage: false,
				distortionPage: true,
				phaserPage: false,
				reverbPage: false,
				filterPage: false,
				pingPong: false,
				pitchShift: false,
			};
		case "pingpong":
			return {
				presetPage: false,
				chorusPage: false,
				delayPage: false,
				distortionPage: false,
				phaserPage: false,
				reverbPage: false,
				filterPage: false,
				pingPong: true,
				pitchShift: false,
			};
		case "reverb":
			return {
				presetPage: false,
				chorusPage: false,
				delayPage: false,
				distortionPage: false,
				phaserPage: false,
				reverbPage: true,
				filterPage: false,
				pingPong: false,
				pitchShift: false,
			};
		case "phaser":
			return {
				presetPage: false,
				chorusPage: false,
				delayPage: false,
				distortionPage: false,
				phaserPage: true,
				reverbPage: false,
				filterPage: false,
				pingPong: false,
				pitchShift: false,
			};
		case "pitch":
			return {
				presetPage: false,
				chorusPage: false,
				delayPage: false,
				distortionPage: false,
				phaserPage: false,
				reverbPage: false,
				filterPage: false,
				pingPong: false,
				pitchShift: true,
			};
		case "filter":
			return {
				presetPage: false,
				chorusPage: false,
				delayPage: false,
				distortionPage: false,
				phaserPage: false,
				reverbPage: false,
				filterPage: true,
				pingPong: false,
				pitchShift: false,
				chebyPage: false,
				wahPage: false,
			};
		case "cheby":
			return {
				presetPage: false,
				chorusPage: false,
				delayPage: false,
				distortionPage: false,
				phaserPage: false,
				reverbPage: false,
				filterPage: false,
				pingPong: false,
				pitchShift: false,
				chebyPage: true,
				wahPage: false,
			};
		case "wah":
			return {
				presetPage: false,
				chorusPage: false,
				delayPage: false,
				distortionPage: false,
				phaserPage: false,
				reverbPage: false,
				filterPage: false,
				pingPong: false,
				pitchShift: false,
				chebyPage: false,
				wahPage: true,
			};

		default:
			return state;
	}
};

interface Props {
	open: any,
	soundPrev: any,
  saveFx: any,
  onInput: any,
  resetSecondPage: any 
}
const FXpage: React.FC<Props> = ({open, soundPrev, saveFx, onInput, resetSecondPage }) => {
	const fxState = useSelector((state: any) => state.upload.fxState);
  const gpuTier = useSelector((state: any) => state.ui.gpuTier);
	const setGlobalMsg = useGlobalMsg();
	const dispatch = useDispatch();

	const [pageState, dispatchPage] = useReducer(pageStateReducer, {
		presetPage: true,
		chorusPage: false,
		delayPage: false,
		phaserPage: false,
		reverbPage: false,
		filterPage: false,
		pingPong: false,
		pitchShift: false,
		distortionPage: false,
		chebyPage: false,
		wahPage: false,
	});

	const PrettoSlider = styled(Slider)({
		root: {
			color: "rgba(108, 121, 124, 0.24)",
			height: 8,
		},
		thumb: {
			height: 34,
			width: 34,
			backgroundColor: "#53C9CC",
			marginTop: -8,
			marginLeft: -12,
			"&:focus, &:hover, &$active": {
				boxShadow: "inherit",
			},
		},
		active: { color: "rgba(108, 121, 124, 0.24)", backgroundColor: "#9ac1d0" },
		valueLabel: {
			left: "calc(-10% + 4px)",
			fontSize: "12px",
		},
		track: {
			height: 18,
			borderRadius: 4,
		},
		rail: {
			height: 18,
			borderRadius: 4,
			backgroundColor: "rgba(108, 121, 124, 0.24)",
		},
		mark: {
			color: "#CE665C",
			backgroundColor: "#4324",
		},
	});

	// PrettoSlider.dispayName = "FxSilder";


	const valuetext = (e: any) => {
		return `${fxState.distSlider.distortion} Degs`;
	};


	useEffect(() => {
		setGlobalMsg('Use the refresh button to add the effects, then use the first player below to hear your new sound!', 'success', 11000);
	}, [])




	return (
		<Fragment>
			<FXSide
				pageState={pageState}
				dispatchPage={dispatchPage}
				open={open}
			/>
			<FXBottom />

			<div className="uploadmodal-big--fxpage--box">
				<motion.div
					
					initial="initial"
					animate="in"
					exit="out"
					variants={optionsVariants}
					transition={optionsTransition}
					className="uploadmodal-big--saveBtn"
				>
					<FXCircleBtn click={resetSecondPage} back />

					<Reload
						onInput={onInput}
						saveFx={saveFx}
						save={<FXCircleBtn save />}
					>
						<FXCircleBtn refresh />
					</Reload>
				</motion.div>

				<div className="uploadmodal-big--fxpage--box--fxMenu">
					
						{pageState.presetPage && <PresetMenu />}

						<Media
							queries={{
								small: "(max-width: 650px)",
								big: "(min-width: 651px)",
							}}
						>
							{(matches) => (
								<Fragment>
									{matches.big ? (
										<Fragment>
											{pageState.distortionPage && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Add Distortion</h1>
													</div>

													<div className="uploadmodal-big--fxpage--box--fxMenu--descriptions uploadmodal-big--fxpage--box--chorus-page">
														<div className="fxslider-description-format">
															<span>Main Distortion</span>
															<p>
																The main distortion effect for the audio.
																Distortion and overdrive are forms of audio
																signal processing used to alter the sound of
																amplified electric musical instruments, by
																increasing their gain, producing a {`"fuzzy"`},
																{`"growling"`}, or {`"gritty"`} tone.
															</p>
														</div>

														<div className="fxslider-description-format">
															<span>Bitcrush Distortion</span>
															<p>
																A bitcrusher is a type of audio effect that is a
																low-quality distortion in its core. The noise
																may produce a “warmer” sound impression, or a
																harsh one,
															</p>
														</div>

														<div className="fxslider-description-format">
															<span>Chebyshev</span>
															<p>
																Chebyshev waveshaper, an effect which is good
																for making different types of distortion sounds
															</p>
														</div>
													</div>

													<div
														
														
														className="uploadmodal-big--fxpage--box--fxMenu--sliders uploadmodal-big--fxpage--box--distortion-page"
													>
														<PrettoSlider
															getAriaValueText={valuetext}
															aria-label="pretto slider"
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "dist", val: newval })
															}
															defaultValue={fxState.distSlider.distortion || 0}
															valueLabelDisplay="auto"
														/>

														<PrettoSlider
															getAriaValueText={valuetext}
															aria-label="pretto slider"
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "bitcrush", val: newval })
															}
															defaultValue={fxState.bitcrushSlider || 0}
															valueLabelDisplay="auto"
															min={0}
															max={8}
														/>
														<PrettoSlider
															getAriaValueText={valuetext}
															aria-label="pretto slider"
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "cheby_order", val: newval })
															}
															defaultValue={fxState.chebySlider || 0}
															valueLabelDisplay="auto"
															min={1}
															max={100}
														/>
													</div>
												</Fragment>
											)}

											{pageState.chorusPage && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Chorus Effect</h1>
													</div>

													<div
														
														
														className="uploadmodal-big--fxpage--box--fxMenu--descriptions uploadmodal-big--fxpage--box--chorus-page"
													>
														<div className="fxslider-description-format">
															<span>Frequency</span>
															<p>
																a chorus effect occurs when individual sounds
																with approximately the same time, and very
																similar pitches, converge and are perceived as
																one. This controls the frequency of the LFO.
															</p>
														</div>

														<div className="fxslider-description-format">
															<span>Delay Time</span>
															<p>The delay of the chorus effect.</p>
														</div>

														<div className="fxslider-description-format">
															<span>Depth</span>
															<p>The depth of the chorus effect.</p>
														</div>

														<div className="fxslider-description-format">
															<span>Spread</span>
															<p>The spread of the chorus effect.</p>
														</div>
													</div>

													<div
														
														className="uploadmodal-big--fxpage--box--fxMenu--sliders fx-sliders-4slides"
													>
														<PrettoSlider
															getAriaValueText={valuetext}
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "chorusfreq", val: newval })
															}
															defaultValue={fxState.chorusSlider.freq || 0}
															valueLabelDisplay="auto"
															aria-label="pretto slider"
														/>

														<PrettoSlider
															getAriaValueText={valuetext}
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "chorusdelay", val: newval })
															}
															defaultValue={fxState.chorusSlider.delay || 0}
															valueLabelDisplay="auto"
															aria-label="pretto slider"
														/>

														<PrettoSlider
															getAriaValueText={valuetext}
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "chorusdepth", val: newval })
															}
															defaultValue={fxState.chorusSlider.depth || 0}
															valueLabelDisplay="auto"
															aria-label="pretto slider"
														/>

														<PrettoSlider
															getAriaValueText={valuetext}
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "chorusspread", val: newval })
															}
															defaultValue={fxState.chorusSlider.spread || 0}
															valueLabelDisplay="auto"
															aria-label="pretto slider"
														/>
													</div>
												</Fragment>
											)}

											{pageState.delayPage && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Add Delay</h1>
													</div>

													<div
														className="uploadmodal-big--fxpage--box--fxMenu--descriptions uploadmodal-big--fxpage--box--chorus-page"
													>
														<div className="fxslider-description-format">
															<span>Delay Time</span>
															<p>
																The main distortion effect for the audio.
																Distortion and overdrive are forms of audio
																signal processing used to alter the sound of
																amplified electric musical instruments, by
																increasing their gain, producing a {`"fuzzy"`},
																{`"growling"`}, or {`"gritty"`} tone.
															</p>
														</div>

														<div className="fxslider-description-format">
															<span>Delay Feedback</span>
															<p>
																The main distortion effect for the audio.
																Distortion and overdrive are forms of audio
																signal processing used to alter the sound of
																amplified electric musical instruments, by
																increasing their gain, producing a a {`"fuzzy"`},
																{`"growling"`}, or {`"gritty"`} tone.
															</p>
														</div>

														<div className="fxslider-description-format">
															<span>Wet/Dry</span>
															<p>
																Ammount of the delay applied. (100% would be
																full ammount you added).
															</p>
														</div>
													</div>

													<div
														className="uploadmodal-big--fxpage--box--fxMenu--sliders fx-sliders-3slides"
													>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "delayTime", val: newval })
															}
															defaultValue={fxState.delaySlider.delay || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "delayFeedback", val: newval })
															}
															defaultValue={fxState.delaySlider.feedback || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "delayWet", val: newval })
															}
															defaultValue={fxState.delaySlider.wet || 0}
														/>
													</div>
												</Fragment>
											)}

											{pageState.phaserPage && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Phaser Effect</h1>
													</div>

													<div
														
														
														className="uploadmodal-big--fxpage--box--fxMenu--descriptions uploadmodal-big--fxpage--box--chorus-page"
													>
														<div className="fxslider-description-format">
															<span>Frequency</span>
															<p>
																The frequency of the effect. (The speed of the
																phasing)
															</p>
														</div>

														<div className="fxslider-description-format">
															<span>Octaves</span>
															<p>
																The number of octaves the phase goes above the
																baseFrequency
															</p>
														</div>

														<div className="fxslider-description-format">
															<span>Base Frequency</span>
															<p>The the base frequency of the filters.</p>
														</div>
													</div>

													<div
														
														
														className="uploadmodal-big--fxpage--box--fxMenu--sliders"
													>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "phaserfreq", val: newval })
															}
															defaultValue={fxState.phaserSlider.freq || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															max={15}
															min={0}
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "phaseroctave", val: newval })
															}
															defaultValue={fxState.phaserSlider.octaves || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "phaserbass", val: newval })
															}
															defaultValue={
																fxState.phaserSlider.baseFrequency || 0
															}
														/>
													</div>
												</Fragment>
											)}
											{pageState.pingPong && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Ping Pong Delay</h1>
													</div>

													<div
														
														
														className="uploadmodal-big--fxpage--box--fxMenu--descriptions uploadmodal-big--fxpage--box--chorus-page"
													>
														<div className="fxslider-description-format">
															<span>Delay Time</span>
															<p>
																The delayTime between consecutive echos.
																Ping-pong delay is a type of dual delay where
																the first echo appears in the {`'ping'`} channel
																(usually the left), delayed by the ping amount,
																and the second appears in the opposite {`'pong'`}
																channel, delayed by the ping time plus the pong
																time.
															</p>
														</div>

														<div className="fxslider-description-format">
															<span>Feedback</span>
															<p>
																The amount of the effected signal which is fed
																back through the delay.
															</p>
														</div>

														<div className="fxslider-description-format">
															<span>Wet/Dry</span>
															<p>
																How much of the effected will pass through to
																the output.
															</p>
														</div>
													</div>

													<div
														
														
														className="uploadmodal-big--fxpage--box--fxMenu--sliders"
													>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pingdelay", val: newval })
															}
															defaultValue={fxState.pingPong.delay || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pingfeedback", val: newval })
															}
															defaultValue={fxState.pingPong.feedback || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pingwet", val: newval })
															}
															defaultValue={fxState.pingPong.wet || 0}
														/>
													</div>
												</Fragment>
											)}

											{pageState.filterPage && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Autofilter Effect</h1>
													</div>

													<div
														
														
														className="uploadmodal-big--fxpage--box--fxMenu--descriptions uploadmodal-big--fxpage--box--chorus-page"
													>
														<div className="fxslider-description-format">
															<span>Frequency</span>
															<p>The rate of the LFO.</p>
														</div>

														<div className="fxslider-description-format">
															<span>Feedback Effect</span>
															<p>
																Provides a loop between an audio source and its
																own output. The amount of signal which is fed
																back into the effect input.
															</p>
														</div>

														<div className="fxslider-description-format">
															<span>Base Frequency</span>
															<p>The lower value of the LFOs oscillation</p>
														</div>

														<div className="fxslider-description-format">
															<span>Octaves</span>
															<p>
																The number of octaves above the baseFrequency
															</p>
														</div>
													</div>

													<div
														
														
														className="uploadmodal-big--fxpage--box--fxMenu--sliders fx-sliders-4slides"
													>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "filter_freq", val: newval })
															}
															defaultValue={fxState.filterSlider.frequency || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({
																	type: "filter_feedback",
																	val: newval,
																})
															}
															defaultValue={fxState.filterSlider.feedback || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({
																	type: "filter_basefreq",
																	val: newval,
																})
															}
															defaultValue={
																fxState.filterSlider.baseFrequency || 0
															}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "filter_octave", val: newval })
															}
															defaultValue={fxState.filterSlider.octaves || 0}
														/>
													</div>
												</Fragment>
											)}

											{pageState.reverbPage && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Add Reverb</h1>
													</div>

													<div
														
														
														className="uploadmodal-big--fxpage--box--fxMenu--descriptions uploadmodal-big--fxpage--box--chorus-page"
													>
														<div className="fx-desc--item fxslider-description-format">
															<span>Decay</span>
															<p>
																Decay is the time required for the reflections
																(reverberation) to die away. In most modern
																music production, reverb decay times between one
																and three seconds are prevalent. A reverb
																setting with strong early reflections and a
																quick decay are a great way to create a stereo
																effect from a mono source.
															</p>
														</div>

														<div className="fx-desc--item fxslider-description-format">
															<span>Predelay</span>
															<p>
																The amount of time before the reverb is fully
																ramped in.
															</p>
														</div>

														<div className="fx-desc--item fxslider-description-format">
															<span>Wet/Dry</span>
															<p>
																Ammount of the reverb applied. (100% would be
																full ammount you added).
															</p>
														</div>
													</div>

													<div
														
														
														className="uploadmodal-big--fxpage--box--fxMenu--sliders"
													>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "reverbdecay", val: newval })
															}
															defaultValue={fxState.reverbSlider.decay || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "reverbdelay", val: newval })
															}
															defaultValue={fxState.reverbSlider.preDelay || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "reverbwet", val: newval })
															}
															defaultValue={fxState.reverbSlider.wet || 0}
														/>
													</div>
												</Fragment>
											)}

											{pageState.pitchShift && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Pitch Shift Effect</h1>
													</div>

													<div
														
														
														className="uploadmodal-big--fxpage--box--fxMenu--descriptions uploadmodal-big--fxpage--box--pitch-page"
													>
														<div className="fx-desc--item fxslider-description-format">
															<span>Pitch</span>
															<p className="pitchshift-p-text">
																Repitch the incoming signal by some interval.
															</p>
														</div>

														<div className="fx-desc--item fxslider-description-format">
															<span>Window Size</span>
															<p className="pitchshift-p-text">
																Smaller values for a less noticeable delay time,
																larger values for smoother pitch shifting.
															</p>
														</div>

														<div className="fx-desc--item fxslider-description-format">
															<span>Delay Time</span>
															<p className="pitchshift-p-text">
																The amount of delay on the input signal.
															</p>
														</div>

														<div className="fx-desc--item fxslider-description-format">
															<span>Feedback</span>
															<p className="pitchshift-p-text">
																Ammount of the effect applied to input.
															</p>
														</div>

														<div className="fx-desc--item fxslider-description-format">
															<span className="fx-moveup">Wet/Dry</span>
															{/* <p className="pitchshift-p-text">Ammount of the effect applied to output.</p> */}
														</div>
													</div>

													<div
														
														
														className="uploadmodal-big--fxpage--box--fxMenu--sliders fxpage-pitchshift-sliders"
													>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															min={-36}
															max={36}
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pshift_pitch", val: newval })
															}
															defaultValue={fxState.pitchShift.pitch || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pshift_size", val: newval })
															}
															defaultValue={fxState.pitchShift.windowSize || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pshift_delay", val: newval })
															}
															defaultValue={fxState.pitchShift.delayTime || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({
																	type: "pshift_feedback",
																	val: newval,
																})
															}
															defaultValue={fxState.pitchShift.feedback || 0}
														/>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pshift_wet", val: newval })
															}
															defaultValue={fxState.pitchShift.wet || 0}
														/>
													</div>
												</Fragment>
											)}
										</Fragment>
									) : (
										<Fragment>
											{pageState.distortionPage && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Add Distortion</h1>
													</div>

													<div className="uploadmodal-fxpage-smallmenu-container">
														<div className="fxslider-description-format">
															<span>Main Distortion</span>
															<p>
																The main distortion effect for the audio.
																Distortion and overdrive are forms of audio
																signal processing used to alter the sound of
																amplified electric musical instruments, by
																increasing their gain, producing a {`"fuzzy"`},
																{`"growling"`}, or {`"gritty"`} tone.
															</p>
														</div>
														<PrettoSlider
															getAriaValueText={valuetext}
															aria-label="pretto slider"
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "dist", val: newval })
															}
															defaultValue={fxState.distSlider.distortion || 0}
															valueLabelDisplay="auto"
														/>
														<div className="fxslider-description-format">
															<span>Bitcrush Distortion</span>
															<p>
																A bitcrusher is a type of audio effect that is a
																low-quality distortion in its core. The noise
																may produce a “warmer” sound impression, or a
																harsh one,
															</p>
														</div>
														<PrettoSlider
															getAriaValueText={valuetext}
															aria-label="pretto slider"
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "bitcrush", val: newval })
															}
															defaultValue={fxState.bitcrushSlider || 0}
															valueLabelDisplay="auto"
															min={0}
															max={8}
														/>
														<div className="fxslider-description-format">
															<span>Chebyshev</span>
															<p>
																Chebyshev waveshaper, an effect which is good
																for making different types of distortion sounds
															</p>
														</div>
														<PrettoSlider
															getAriaValueText={valuetext}
															aria-label="pretto slider"
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "cheby_order", val: newval })
															}
															defaultValue={fxState.chebySlider || 0}
															valueLabelDisplay="auto"
															min={1}
															max={100}
														/>
													</div>
												</Fragment>
											)}

											{pageState.chorusPage && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Chorus Effect</h1>
													</div>

													<div className="uploadmodal-fxpage-smallmenu-container">
														<div className="fxslider-description-format">
															<span>Frequency</span>
															<p>
																a chorus effect occurs when individual sounds
																with approximately the same time, and very
																similar pitches, converge and are perceived as
																one. This controls the frequency of the LFO.
															</p>
														</div>
														<PrettoSlider
															getAriaValueText={valuetext}
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "chorusfreq", val: newval })
															}
															defaultValue={fxState.chorusSlider.freq || 0}
															valueLabelDisplay="auto"
															aria-label="pretto slider"
														/>
														<div className="fxslider-description-format">
															<span>Delay Time</span>
															<p>The delay of the chorus effect.</p>
														</div>
														<PrettoSlider
															getAriaValueText={valuetext}
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "chorusdelay", val: newval })
															}
															defaultValue={fxState.chorusSlider.delay || 0}
															valueLabelDisplay="auto"
															aria-label="pretto slider"
														/>

														<div className="fxslider-description-format">
															<span>Depth</span>
															<p>The depth of the chorus effect.</p>
														</div>
														<PrettoSlider
															getAriaValueText={valuetext}
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "chorusdepth", val: newval })
															}
															defaultValue={fxState.chorusSlider.depth || 0}
															valueLabelDisplay="auto"
															aria-label="pretto slider"
														/>
														<div className="fxslider-description-format">
															<span>Spread</span>
															<p>The spread of the chorus effect.</p>
														</div>
														<PrettoSlider
															getAriaValueText={valuetext}
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "chorusspread", val: newval })
															}
															defaultValue={fxState.chorusSlider.spread || 0}
															valueLabelDisplay="auto"
															aria-label="pretto slider"
														/>
													</div>
												</Fragment>
											)}

											{pageState.delayPage && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Add Delay</h1>
													</div>

													<div className="uploadmodal-fxpage-smallmenu-container">
														<div className="fxslider-description-format">
															<span>Delay Time</span>
															<p>
																The main distortion effect for the audio.
																Distortion and overdrive are forms of audio
																signal processing used to alter the sound of
																amplified electric musical instruments, by
																increasing their gain, producing a {`"fuzzy"`},
																{`"growling"`}, or {`"gritty"`} tone.
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "delayTime", val: newval })
															}
															defaultValue={fxState.delaySlider.delay || 0}
														/>
														<div className="fxslider-description-format">
															<span>Delay Feedback</span>
															<p>
																The main distortion effect for the audio.
																Distortion and overdrive are forms of audio
																signal processing used to alter the sound of
																amplified electric musical instruments, by
																increasing their gain, producing a {`"fuzzy"`},
																{`"growling"`}, or {`"gritty"`} tone.
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "delayFeedback", val: newval })
															}
															defaultValue={fxState.delaySlider.feedback || 0}
														/>
														<div className="fxslider-description-format">
															<span>Wet/Dry</span>
															<p>
																Ammount of the delay applied. (100% would be
																full ammount you added).
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "delayWet", val: newval })
															}
															defaultValue={fxState.delaySlider.wet || 0}
														/>
													</div>
												</Fragment>
											)}

											{pageState.phaserPage && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Phaser Effect</h1>
													</div>

													<div className="uploadmodal-fxpage-smallmenu-container">
														<div className="fxslider-description-format">
															<span>Frequency</span>
															<p>
																The frequency of the effect. (The speed of the
																phasing)
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "phaserfreq", val: newval })
															}
															defaultValue={fxState.phaserSlider.freq || 0}
														/>
														<div className="fxslider-description-format">
															<span>Octaves</span>
															<p>
																The number of octaves the phase goes above the
																baseFrequency
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															max={15}
															min={0}
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "phaseroctave", val: newval })
															}
															defaultValue={fxState.phaserSlider.octaves || 0}
														/>
														<div className="fxslider-description-format">
															<span>Base Frequency</span>
															<p>The the base frequency of the filters.</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "phaserbass", val: newval })
															}
															defaultValue={
																fxState.phaserSlider.baseFrequency || 0
															}
														/>
													</div>
												</Fragment>
											)}
											{pageState.pingPong && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Ping Pong Delay</h1>
													</div>

													<div className="uploadmodal-fxpage-smallmenu-container">
														<div className="fxslider-description-format">
															<span>Delay Time</span>
															<p>
																The delayTime between consecutive echos.
																Ping-pong delay is a type of dual delay where
																the first echo appears in the {`'ping'`} channel
																(usually the left), delayed by the ping amount,
																and the second appears in the opposite {`'pong'`}
																channel, delayed by the ping time plus the pong
																time.
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pingdelay", val: newval })
															}
															defaultValue={fxState.pingPong.delay || 0}
														/>
														<div className="fxslider-description-format">
															<span>Feedback</span>
															<p>
																The amount of the effected signal which is fed
																back through the delay.
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pingfeedback", val: newval })
															}
															defaultValue={fxState.pingPong.feedback || 0}
														/>
														<div className="fxslider-description-format">
															<span>Wet/Dry</span>
															<p>
																How much of the effected will pass through to
																the output.
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pingwet", val: newval })
															}
															defaultValue={fxState.pingPong.wet || 0}
														/>
													</div>
												</Fragment>
											)}

											{pageState.filterPage && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Autofilter Effect</h1>
													</div>

													<div className="uploadmodal-fxpage-smallmenu-container">
														<div className="fxslider-description-format">
															<span>Frequency</span>
															<p>The rate of the LFO.</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "filter_freq", val: newval })
															}
															defaultValue={fxState.filterSlider.frequency || 0}
														/>
														<div className="fxslider-description-format">
															<span>Feedback Effect</span>
															<p>
																Provides a loop between an audio source and its
																own output. The amount of signal which is fed
																back into the effect input.
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({
																	type: "filter_feedback",
																	val: newval,
																})
															}
															defaultValue={fxState.filterSlider.feedback || 0}
														/>
														<div className="fxslider-description-format">
															<span>Base Frequency</span>
															<p>The lower value of the LFOs oscillation</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({
																	type: "filter_basefreq",
																	val: newval,
																})
															}
															defaultValue={
																fxState.filterSlider.baseFrequency || 0
															}
														/>
														<div className="fxslider-description-format">
															<span>Octaves</span>
															<p>
																The number of octaves above the baseFrequency
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "filter_octave", val: newval })
															}
															defaultValue={fxState.filterSlider.octaves || 0}
														/>
													</div>
												</Fragment>
											)}

											{pageState.reverbPage && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Add Reverb</h1>
													</div>

													<div className="uploadmodal-fxpage-smallmenu-container">
														<div className="fx-desc--item fxslider-description-format">
															<span>Decay</span>
															<p>
																Decay is the time required for the reflections
																(reverberation) to die away. In most modern
																music production, reverb decay times between one
																and three seconds are prevalent. A reverb
																setting with strong early reflections and a
																quick decay are a great way to create a stereo
																effect from a mono source.
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "reverbdecay", val: newval })
															}
															defaultValue={fxState.reverbSlider.decay || 0}
														/>
														<div className="fx-desc--item fxslider-description-format">
															<span>Predelay</span>
															<p>
																The amount of time before the reverb is fully
																ramped in.
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "reverbdelay", val: newval })
															}
															defaultValue={fxState.reverbSlider.preDelay || 0}
														/>
														<div className="fx-desc--item fxslider-description-format">
															<span>Wet/Dry</span>
															<p>
																Ammount of the reverb applied. (100% would be
																full ammount you added).
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "reverbwet", val: newval })
															}
															defaultValue={fxState.reverbSlider.wet || 0}
														/>
													</div>
												</Fragment>
											)}

											{pageState.pitchShift && (
												<Fragment>
													<div className="uploadmodal-big--fxpage--box--fxMenu--head">
														<h1 className="headings">Pitch Shift Effect</h1>
													</div>

													<div className="uploadmodal-fxpage-smallmenu-container">
														<div className="fx-desc--item fxslider-description-format">
															<span>Pitch</span>
															<p className="pitchshift-p-text">
																Repitch the incoming signal by some interval.
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															min={-36}
															max={36}
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pshift_pitch", val: newval })
															}
															defaultValue={fxState.pitchShift.pitch || 0}
														/>
														<div className="fx-desc--item fxslider-description-format">
															<span>Window Size</span>
															<p className="pitchshift-p-text">
																Smaller values for a less noticeable delay time,
																larger values for smoother pitch shifting.
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pshift_size", val: newval })
															}
															defaultValue={fxState.pitchShift.windowSize || 0}
														/>
														<div className="fx-desc--item fxslider-description-format">
															<span>Delay Time</span>
															<p className="pitchshift-p-text">
																The amount of delay on the input signal.
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pshift_delay", val: newval })
															}
															defaultValue={fxState.pitchShift.delayTime || 0}
														/>
														<div className="fx-desc--item fxslider-description-format">
															<span>Feedback</span>
															<p className="pitchshift-p-text">
																Ammount of the effect applied to input.
															</p>
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({
																	type: "pshift_feedback",
																	val: newval,
																})
															}
															defaultValue={fxState.pitchShift.feedback || 0}
														/>
														<div className="fx-desc--item fxslider-description-format">
															<span className="fx-moveup">Wet/Dry</span>
															{/* <p className="pitchshift-p-text">Ammount of the effect applied to output.</p> */}
														</div>
														<PrettoSlider
															valueLabelDisplay="auto"
															getAriaValueText={valuetext}
															step={1}
															marks
															onChangeCommitted={(e, newval) =>
																dispatch({ type: "pshift_wet", val: newval })
															}
															defaultValue={fxState.pitchShift.wet || 0}
														/>
													</div>
												</Fragment>
											)}
										</Fragment>
									)}
								</Fragment>
							)}
						</Media>
					
				</div>

				{gpuTier && !gpuTier.isMobile && (
					<Fragment>
						<LeftMsg/>
						<RightMsg/>
					</Fragment>
				)}

				
					
													
				
			</div>
			
			

			<Media query="(min-width: 1100px)" render={() =>
				(
					<div className="fx-bottomwindow--compare uploadmodal-big--fxpage--box--playpause">
						<div className="fx-player-overwrite">
							<PlayPauseBtns fx global />
						</div>
					</div>
				)}
			/>

			<Media query="(max-width: 1099px)" render={() =>
				(
				<Fragment>
					{ReactDOM.createPortal(
						<div className={`fx-bottomwindow--compare uploadmodal-big--fxpage--box--playpause ${(gpuTier && gpuTier.isMobile) ? 'fx-playpause-mobile' : ''}`}>
							<div className="fx-player-overwrite">
								<PlayPauseBtns fx global />
							</div>
						</div>, document.getElementById('fx-play-hook') as HTMLElement)}
				</Fragment>

				)}
			/>


		</Fragment>
	);
};

const LeftMsg: React.FC = () => {
	const [startSecondHint, setStartSecondHint] = useState<any>(false);
	const msgShown = useSelector((state: any) => state.upload.fxState.tutorialShown2);
	const dispatch = useDispatch();

	useEffect(() => {
		if (startSecondHint) {
			setTimeout(() => {
				setStartSecondHint(false);
				dispatch({type: 'FX_TUTORIAL_DONE2'})
			}, 3000);
		}
	}, [startSecondHint]);

	useEffect(() => {
		setTimeout(() => {
			setStartSecondHint(true);

		}, 5000);
	}, []);

	return (
		<Fragment>
		<AnimatePresence exitBeforeEnter>
			{startSecondHint && !msgShown && (
				<motion.div
					className="uploadmodal-big--fxpage--box--hearText"
					initial="initial"
					animate="in"
					exit="out"
					variants={msgVariants2}
					transition={msgTrans}
				>
					<Image
						className="uploadmodal-big--fxpage--box--playpause--leftarrow"
						src={right}
						alt=""
					/>
					<span>Play your sound with new effects applied!</span>
					<div className="fx-backdrop"></div>
				</motion.div>
			)}
		</AnimatePresence>
		</Fragment>
	);
};

const RightMsg = () => {
	const [startHints, setStartHints] = useState<any>(false);
	const msgShown = useSelector((state: any) => state.upload.fxState.tutorialShown);
	const dispatch = useDispatch();
	
	useEffect(() => {
		if (startHints) {
			setTimeout(() => {
				setStartHints(false);
				dispatch({type: 'FX_TUTORIAL_DONE'})

			}, 4000);
		}
	}, [startHints]);


	useEffect(() => {
		setTimeout(() => {
			setStartHints(true);
			
		}, 500);
	}, []);

	return (
		<Fragment>
			<AnimatePresence exitBeforeEnter>
				{startHints && !msgShown && (
					<motion.div
						initial="initial"
						animate="in"
						exit="out"
						variants={msgVariants}
						transition={msgTrans}
						className="uploadmodal-big--fxpage--box--reloadTextbox"
					>
						<span>Click to reload your sound with new effects!</span>
						<Image src={right} alt="" />
						<div className="fx-backdrop"></div>
					</motion.div>
				)}
			</AnimatePresence>
		</Fragment>
	);
};

const PresetMenu: React.FC = React.memo(() => {
	
	interface ImgProps {
		active: any
	}

	const PresetImg: React.FC<ImgProps> = React.memo(({active}) => {
		return (
			<Fragment>
				<AnimatePresence>
					{!active ? (
						<motion.div
							key="img-1"
							
							initial="initial"
							animate="in"
							exit="out"
							variants={presetImgVariants}
							transition={presetImgTransition}
						>
							<Image
								src={fx3}
							alt=""/>
						</motion.div>
					) : (
						<motion.div
							key="img-2"
							initial="initial"
							animate="in"
							exit="out"
							variants={presetImgVariants2}
							transition={presetImgTransition}
							>
								<Image
									src={fx2}
									alt=""
								/>
						</motion.div>
					)}
				</AnimatePresence>
			</Fragment>
		);
	});

	PresetImg.displayName = "PresetImg";

	const PresetListBig = React.memo(() => {
		const [activePreset, setActivePreset] = useState<any>({
			el: null,
			name: null,
		});

		const activatePreset = (e: any) => {
			
			if (activePreset.el) {
				if (e.currentTarget === activePreset.el) {
					activePreset.el.classList.remove(
						"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
					);
					setActivePreset({
						name: null,
						el: null,
					});
					dispatch({ type: "RESET_FX_SLIDERS" });
				} else {
					activePreset.el.classList.remove(
						"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
					);
					setActivePreset({
						name: e.currentTarget.dataset.preset,
						el: e.currentTarget,
					});
					e.currentTarget.classList.add(
						"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
					);
				}
			} else if (!activePreset.el) {
				setActivePreset({
					name: e.currentTarget.dataset.preset,
					el: e.currentTarget,
				});
				e.currentTarget.classList.add(
					"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
				);
			}
		};

		const dispatch = useDispatch();

		useEffect(() => {
			if (activePreset.name) {
				//COOL GUITAR

				if (activePreset.name === "delay") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "delayTime", val: 64 });
					dispatch({ type: "delayFeedback", val: 43 });
					dispatch({ type: "delayWet", val: 77 });
				} else if (activePreset.name === "pitch_bend") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 26 });
					dispatch({ type: "pshift_pitch", val: 8 });
					dispatch({ type: "pshift_feedback", val: 9 });
					dispatch({ type: "pshift_delay", val: 3 });
					dispatch({ type: "pshift_size", val: 74 });
					dispatch({ type: "pshift_wet", val: 40 });
				} else if (activePreset.name === "guitar") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 49 });
					dispatch({ type: "chorusdelay", val: 4.859 });
					dispatch({ type: "chorusfreq", val: 2 });
				} else if (activePreset.name === "reverb") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "reverbdelay", val: 10 });
					dispatch({ type: "reverbdecay", val: 80 });
					dispatch({ type: "reverbwet", val: 75 });
				} else if (activePreset.name === "short_reverb") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "reverbdelay", val: 2 });
					dispatch({ type: "reverbdecay", val: 7 });
					dispatch({ type: "reverbwet", val: 75 });
				} else if (activePreset.name === "pingpong") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "pingdelay", val: 57 });
					dispatch({ type: "pingfeedback", val: 22 });
					dispatch({ type: "pingwet", val: 100 });
				} else if (activePreset.name === "twisted") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "delayTime", val: 27 });
					dispatch({ type: "delayFeedback", val: 9 });
					dispatch({ type: "delayWet", val: 64 });
					dispatch({ type: "chorusdelay", val: 6 });
					dispatch({ type: "dist", val: 27 });
					dispatch({ type: "reverbwet", val: 27 });
					dispatch({ type: "reverbdecay", val: 7 });
				} else if (activePreset.name === "bigdistort") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 8 });
					dispatch({ type: "bitcrush", val: 2 });
					dispatch({ type: "cheby_order", val: 13 });
				} else if (activePreset.name === "light_phaser") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "phaseroctave", val: 2 });
					dispatch({ type: "phaserfreq", val: 20 });
					dispatch({ type: "phaserbass", val: 52 });
				} else if (activePreset.name === "heavydistort") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 18 });
					dispatch({ type: "bitcrush", val: 4 });
					dispatch({ type: "cheby_order", val: 33 });
				} else if (activePreset.name === "pitch_light") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "pshift_pitch", val: 8 });
					dispatch({ type: "pshift_feedback", val: 32 });
					dispatch({ type: "pshift_delay", val: 2 });
					dispatch({ type: "pshift_size", val: 7 });
					dispatch({ type: "pshift_wet", val: 33 });
				}
			}
		}, [activePreset.name]);

		return (
			<Fragment>
				<li className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item">
					<button
						onClick={activatePreset}
						data-preset="pingpong"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Pingpong</span>
						<PresetImg active={activePreset.name === "pingpong"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="delay"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Delay</span>
						<PresetImg active={activePreset.name === "delay"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="filter"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Filter</span>
						<PresetImg active={activePreset.name === "filter"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="pitch_bend"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Bend/Distort</span>
						<PresetImg active={activePreset.name === "pitch_bend"} />
					</button>
				</li>

				<li className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item">
					<button
						onClick={activatePreset}
						data-preset="reverb"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Long reverb</span>
						<PresetImg active={activePreset.name === "reverb"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="guitar"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Guitar distort</span>
						<PresetImg active={activePreset.name === "guitar"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="short_reverb"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Short reverb</span>
						<PresetImg active={activePreset.name === "short_reverb"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="twisted"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>twisted</span>
						<PresetImg active={activePreset.name === "twisted"} />
					</button>
				</li>

				<li className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item">
					<button
						onClick={activatePreset}
						data-preset="bigdistort"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Light distortion</span>
						<PresetImg active={activePreset.name === "bigdistort"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="light_phaser"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Light phasing</span>
						<PresetImg active={activePreset.name === "light_phaser"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="heavydistort"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Heavy distortion</span>
						<PresetImg active={activePreset.name === "heavydistort"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="pitch_light"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Light shift Up</span>
						<PresetImg active={activePreset.name === "pitch_light"} />
					</button>
				</li>

				<li className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item">
					<button
						onClick={activatePreset}
						data-preset="preset4"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Heavy reverb</span>
						<PresetImg active={activePreset.name === "preset4"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="preset5"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Delay</span>
						<PresetImg active={activePreset.name === "preset5"} />
					</button>

					<button
						onClick={activatePreset}
						data-preset="preset6"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Scratch</span>
						<PresetImg active={activePreset.name === "preset6"} />
					</button>

					<button
						onClick={activatePreset}
						data-preset="preset9"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Filter</span>
						<PresetImg active={activePreset.name === "preset9"} />
					</button>
				</li>
			</Fragment>
		);
	});

	const PresetListMed = React.memo(() => {
		const [activePreset, setActivePreset] = useState<any>({
			el: null,
			name: null,
		});

		const activatePreset = (e: any) => {
			
			if (activePreset.el) {
				if (e.currentTarget === activePreset.el) {
					activePreset.el.classList.remove(
						"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
					);
					setActivePreset({
						name: null,
						el: null,
					});
					dispatch({ type: "RESET_FX_SLIDERS" });
				} else {
					activePreset.el.classList.remove(
						"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
					);
					setActivePreset({
						name: e.currentTarget.dataset.preset,
						el: e.currentTarget,
					});
					e.currentTarget.classList.add(
						"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
					);
				}
			} else if (!activePreset.el) {
				setActivePreset({
					name: e.currentTarget.dataset.preset,
					el: e.currentTarget,
				});
				e.currentTarget.classList.add(
					"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
				);
			}
		};

		const dispatch = useDispatch();

		useEffect(() => {
			if (activePreset.name) {
				//COOL GUITAR

				if (activePreset.name === "delay") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "delayTime", val: 64 });
					dispatch({ type: "delayFeedback", val: 43 });
					dispatch({ type: "delayWet", val: 77 });
				} else if (activePreset.name === "pitch_bend") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 26 });
					dispatch({ type: "pshift_pitch", val: 8 });
					dispatch({ type: "pshift_feedback", val: 9 });
					dispatch({ type: "pshift_delay", val: 3 });
					dispatch({ type: "pshift_size", val: 74 });
					dispatch({ type: "pshift_wet", val: 40 });
				} else if (activePreset.name === "guitar") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 49 });
					dispatch({ type: "chorusdelay", val: 4.859 });
					dispatch({ type: "chorusfreq", val: 2 });
				} else if (activePreset.name === "reverb") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "reverbdelay", val: 10 });
					dispatch({ type: "reverbdecay", val: 80 });
					dispatch({ type: "reverbwet", val: 75 });
				} else if (activePreset.name === "short_reverb") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "reverbdelay", val: 2 });
					dispatch({ type: "reverbdecay", val: 7 });
					dispatch({ type: "reverbwet", val: 75 });
				} else if (activePreset.name === "pingpong") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "pingdelay", val: 57 });
					dispatch({ type: "pingfeedback", val: 22 });
					dispatch({ type: "pingwet", val: 100 });
				} else if (activePreset.name === "twisted") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "delayTime", val: 27 });
					dispatch({ type: "delayFeedback", val: 9 });
					dispatch({ type: "delayWet", val: 64 });
					dispatch({ type: "chorusdelay", val: 6 });
					dispatch({ type: "dist", val: 27 });
					dispatch({ type: "reverbwet", val: 27 });
					dispatch({ type: "reverbdecay", val: 7 });
				} else if (activePreset.name === "bigdistort") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 8 });
					dispatch({ type: "bitcrush", val: 2 });
					dispatch({ type: "cheby_order", val: 13 });
				} else if (activePreset.name === "light_phaser") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "phaseroctave", val: 2 });
					dispatch({ type: "phaserfreq", val: 20 });
					dispatch({ type: "phaserbass", val: 52 });
				} else if (activePreset.name === "heavydistort") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 18 });
					dispatch({ type: "bitcrush", val: 4 });
					dispatch({ type: "cheby_order", val: 33 });
				} else if (activePreset.name === "pitch_light") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "pshift_pitch", val: 8 });
					dispatch({ type: "pshift_feedback", val: 32 });
					dispatch({ type: "pshift_delay", val: 2 });
					dispatch({ type: "pshift_size", val: 7 });
					dispatch({ type: "pshift_wet", val: 33 });
				}
			}
		}, [activePreset.name]);

		return (
			<Fragment>
				<li className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item">
					<button
						onClick={activatePreset}
						data-preset="pingpong"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Pingpong</span>
						<PresetImg active={activePreset.name === "pingpong"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="delay"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Delay</span>
						<PresetImg active={activePreset.name === "delay"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="filter"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Filter</span>
						<PresetImg active={activePreset.name === "filter"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="pitch_bend"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Bend/Distort</span>
						<PresetImg active={activePreset.name === "pitch_bend"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="reverb"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Long reverb</span>
						<PresetImg active={activePreset.name === "reverb"} />
					</button>
				</li>

				<li className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item">
					<button
						onClick={activatePreset}
						data-preset="bigdistort"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Light distortion</span>
						<PresetImg active={activePreset.name === "bigdistort"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="light_phaser"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Light phasing</span>
						<PresetImg active={activePreset.name === "light_phaser"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="heavydistort"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Heavy distortion</span>
						<PresetImg active={activePreset.name === "heavydistort"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="pitch_light"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Light shift Up</span>
						<PresetImg active={activePreset.name === "pitch_light"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="preset4"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Heavy reverb</span>
						<PresetImg active={activePreset.name === "preset4"} />
					</button>
				</li>

				<li className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item">
					<button
						onClick={activatePreset}
						data-preset="guitar"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Guitar distort</span>
						<PresetImg active={activePreset.name === "guitar"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="short_reverb"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Short reverb</span>
						<PresetImg active={activePreset.name === "short_reverb"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="twisted"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>twisted</span>
						<PresetImg active={activePreset.name === "twisted"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="preset5"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Delay</span>
						<PresetImg active={activePreset.name === "preset5"} />
					</button>

					<button
						onClick={activatePreset}
						data-preset="preset6"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Scratch</span>
						<PresetImg active={activePreset.name === "preset6"} />
					</button>
				</li>
			</Fragment>
		);
	});

	const PresetListSmall = React.memo(() => {
		const [activePreset, setActivePreset] = useState<any>({
			el: null,
			name: null,
		});

		const activatePreset = (e: any) => {
			
			if (activePreset.el) {
				if (e.currentTarget === activePreset.el) {
					activePreset.el.classList.remove(
						"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
					);
					setActivePreset({
						name: null,
						el: null,
					});
					dispatch({ type: "RESET_FX_SLIDERS" });
				} else {
					activePreset.el.classList.remove(
						"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
					);
					setActivePreset({
						name: e.currentTarget.dataset.preset,
						el: e.currentTarget,
					});
					e.currentTarget.classList.add(
						"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
					);
				}
			} else if (!activePreset.el) {
				setActivePreset({
					name: e.currentTarget.dataset.preset,
					el: e.currentTarget,
				});
				e.currentTarget.classList.add(
					"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
				);
			}
		};

		const dispatch = useDispatch();

		useEffect(() => {
			if (activePreset.name) {
				//COOL GUITAR

				if (activePreset.name === "delay") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "delayTime", val: 64 });
					dispatch({ type: "delayFeedback", val: 43 });
					dispatch({ type: "delayWet", val: 77 });
				} else if (activePreset.name === "pitch_bend") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 26 });
					dispatch({ type: "pshift_pitch", val: 8 });
					dispatch({ type: "pshift_feedback", val: 9 });
					dispatch({ type: "pshift_delay", val: 3 });
					dispatch({ type: "pshift_size", val: 74 });
					dispatch({ type: "pshift_wet", val: 40 });
				} else if (activePreset.name === "guitar") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 49 });
					dispatch({ type: "chorusdelay", val: 4.859 });
					dispatch({ type: "chorusfreq", val: 2 });
				} else if (activePreset.name === "reverb") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "reverbdelay", val: 10 });
					dispatch({ type: "reverbdecay", val: 80 });
					dispatch({ type: "reverbwet", val: 75 });
				} else if (activePreset.name === "short_reverb") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "reverbdelay", val: 2 });
					dispatch({ type: "reverbdecay", val: 7 });
					dispatch({ type: "reverbwet", val: 75 });
				} else if (activePreset.name === "pingpong") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "pingdelay", val: 57 });
					dispatch({ type: "pingfeedback", val: 22 });
					dispatch({ type: "pingwet", val: 100 });
				} else if (activePreset.name === "twisted") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "delayTime", val: 27 });
					dispatch({ type: "delayFeedback", val: 9 });
					dispatch({ type: "delayWet", val: 64 });
					dispatch({ type: "chorusdelay", val: 6 });
					dispatch({ type: "dist", val: 27 });
					dispatch({ type: "reverbwet", val: 27 });
					dispatch({ type: "reverbdecay", val: 7 });
				} else if (activePreset.name === "bigdistort") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 8 });
					dispatch({ type: "bitcrush", val: 2 });
					dispatch({ type: "cheby_order", val: 13 });
				} else if (activePreset.name === "light_phaser") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "phaseroctave", val: 2 });
					dispatch({ type: "phaserfreq", val: 20 });
					dispatch({ type: "phaserbass", val: 52 });
				} else if (activePreset.name === "heavydistort") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 18 });
					dispatch({ type: "bitcrush", val: 4 });
					dispatch({ type: "cheby_order", val: 33 });
				} else if (activePreset.name === "pitch_light") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "pshift_pitch", val: 8 });
					dispatch({ type: "pshift_feedback", val: 32 });
					dispatch({ type: "pshift_delay", val: 2 });
					dispatch({ type: "pshift_size", val: 7 });
					dispatch({ type: "pshift_wet", val: 33 });
				}
			}
		}, [activePreset.name]);

		return (
			<Fragment>
				<li className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item">
					<button
						onClick={activatePreset}
						data-preset="pingpong"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Pingpong</span>
						<PresetImg active={activePreset.name === "pingpong"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="delay"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Delay</span>
						<PresetImg active={activePreset.name === "delay"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="filter"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Filter</span>
						<PresetImg active={activePreset.name === "filter"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="pitch_bend"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Bend/Distort</span>
						<PresetImg active={activePreset.name === "pitch_bend"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="reverb"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Long reverb</span>
						<PresetImg active={activePreset.name === "reverb"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="guitar"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Guitar distort</span>
						<PresetImg active={activePreset.name === "guitar"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="short_reverb"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Short reverb</span>
						<PresetImg active={activePreset.name === "short_reverb"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="twisted"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>twisted</span>
						<PresetImg active={activePreset.name === "twisted"} />
					</button>
				</li>

				<li className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item">
					<button
						onClick={activatePreset}
						data-preset="bigdistort"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Light distortion</span>
						<PresetImg active={activePreset.name === "bigdistort"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="light_phaser"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Light phasing</span>
						<PresetImg active={activePreset.name === "light_phaser"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="heavydistort"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Heavy distortion</span>
						<PresetImg active={activePreset.name === "heavydistort"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="pitch_light"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Light shift Up</span>
						<PresetImg active={activePreset.name === "pitch_light"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="preset4"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Heavy reverb</span>
						<PresetImg active={activePreset.name === "preset4"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="preset5"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Delay</span>
						<PresetImg active={activePreset.name === "preset5"} />
					</button>

					<button
						onClick={activatePreset}
						data-preset="preset6"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Scratch</span>
						<PresetImg active={activePreset.name === "preset6"} />
					</button>

					<button
						onClick={activatePreset}
						data-preset="preset9"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Filter</span>
						<PresetImg active={activePreset.name === "preset9"} />
					</button>
				</li>
			</Fragment>
		);
	});

	const PresetListSmallest = React.memo(() => {
		const [activePreset, setActivePreset] = useState<any>({
			el: null,
			name: null,
		});

		const activatePreset = (e: any) => {
			
			if (activePreset.el) {
				if (e.currentTarget === activePreset.el) {
					activePreset.el.classList.remove(
						"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
					);
					setActivePreset({
						name: null,
						el: null,
					});
					dispatch({ type: "RESET_FX_SLIDERS" });
				} else {
					activePreset.el.classList.remove(
						"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
					);
					setActivePreset({
						name: e.currentTarget.dataset.preset,
						el: e.currentTarget,
					});
					e.currentTarget.classList.add(
						"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
					);
				}
			} else if (!activePreset.el) {
				setActivePreset({
					name: e.currentTarget.dataset.preset,
					el: e.currentTarget,
				});
				e.currentTarget.classList.add(
					"uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox--active"
				);
			}
		};

		const dispatch = useDispatch();

		useEffect(() => {
			if (activePreset.name) {
				//COOL GUITAR

				if (activePreset.name === "delay") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "delayTime", val: 64 });
					dispatch({ type: "delayFeedback", val: 43 });
					dispatch({ type: "delayWet", val: 77 });
				} else if (activePreset.name === "pitch_bend") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 26 });
					dispatch({ type: "pshift_pitch", val: 8 });
					dispatch({ type: "pshift_feedback", val: 9 });
					dispatch({ type: "pshift_delay", val: 3 });
					dispatch({ type: "pshift_size", val: 74 });
					dispatch({ type: "pshift_wet", val: 40 });
				} else if (activePreset.name === "guitar") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 49 });
					dispatch({ type: "chorusdelay", val: 4.859 });
					dispatch({ type: "chorusfreq", val: 2 });
				} else if (activePreset.name === "reverb") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "reverbdelay", val: 10 });
					dispatch({ type: "reverbdecay", val: 80 });
					dispatch({ type: "reverbwet", val: 75 });
				} else if (activePreset.name === "short_reverb") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "reverbdelay", val: 2 });
					dispatch({ type: "reverbdecay", val: 7 });
					dispatch({ type: "reverbwet", val: 75 });
				} else if (activePreset.name === "pingpong") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "pingdelay", val: 57 });
					dispatch({ type: "pingfeedback", val: 22 });
					dispatch({ type: "pingwet", val: 100 });
				} else if (activePreset.name === "twisted") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "delayTime", val: 27 });
					dispatch({ type: "delayFeedback", val: 9 });
					dispatch({ type: "delayWet", val: 64 });
					dispatch({ type: "chorusdelay", val: 6 });
					dispatch({ type: "dist", val: 27 });
					dispatch({ type: "reverbwet", val: 27 });
					dispatch({ type: "reverbdecay", val: 7 });
				} else if (activePreset.name === "bigdistort") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 8 });
					dispatch({ type: "bitcrush", val: 2 });
					dispatch({ type: "cheby_order", val: 13 });
				} else if (activePreset.name === "light_phaser") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "phaseroctave", val: 2 });
					dispatch({ type: "phaserfreq", val: 20 });
					dispatch({ type: "phaserbass", val: 52 });
				} else if (activePreset.name === "heavydistort") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "dist", val: 18 });
					dispatch({ type: "bitcrush", val: 4 });
					dispatch({ type: "cheby_order", val: 33 });
				} else if (activePreset.name === "pitch_light") {
					dispatch({ type: "RESET_FX_SLIDERS" });
					dispatch({ type: "pshift_pitch", val: 8 });
					dispatch({ type: "pshift_feedback", val: 32 });
					dispatch({ type: "pshift_delay", val: 2 });
					dispatch({ type: "pshift_size", val: 7 });
					dispatch({ type: "pshift_wet", val: 33 });
				}
			}
		}, [activePreset.name]);

		return (
			<Fragment>
				<li className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item">
					<button
						onClick={activatePreset}
						data-preset="pingpong"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Pingpong</span>
						<PresetImg active={activePreset.name === "pingpong"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="delay"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Delay</span>
						<PresetImg active={activePreset.name === "delay"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="filter"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Filter</span>
						<PresetImg active={activePreset.name === "filter"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="pitch_bend"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Bend/Distort</span>
						<PresetImg active={activePreset.name === "pitch_bend"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="reverb"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Long reverb</span>
						<PresetImg active={activePreset.name === "reverb"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="guitar"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Guitar distort</span>
						<PresetImg active={activePreset.name === "guitar"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="short_reverb"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Short reverb</span>
						<PresetImg active={activePreset.name === "short_reverb"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="twisted"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>twisted</span>
						<PresetImg active={activePreset.name === "twisted"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="bigdistort"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Light distortion</span>
						<PresetImg active={activePreset.name === "bigdistort"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="light_phaser"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Light phasing</span>
						<PresetImg active={activePreset.name === "light_phaser"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="heavydistort"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Heavy distortion</span>
						<PresetImg active={activePreset.name === "heavydistort"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="pitch_light"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Light shift Up</span>
						<PresetImg active={activePreset.name === "pitch_light"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="preset4"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Heavy reverb</span>
						<PresetImg active={activePreset.name === "preset4"} />
					</button>
					<button
						onClick={activatePreset}
						data-preset="preset5"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Delay</span>
						<PresetImg active={activePreset.name === "preset5"} />
					</button>

					<button
						onClick={activatePreset}
						data-preset="preset6"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Scratch</span>
						<PresetImg active={activePreset.name === "preset6"} />
					</button>

					<button
						onClick={activatePreset}
						data-preset="preset9"
						className="btn nohover uploadmodal-big--fxpage--box--fxMenu--preset-page--btn"
					>
						<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox">
							<div className="checkbox-circle">
								<div className="inner-dotz"></div>
							</div>
						</div>
						<span>Filter</span>
						<PresetImg active={activePreset.name === "preset9"} />
					</button>
				</li>
			</Fragment>
		);
	});

	return (
		<Media
			queries={{
				small: "(min-width: 576px) and (max-width: 1099px)",
				med: "(min-width: 1100px) and (max-width: 1300px)",
				big: "(min-width: 1301px)",
			}}
		>
			{(matches) => (
				<Fragment>
					<div className="uploadmodal-big--fxpage--box--fxMenu--preset-page">
						<div className="uploadmodal-big--fxpage--box--fxMenu--head">
							<h1 className="headings">Presets</h1>
						</div>
						<ul className="globalList uploadmodal-big--fxpage--box--fxMenu--preset-page--list">
							{matches.big ? (
								<PresetListBig />
							) : matches.med ? (
								<PresetListMed />
							) : matches.small ? (
								<PresetListSmall />
							) : (
								<PresetListSmallest />
							)}
						</ul>
					</div>
				</Fragment>
			)}
		</Media>
	);
});

PresetMenu.displayName = "PresetMenu";

interface ReloadProps {
	onInput: any,
	saveFx: any,
	save: any,
	children: any,

}
const Reload: React.FC<ReloadProps> = React.memo(({onInput, saveFx: saveFxProp, save, children}) => {
	const [reloading, setReloading] = useState<any>(false);
	const [curplayer, setCurplayer] = useState<any>(null);
	const buff = useSelector((state: any) => state.upload.buffer);
	const fxState: any = useSelector((state: any) => state.upload.fxState);
    const gpuTier = useSelector((state: any) => state.ui.gpuTier);
	const [mobileSrc, setMobileSrc] = useState<any>(null);
	const [loading, setLoading] = useState<any>(false);

	const setGlobalMsg = useGlobalMsg();
	const dispatch = useDispatch();

	function getWavBytes(buffer: any, options: any) {
		const type = options.isFloat ? Float32Array : Uint16Array;
		const numFrames = buffer.byteLength / type.BYTES_PER_ELEMENT;

		const headerBytes = getWavHeader(Object.assign({}, options, { numFrames }));
		const wavBytes = new Uint8Array(headerBytes.length + buffer.byteLength);

		// prepend header, then add pcmBytes
		wavBytes.set(headerBytes, 0);
		wavBytes.set(new Uint8Array(buffer), headerBytes.length);

		return wavBytes;
	}
	// adapted from https://gist.github.com/also/900023
	// returns Uint8Array of WAV header bytes
	function getWavHeader(options: any) {
		const numFrames = options.numFrames;
		const numChannels = options.numChannels || 2;
		const sampleRate = options.sampleRate || 44100;
		const bytesPerSample = options.isFloat ? 4 : 2;
		const format = options.isFloat ? 3 : 1;

		const blockAlign = numChannels * bytesPerSample;
		const byteRate = sampleRate * blockAlign;
		const dataSize = numFrames * blockAlign;

		const buffer = new ArrayBuffer(44);
		const dv = new DataView(buffer);

		let p = 0;

		function writeString(s: any) {
			for (let i = 0; i < s.length; i++) {
				dv.setUint8(p + i, s.charCodeAt(i));
			}
			p += s.length;
		}

		function writeUint32(d: any) {
			dv.setUint32(p, d, true);
			p += 4;
		}

		function writeUint16(d: any) {
			dv.setUint16(p, d, true);
			p += 2;
		}

		writeString("RIFF"); // ChunkID
		writeUint32(dataSize + 36); // ChunkSize
		writeString("WAVE"); // Format
		writeString("fmt "); // Subchunk1ID
		writeUint32(16); // Subchunk1Size
		writeUint16(format); // AudioFormat
		writeUint16(numChannels); // NumChannels
		writeUint32(sampleRate); // SampleRate
		writeUint32(byteRate); // ByteRate
		writeUint16(blockAlign); // BlockAlign
		writeUint16(bytesPerSample * 8); // BitsPerSample
		writeString("data"); // Subchunk2ID
		writeUint32(dataSize); // Subchunk2Size

		return new Uint8Array(buffer);
	}

	const trigger = () => {
		let player;
		if (buff) {
			if (curplayer) {
				curplayer.stop();
				curplayer.dispose();
				dispatch(pauseFx());
				setCurplayer(null);
				
			}

			Tone.Offline(() => {
				let percentDist: any = fxState.distSlider.distortion * 0.01;
				let chorusFreq: any = fxState.chorusSlider.freq * 10;
				let chorusdelay: any = fxState.chorusSlider.delay * 0.09;
				let chorusdepth: any = fxState.chorusSlider.depth * 0.001;
				let chorusspread: any = fxState.chorusSlider.spread * 3.6;

				let revDecay: any = fxState.reverbSlider.decay * 0.01 * 10;
				let revWet: any = fxState.reverbSlider.wet * 0.01;
				let revDelay: any = fxState.reverbSlider.preDelay * 0.01 * 1.07;

				//freq = hertz = cycles per sec
				let phaseFreq: any = fxState.phaserSlider.freq * 0.5;
				let phaseOct: any = fxState.phaserSlider.octaves;
				let phaseBass: any = fxState.phaserSlider.baseFrequency * 20;

				let pingDelay: any = fxState.pingPong.delay * 0.05 * 0.5;
				let pingFeedback: any = fxState.pingPong.feedback * 0.01;
				let pingWet: any = fxState.pingPong.wet * 0.01;

				let delayTime: any = fxState.delaySlider.delay * 0.01 * 0.5;
				let delayFeedback: any = fxState.delaySlider.feedback * 0.01;
				let delayWet: any = fxState.delaySlider.wet * 0.01;

				const pitchShiftObj: any = {
					pitch: fxState.pitchShift.pitch,
					window: Math.min(0.0001 + fxState.pitchShift.windowSize * 0.001, 0.1),
					delay: fxState.pitchShift.delayTime * 0.01,
					feedback: fxState.pitchShift.feedback * 0.01,
					wet: fxState.pitchShift.wet * 0.01,
				};

				let bitCrusher: any;
				if (fxState.bitcrushSlider && fxState.bitcrushSlider !== 0) {
					bitCrusher = new Tone.BitCrusher(
						fxState.bitcrushSlider
					).toDestination();
				}

				let chorus: any;
				if (
					fxState.chorusSlider.frequency !== 0 ||
					fxState.chorusSlider.delay !== 0 ||
					fxState.chorusSlider.depth !== 0
				) {
					chorus = new Tone.Chorus({
						frequency: chorusFreq,
						delayTime: chorusdelay,
						depth: chorusdepth,
						spread: chorusspread,
					}).toDestination();
				}

				let reverb: any;
				if (revDecay !== 0) {
					reverb = new Tone.Reverb({
						decay: revDecay,
						preDelay: revDelay,
						wet: revWet,
					}).toDestination();
				}

				let pingPong: any;
				if (
					fxState.pingPong.delay !== 0 ||
					fxState.pingPong.feedback !== 0 ||
					fxState.pingPong.wet !== 0
				) {
					pingPong = new Tone.PingPongDelay({
						delayTime: pingDelay,
						feedback: pingFeedback,
						wet: pingWet,
					}).toDestination();
				}

				let delay: any;
				if (
					fxState.delaySlider.delay !== 0 ||
					fxState.delaySlider.feedback !== 0 ||
					fxState.delaySlider.wet !== 0
				) {
					delay = new Tone.Delay({
						delayTime: delayTime,
						maxDelay: delayWet,
					}).toDestination();
				}

				let pshift: any;
				if (
					fxState.pitchShift.windowSize !== 0 ||
					fxState.pitchShift.delayTime !== 0 ||
					fxState.pitchShift.pitch !== 0
				) {
					pshift = new Tone.PitchShift({
						pitch: pitchShiftObj.pitch,
						delayTime: pitchShiftObj.delay,
						windowSize: pitchShiftObj.window,
						feedback: pitchShiftObj.feedback,
						wet: pitchShiftObj.wet,
					}).toDestination();
				}

				let filterFx: any;
				if (
					fxState.filterSlider.windowSize !== 0 ||
					fxState.filterSlider.delayTime !== 0 ||
					fxState.filterSlider.pitch !== 0
				) {
					filterFx = new Tone.AutoFilter({
						frequency: fxState.filterSlider.frequency * 0.23,
						baseFrequency: fxState.filterSlider.baseFrequency * 20,
						octaves: fxState.filterSlider.octaves * 0.13,
					}).toDestination();
				}

				let cheby;
				if (fxState.chebySlider) {
					cheby = new Tone.Chebyshev(fxState.chebySlider).toDestination();
				}

				let feedbackFX;
				if (fxState.filterSlider.feedback !== 0) {
					feedbackFX = new Tone.FeedbackCombFilter({
						delayTime: fxState.filterSlider.feedback * 0.01,
						resonance: fxState.filterSlider.feedback * 0.01,
					}).toDestination();
				}

				const disto = new Tone.Distortion(percentDist).toDestination();
				let phase;

				if (
					fxState.phaserSlider.freq !== 0 ||
					fxState.phaserSlider.octaves !== 0 ||
					fxState.phaserSlider.baseFrequency !== 0
				) {
					phase = new Tone.Phaser({
						frequency: phaseFreq,
						octaves: phaseOct,
						baseFrequency: phaseBass,
					}).toDestination();
				}
				player = new Tone.Player(buff).chain(disto);
				player.volume.value = -12;

				if (chorus) {
					player.chain(chorus);
				}
				if (reverb) {
					player.chain(reverb);
				}
				if (phase) {
					player.chain(phase);
				}
				if (pingPong) {
					player.chain(pingPong);
				}
				if (delay) {
					player.chain(delay);
				}
				if (pshift) {
					player.chain(pshift);
				}
				if (cheby) {
					player.chain(cheby);
				}
				if (filterFx) {
					player.chain(filterFx);
				}
				if (feedbackFX) {
					player.chain(feedbackFX);
				}
				if (bitCrusher) {
					player.chain(bitCrusher);
				}

				player.start();

				// player = new Tone.Player(buff).toDestination().start()
			}, buff.duration).then((buffer) => {
				const gotBuff = buffer.get();
				setCurplayer(new Tone.Player(gotBuff).toDestination());
				setReloading(false);

				
			});
		} else {
			setGlobalMsg('There an error, adding effects does not work on all devices yet.', 'error');
			setReloading(false);
		}
	};

	const createFile = useCallback(() => {
		const gotBuff = curplayer.buffer.get();

		const [left, right] = [
			gotBuff.getChannelData(0),
			gotBuff.getChannelData(1),
		];
		const interleaved = new Float32Array(left.length + right.length);

		for (let src = 0, dst = 0; src < left.length; src++, dst += 2) {
			interleaved[dst] = left[src];
			interleaved[dst + 1] = right[src];
		}

		// get WAV file bytes and audio params of your audio source
		const wavBytes = getWavBytes(interleaved.buffer, {
			isFloat: true, // floating point or 16-bit integer
			numChannels: 2,
			sampleRate: buff._buffer.sampleRate,
		});

		const wav: any = new Blob([wavBytes], { type: "audio/wav" });
		wav.lastModifiedDate = new Date();
		wav.name = `new-custom-soundShare-file-${uuid()}`;
		
		dispatch(saveFxBuff(wav));
		onInput("sound", wav, true);
		// const fileReader = new FileReader();

		// fileReader.onload = () => {
		//     dispatch(saveFxBuff(fileReader.result))

		// };
		// fileReader.readAsDataURL(wav);
	}, [curplayer]);

	const saveFx = () => {
		if (curplayer) {
			createFile();
			saveFxProp();
			curplayer.stop();
			curplayer.dispose();
			setCurplayer(null);
		}
	};

	const createWavForMobilePreview = useCallback(() => {
		const gotBuff = curplayer.buffer.get();

		const [left, right] = [
			gotBuff.getChannelData(0),
			gotBuff.getChannelData(1),
		];
		const interleaved = new Float32Array(left.length + right.length);

		for (let src = 0, dst = 0; src < left.length; src++, dst += 2) {
			interleaved[dst] = left[src];
			interleaved[dst + 1] = right[src];
		}

		// get WAV file bytes and audio params of your audio source
		const wavBytes = getWavBytes(interleaved.buffer, {
			isFloat: true, // floating point or 16-bit integer
			numChannels: 2,
			sampleRate: buff._buffer.sampleRate,
		});

		const wav: any = new Blob([wavBytes], { type: "audio/wav" });
		wav.lastModifiedDate = new Date();
		wav.name = `new-custom-soundShare-file-${uuid()}`;
		return wav;
	}, [curplayer]);


	const setReload = () => {
		setReloading(true);
	};

	useEffect(() => {
		if (!fxState.playing && curplayer) {
			
			if (gpuTier && !gpuTier.isMobile) {
				curplayer.stop();

			} else if (gpuTier.isMobile) {
				const audioEl: any = document.getElementById('audio-fx');
				audioEl.pause();
			}
			
		} else if (fxState.playing && curplayer) {
			if (gpuTier && !gpuTier.isMobile) {
				curplayer.start();

			} else if (gpuTier.isMobile) {
				setLoading(true);
				const audioEl: any = document.getElementById('audio-fx');
				audioEl.play();
				setLoading(false);

			}
			
		}
	}, [fxState.playing]);

	useEffect(() => {
		return () => {
			if (curplayer) {
				curplayer.stop();
				curplayer.dispose();
				setCurplayer(null);
			}
		};
	}, []);

	useEffect(() => {
		if (curplayer && gpuTier && gpuTier.isMobile) {
			const audioEl: any = document.getElementById('audio-fx');
				if (!mobileSrc) {
					const newSound = createWavForMobilePreview();
					const fileReader = new FileReader();
					fileReader.onload = () => {
						setMobileSrc(fileReader.result);
						audioEl.src = fileReader.result;
					};

					fileReader.readAsDataURL(newSound);
				}
				audioEl.play();
		}
	}, [curplayer])

	useEffect(() => {
		if (curplayer && !reloading) {
			return;
		} else if (curplayer && reloading) {
			curplayer.stop();
			dispatch(pauseFx());
			curplayer.dispose();
			setCurplayer(null);
			if (mobileSrc) {
				const audioEl: any = document.getElementById('audio-fx');
				audioEl.pause();
				setMobileSrc(null);
			};
			trigger();
		} else if (reloading && !curplayer) {
			if (mobileSrc) {
				const audioEl: any = document.getElementById('audio-fx');
				audioEl.pause();
				setMobileSrc(null);
			};
			trigger();

		}
	}, [reloading]);

	const updateChildWprops = React.Children.map(children, (child: any, i) => {
		return React.cloneElement(child, {
			click: setReload,
		});
	});

	const updateSaveBtnWprops = React.Children.map(save, (child: any, i) => {
		return React.cloneElement(child, {
			click: saveFx,
		});
	});

	return (
		<Fragment>
			{fxState.fxpageOpen && (
				<Fragment>
					<LoadingAnimation loading={reloading || loading} />
					{updateSaveBtnWprops}
					{updateChildWprops}
					<audio id="audio-fx"/>
				</Fragment>
			)}
		</Fragment>
	);
});

Reload.displayName = "Reload";

export default React.memo(FXpage);
