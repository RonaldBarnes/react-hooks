
import React, { useState } from 'react';
import HookUseContextFunctionComponent from "./HookUseContextFunctionComponent";
import HookUseContextClassComponent from "./HookUseContextClassComponent";

import { ThemeContext } from "./HookUseContext";
// export const ThemeContext = React.createContext();



export default function HookUseContextMethod1()
	{
	console.log("%cHookUseContext", "color: red");

	const [darkTheme, setDarkTheme] = useState(false);

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

			<pre className="jsx"><code>
{`
// Inside HookUseContext.js:
import HookUseContextFunctionComponent from "./HookUseContextFunctionComponent";
`}<span style={{color: "lightgreen"}}>{`
export const ThemeContext = React.createContext();`}</span>
{`

const [darkTheme, setDarkTheme] = useState(false);

function toggleTheme()
  {
  setDarkTheme( prevTheme => !prevTheme);
  }
...`}<span style={{color: "lightgreen"}}>{`
<ThemeContext.Provider value={darkTheme}>
  <button onClick={toggleTheme}>Toggle Theme</button>
  <HookUseContextFunctionComponent />
  <HookUseContextClassComponent />
</ThemeContext.Provider>
`}</span></code></pre>

			<pre className="jsx"><code>
{`
// Inside HookUseContextFunctionComponent.js:
import React, { useContext} from "react";
`}<span style={{color: "lightgreen"}}>{`
import { ThemeContext } from "./HookUseContext";
const darkTheme = useContext(ThemeContext);`}</span>{`
...
const themeStyles = {
  backgroundColor: darkTheme ? "#555" : "#eee",
  color: darkTheme ? "#eee" : "#555",
...`}
			</code></pre>


			<ThemeContext.Provider value={darkTheme}>
				<div className="counter">
					<button onClick={toggleTheme}>Toggle Theme</button>
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

		</div>
		); // end return
	} // end function
