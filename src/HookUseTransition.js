
import React,
		{
		useEffect,
		useTransition,
		useState
		}
	from "react";

import { Link, Outlet } from "react-router-dom";
// import HookUseTransition2 from "./HookUseTransition2";
import PageTitle from "./PageTitle";


export default function HookUseTransition()
	{
	// focus input field upon load:
	// Use autoFocus instead
	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			)
		}, [])


	return (
		<div className="hooks">
      <PageTitle hookName="useTransition" />
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useTransition"
						target="ReactHooks"
						>
						useTransition
					</a>
				</h3>
				<p>
					<code>useTransition</code> is a React Hook that lets you update the
					state without blocking the UI.
				</p>
			</blockquote>
			<p>
				A hook for allowing higher priority components to update while
				lower priority components are preparing to render. Used when setting
				state. See <code>useDeferredValue</code> when props instigate a
				delayed re-render.
			</p>
			<p>
				First, I tried to implement {" "}
				<Link to="/useTransition/">
					my version
				</Link>
				{" "} of Kyle's course material. No success.
			</p>
			<p>
				Also, tried to implement {" "}
				<Link to="/useTransition/WebDev">
					Kyle's example
				</Link>
				{" "} from his blog to figure out
				why my version isn't working. No success; completely baffled.
			</p>
			<h4>Resolved</h4>
			<p>
				I built the react app using <code>npm create-react-app</code>, and
				it uses old-style code to bind the App to the <code>root</code>
				HTML element:
			</p>
			<pre className="jsx"><code style={{color:"red"}}>
{`ReactDOM.render(
  <App />,
  document.getElementById('root')
);`}
			</code></pre>
			<p>
				When I changed it to the current style (as used by
				<code>yarn create react-app</code>), then my
				<code>useTransition</code> worked across all instances!
				The new, proper method to bind App to <code>root</code>:
			</p>
			<pre className="jsx"><code style={{color:"lightgreen"}}>
{`const root = ReactDOM.createRoot(
  document.getElementById('root')
  );
root.render(<App />);`}
			</code></pre>

			<p>
				The input entry fields below have different behaviours.
				Without transition, each keystroke entered into the input field
				has to wait for the 10,000 element div to be rendered before it can
				be rendered.
			</p>
			<p>
				When using transtion, the input field on the right is much more
				responsive to user input - the long list is deferred until there's
				a gap in the typing.
			</p>
			<div style={{display:"flex", flexDirection:"row", gap:"4rem" }}>
				<ListNoTransition />
				<ListWithTransition />
			<Outlet />
			</div>
		</div>
		);	// end return
	}	// end function component



function ListNoTransition()
	{
	const [name, setName] = useState("")
	const [list, setList] = useState([])

	function handleChange(e)
		{
		setName(e.target.value)
		// console.log(`name1: ${e.target.value}`);
		let tmpList = []
		for (let i = 0; i < 5000; i++)
			{
			tmpList.push(e.target.value)
			}
		setList(tmpList)
		}

	return (
		<div>
			<p>
				<label htmlFor="name">Type some text quickly:</label>
			</p>
			<p>
				<input
					type="text"
					name="name"
					id="name"
					value={name}
					onChange={ e => handleChange(e)}
					autoFocus
					/>
			</p>
			<h4>Large list WITHOUT transition:</h4>
			<div
				style={{
					maxHeight:"300px",
					overflow:"scroll",
					}}
				>
				{list.slice(0).map( (item,index) => {
					return <div key={index}>{index.toLocaleString()}: {item}</div>
					}
					)}
			</div>
		</div>
		);	// end return
	}	// end function






function ListWithTransition()
	{
	const [name2, setName2] = useState("")
	const [list2, setList2] = useState([])

	const [isPending, startTransition] = useTransition()

	function handleChange2(e)
		{
		setName2(e.target.value)
//	console.log(`name2: ${e.target.value}`);
		startTransition( () => {
			let tmpList = []
			for (let i = 0; i < 5000; i++)
				{
				tmpList.push(e.target.value)
				}
//	console.table(tmpList.slice(0,1))
			setList2(tmpList)
			});	// end startTransition
		}

	return (
		<div>
			<p>
				<label htmlFor="name2">Type some text quickly:</label>
			</p>
			<p>
				<input
					type="text"
					name="name2"
					id="name2"
					value={name2}
					onChange={handleChange2}
					/>
			</p>
			<h4>Large list WITH transition:</h4>
			<div
				style={{
					maxHeight:"300px",
					overflow:"scroll",
					}}
				>
				{isPending
					? <div>Loading...</div>
					: list2.slice(0).map( (item,index) => {
					return (
						<div
							key={index}
							>
							{index.toLocaleString()}: {item}
						</div>
						)
					})
					}
			</div>
		</div>
		);	// end return
	}	// end function
