
// import React, { Component } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "./Hooks.css";

import HookUseState from "./HookUseState";
import HookUseStateMultiUpdates from "./HookUseStateMultiUpdate";
import HookUseStateObjects from "./HookUseStateObjects";

import HookUseEffect from "./HookUseEffect";

import HookUseContext from "./HookUseContext";
import HookUseContextMethod1 from "./HookUseContextMethod1";
import HookUseContextMethod2 from "./HookUseContextMethod2";

import HookUseRef from "./HookUseRef";
import HookUseMemo from "./HookUseMemo";
import HookUseCallback from "./HookUseCallback";

import HookUseReducer from "./HookUseReducer";
import HookUseReducerCounter from "./HookUseReducerCounter";
import HookUseReducerTodos from "./HookUseReducerTodos";

import HookUseTransition from "./HookUseTransition";
import HookUseTransition2 from "./HookUseTransition2";
import HookUseDeferredValue from "./HookUseDeferredValue";

import HookUseLayoutEffect from "./HookUseLayoutEffect";
import HookUseDebugValue from "./HookUseDebugValue";
import HookUseImperativeHandle from "./HookUseImperativeHandle";
import HookUseId from "./HookUseId";

// Custom hooks:
import HookUseSessionStorage from "./HookUseSessionStorage";
import HookUseLocalStorage from "./HookUseLocalStorage";

import HookUseToggle from "./HookUseToggle";
import HookUseTimeout from "./HookUseTimeout";
import HookUseDebounce from "./HookUseDebounce";
import HookUseUpdateEffect from "./HookUseUpdateEffect";
import HookUseArray from "./HookUseArray";

import HookUsePrevious from "./HookUsePrevious";
import HookUseStateWithHistory from "./HookUseStateWithHistory";
import HookUseStorage from "./HookUseStorage";
import HookUseAsync from "./HookUseAsync";
import HookUseFetch from "./HookUseFetch";

import HookUseScript from "./HookUseScript";
import HookUseDeepCompareEffect from "./HookUseDeepCompareEffect";
import HookUseEventListener from "./HookUseEventListener";
import HookUseOnScreen from "./HookUseOnScreen";


import HookUseMediaQuery from "./HookUseMediaQuery";
import HookUseGeolocation from "./HookUseGeolocation";
import HookUseStateWithValidation from "./HookUseStateWithValidation";
import HookUseSize from "./HookUseSize";
import HookUseEffectOnce from "./HookUseEffectOnce";


import HookUseClickOutside from "./HookUseClickOutside";

import HookUseDarkMode from "./HookUseDarkMode";
import HookUseClipboard from "./HookUseClipboard";
import HookUseCookies from "./HookUseCookies";
import HookUseTranslation from "./HookUseTranslation";

import HookUseOnlineStatus from "./HookUseOnlineStatus";
import HookUseRenderCount from "./HookUseRenderCount";
import HookUseDebugInfo from "./HookUseDebugInfo";
import HookUseHover from "./HookUseHover";
import HookUseLongPress from "./HookUseLongPress";

//import AppTEST from "./test";

import Home from "./Home";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";

import useDarkMode from "./hooks/useDarkMode";
import useTranslation from "./hooks/useTranslation";

document.title = "React Hooks Notes";

	window.scrollTo({top:0, behavior:"smooth"});


