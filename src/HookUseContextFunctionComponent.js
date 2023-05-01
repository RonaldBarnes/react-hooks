
import React, { useContext} from "react";

import { ThemeContext } from "./HookUseContext";


export default function HookUseContextFunctionComponent()
	{
	const darkTheme = useContext(ThemeContext);


	const themeStyles = {
		backgroundColor: darkTheme ? "#555" : "#eee",
		color: darkTheme ? "#eee" : "#555",
		border: "1px solid grey",
		borderRadius: "15px",
		boxShadow: "0px 0px 10px 5px grey",
		margin: "2rem 3rem",
		textAlign: "center",
		}


	// console.table(themeStyles);

	console.log(`%cHookUseContextFunctionComponent darkTheme=${darkTheme}`,
		"color: yellow");

	return (
		<div style={themeStyles}>
			<h2>Function Component</h2>
			<p>Theme: {darkTheme ? "dark" : "light"}</p>
		</div>
		);	// end return
	}	// end function
