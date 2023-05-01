import React from "react";
import logo from "./logo.svg";

// import useDarkMode from "./hooks/useDarkMode";
import useTranslation from "./hooks/useTranslation";


export default function Header(
	{
		darkMode,
		setDarkMode,
		defaultDarkTheme,
		language,
		setLanguage,
		t,
		flags
	})
	{
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
				<div></div>
				<div>
					<img src={logo} className="App-logo" alt="logo" />
					<h2 style={{display:"inline", verticalAlign:"super"}}>
						React Hooks {t("Lesson Notes")}
					</h2>
				</div>
				<div className="header_buttons">
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
					<div
						className="theme_selector"
						onClick={() => setDarkMode( currMode => !currMode)}
						title="Click to switch theme"
						>
						{t("Theme")} {darkMode
							? <i className="fa-regular fa-sun" aria-hidden="true"></i>
							: <i className="fa-regular fa-moon" aria-hidden="true"></i>
							}
					</div>
				</div>
			</div>
		</>
		);
	}	// end function