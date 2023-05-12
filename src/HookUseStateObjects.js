import React, { useState } from 'react';
import './Hooks.css';


export default function HookUseStateObjects()
	{
	console.log("%cHookUseState_Objects", "color: yellow");
	// Use function to set intial state when there's a lengthy / slow
	// initial setup: only runs ONCE:
	const [state1, setState1] = useState( () => {
		console.log("%cInitializing state...", "color: red")
		return {count1: 0, theme1: {color: "red"} }
		});	// end useState()

	const [state2, setState2] = useState( () => {
		console.log("%cInitializing state...", "color: red")
		return {count2: 0, theme2: {color: "green"} }
		});	// end useState()

	const [count, setCount] = useState( () => {
		console.log("%cInitializing state...", "color: red")
		return 0
		});	// end useState()

	const [theme, setTheme] = useState( () => {
		console.log("%cInitializing state...", "color: red")
		return {color: "orange"}
		});	// end useState()

	let {count1, theme1} = state1
	let {count2, theme2} = state2

	const updateCountOnly = (value) => {
		// update count, ignore theme - unchanged:
		setState1({count1: count1 + value})
		}

	const updateStateAll = (value) => {
		// update entire state:
		setState2({...state2, count2: count2 + value})
		}
/*
	const updateCount = (value) => {
		// update count only:
		setCount( count => count + value)
		}
	const updateTheme = (value) => {
		// update theme only:
		setTheme( {color: value} )
		}
	console.warn(theme)
*/


	return(
		<div className="hooks">
			<h2>
				Hook useState: updating objects
			</h2>
			<h3>
				Q: Why does my state get destroyed when updating via
				<code>useState()</code>?
			</h3>
			<h3>
				A1: Only update <b>one</b> state item per hook
			</h3>
			<p>
				When updating state which contains multiple elements  (in this case,
				our counter plus a theme colour), <code>useState</code>'s update
				will overwrite existing state settings for all items used in the
				hook definition.
			</p>
			<pre className="jsx"><code>
{`
// const [count, setCount] = useState(0); // traditional method
// Use function to set intial state when there's a lengthy / slow
// initial setup: only runs ONCE:
const [state1, setState1] = useState( () => {
  console.log("%cInitializing state...", "color: red")`}
<span style={{color:"red"}}>{`
  return {count1: 0, theme1: {color: "red"} }`}</span>{`
  }
  );	// end useState()
...
const updateCountOnly = (value) => {
  {
  // update count, ignore theme - unchanged:
`}<span style={{color:"red"}}>
	{`  setState1({count1: count1 + 1})`}
</span>{`
  }
`}
			</code></pre>
			<div className="counter">
				<button onClick={() => updateCountOnly(-1)}> -1 </button>
				&nbsp;
				<span style={theme1}>
					{count1}
				</span>
				&nbsp;
				<button onClick={() => updateCountOnly(1)}> +1 </button>
			</div>
			<p>
				The theme (color: "red"), which is stored in state, gets wiped out
				the first time the state is updated, because the only update to state
				was the counter value.
			</p>

			<h3>
				A2: Update state with all state elements through ...flattening
			</h3>
			<blockquote>
				React will ignore your update if the next state is equal to the
				previous state, {" "}
				<a href="https://react.dev/reference/react/useState#ive-updated-the-state-but-logging-gives-me-the-old-value"
					target="ReactHooks"
					>
					as determined by an Object.is
				</a>
			</blockquote>
			<p>
				This time, we'll update our state by flattening the existing
				state, then append the updated count (stay tuned 'til the end, there
				is an even better method after this one):
			</p>

			<pre className="jsx"><code>
{`
// const [count, setCount] = useState(0); // traditional method
// Use function to set intial state when there's a lengthy / slow
// initial setup: only runs ONCE:
const [state2, setState2] = useState( () => {
  console.log("%cInitializing state...", "color: red")
`}
<span style={{color:"red"}}>
	{`  // Still updating 2 items in hook definition - bad form
  return {count2: 0, theme2: {color: "green"} }`}
</span>{`
  }
  );	// end useState()
...
const updateStateAll = (value) => {
  {
  // update entire state:
`}
<span style={{color:"lightgreen"}}>
	{`  setState2({...state2, count2: count2 + value})`}
</span>{`
  }
`}
			</code></pre>
			<div className="counter">
				<button onClick={() => updateStateAll(-1)}> -1 </button>
				&nbsp;
				<span style={theme2}>
					{count2}
				</span>
				&nbsp;
				<button onClick={() => updateStateAll(1)}> +1 </button>
			</div>
			<p>
				And now our theme is preserved each time we update the counter.
			</p>

			<h3>
				A3: Best answer: use separate hooks for each state element
			</h3>
			<p>
				The actual, best answer is to use separate hooks for each element
				of the state that one wants to update.
			</p>
			<code><pre className="jsx">
				<span style={{color:"lightgreen"}}>{`
const [count, setCount] = useState( () => {
  return 0
`}</span>
{`  });	// end useState()`}
<span style={{color:"lightgreen"}}>{`
const [theme, setTheme] = useState( () => {
  return {color: "orange"}
`}</span>{`  });	// end useState()
...
<button onClick={() => setTheme({color:"red"})}> Red </button>
<button onClick={() => setCount(count => count - 1)}> -1 </button>
<span style={theme}>{count}</span>
<button onClick={() => setCount(count => count + 1)}> +1 </button>
<button onClick={() => setTheme({color:"green"})}> Green </button>
`}</pre></code>

			<div className="counter">
				<button onClick={() => setTheme({color:"red"})}> Red </button>
				<button onClick={() => setCount(count => count - 1)}> -1 </button>
				{" "}
				<span style={theme}>
					{count}
				</span>
				{" "}
				<button onClick={() => setCount(count => count + 1)}> +1 </button>
				<button onClick={() => setTheme({color:"green"})}> Green </button>
			</div>

			<p>
				Now, our button presses can invoke <code>setCount()</code>, and
				should we wish to change the theme, we'd use <code>setTheme()</code>.
			</p>
		</div>
		);
	}
