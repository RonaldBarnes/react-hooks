
import React from 'react';
import { Link, Outlet } from "react-router-dom";

import useSourceCode from "./hooks/useSourceCode";

/*
// These are now imported in App.js and referenced inside the Routes:
import HookUseContextFunctionComponent from "./HookUseContextFunctionComponent";
import HookUseContextClassComponent from "./HookUseContextClassComponent";
*/

// Flailing here, why isn't it workin'?
// import { ThemeProvider } from "./ThemeContext";

export const ThemeContext = React.createContext();


export default function HookUseContext()
	{
	console.log("%cHookUseContext", "color: red");

	// const [scrolled,setScrolled] = useState(false);

	// useEffect( () => {
//		setScrolled( curr => !curr)
		setTimeout( () => {
			window.scrollTo({top:0, behavior:"smooth"});
			}, 250)
		// });

/*
	const [darkTheme, setDarkTheme] = useState(false);

	function toggleTheme()
		{
		setDarkTheme( prevTheme => !prevTheme);
		console.log(`HookUseContext darkTheme: ${darkTheme}`)
		}
*/

	// Does not work unless in debugger with breakpoint set.
	// Adding setTimeout: NOPE.
	// When switching from Method1 or Method2 to just "useContext",
	// scrolling isn't triggered.
//	window.scrollTo({top:0, behavior:"smooth"});


	return(
		<div className="hooks">
			<h2>
				Hook <code>UseContext</code>
			</h2>
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useContext"
						target="ReactHooks">
						useContext
					</a>
				</h3>
				useContext is a React Hook that lets you read and subscribe to
				context from your component.
			</blockquote>
			<p>
				A hook for passing "props" to all children without explicitly
				having to specify them on each component.
			</p>
			<p>
				The source code examples for this hook are rather
				messed up, partially due to there being a whole
				bunch of files involved.
			</p>
			<p>
				Cleaning up the code & documenting it better is
				a work in progress.
			</p>
			<p>
				The <Link to="/useContext/method-1">first example</Link> {" "}
				will use a fairly standard method of implementing
				<code>useContext()</code>, with both a function and a class
				component.
			</p>
			<p>
				The <Link to="/useContext/method-2">second example</Link> {" "}
				will implement a more elegant technique.
			</p>
			<p>
				Finally, this <code>useContext</code> example is {" "}
				<Link to="/useContext/best">the <b>best</b></Link> (easiest to understand)
				one.
			</p>

			<Outlet />

			<h4>HookUseContext</h4>
			<Code />
			<button type="button" onClick={() => window.scrollTo({top:0, behavior:"smooth"})}>
				Scroll to Top
			</button>
		</div>
		); // end return
	} // end function HookUseContext


// eslint-disable-next-line
// function OutletAndScroll()
// 	{
// 	const [scrolled,setScrolled] = useState(false);

// 	useEffect( () => {
// 		setScrolled( true)
// 		window.scrollTo({top:0, behavior:"smooth"});
// 		});


// 	return (
// 		<Outlet />
// 		);
// 	}




function Code()
	{
	const code = `
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";

import useSourceCode from "./hooks/useSourceCode";


export const ThemeContext = React.createContext();


export default function HookUseContext()
	{
	return(
		<div className="hooks">
			<p>
				The <Link to="/useContext/method-1">first example</Link> {" "}
				will use a fairly standard method of implementing
				<code>useContext()</code>, with both a function and a class
				component.
			</p>
			<p>
				The <Link to="/useContext/method-2">second example</Link> {" "}
				will implement a more elegant technique.
			</p>
			<Outlet />

			<Code />
		</div>
		); // end return
	} // end function

`;

	const output = useSourceCode( {code} );

	return (
		<div className="formattedCode">
			{output}
		</div>
		);
	}	// end Code

