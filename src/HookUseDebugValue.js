
import React,
		{
		useDebugValue,
		useState,
		useEffect,
		}
	from "react";



export default function HookUseDebugValue()
	{
	console.log("%cHookUseDebugValue", "color: red");

	const [fName, setFName] = useState("");
//	const [lName, setLName] = useTempComponent("lName", "Ron");
	const [lName, setLName] = useTempComponent("Enter a Last Name");

	useEffect( () => {
		// Focus on first input field:
		document.querySelector("input").focus();
		},[]);


	useEffect( () => {
		// Focus on "Open" button after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			)
		}, [])


	return(
		<div className="hooks">
			<h2>
				Hook <code>useDebugValue</code>
			</h2>
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useDebugValue"
						target="ReactHooks">
						useDebugValue
					</a>
				</h3>
				<code>useDebugValue</code> is a React Hook that lets you add a label
				to a custom Hook in React DevTools.
			</blockquote>
			<p>
				Only useful if you have React DevTools browser add-on installed.
				It's a visual aid in debugging state values, etc.
			</p>
			<p>
				Most common use case is when developing new, custom hooks.
				For example, this includes a custom hook called
				<code>useTempComponent</code>.
			</p>

			<p>
				<label htmlFor="fName">First Name: {" "}</label>
				<input
					type="text"
					value={fName}
					id="fName"
					onChange={(e) => setFName(e.target.value)}
					/>
			</p>
			<p>
				<label htmlFor="lName">Last Name: {" "}</label>
				<input
					type="text"
					value={lName}
					id="lName"
					onChange={(e) => setLName(e.target.value)}
					/>
			</p>

			<h4>The image below shows the Component tab of the dev tools</h4>
			<p>
				<img src="images/Screenshot_useDebugValue.png"
					alt="Hook useDebugValue screenshot"
					className="screenshot"
					/>
			</p>
			<p>
				We can see in the image that HookUseDebugValue has a state item set to
				"Ron".
			</p>
			<p>
				Also, beside the TempComponent is the output of
				<code>useDebugValue</code>, "Enter a Last Name", which is the default
				value passed in to TempComponent as a prop.
			</p>
			<p>
				Then, there's a state element set to "New Name", which is user input.
				The reason "Enter a Last Name" and "New Name" are different is because
				our hook receives a prop <b>once</b> ("Enter a Last Name"), after that
				the state is set via <code>setLName</code>.
			</p>

			<div className="jsx"><code>

{`
import React,
  {
  useDebugValue,
  useState,
  useEffect,
  }
  from "react";

export default function HookUseDebugValue()
  {
  const [fName, setFName] = useState("");`}
<span style={{color:"lightgreen"}}>
{`
  const [lName, setLName] = useTempComponent("Enter a Last Name");
`}
</span>
{`...
    <input
      type="text"
      value={fName}
      name="fName"
      onChange={(e) => setFName(e.target.value)}
      />
    <input
      type="text"
      value={lName}
`}
<span style={{color:"lightgreen"}}>
{`      onChange={(e) => setLName(e.target.value)}
`}
</span>
{`      />
`}
<span style={{color:"lightgreen"}}>
{`
function useTempComponent( lname )
	{
	// Initial load has lname undefined, so get an error about converting
	// controlled to uncontrolled elements, so use "" as default if undefined:
	const [value, setValue] = useState( () => lname || "empty" );

	// React Dev Tools should show an entry beside our custom hook name,
	// no need to drill down by expanding the TempComponent hook:
	// A second argument to useDebugValue passed as a function will cause
	// useDebugValue to ONLY run when dev tools are open:
	useDebugValue(lname, ln => ln);

	return [value,setValue];
	}	// end function
`}
</span>

			</code></div>
		</div>
		);	// end return
	}	// end function




function useTempComponent( lname )
	{
	// Initial load has lname undefined, so get an error about converting
	// controlled to uncontrolled elements, so use "" as default if undefined:
	const [value, setValue] = useState( () => lname || "empty" );

	// React Dev Tools should show an entry beside our custom hook name,
	// no need to drill down by expanding the TempComponent hook:
	// A second argument to useDebugValue passed as a function will cause
	// useDebugValue to ONLY run when dev tools are open:
	useDebugValue(lname, ln => ln);
	// React Dev Tools should show an entry beside our custom hook name,
	// no need to drill down by expanding the TempComponent hook:
//	useDebugValue("RGB");
//	useDebugValue("UID");

	return [value,setValue];
	}	// end function
