import React, { useState } from 'react';
import './Hooks.css';


export default function HookUseStateMultiUpdates()
	{
	console.log("%cHookUseState-MultiUpdates", "color: yellow");
	// Use function to set intial state when there's a lengthy / slow
	// initial setup: only runs ONCE:
	const [count1, setCount1] = useState( () => {
		console.log("%cInitializing state...", "color: red")
		// return {count1: 0, theme1: "red"}
		return 0
		}
  );	// end useState()
	const [count2, setCount2] = useState( () => {
		console.log("%cInitializing state...", "color: red")
		return 0
		}
  );	// end useState()


	const updateCountOnce = (value) => {
		const oldCount = count1;
		setCount1(count1 + value)	// update once
		setCount1(count1 + value)	// update again (this fails)
		console.log(`${oldCount} + ${value} = %c${count1 + value}`, "color: red;");
		}

	const updateCountTwice = (value) => {
		const oldCount = count2;
//		setCount(count => count + 100 * value)	// updates again
//		setCount(count => count + 100 * value)	// updates again
//		setCount(count => count + 5 * value)	// updates once
		// This invocation squashes all previous ones!
		// WHY?!?
		// setCount( () => {return count + 100 * value})	// updates once
		//
		// This invocation squashes all previous ones!
		// WHY?!?
		// setCount( () => (count + value))	// updates again
		setCount2(count2 => count2 + value)	// updates once
		setCount2(count2 => count2 + value)	// updates again: Works!
		console.log(`${oldCount} + ${value * 2} = %c${count2 + value * 2}`,
			"color: lightgreen;");
		}

	return(
		<div className="hooks">
			<h2>
				Hook useState: multiple updates to state
			</h2>
			<h3>
				Q: Why does my state update only once?
			</h3>
			<h3>
				A1: After the first update, the others are optimized away
			</h3>
			<blockquote>
				The set function only updates the state variable for the next render.
				If you read the state variable {" "}
				<a href="https://react.dev/reference/react/useState"
					target="new"
					>
					after calling the set function
				</a>, you
				will still get the old value that was on the screen before your call.
			</blockquote>
			<p>
				To ensure all actions occur when updating the state,
				use the functional version of
				<code>useState</code>'s update function (<code>setCount()</code>
				in this case).
			</p>
			<p>
				For example, we want our counter increment to happen <b>twice</b>
				{" "} per click, even though we pass a value of -1 or 1 to the
				function <code>updateCountOnce()</code>:
			</p>
			<pre className="jsx"><code>
{`
// const [count, setCount] = useState(0); // traditional method
// Use function to set intial state when there's a lengthy / slow
// initial setup: only runs ONCE:
const [count, setCount] = useState( () => {
  console.log("%cInitializing state...", "color: red")
  return 0
  });	// end useState()
...
const updateCountOnce = (value) => {
`}
<span style={{color:"red"}}>
	{`  setCount(count + value)  // update once
  setCount(count + value)  // update again (this fails)`}
</span>{`
  }
...
<button onClick={() => updateCountOnce(-1)}> -2 </button>
    {count1}
<button onClick={() => updateCountOnce(+1)}> +2 </button>
`}
			</code></pre>
			<div className="counter">
				<span style={{ fontSize: '2rem' }}>
				<button onClick={() => updateCountOnce(-1)}> -2 </button>
					{" "}<span style={{color:"red"}}>{count1}</span>{" "}
				<button onClick={() => updateCountOnce(1)}> +2 </button>
				</span>
			</div>

		<p>
			As we can see, the counter only updates once, despite two calls to
			<code>setCount()</code>.
		</p>
		<h3>
			A2: Update state with a function call
		</h3>
		<p>
			If the arguments to <code>setCount()</code> expressed as a function,
			then all instances are executed:
		</p>
			<code><pre className="jsx">
{`
// const [count, setCount] = useState(0); // traditional method
// Use function to set intial state when there's a lengthy / slow
// initial setup: only runs ONCE:
const [count, setCount] = useState( () => {
  console.log("%cInitializing state...", "color: red")
  return 0
  }
  );	// end useState()
...
const updateCountTwice = (value) => {
`}
<span style={{color:"lightgreen"}}>
	{`  setCount(count => count + value)  // updates once
  setCount(count => count + value)  // updates again: Works!`}
</span>{`
  }
...
<button onClick={() => updateCountTwice(-1)}> -2 </button>
  {count}
<button onClick={() => updateCountTwice(+1)}> +2 </button>
`}
		</pre></code>
			<div className="counter">
				<span style={{ fontSize: '2rem' }}>
				<button onClick={() => updateCountTwice(-1)}> -2 </button>
					&nbsp;<span style={{color:"green"}}>{count2}</span>&nbsp;
				<button onClick={() => updateCountTwice(1)}> +2 </button>
				</span>
			</div>
			<p>
				And now the counts are updated by two each click.
			</p>
		</div>
		)
	}
