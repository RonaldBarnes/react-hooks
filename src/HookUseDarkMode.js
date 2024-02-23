import React, { useEffect, useContext } from 'react';

// import { useDarkMode } from "./hooks/useDarkMode";
import useSourceCode from "./hooks/useSourceCode";

import { contextTheme } from "./App.js";
import PageTitle from "./PageTitle";


// Now this component takes props from App.js to sync the theme setting
// between this and the Header:
export default function HookUseDarkMode()
	{
  const {
    useDarkTheme,
    setUseDarkTheme,
    removeTheme,
    DEFAULT_THEME_DARK: defaultDarkTheme,
    } = useContext(contextTheme);

  console.log(`%cHookUseDarkMode useDarkTheme: ${useDarkTheme.toString()}`, "color: red");


//	const [darkMode, setDarkMode] = useDarkMode();

	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
    window.scrollTo({top:0, behavior:"smooth"})
		}, []);


	return (
		<div className="hooks">
      <PageTitle hookName="useDarkMode" />
			<p>
				This hook will probe browser settings for
				"<code>prefers-color-scheme: dark</code>", and set theme appropriately.
			</p>
			<p>
				The theme setting (dark / light) will be stored in localStorage.
			</p>
			<p>
        This hook makes use of:
			</p>
      <ul>
        <li>
          <code>useMediaQuery</code>
          <ul><li><code>useEventListener</code></li></ul>
        </li>
        <li>
          <code>useStorage</code> to detect if user's browser prefers
          dark mode.
        </li>
      </ul>
			<p>
        If your OS is set to use dark theme from sunset to sunrise,
        this hook will recognize that and change appropriately.
			</p>

        <h4>Your Settings</h4>
        <h5>
          Your OS / browser is requesting light mode?
        </h5>
        <pre>
          {window.matchMedia("(prefers-color-scheme: light)").matches.toString()}
        </pre>
        <h5>
          Your OS / browser is requesting dark mode?
        </h5>
        <pre>
          {window.matchMedia("(prefers-color-scheme: dark)").matches.toString()}
        </pre>

			<hr />

			<p>
				Click button to toggle theme between dark and light modes.
			</p>
			<div className="counter">
				<p>
					<button
						type="button"
						onClick={ () => {
            // console.log(`HookUseDarkMode.js button CLICKed. `,
            //	`darkMode was:`, darkMode
            //	);
            setUseDarkTheme( currTheme => !currTheme)
						}}
						autoFocus
						>
            Toggle Dark Mode (is {useDarkTheme.toString() })
					</button>
				</p>
				<p>
					<button
						type="button"
						onClick={ () => {
							removeTheme();
							// Reset theme to default:
              setUseDarkTheme(defaultDarkTheme);
							}}>
            Clear Theme Storage & Reset to Default ({defaultDarkTheme.toString()})
					</button>
				</p>
			</div>
			<Code />
		</div>
		);	// end return
	}	// end function









