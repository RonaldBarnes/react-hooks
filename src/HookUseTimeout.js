import React,
		{
		// useCallback,
		// useEffect,
    useContext,
		useState,
		}
	from 'react';

import useTimeout from "./hooks/useTimeout";
import useEffectOnce from "./hooks/useEffectOnce";
import useSourceCode from "./hooks/useSourceCode";

import { contextTranslate } from "./App.js";
import PageTitle from "./PageTitle";


export default function HookUseTimeout()
	{
	console.log("%cHookUseTimeout", "color: yellow");

	// Set counter to initial value:
	const [count,setCount] = useState(10);
	// Initiate a count-down timer:
	const [restart, clear] = useTimeout( () =>
		timerUpdate( count )
		, 10);

  const { t } = useContext(contextTranslate);

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

	useEffectOnce( () => {
		// Scroll to top after a delay for autoFocus:
			window.scrollTo({top:0, behavior:"smooth"})
		},[]);


	return (
		<div className="hooks">
      <PageTitle hookName="useTimeout" />
			<p>
				Basic custom hooks that can be incorporated into a developer's toolkit.
			</p>
			<p>
				That's not entirely true: this one's <b>quite a bit more than
				basic</b>.
			</p>
			<p>
				When wants to use <code>setTimeout</code>, <b>and</b>
				make use of the <code>clearTimeout</code>, this
				hook makes handling the timeout ID easy.
			</p>
			<hr />
 
			<p>
				The counter will count down to zero, unless "Stop Timeout" is pressed.
				Any manual change of the value will trigger the count down.
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
					{t("Add")} 1.00
				</button>
				<button
					type="button"
					onClick={clear}
					autoFocus
					>{t("Stop")} Timer
				</button>
				<button
					type="button"
					onClick={restart}
					>{t("Restart")} Timer
				</button>
			</p>
			<Code />
		</div>
		);
	}	// end HookUseTimeout





// eslint-disable-next-line
function CodeOrig()
	{
	return (
			<div className="jsx" style={{marginTop:"2rem"}}><code>

{`
export default function HookUseTimeout()
  {
  const [count,setCount] = useState(10);
  // Initiate a count-down timer: `}
				<span style={{color:"lightgreen"}}> {`
  const {restart, clear} = useTimeout( () =>
    timerUpdate( count )
    , 10
    );
`}</span>{`
  // For manual changes to value:
  function handleChange(e)
    {
    setCount(e.target.value);
    restart();
    }
`}
				<span style={{color:"lightgreen"}}>
{`
  // Each timer tick invokes this:
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
`}</span>{`...
      <input
        type="text"
        value={count}
        onChange={(e) => handleChange(e) }
        />
      <p>`}
				<span style={{color:"lightgreen"}}>
{`
        <button
          onClick={() => setCount( c => parseFloat(c) + 1)}
          >
          Add 1.00
        </button>
        <button onClick={clear}>Stop Timer</button>
        <button onClick={restart}>Restart Timer</button>
`}</span>
{`      </p>
  }  // end function


`}
				<span style={{color:"lightgreen"}}>
{`
function useTimeout(callback, delay)
  {
  // A new function is passed each render, useRef allows function persistance
  const callbackRef = useRef(callback);
  const timeoutRef = useRef();

  // Initialize
  useEffect( () => {
    // Update our ref to new function each re-render:
    callbackRef.current = callback;
    }, [callback]
    );

  const set = useCallback( () => {
    timeoutRef.current = setTimeout( () => callbackRef.current(), delay)
    }, [delay]
    );

  const clear = useCallback( () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []
    );

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

  return { restart, clear }
  }  // end function

`}

				</span>
			</code></div>
		);
	}	// end CodeOrig





function Code()
	{
	const code = `
export default function HookUseTimeout()
	{
	// Set counter to initial value:
	const [count,setCount] = useState(10);
	// Initiate a count-down timer:
	const [restart, clear] = useTimeout( () =>
		timerUpdate( count )
		, 10
		);

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

	useEffectOnce( () => {
		// Scroll to top after a delay for autoFocus:
			window.scrollTo({top:0, behavior:"smooth"})
	},
		[]);


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
					>Restart Timer
				</button>
			</p>
		</div>
		);
	}	// end HookUseTimeout





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
		}, [delay, set, clear]);

	const restart = useCallback( () => {
		clear();
		set();
		}, [clear, set]);

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
