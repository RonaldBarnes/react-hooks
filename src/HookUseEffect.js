
import React, { useState, useEffect } from 'react';
import PageTitle from "./PageTitle";


export default function HookUseEffect()
	{
	console.log("%cHookUseEffect", "color: red");
	const URL = "https://jsonplaceholder.typicode.com";

	const [resourceType, setResourceType] = useState("users");
	// JSON items retrieved from an API as sample users, posts, and comments:
	const [items, setItems] = useState([]);

	const date = new Date()
	const dateString = "00".concat(date.getHours().toString()).slice(-2)
		+ ":"
		+ "00".concat(date.getMinutes().toString()).slice(-2)
		+ ":"
		+ "00".concat(date.getSeconds().toString()).slice(-2)

	useEffect( () => {
		console.log(`ResourceType changed: ${resourceType}`);
		fetch(`${URL}/${resourceType}`)
			.then(response => response.json() )
			.then(json => setItems(json) )
			.catch(err => {
				setItems([
					{id: "ERROR:", name: err.message},
					{id: "URL", name: `${URL}/${resourceType}`}
					]);
				console.error(`ERROR: ${err.message}`)
				}) // end catch
		return () => {
			console.log("useEffect return function: like unmounting component "
				+ "and listeners")
			}
		}, [resourceType]);

  // Scroll to top after a delay:
  useEffect( () => {
    setTimeout( () =>
      window.scrollTo({top:0, behavior:"smooth"}),
      500
      )
    }, [])


	return(
		<div className="hooks">
      <PageTitle hookName="useEffect" />
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useEffect"
						target="ReactHooks">
						useEffect
					</a>
				</h3>
				useEffect is a React Hook that lets you synchronize a component
				with an external system.
			</blockquote>
			<p>
				Kyle at Web Dev Simplified has a course on React hooks.
				The course material for this hook is on his YouTube channel at
				<a href="https://www.youtube.com/watch?v=0ZJgIjIuY7U"
					target="ReactHooks"
					>
					<code>useEffect</code>
				</a>.
			</p>
			<p>
				A hook that is triggered only when some defined item's value changes.
				{" "}
				<a href="https://react.dev/learn/you-might-not-need-an-effect"
					target="ReactHooks"
					>
						You might not need an effect...
				</a>
			</p>
			<blockquote>
		    Tip:
		    If you’re familiar with React class lifecycle methods, you can think
				of useEffect Hook as <code>componentDidMount</code>,
				<code>componentDidUpdate</code>, and
				<code>componentWillUnmount</code> combined.
			</blockquote>
			<p>
				An alternate method of dealing with life cycle concepts, by passing
				an empty array as the second argument to <code>useEffect()</code>,
				the function passed as the first argument will only be run when
				the component  mounts.
			</p>
			<p>
				Also, improves performance due to easily invoking resources {" "}
				<b>only</b> when needed. i.e. a user request for resources is clicked
				sequentially, but only triggers a single fetch.
			</p>
			<p>
				Below are buttons for 3 resources: users, posts, and comments.
				Repeated clicking on same button will not update the timestamp,
				nor trigger a <code>fetch</code>
				because <code>resourceType</code> doesn't change.
			</p>

			<div className="counter">
				<button
					type="button"
					onClick={() => setResourceType("users")}
					autoFocus
					>Users
				</button>
				<button
					type="button"
					onClick={() => setResourceType("posts")}
					>
					Posts
				</button>
				<button
					type="button"
					onClick={() => setResourceType("comments")}
					>Comments
				</button>
			</div>
			<p>
				Watch the timestamp for an indication that a <code>fetch</code> has
				been triggered:
			</p>
			<h4>{dateString} {resourceType}</h4>
			<div>{items.map( item =>
					<pre key={item.id}>{item.id}  {JSON.stringify(item.name || item.title)}</pre>
				)}
			</div>

			<pre className="jsx"><code>
<span style={{color:"lightgreen"}}>{`
const [resourceType, setResourceType] = useState("users");
useEffect( () => {`}
</span>
{`
  // Lengthy fetch (potentially), only run when DIFFERENT button clicked:
  fetch(\`https://jsonplaceholder.typicode.com/${resourceType}\`)
    .then(response => response.json() )
    .then(json => setItems(json) )
    .catch(err => {
       setItems([
         {id: "ERROR:", name: err.message},
         {id: "URL", name: \`${URL}/${resourceType}\`}
         ]);
       console.error(\`ERROR: \${err.message}\`)
       }) // end catch
  console.log(\`ResourceType changed: ${resourceType}\`);
`}<span style={{color:"lightgreen"}}>{`
  // Return function to cleanup listeners, unmount component,...
  return () => {
    console.log("useEffect return function: like unmounting component "
      + "and listeners")
      }
  // Set resourceType as the variable invoking this hook:
  }, [resourceType]);`}</span>
		</code></pre>
		</div>
		);
	}
