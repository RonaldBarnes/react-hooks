
import React, { useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
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

/*
	const [darkTheme, setDarkTheme] = useState(false);

	function toggleTheme()
		{
		setDarkTheme( prevTheme => !prevTheme);
		console.log(`HookUseContext darkTheme: ${darkTheme}`)
		}
*/

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[])


	return(
		<div className="hooks">
			<h2>
				Hook <code>UseContext</code>
			</h2>
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useContext"
						target="new">
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

		</div>
		); // end return
	} // end function
