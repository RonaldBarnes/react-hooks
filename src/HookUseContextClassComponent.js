
import React, { Component } from "react";

import { ThemeContext } from "./HookUseContext";


export default class HookUseContextClassComponent extends Component
	{
	themeStyles(darkTheme) {
		return {
			backgroundColor: darkTheme ? "#555" : "#eee",
			color: darkTheme ? "#eee" : "#555",
			border: "1px solid grey",
			borderRadius: "15px",
			boxShadow: "0px 0px 10px 5px grey",
			margin: "2rem 3rem",
			textAlign: "center",
			}
		}

	render()
		{
		// console.table(this.themeStyles(false));

		return (
			<ThemeContext.Consumer>
				{/* Must return a function: */}
				{darkTheme => {
					console.log(`%cHookUseContextClassComponent darkTheme=${darkTheme}`,
						"color: yellow");
					return <div style={this.themeStyles(darkTheme)}>
						<h2>Class Component</h2>
						<p>Theme: {darkTheme ? "dark" : "light"}</p>
					</div>
					}
				}
			</ThemeContext.Consumer>
			);	// end return
		} // end render
	}	// end class
