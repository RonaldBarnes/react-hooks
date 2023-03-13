
import React, { useState } from 'react';
import './Hooks.css';


export default function HookUseState()
	{
	const [count, setCount] = useState(0);

	const updateCountOnce = (value) => {
		console.log(`count = %c${count}`, "font-color=red;");
		setCount(count + value)	// update once
		setCount(count + value)	// update again (this fails)
		}

	const updateCountTwice = (value) => {
		console.log(`count = %c${count}`, "font-color=red;");
		setCount(count => count + value)
		setCount(count => count + value)
		}

	return(
		<div className="hooks">
			<h2>
				HookUseState
			</h2>
			<h3>
				Q: Why does my state update only once?
			</h3>
			<p>
				To ensure an action happens twice on an update to the state,
				use the functional version of
				<code>setState()</code>.
			</p>
			<p>
				For example, we want our counter increment to happen <b>twice</b>
				&nbsp; per click, even though we pass a value of -1 or 1 to the
				function <code>updateCountOnce()</code>:
			</p>
			<code><pre className="jsx">
{`
const updateCountOnce = (value) => {
    setCount(count + value)    // update once
    setCount(count + value)    // update again (this fails)
    }
...
<button onClick={() => updateCountOnce(-1)}> -2 </button>
    {count}
<button onClick={() => updateCountOnce(+1)}> +2 </button>
`}
			</pre></code>
			<div className="counter">
				<span style={{ fontSize: '2rem' }}>
				<button onClick={() => updateCountOnce(-1)}> -2 </button>
					&nbsp;{count}&nbsp;
				<button onClick={() => updateCountOnce(1)}> +2 </button>
				</span>
			</div>

		<p>
			As we can see, the counter only updates once, despite two calls to
			<code>setCount()</code>.
		</p>
			<h3>
				A: Update state with a function call
			</h3>
		<p>
			If the calls to <code>setCount()</code> are done as a function, then
			both are invoked:
		</p>
			<code><pre className="jsx">
{`
const updateCountTwice = (value) => {
    setCount(count => count + value)
    setCount(count => count + value)
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
					&nbsp;{count}&nbsp;
				<button onClick={() => updateCountTwice(1)}> +2 </button>
				</span>
			</div>
			<p>
				And now the counts are updated by two each click.
			</p>
		</div>
		)
	}
