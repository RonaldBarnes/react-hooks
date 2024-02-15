import React, { useEffect } from 'react';

// import { useDarkMode } from "./hooks/useDarkMode";
import useSourceCode from "./hooks/useSourceCode";


// Now this component takes props from App.js to sync the theme setting
// between this and the Header:
export default function HookUseDarkMode(
	{
		darkMode,
		setDarkMode,
		removeTheme,
		defaultDarkTheme
	})
	{

	console.log(`%cHookUseDarkMode darkMode: ${darkMode.toString()}`, "color: red");

//	const [darkMode, setDarkMode] = useDarkMode();

	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
    window.scrollTo({top:0, behavior:"smooth"})
		}, []);


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
						setDarkMode( currTheme => !currTheme)
						}}
						autoFocus
						>
						Toggle Dark Mode (is {darkMode.toString() })
					</button>
				</p>
				<p>
					<button
						type="button"
						onClick={ () => {
							removeTheme();
							// Reset theme to default:
							setDarkMode(defaultDarkTheme);
							}}>
						Clear Theme Storage & Reset to Default ({defaultDarkTheme.toString()})
					</button>
				</p>
			</div>
			<Code />
		</div>
		);	// end return
	}	// end function





// eslint-disable-next-line
function CodeOrig()
	{
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="green">
				{`
import { useDarkMode } from "./hooks/useDarkMode";

export default function HookUseDarkMode()
  {
  const [open, setOpen] = useState(false);
  const modalRef = useRef();

  // This hook will determine boundaries of what modalRef points to,
  // and run the callback if OUTSIDE of it:
  useDarkMode(modalRef, () => {
    if (open)
      {
      setOpen( prev => !prev);
      }
    });
`}
			</code>

			<code>
{`...
      <div className="counter">
        <button onClick={ () => setOpen(true)}>
          Open Modal {open.toString()}
        </button>
        { open && <div
            ref={modalRef}
            style={{ /* display: open ? "block" : "none", */
              width: "200px",
              height: "100px",
              margin: "1rem auto",
              padding: "1rem",
              border: "1px solid red",
              opacity: 1,
              color: "hsl(150, 50%, 50%)",
              boxShadow: "1px 1px 20px 0px lightgrey",
              }}
            >
            Modal...
          </div>
...
`}
			</code>

			<code className="green">
{`

import { useState, useRef } from "react";

import { useEventListener } from "../HookUseEventListener";

`}
			</code>
			<code className="red">
{`
export function useDarkMode(ref, callback)
  {
  // Opens then closes immediately due to dev mode?
  // This fixes it:
  let justOpened = useRef(true);

  useEventListener("click",
    e => {
      if (ref.current == null
          || ref.current.contains(e.target)
          || justOpened
          )
        {
        justOpened = false;
        return;
        }
      callback(e)
      },
    document
    );

  }  // end function

`}
			</code>
		</div>

		); // end return
	}	// end function




function Code()
	{
	const code = `
// Now this component takes props from App.js to sync the theme setting
// between this and the Header:
export default function HookUseDarkMode(
	{
		darkMode,
		setDarkMode,
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
						setDarkMode( currTheme => !currTheme)
						}}
						autoFocus
						>
						Toggle Dark Mode (is {darkMode.toString() })
					</button>
				</p>
				<p>
					<button
						type="button"
						onClick={ () => {
							removeTheme();
							// Reset theme to default:
							setDarkMode(defaultDarkTheme);
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

  const [darkTheme, setDarkTheme] = useStorage(
    "useDarkMode",
    prefersDarkMode,
    localStorage
    );

	// Capture change to darkTheme, triggered by
	// user pressing button to change theme:
	useEffect( () => {
		console.log("useDarkMode.js: useEffect(): darkTheme changed:", darkTheme);
		if (darkTheme)
			{
			document.body.classList.add("darkModeTheme");
			document.body.classList.remove("lightModeTheme");
			}
		else
			{
			document.body.classList.add("lightModeTheme");
			document.body.classList.remove("darkModeTheme");
			}
		}, [darkTheme]
		);	// end useEffect()[darkTheme]


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
		setDarkTheme( curr => prefersDarkMode);
		}, [prefersDarkMode]
		);	// end useEffect()[prefersDarkMode]


	// Allow for removal of localStorage key:
	const removeTheme = useCallback( () => {
		localStorage.removeItem("useDarkMode");
		// Should we RESET theme as well as removing from localStorage?
		// For now, it's part of onClick on button
		// "Clear Theme Storage & Reset to Default" in HookUseDarkMode.js
		// setDarkTheme(defaultDarkTheme);
		});

	// Return object instead of array: order doesn't matter:
	// return [enabled, setDarkTheme, removeTheme]
	return {
		darkMode: darkTheme,
		setDarkTheme,
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
