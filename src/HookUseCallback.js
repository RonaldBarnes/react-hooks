
import React, { useState, useCallback, useEffect } from "react";


export default function HookUseCallback()
	{
	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[])

	return (
		<div className="hooks">
			<h2>
				Hook useCallback
			</h2>
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useCallback"
						target="ReactHooks">
						useCallback
					</a>
				</h3>
					<p>
						<code>useCallback</code> is a React Hook that lets you
						cache a <b>function definition</b> between re-renders.
					</p>
			</blockquote>
			<p>
				Very similar to <code>useMemo</code>, except instead of caching the
				results of a function, it caches the function definition itself.
			</p>

			<HookCallbackNoCallback />
			<HookCallbackWithCallback />
		</div>
		);	// end return
	}	// end function








function HookCallbackNoCallback()
	{
	const [number, setNumber] = useState(0);
	const [darkTheme, setDarkTheme] = useState(false);

	const getItems = () => {
		console.log(`getItems(${number})`);
		return [number, number + 1, number + 2];
		}

	const theme = {
		backgroundColor: darkTheme ? "#555" : "#bbb",
		color: darkTheme ? "#bbb" : "#555",
		margin: "auto",
		padding: "1rem",
		textAlign: "left",
		width: "33%",
		borderRadius: "15px",
		}

	return (
		<>
			<p>
				A simple example: toggling the theme also recreates the
				<code>getItems</code> function (which generates the list of 3 items).
			</p>

			<pre className="jsx"><code>
				<span style={{color:"red"}}>
{`
const getItems = () => {
  return [number, number + 1, number + 2];
  }
...`}
				</span>
				<span style={{color:"yellow"}}>
{`
// List component, used by both examples:`}
				</span>
{`
function List( {getItems} )
  {
  const [items, setItems] = useState([]);

  useEffect( () => {
    setItems(getItems);
    console.log("List useEffect setItems");
    }, [getItems]);

  return (
    /* Remember, getItems is a function and needs the brackets after it: */
    items.map(item => <div key={item}>{item}</div>)
    );	// end return
  }	// end function
`}
			</code></pre>

			<div style={theme}>
			<label htmlFor="input"></label>
			<input
				type="number"
				value={number}
				onChange={e => setNumber(parseInt(e.target.value))}
				id="input"
				/>
				<List getItems={getItems} />
				<button onClick={() => setDarkTheme(prevTheme => !prevTheme) }>
					Toggle Theme
				</button>
			</div>
		</>
		);	// end return
	}	// end function





function HookCallbackWithCallback()
	{
	const [number, setNumber] = useState(0);
	const [darkTheme, setDarkTheme] = useState(false);

	const getItems = useCallback( () => {
		console.log("Inside useCallback()");
		return [number, number + 1, number + 2];
		}, [number]);

	const theme = {
		backgroundColor: darkTheme ? "#555" : "#bbb",
		color: darkTheme ? "#bbb" : "#555",
		margin: "auto",
		padding: "1rem",
		textAlign: "left",
		width: "33%",
		borderRadius: "15px",
		}

	return (
		<>
			<p>
				In this example, by wrapping the <code>getItems</code> function
				in a <code>useCallback</code> hook, toggling the theme will not
				re-generate (and re-run) the <code>getItems</code> function.
			</p>

			<pre className="jsx"><code>
				<span style={{color:"lightgreen"}}>
{`
const getItems = useCallback( () => {
  console.log(\`getItems(${number})\`);
  return [number, number + 1, number + 2];
  }, [number]);
`}
				</span>
			</code></pre>


			<div style={theme}>
			<label htmlFor="input"></label>
			<input
				type="number"
				value={number}
				id="input"
				onChange={e => setNumber(parseInt(e.target.value))}
				/>
				<List getItems={getItems} />
				<button onClick={() => setDarkTheme(prevTheme => !prevTheme) }>
					Toggle Theme
				</button>
			</div>
		</>
		);	// end return
	}	// end function




function List( {getItems} )
	{
	const [items, setItems] = useState([]);

	useEffect( () => {
		setItems(getItems);
		console.log("List useEffect setItems");
		}, [getItems]);

	return (
		/* Remember, getItems is a function and needs the brackets after it: */
		items.map(item => <div key={item}>{item}</div>)
		);	// end return
	}	// end function