// class App extends Component {
const App = function()
//  render()
	{
	const DEFAULT_THEME_DARK = false;
	const [darkMode, setDarkMode, removeTheme] = useDarkMode(DEFAULT_THEME_DARK);

	const {
		language,
		setLanguage,
		// eslint-disable-next-line
		fallbackLanguage,
		// eslint-disable-next-line
		setFallbackLanguage,
		t,
		flags
		} = useTranslation();


	return (
			<div className="container">
				<Header
					darkMode={darkMode}
					setDarkMode={setDarkMode}
					defaultDarkTheme={DEFAULT_THEME_DARK}
					language={language}
					setLanguage={setLanguage}
					t={t}
					flags={flags}
					/>
				<BrowserRouter>
					<SideBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							// Alternately, use no element here and add elements to the
							// children. As-is, we're useing useParams() in HookUseState:
							path="/useState"
							element={<HookUseState />}
							>
							<Route
								path="multi-updates"
								element={<HookUseStateMultiUpdates />}
								/>
							<Route
								path="objects"
								element={<HookUseStateObjects />}
								/>
							</Route>
						<Route
							path="/useEffect"
							element={<HookUseEffect />}
							/>
						<Route
							path="/useContext"
							element={<HookUseContext />}
							>
							<Route
								path="method-1"
								element={<HookUseContextMethod1 />}
								/>
							<Route
								path="method-2"
								element={<HookUseContextMethod2 />}
								/>
							</Route>
						<Route
							path="/useRef"
							element={<HookUseRef />}
							/>
						<Route
							path="/useMemo"
							element={<HookUseMemo />}
							/>
						<Route
							path="/useCallback"
							element={<HookUseCallback />}
							/>
						<Route
							path="/useReducer"
							element={<HookUseReducer />}
							>
							<Route
								path="counter"
								element={<HookUseReducerCounter />}
								/>
							<Route
								path="/useReducer/todos"
								element={<HookUseReducerTodos />}
								/>
						</Route>
						<Route
							path="/useTransition"
							element={<HookUseTransition />}
							>
							<Route
								path="/useTransition/WebDev"
								element={<HookUseTransition2 />}
								/>
						</Route>
						<Route
							path="/useDeferredValue"
							element={<HookUseDeferredValue />}
							/>
						<Route
							path="/useLayoutEffect"
							element={<HookUseLayoutEffect />}
							/>
						<Route
							path="/useDebugValue"
							element={<HookUseDebugValue />}
							/>
						<Route
							path="/useImperativeHandle"
							element={<HookUseImperativeHandle />}
							/>
						<Route
							path="/useId"
							element={<HookUseId />}
							/>
						<Route
							path="/useSessionStorage"
							element={<HookUseSessionStorage />}
							/>
						<Route
							path="/useLocalStorage"
							element={<HookUseLocalStorage />}
							/>

						<Route
							path="/useToggle"
							element={<HookUseToggle />}
							/>
						<Route
							path="/useTimeout"
							element={<HookUseTimeout />}
							/>
						<Route
							path="/useDebounce"
							element={<HookUseDebounce />}
							/>
						<Route
							path="/useUpdateEffect"
							element={<HookUseUpdateEffect />}
							/>
						<Route
							path="/useArray"
							element={<HookUseArray />}
							/>

						<Route
							path="/usePrevious"
							element={<HookUsePrevious />}
							/>
						<Route
							path="/useStateWithHistory"
							element={<HookUseStateWithHistory
								language={language}
								t={t}
								/>}
							/>
						<Route
							path="/useStorage"
							element={<HookUseStorage />}
							/>
						<Route
							path="/useAsync"
							element={<HookUseAsync />}
							/>
						<Route
							path="/useFetch"
							element={<HookUseFetch />}
							/>
						<Route
							path="/useScript"
							element={<HookUseScript />}
							/>
						<Route
							path="/useDeepCompareEffect"
							element={<HookUseDeepCompareEffect />}
							/>
						<Route
							path="/useEventListener"
							element={<HookUseEventListener />}
							/>
						<Route
							path="/useOnScreen"
							element={<HookUseOnScreen />}
							/>
						<Route
							path="/useMediaQuery"
							element={<HookUseMediaQuery />}
							/>
						<Route
							path="/useGeolocation"
							element={<HookUseGeolocation />}
							/>
						<Route
							path="/useStateWithValidation"
							element={<HookUseStateWithValidation />}
							/>
						<Route
							path="/useSize"
							element={<HookUseSize />}
							/>
						<Route
							path="/useEffectOnce"
							element={<HookUseEffectOnce />}
							/>
						<Route
							path="/useClickOutside"
							element={<HookUseClickOutside />}
							/>
						<Route
							path="/useDarkMode"
							element={<HookUseDarkMode
								darkMode={darkMode}
								setDarkMode={setDarkMode}
								removeTheme={removeTheme}
								defaultDarkTheme={DEFAULT_THEME_DARK}
								/>}
							/>
						<Route
							path="/useClipboard"
							element={<HookUseClipboard />}
							/>
						<Route
							path="/useCookies"
							element={<HookUseCookies />}
							/>
						<Route
							path="/useTranslation"
							element={<HookUseTranslation
								language={language}
								setLanguage={setLanguage}
								fallbackLanguage={fallbackLanguage}
								setFallbackLanguage={setFallbackLanguage}
								t={t}
								flags={flags}
								/>}
							/>

						<Route
							path="/useOnlineStatus"
							element={<HookUseOnlineStatus />}
							/>

						<Route
							path="/useRenderCount"
							element={<HookUseRenderCount />}
							/>
						<Route
							path="/useDebugInfo"
							element={<HookUseDebugInfo />}
							/>
						<Route
							path="/useHover"
							element={<HookUseHover />}
							/>
						<Route
							path="/useLongPress"
							element={<HookUseLongPress />}
							/>


						<Route path="*" element={<Home />} />
						</Routes>
					<Footer />
				</BrowserRouter>
		</div>
		);
	}
//}

export default App;
