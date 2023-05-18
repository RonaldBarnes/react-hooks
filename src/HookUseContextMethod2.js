
import React, { useEffect } from 'react';

import { ThemeProvider } from "./ThemeContext";
import { HookUseContextFunctionComponent2 }
	from "./HookUseContextFunctionComponent2";
import { HookUseContextFunctionComponent3 }
	from "./HookUseContextFunctionComponent2";

import useSourceCode from "./hooks/useSourceCode";


export default function HookUseContextMethod2()
	{
	console.log("%cHookUseContextMethod2", "color: red");

	useEffect( () => {
//		setTimeout( () => {
			window.scrollTo({top:0, behavior:"smooth"});
//			}, 750)
		}, [])


	return(
		<div className="hooks">
			<h2>
				Hook UseContext: Method 2: separate ThemeProvider file
			</h2>
			<p>
				In this component, we'll handle the toggling between light & dark
				themes with a ThemeProvider defined in a separate, stand-alone file.
			</p>
			<p>
				With this technique, all the state settings and the theme definitions
				can reside in one location without duplication across child
				components. The state change events will bubble up to the parent
				component, then the state values will pass down via context to the
				children.
			</p>

			<ThemeProvider>
				<HookUseContextFunctionComponent2 />
				<HookUseContextFunctionComponent3 />
{/*
				// Nope: Classes don't use hooks, "Rules of Hooks"...
				<HookUseContextClassComponent />
*/}
			</ThemeProvider>






			<pre className="jsx"><code>
{`
// Inside ThemeContext.js:
import React, { useContext, useState } from "react";
`}
<span style={{color:"lightgreen"}}>
{`
const ThemeContext = React.createContext()

export function ThemeProvider( {children} )`}
</span>{`
  {
  // Default is light theme (darkTheme = false):
  const [darkTheme, setTheme] = useState(false)

  const themeStyles = {
    // theme style definitions
    }

  function toggleTheme()
    {
    setTheme( prevTheme => !prevTheme);
    }

  return (
    <>
      {/*
      // Multiple values, one context provider, however, can also use
      // multiple nested theme providers, one value each:
      */}
`}
<span style={{color:"lightgreen"}}>
{`      <ThemeContext.Provider value={{
        darkTheme: darkTheme,
        toggleTheme: toggleTheme,
        themeStyles: themeStyles,
        }}>
        {children}
      </ThemeContext.Provider>
`}
</span>
{`    </>
    ) // end return
  }	// end function
`}
			</code></pre>

			<p>
				That is the entire ThemeContext.js file. It may seem long, but it's
				fairly simple in its design.
			</p>
			<p>
				Where it is advantageous is in its ability to reduce code across
				multiple children components.
			</p>
			<p>
				And, of course, don't have to deal with the mess that is passing
				context into class components.
			</p>
			<p>
				The relevant code within this component file, which is pleasantly
				brief:
			</p>

			<pre className="jsx"><code>{`
import { ThemeProvider } from "./ThemeContext";
...
  return (
    <ThemeProvider>
      <HookUseContextFunctionComponent2 />
      <HookUseContextFunctionComponent3 />
    </ThemeProvider>
    ); // end return
`}
			</code></pre>

			<p>
				Here are the relevant portions from the child component:
			</p>
			<pre className="jsx"><code>{`
import { useTheme } from "./ThemeContext";

export function HookUseContextFunctionComponent2()
  {
  const {darkTheme, toggleTheme, themeStyles} = useTheme()
  ...
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
    );  // end return
`}
</code></pre>
			<p>
				That's it, fairly easy as long as one sticks with function components,
				which is currently the recommended practice.
			</p>

			<h4>HookUseContextMethod2</h4>
			<Code />
		</div>
		); // end return
	} // end function HookUseContextMethod2



function Code()
	{
	const code = `
import React, { useEffect } from 'react';

import { ThemeProvider } from "./ThemeContext";
import { HookUseContextFunctionComponent2 }
	from "./HookUseContextFunctionComponent2";
import { HookUseContextFunctionComponent3 }
	from "./HookUseContextFunctionComponent2";


export default function HookUseContextMethod2()
	{
	return(
		<div className="hooks">

			<ThemeProvider>
				<HookUseContextFunctionComponent2 />
				<HookUseContextFunctionComponent3 />
			</ThemeProvider>
		</div>
		); // end return
	} // end function HookUseContextMethod2

`;

	const output = useSourceCode( {code} )

	return (
		<div className="formattedCode">
			{output}
		</div>
		); // end return
	}	// end Code






// eslint-disable-next-line
function CodeOrig()
	{

	}