import React, { useState, useEffect } from 'react';

import useEventListener from "./hooks/useEventListener";


export default function HookUseEventListener()
	{
	console.log("%cHookUseEventListener", "color: red");

	const [key, setKey] = useState("");

	useEventListener( "keydown", e => {
		setKey(e.key)
		});


	// Scroll to top after a delay for autoFocus:
	useEffect( () => {
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		}, [])


	return (
		<div className="hooks">
			<h2>Hook <code>UseEventListener</code></h2>
			<p>
				Basic custom hooks that can be incorporated into a developer's toolkit.
			</p>
			<p>
				Here, we use <code>lodash isEqual()</code> to do deep compare on
				objects.
			</p>

			<hr />
			<p>
				Hook <code>useEventListener</code> can listen to events and act upon
				changes.
			</p>
			<p>
				In this simple example, <b>only the last key pressed</b> is shown.
				Displays "Alt", "OS", "Control", "PageDown", etc. too.
			</p>

			<label htmlFor="input">Enter some text: </label>
			<input
				type="text"
				name="input"
				id="input"
				value={key}
				// Note: there's a listener, so onChange is empty-ish
				onChange={ () => {}}
				autoFocus
				/>


			<div className="jsx" style={{marginTop:"2rem"}}><code>
				<span style={{color:"lightgreen"}}>
{`
  const [key, setKey] = useState("");

  useEventListener( "keydown", e => {
    setKey(e.key)
    });
`}
</span>
{`...
      <label htmlFor="input">Enter some text: </label>
      <input
        type="text"
        name="input"
        id="input"
        value={key}
        // Note: there's a listener, so onChange is empty-ish
        onChange={ () => {}}
        />
...
`}
        <span style={{color:"lightgreen"}}>
{`
function useEventListener(eventType, callback, element = window)
  {
  const callbackRef = useRef(callback);

  // When our function changes, save for future reference:
  //  callback function is basically \`setKey( [key pressed])\`
  useEffect( () => {
    callbackRef.current = callback
    }, [callback]
    );

  useEffect( () => {
    const handler = e => callbackRef.current(e);
    // Default element is window:
    element.addEventListener(eventType, handler);

    // Cleanup previous listeners:
    return () => element.removeEventListener(eventType, handler);
    }, [eventType, element]
    );

  }  // end function

`}

				</span>
			</code></div>


		</div>
		);
	}



// export function useEventListener(eventType, callback, element = window)
// 	{
// 	console.log(`%cuseEventListener`, "color:lightblue");
// 	console.log(`%cuseEventListener element:`, "color:lightblue");
// console.table(element);

// 	const callbackRef = useRef(callback);

// 	// When our function changes, save for future reference:
// 	//	callback function is basically `setKey( [key pressed])`
// 	useEffect( () => {
// 		callbackRef.current = callback
// 		}, [callback]
// 		);

// 	useEffect( () => {
// 		if (element === null) return;
// 		const handler = e => callbackRef.current(e);
// 		// Default element is window:
// 		element.addEventListener(eventType, handler);

// 		// Cleanup previous listeners:
// 		return () => element.removeEventListener(eventType, handler);
// 		}, [eventType, element]
// 		);

// 	}	// end function
