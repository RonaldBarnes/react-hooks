
import React from "react";

import { useTheme } from "./ThemeContext";
/*
import {
	useTheme,
	useThemeUpdate,
	useThemeStyles,
	} from "./ThemeContext";
*/

export function HookUseContextFunctionComponent2()
	{
	const {darkTheme, toggleTheme, themeStyles} = useTheme()

	console.log(`%cHookUseContextFunctionComponent2 darkTheme=${darkTheme}`,
		"color: yellow");

	return (
		<>
			<div className="counter">
				<p>
					Functional Component 2
				</p>
				<button onClick={toggleTheme}>Toggle Theme</button>
			</div>
			<div style={themeStyles}>
				<h2>Function Component</h2>
				<p>Theme: {darkTheme ? "dark" : "light"}</p>
			</div>
		</>
		);	// end return
	}	// end function




export function HookUseContextFunctionComponent3()
	{
	const {darkTheme, toggleTheme, themeStyles} = useTheme()
/*
	const darkTheme = useTheme()
	const toggleTheme = useThemeUpdate()
	const themeStyles = useThemeStyles()
*/
	console.log(`%cHookUseContextFunctionComponent3 darkTheme=${darkTheme}`,
		"color: yellow");

	return (
		<>
			<div className="counter">
				<p>
					Functional Component 3
				</p>
				<button onClick={toggleTheme}>Toggle Theme</button>
			</div>
			<div style={themeStyles}>
				<h2>Function Component</h2>
				<p>Theme: {darkTheme ? "dark" : "light"}</p>
			</div>
		</>
		);	// end return
	}	// end function
