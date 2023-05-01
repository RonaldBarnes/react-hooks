
import React,
	{
	useEffect,
	useState
	} from "react";

import usePrevious from "./hooks/usePrevious";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUsePrevious()
	{
	console.log("%cHookUsePrevious", "color: red");

	const [counter, setCounter] = useState(0);
	const [counter2, setCounter2] = useState(0);
	const previousCount = usePrevious(counter);

	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		}, [])


	return (
		<div className="hooks">
			<h2>Hook <code>usePrevious  </code></h2>
			<p>
				The <code>usePrevious</code> hook will save previous state
				for a single item.
			</p>
			<p>
				Changing the counter will save the previous value before updating.
			</p>

			<hr />
			<p>
				Counter / value: {" "} <span style={{fontSize:"2rem"}}>{counter}</span>
			</p>
			<p>
				Previous value: {" "} <span style={{fontSize:"2rem"}}>{previousCount}</span>
			</p>
			<p>
				<button
					type="button"
					onClick={() => setCounter( counter + 1)}>
					Increment
				</button>
			</p>
			<p>
				Changing another state variable will <b>not</b> {" "}
				impact the <code>usePrevious</code> variable.
			</p>
			<p>
				Counter2 / value: {" "} <span style={{fontSize:"2rem"}}>{counter2}</span>
			</p>
			<p>
				<button
					type="button"
					onClick={() => setCounter2( counter2 + 1)}
					autoFocus
					>
					Increment
				</button>
			</p>
			<Code />
		</div>
		);	// end return
	}	// end function HookUsePrevious



// eslint-disable-next-line
function CodeOrig()
	{
	return (
		<div className="jsx">
			<code>

{`
import { usePrevious } from "./hooks/usePrevious";

export default function HookUsePrevious()
  {
  const [counter, setCounter] = useState(0);
  const previousCount = usePrevious(counter);
...
      <p>
        Counter / value: {" "} <span style={{fontSize:"2rem"}}>{counter}</span>
      </p>
      <p>
        Previous value: {" "} <span style={{fontSize:"2rem"}}>{previousCount}</span>
      </p>
      <button onClick={() => setCounter( counter + 1)}>
        Increment
      </button>
...



`}
			</code>
			<code className="green">
{`

export function usePrevious(value)
  {
  const currentRef = useRef(value);
  const previousRef = useRef();

  // If new value passed, save "current" value to
  // "previous" value and update "current" value:
  if (currentRef.current !== value)
    {
    previousRef.current = currentRef.current;
    currentRef.current = value;
    }

  return previousRef.current;
  }  // end function

`}

			</code></div>
		);	// end return
	}	// end function CodeOrig





function Code()
	{
	const code = `
import React,
	{
	useEffect,
	useState
	} from "react";

import usePrevious from "./hooks/usePrevious";


export default function HookUsePrevious()
	{
	const [counter, setCounter] = useState(0);
	const [counter2, setCounter2] = useState(0);
	const previousCount = usePrevious(counter);

	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		}, [])


	return (
		<div className="hooks">
			<h2>Hook <code>usePrevious  </code></h2>
			<p>
				Counter / value: {" "} <span style={{fontSize:"2rem"}}>{counter}</span>
			</p>
			<p>
				Previous value: {" "} <span style={{fontSize:"2rem"}}>{previousCount}</span>
			</p>
			<p>
				<button
					type="button"
					onClick={() => setCounter( counter + 1)}>
					Increment
				</button>
			</p>
			<p>
				Changing another state variable will <b>not</b> {" "}
				impact the <code>usePrevious</code> variable.
			</p>
			<p>
				Counter2 / value: {" "} <span style={{fontSize:"2rem"}}>{counter2}</span>
			</p>
			<p>
				<button
					type="button"
					onClick={() => setCounter2( counter2 + 1)}
					autoFocus
					>
					Increment
				</button>
			</p>
			<Code />
		</div>
		);	// end return
	}	// end function HookUsePrevious





import { useRef } from "react";


export default function usePrevious(value)
	{
	const currentRef = useRef(value);
	const previousRef = useRef();

	// If new value passed, save "current" value to
	// "previous" value and update "current" value:
	if (currentRef.current !== value)
		{
		previousRef.current = currentRef.current;
		currentRef.current = value;
		}

	return previousRef.current;
	}	// end function usePrevious

`;

	const output = useSourceCode({code});

	return(
		<div className="codeFormatted">
			{output}
		</div>
		);
	}	// end Code
