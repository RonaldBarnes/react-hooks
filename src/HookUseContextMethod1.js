
import React, { useState, useEffect } from 'react';
import HookUseContextFunctionComponent from "./HookUseContextFunctionComponent";
import HookUseContextClassComponent from "./HookUseContextClassComponent";

import { ThemeContext } from "./HookUseContext";
// export const ThemeContext = React.createContext();

import useSourceCode from "./hooks/useSourceCode";


export default function HookUseContextMethod1()
	{
	console.log("%cHookUseContext", "color: red");

	const [darkTheme, setDarkTheme] = useState(false);

	useEffect( () => {
//		setTimeout( () => {
			window.scrollTo({top:0, behavior:"smooth"});
//			}, 750)
		}, [])

	function toggleTheme()
		{
		setDarkTheme( prevTheme => !prevTheme);
		console.log(`HookUseContextMethod1 darkTheme: ${darkTheme}`)
		}

	return(
		<div className="hooks">
			<h2>
				Hook UseContext: Method 1
			</h2>
			<p>
				A hook for passing "props" to all children without explicitly
				having to specify them on each component.
			</p>
			<p>
				In this component, we'll handle the toggling between light & dark
				themes.
				We'll include a small <b>functional</b> component which will display
				something using the theme set in this component and passed to it
				via a <code>value</code> prop.
				Further down the page, we'll see a <b>class</b> component version.
			</p>


			<ThemeContext.Provider value={darkTheme}>
				<div className="counter">
					<button onClick={toggleTheme}>
						Toggle {darkTheme ? "Light" : "Dark"} Theme
					</button>
				</div>
				<HookUseContextFunctionComponent />
				<HookUseContextClassComponent />
			</ThemeContext.Provider>

		<p>
			The button passes the theme state settings down to multiple
			components...
		</p>
		<p>
			The class component is somewhat more complex to implement useContext.
			The <code>ThemeContext.Consumer</code> is required, for one thing:
		</p>

			<h4>HookUseContextMethod1</h4>
			<Code />
		</div>
		); // end return
	} // end function




function Code()
	{
	const code = `
import React, { useState, useEffect } from 'react';
import HookUseContextFunctionComponent from "./HookUseContextFunctionComponent";
import HookUseContextClassComponent from "./HookUseContextClassComponent";

import { ThemeContext } from "./HookUseContext";

import useSourceCode from "./hooks/useSourceCode";


export default function HookUseContextMethod1()
	{
	const [darkTheme, setDarkTheme] = useState(false);

	function toggleTheme()
		{
		setDarkTheme( prevTheme => !prevTheme);
		}

	return(
		<div className="hooks">
			<ThemeContext.Provider value={darkTheme}>
				<div className="counter">
					<button onClick={toggleTheme}>
						Toggle {darkTheme ? "Light" : "Dark"} Theme
					</button>
				</div>
				<HookUseContextFunctionComponent />
				<HookUseContextClassComponent />
			</ThemeContext.Provider>

		<Code />
		</div>
		);
	}	// end HookUseContextMethod1




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


	return (
		<div style={themeStyles}>
			<h2>Function Component</h2>
			<p>Theme: {darkTheme ? "dark" : "light"}</p>
		</div>
		);	// end return
	}	// end function HookUseContextFunctionComponent

`;

	const output = useSourceCode( {code} );

	return (
		<div className="formattedCode">
			{output}
		</div>
		);
	}	// end Code













// eslint-disable-next-line
function CodeOrig()
	{
	return (
			<pre className="jsx"><code>
{`
// Inside HookUseContextClassComponent.js:
import React, { Component, useContext} from "react";

import { ThemeContext } from "./HookUseContext";

export default class HookUseContextClassComponent extends Component
  {
  themeStyles(darkTheme) {
    return {
      backgroundColor: darkTheme ? "#555" : "#eee",
      color: darkTheme ? "#eee" : "#555",
      border: "1px solid grey",
      borderRadius: "15px",
      boxShadow: "10px 10px 10px 5px grey",
      margin: "2rem 3rem",
      textAlign: "center",
      }
    }

  render()
    {
    return (
      <ThemeContext.Consumer>
        {/* Must return a function: */}
        {darkTheme => {
          return <div style={this.themeStyles(darkTheme)}>
            <h2>Class Component</h2>
            <p>Theme: {darkTheme ? "dark" : "light"}</p>
          </div>
          }
        }
      </ThemeContext.Consumer>
      );  // end return
    } // end render
  }  // end class
`}
		</code></pre>
		);
	}	// end CodeOrig
