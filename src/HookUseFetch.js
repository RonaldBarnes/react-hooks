import React, { useState, useEffect } from 'react';
import useAsync from "./hooks/useAsync";
import PageTitle from "./PageTitle";


export default function HookUseFetch()
	{
	console.log("%cHookUseFetch", "color: red");

	const [id, setId] = useState(1);

	const { loading, error, value } = useFetch(
		`https://jsonplaceholder.typicode.com/todos/${id}`,
		{},
		[id]
		);	// end useFetch

	const JSON_INDENT = 2;


	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		}, []);

	return (
		<div className="hooks">
      <PageTitle hookName="useFetch" />
			<p>
				Basic custom hooks that can be incorporated into a developer's toolkit.
			</p>
			<p>
				This is a simple-ish (as much as Promises can be simple) asyncronous
				helper hook. Uses <code>useAsync</code> hook.
			</p>
			<p>
				This will fetch a single "todo" from an API, with the todo ID equal
				to what user selects.
			</p>

			<input
				type="number"
				value={id}
				onChange={ (e) => setId( id => e.target.value)}
				/>
			{" "}
			<button
				type="button"
				onClick={ () => setId( id => id + 1)}
				autoFocus>
				Increment ID
			</button>
			<p>ID: <span style={{fontSize:"2rem"}}>{id}</span></p>
			<div>Loading: {loading.toString()}</div>
			<div>{JSON.stringify(error, null, JSON_INDENT)}</div>
			<pre>{JSON.stringify(value, null, JSON_INDENT)}</pre>


			<div className="jsx" style={{marginTop:"2rem"}}><code>

				<span style={{color:"lightgreen"}}>
{`
export default function HookUseFetch()
  {
  const { loading, error, value } = useFetch( () => {
`}</span>
<span style={{color:"red"}}>
{`    \`https://jsonplaceholder.typicode.com/todos/${id}\`,
`}</span>
				<span style={{color:"lightgreen"}}>
{`    {},
    [id]
    );  // end useFetch
`}</span>{`
  const JSON_INDENT = 2;
  ...
      <button onClick={ () => setId( id => id + 1)}>
        Increment ID
      </button>
      <p>ID: <span style={{fontSize:"2rem"}}>{id}</span></p>
      <div>Loading: {loading.toString()}</div>
      <div>{JSON.stringify(error, null, JSON_INDENT)}</div>
      <pre>{JSON.stringify(value, null, JSON_INDENT)}</pre>
`}
        <span style={{color:"lightgreen"}}>
{`
function useFetch(url, options = {}, dependencies = [])
  {
  const DEFAULT_OPTIONS = "Header: text/json";

  return useAsync( () => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options})
      .then(res => {
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json))
        })  // end .then
    }, dependencies);  // end useAsync
  }  // end function

`}

				</span>
			</code></div>


		</div>
		);
	}



function useFetch(url, options = {}, dependencies = [])
	{
	console.log(`%cuseFetch`, "color:lightblue");

	const DEFAULT_OPTIONS = "Header: text/json";

	return useAsync( () => {
		return fetch(url, { ...DEFAULT_OPTIONS, ...options})
			.then(res => {
				if (res.ok) return res.json();
				return res.json().then(json => Promise.reject(json))
				})	// end .then
		}, dependencies);	// end useAsync
//	return { loading:"loading", error:"error", value:"value" };
	}
