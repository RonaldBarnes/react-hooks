
import React, { useState, useMemo, useEffect } from "react";

import useSourceCode from "./hooks/useSourceCode";


export default function HookUseMemo()
	{
	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[])

	return (
		<div className="hooks">
			<h2>
				Hook useMemo
			</h2>
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useMemo"
						target="ReactHooks">
						useMemo
					</a>
				</h3>
					<p>
						<code>useMemo</code> is a React Hook that lets you
						cache the result of a calculation between re-renders.
					</p>
			</blockquote>
			<HookMemoNoMemo />
			<HookMemoWithMemo />
			<CodeWithMemo />
		</div>
		);	// end return
	}	// end function








function HookMemoNoMemo()
	{
	const [counter, setCounter] = useState(0);

	function slowFunction1()
		{
		slowCounter = 0;
		for (let i = 0; i<100000000; i++)
			{
			// Do something that takes lots of time:
			slowCounter += Math.floor(Math.random() * 10);
			}
		console.log(`%cslowFunction1(${counter}) and ${slowCounter}`, "color:red");
		return slowCounter;
		}
	let slowCounter = slowFunction1();

	return (
		<>
			<p>
				We have a <code>slowFunction</code> that gets invoked each render.
				When clicking the buttons to change the counter value, there is
				significant delay in the large number being rendered.
			</p>

			<pre className="jsx"><code>
{`
function slowFunction1()
  {
  slowCounter = 0;
  for (let i = 0; i<100000000; i++)
    {
    // Do something that takes lots of time:
    slowCounter += Math.floor(Math.random() * 10);
    }
  console.log(\`%cslowFunction1(${counter}) and \${slowCounter}\`, "color:red");
  return slowCounter;
  }
`}
<span style={{color:"red"}}>{`
let slowCounter = slowFunction1();
`}</span>
{`
  <div className="counter">
    <button onClick={ () => setCounter(counter => counter-1)}> -1 </button>
    {" "} {counter} {" "}
    <button onClick={ () => setCounter(counter => counter+1)}> +1 </button>
  </div>
  <div className="counter">`}
<span style={{color:"red"}}>{`
    Result of slow function: {" "} {slowCounter.toLocaleString()} {" "}
`}</span>
{`  </div>
`}
</code></pre>


			<p>
				Each button click increments the counter, which is stored in state,
				but that re-renders the component, re-invoking the "slow function"
				that produces the numeric output below. It's very slow.
			</p>
			<div className="counter">
				<button
					type="button"
					onClick={ () => setCounter(counter => counter-1)}
					>
				 -1 
				</button>
				{" "} {counter} {" "}
				<button
					type="button"
					onClick={ () => setCounter(counter => counter+1)}
					autoFocus
					>
					+1 
				</button>
			</div>
			<div className="counter">
				Result of slow function: {" "} {slowCounter.toLocaleString()} {" "}
			</div>
		</>
		);	// end return
	}	// end function



function HookMemoWithMemo()
	{
	const [counter, setCounter] = useState(0);

	function slowFunction2()
		{
		let kounter = 0;
		for (let i = 0; i<100000000; i++)
			{
			kounter += Math.floor(Math.random() * 10);
			}
		console.log(`%ccounter:${counter} kounter:${kounter} and mod:${counter % 5})`,
			"color:orange");
		return kounter;
		}

	// let slowCounter = slowFunction(counter);
	const slowCounter = useMemo( () => slowFunction2(),
		// Only run when counter is divisible by 5:
		[counter % 5 === 0]
		);	// end useMemo

	return (
		<>
			<h3>
				Wrapping the  slow function inside <code>useMemo</code> makes things
				render much faster:
			</h3>
			<div className="counter">
				<button
					type="button"
					onClick={ () => setCounter(counter => counter-1)}
					> -1
				</button>
				{" "} {counter} {" "}
				<button
					type="button"
					onClick={ () => setCounter(counter => counter+1)}
					> +1 
				</button>
			</div>
			<div className="counter">
				Result of slow function: {slowCounter.toLocaleString()}
			</div>
			<p>
				The change to the code is below, the <code>useMemo</code> should only
				be invoked if the counter is divisible by 5.
			</p>
			<p>
				<b>However</b>, there's an issue where it will increment when the
				counter is divisible by 5, <b>and</b> the next counter changed event
				too.
				What, exactly, is causing that? The console.log messages seem to
				indicate it is otherwise working as expected.
			</p>
			<p>
				Okay, answered by Kyle, and it's obvious and I feel dumb right now:
			</p>
			<blockquote>
					the memoized code is run when "false" changes to "true" and {" "}
					<b>again</b> {" "} when "true" changes back to "false".
			</blockquote>
			<p>
				I mean, yeah, of course. I don't know why I didn't see that on my own.
			</p>
		</>
		);	// end return
	}	// end function HookWithMemo




function CodeWithMemo()
	{
	const code = `
function HookMemoWithMemo()
	{
	const [counter, setCounter] = useState(0);

	function slowFunction2()
		{
		let kounter = 0;
		for (let i = 0; i<100000000; i++)
			{
			kounter += Math.floor(Math.random() * 10);
			}
		return kounter;
		}

	// let slowCounter = slowFunction(counter);
	const slowCounter = useMemo( () => slowFunction2(),
		// Only run when counter is divisible by 5:
		[counter % 5 === 0]
		);	// end useMemo

	return (
			<div className="counter">
				<button
					type="button"
					onClick={ () => setCounter(counter => counter-1)}
					> -1
				</button>
				{" "} {counter} {" "}
				<button
					type="button"
					onClick={ () => setCounter(counter => counter+1)}
					> +1 
				</button>
			</div>
			<div className="counter">
				Result of slow function: {slowCounter.toLocaleString()}
			</div>
		)

`;
	const output = useSourceCode({code});

	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end CodeWithMemo