function Code()
	{
	const code = `
// Now this component takes props from App.js to sync the theme setting
// between this and the Header:
export default function HookUseDarkMode(
	{
		useDarkTheme,
		setUseDarkTheme,
		removeTheme,
		defaultDarkTheme
	})
	{
	// Use props, to work with App.js & Header.js:
	// const [darkMode, setDarkMode] = useDarkMode();


	return (
		<div className="hooks">
			<h2>Hook <code>UseDarkMode</code></h2>
			<p>
				This hook will probe browser settings for
				"<code>prefers-color-scheme: dark</code>", and set theme appropriately.
			</p>
			<p>
				The theme setting (dark / light) will be stored in localStorage.
			</p>
			<p>
				This hook makes use of:
			</p>
			<ul>
				<li>
					<code>useMediaQuery</code>
					<ul><li><code>useEventListener</code></li></ul>
				</li>
				<li>
					<code>useStorage</code> to detect if user's browser prefers dark mode.
				</li>
			</ul>
			<p>
				If your OS is set to use dark theme from sunset to sunrise,
				this hook will recognize that and change appropriately.
			</p>

			<h4>Your Settings</h4>
			<h5>
				Your OS / browser is requesting light mode?
			</h5>
			<pre>
				{window.matchMedia("(prefers-color-scheme: light)").matches.toString()}
			</pre>
			<h5>
				Your OS / browser is requesting dark mode?
			</h5>
			<pre>
				{window.matchMedia("(prefers-color-scheme: dark)").matches.toString()}
			</pre>

			<hr />

			<p>
				Click button to toggle theme between dark and light modes.
			</p>
			<div className="counter">
				<p>
					<button
						type="button"
						onClick={ () => {
						// console.log("HookUseDarkMode.js button CLICKed. ",
						//	"darkMode was:", darkMode
						//	);
						setUseDarkTheme( currTheme => !currTheme)
						}}
						autoFocus
						>
						Toggle Dark Mode (is {useDarkTheme.toString() })
					</button>
				</p>
				<p>
					<button
						type="button"
						onClick={ () => {
							removeTheme();
							// Reset theme to default:
							setUseDarkTheme(defaultDarkTheme);
							}}>
						Clear Theme Storage & Reset to Default ({defaultDarkTheme.toString()})
					</button>
				</p>
			</div>
			<Code />
		</div>
		);	// end return
	}	// end function






import { useEffect, useCallback } from "react";

import { useStorage } from "./useStorage";
import useMediaQuery from "./useMediaQuery";


export default function useDarkMode()
	{
  // console.log("useDarkMode.js()");

  // useMediaQuery adds a listener so changes (i.e. sunrise / sunset)
  // can invoke change to theme:
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const DEFAULT_THEME_DARK =
    !window.matchMedia("(prefers-color-scheme: light)").matches
    ;

/**
 * This is messeded up: initial return from useMediaQuery() is false, BUT
 * directly using matchMedia() for same term is true
 *
  console.log("useDarkMode.js: prefersDarkMode:", prefersDarkMode,
    ""(prefers-color-scheme: dark)":",
    matchMedia("(prefers-color-scheme: dark)").matches
    );
*/

  const [useDarkTheme, setUseDarkTheme] = useStorage(
    "useDarkMode",
    prefersDarkMode,
    localStorage
    );

  // Capture change to useDarkTheme, triggered by
  // user pressing button to change theme:
  useEffect( () => {
    console.log("useDarkMode.js: useEffect(): useDarkTheme changed:", useDarkTheme);
    if (useDarkTheme)
      {
      document.body.classList.add("darkModeTheme");
      document.body.classList.remove("lightModeTheme");
      }
    else
      {
      document.body.classList.add("lightModeTheme");
      document.body.classList.remove("darkModeTheme");
      }
    }, [useDarkTheme]
    );	// end useEffect()[useDarkTheme]


  // Capture change to prefersDarkMode, triggered by
  // event listener on prefers-color-scheme (i.e. sunrise / sunset, etc.)
  useEffect( () => {
    console.log("useDarkMode.js: useEffect(): prefersDarkMode changed:",
      prefersDarkMode);
    if (prefersDarkMode)
      {
      document.body.classList.add("darkModeTheme");
      document.body.classList.remove("lightModeTheme");
      }
    else
      {
      document.body.classList.add("lightModeTheme");
      document.body.classList.remove("darkModeTheme");
      }

    // Ensure change is passed to state and therefore re-renders new colours:
    setUseDarkTheme( curr => prefersDarkMode);
    }, [prefersDarkMode]
    );	// end useEffect()[prefersDarkMode]


	// Allow for removal of localStorage key:
	const removeTheme = useCallback( () => {
		localStorage.removeItem("useDarkMode");
    // Should we RESET theme as well as removing from localStorage?
    // For now, it's part of onClick on button
    // "Clear Theme Storage & Reset to Default" in HookUseDarkMode.js
    // setUseDarkTheme(defaultDarkTheme);
		});

  // Return object instead of array: order doesn't matter:
  // return [enabled, setUseDarkTheme, removeTheme]
  return {
    useDarkTheme,
    setUseDarkTheme,
    removeTheme,
    DEFAULT_THEME_DARK
    }
	}	// end function useDarkMode

`;
	const output = useSourceCode({code});

	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code
