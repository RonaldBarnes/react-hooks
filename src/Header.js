import React, { useContext } from "react";
import logo from "./logo.svg";

import { contextTheme, contextTranslate } from "./App";

// import useDarkMode from "./hooks/useDarkMode";
// import useTranslation from "./hooks/useTranslation";


export default function Header()
	{

  let {
    useDarkTheme,
    setUseDarkTheme,
    } = useContext(contextTheme);

  const {
    // eslint-disable-next-line
    language,
    setLanguage,
    t,
    flags
    } = useContext(contextTranslate);


	// We don't use "removeTheme" but I want to leave it here, so...
	// eslint-disable-next-line
	// const [darkMode, setDarkMode, removeTheme] = useDarkMode(darkModeEnabled);
// console.log(`Header.js DARK THEME ${darkMode.toString()}`)

	// const {
	// 	language,
	// 	setLanguage,
	// 	// eslint-disable-next-line
	// 	fallbackLanguage,
	// 	// eslint-disable-next-line
	// 	setFallbackLanguage,
	// 	t,
	// 	flags
	// 	} = useTranslation();


	return (
		<>
			<div className="App-header">
				<div>
					<img src={logo} className="App-logo" alt="logo" />
				</div>
				<div style={{textAlign:"center"}}>
					<h2>
						React Hooks {t("Lesson Notes")}
					</h2>
				</div>
				<div className="header_buttons">
					<div>
					{Object.keys(flags).map( (f, idx) => 
						<img
							// src={flags[language]}
							src={flags[f]}
							alt="Language Flag"
							className="flag"
							title={`Set language to ${f}`}
							onClick={() => setLanguage(f)}
							key={idx}
							/>
						)}
					</div>
					<div
						className="theme_selector"
            onClick={() => setUseDarkTheme( currMode => !currMode)}
						title="Click to switch theme"
						>
            {t("Theme")} {useDarkTheme
							? <i className="fa-regular fa-sun" aria-hidden="true"></i>
							: <i className="fa-regular fa-moon" aria-hidden="true"></i>
							}
					</div>
				</div>
			</div>
		</>
		);
  }	// end function
