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
				This hook makes use of <code>useMediaQuery</code> and <code>useStorage</code>
				to detect is user's browser prefers dark mode.
			</p>
			<h4>NOTE:</h4>
			<p>
				Now that <code>useDarkMode</code> has been moved to the Header, the button
				on this page can fail to reflect the current state of local storage.
			</p>
			<p>
				<s>
					Also, toggling the button here can make the header show an incorrect theme.
					Will look into <code>useContext</code> at a higher level, or
					<code>useReducer</code> to raise / lift state so it can be shared among
					components.
				</s>
			</p>
			<h3>
				Updated: lifted state to App.js!
			</h3>
			<hr />

			<p>
				Click button to toggle theme between dark and light modes.
			</p>
			<div className="counter">
				<p>
					<button
						type="button"
						onClick={ () => {
						console.log(`CLICK enabled? ${darkMode}`);
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
			<p>
				Click button to toggle theme between dark and light modes.
			</p>
			<div className="counter">
				<p>
					<button
						type="button"
						onClick={ () => setDarkMode( currTheme => !currTheme)}
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
						Clear Theme Storage
					</button>
				</p>
			</div>
			{/* <Code /> */}
		</div>
		);	// end return
	}	// end function




import { useEffect, useCallback } from "react";

import { useStorage } from "./useStorage";
import useMediaQuery from "./useMediaQuery";


export default function useDarkMode(defaultValue)
	{
	const [darkTheme, setDarkTheme] = useStorage("useDarkMode", defaultValue, localStorage);
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const enabled = typeof(darkTheme) !== "undefined"
		? darkTheme
		: prefersDarkMode

	useEffect( () => {
		document.body.classList.toggle("darkModeTheme", enabled)
		}, [enabled]
		);

	// Allow for removal of localStorage key:
	const removeTheme = useCallback( () => {
		localStorage.removeItem("useDarkMode");
		// setDarkTheme(useDarkMode);
		});

	return [enabled, setDarkTheme, removeTheme]
	}	// end function useDarkMode

`;
	const output = useSourceCode({code});

	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code
