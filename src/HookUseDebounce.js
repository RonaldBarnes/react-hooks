import React,
		{
		useEffect,
		useState,
		}
	from 'react';

import useDebounce from "./hooks/useDebounce";
import useTimeout from "./hooks/useTimeout";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseDebounce({t})
	{
	console.log("%cHookUseDebounce", "color: yellow");

	// Set counter to initial value:
	const [count,setCount] = useState(5);
	const [step, setStep] = useState(0.1);


	// Initiate a count-down timer:
	const [restart, clear] = useTimeout( () =>
		timerUpdate( count )
		, 5
		);

	// Set an alert when no activity for 2 seconds:
	useDebounce( () => alert("No counting for 2 seconds"), 2000, [count]);


	// For manual changes to value:
	function handleChange(e)
		{
		console.log(`HANDLE CHANGE count: ${count} e: ${e.target.value}`);
		setCount(e.target.value);
		restart();
		}

	function timerUpdate(c)
		{
// console.log(`HANDLE CHANGE THREE count: ${c}`);
		if (c <= step)
			{
			// Stop count down at zero:
			clear();
			}
		else
			{
			// Limit the amount of digits to 2 (default):
			setCount(c => (+c - step).toLocaleString(undefined, {minimumFractionDigits:2}) );
			restart();
			}
		}

	// Scroll to top after a delay for autoFocus:
	useEffect( () => {
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		}, [])


	return (
		<div className="hooks">
			<h2>Hook <code>UseDebounce</code></h2>
			<p>
				Basic custom hooks that can be incorporated into a developer's toolkit.
			</p>
			<p>
				That's not entirely true: this one's <b>quite a bit more than
				basic</b>, and builds upon <code>useTimeout</code>.
			</p>
			<p>
				If we want to run something, but only after a delay (i.e. send query
				to an API), then this method should be useful.
			</p>
			<p>
				In this example, when the timer stops changing, a 2 second delay will
				occur, then an alert will pop up.
			</p>
			<p>
				The timer is importing <code>useTimeout</code> from previous example,
				plus <code>useDebounce</code>, which takes a callback function and
				a delay as parameters.
			</p>

			<input
				type="text"
				value={count}
				name="input"
				onChange={(e) => handleChange(e) }
				/>
			<p>
				<button
					type="button"
					onClick={() => setCount( c => parseFloat(c) + 1)}
					>
					Add 1.00
				</button>
				<button
					type="button"
					onClick={clear}
					autoFocus
					>{t("Stop")} {t("Timer")}
				</button>
				<button
					type="button"
					onClick={restart}
						>
						{t("Restart")} {t("Timer")}
				</button>
			</p>
			<Code />
		</div>
		);	// end return
	}	// end HookUseDebounce









// eslint-disable-next-line
function codeOrig()
	{
	return (
			<div className="jsx" style={{marginTop:"2rem"}}><code>

{`
export default function HookUseDebounce()
  {
`}
				<span style={{color:"lightgreen"}}>
{`
  // Set an alert when no activity for 2 seconds:
  useDebounce( () => alert("No counting for 2 sec  }  // end function
`}</span>{`
  ...
  }
`}
				<span style={{color:"lightgreen"}}>
{`
function useDebounce(callback, delay, dependencies)
	{
	const { restart, clear } = useTimeout(callback, delay);

	useEffect(restart, [...dependencies, restart]);
	// At page load, clear any timer(s):
	useEffect(clear, []);
	}

`}

				</span>
			</code></div>
		)
	}	// end CodeOrig






function Code()
	{
	const code = `
import useDebounce from "./hooks/useDebounce";
import useTimeout from "./hooks/useTimeout";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseDebounce()
	{
	// Set counter to initial value:
	const [count,setCount] = useState(10);


	// Initiate a count-down timer:
	const [restart, clear] = useTimeout( () =>
		timerUpdate( count )
		, 10);

	// Set an alert when no activity for 2 seconds:
	useDebounce( () => alert("No counting for 2 seconds"), 2000, [count]);


	// For manual changes to value:
	function handleChange(e)
		{
		setCount(e.target.value);
		restart();
		}

	function timerUpdate(c)
		{
		if (c <= 0)
			{
			// Stop count down at zero:
			clear();
			}
		else
			{
			// Limit the amount of digits to 2 (default):
			setCount(c => (c - 0.01).toLocaleString() );
			restart();
			}
		}

	// Scroll to top after a delay for autoFocus:
	useEffect( () => {
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		}, [])


	return (
		<div className="hooks">

			<input
				type="text"
				value={count}
				name="input"
				onChange={(e) => handleChange(e) }
				/>
			<p>
				<button
					type="button"
					onClick={() => setCount( c => parseFloat(c) + 1)}
					>
					Add 1.00
				</button>
				<button
					type="button"
					onClick={clear}
					autoFocus
					>Stop Timer
				</button>
				<button
					type="button"
					onClick={restart}
						>
						Restart Timer
				</button>
			</p>
		</div>
		);	// end return
	}	// end HookUseDebounce





// useDebounce.js:
// ///////////////

import { useEffect } from "react";

import useTimeout from "./useTimeout";

export default function useDebounce(
		callback,
		delay,
		dependencies
		)
	{
	const [restart, clear] = useTimeout(callback, delay);

	useEffect(restart, [...dependencies, restart]);
	// At page load, clear any timer(s):
	useEffect(clear, []);
	}





// useTimeout.js:
// //////////////

import { useRef, useEffect, useCallback } from "react";

export default function useTimeout(callback, delay)
	{
	// A new function is passed each render, useRef allows function persistance
	const callbackRef = useRef(callback);
	const timeoutRef = useRef();

	// Initialize
	useEffect( () => {
		// Update our ref to new function each re-render:
		callbackRef.current = callback;
		}, [callback]);

	// 
	const set = useCallback( () => {
		timeoutRef.current = setTimeout( () => callbackRef.current(), delay)
		}, [delay]);

	const clear = useCallback( () => {
		timeoutRef.current && clearTimeout(timeoutRef.current);
		}, []);

	// At start-up, not each timer tick:
	useEffect( () => {
		set()
		return clear
		}, [delay, set, clear]
		);

	const restart = useCallback( () => {
		clear();
		set();
		}, [clear, set]
		);

	// I spend HOURS trying to debug an issue where I used "reset" instead of "restart"
	// to capture the return vars.
	// Switching to array method to avoid in future:
	// return { restart, clear }
	return [ restart, clear ];
	}	// end function useTimeout

`;
	const output = useSourceCode({code});

	return (
		<div className="codeFormatted">
			{output}
		</div>
		);
	}	// end Code
