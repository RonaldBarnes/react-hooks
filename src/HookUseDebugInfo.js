
import React, { useState, useEffect } from "react";

import useDebugInfo from "./hooks/useDebugInfo";
import useToggle from "./hooks/useToggle";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseDebugInfo()
	{
	const [value, toggleValue] = useToggle(false);
	const [count, setCount] = useState(0);

	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		},[])


	return (
		<div className="hooks">
			<h2>Hook <code>HookUseDebugInfo</code></h2>
			<p>This hook provides a ton of debugging info during development.</p>
			<p>
				Likely the console log is where one would look at the info
				(and it is there), but for demo purposes, it's inside the page too.
			</p>
			<hr />

			<p className="counter">
				{value.toString()} {" "}
				<br />
				<button
					type="button"
					onClick={toggleValue}
					autoFocus
					>
					Toggle Value
				</button>
				{" "}
				<br />

				{count}
				<br />
				<button
					type="button"
					onClick={() => setCount( curr => curr + 1)}
					>
					Increment Counter
				</button>
			</p>
			<br />

				<ChildComponent boolean={value} count={count} />

			<hr />
			<Code />
		</div>
		);	// end return
	}	// end HookUseDebugInfo



function ChildComponent(props)
	{
	const info = useDebugInfo("ChildComponent", props);

	return (
		<>
			<h3>Debug Info</h3>
			<div style={{fontFamily:"monospace", whiteSpace:"pre"}}>
				<div>{props.boolean.toString()}</div>
				<div>{props.count}</div>
				<div style={{whiteSpace:"pre"}}>{JSON.stringify(info, null, 2)}</div>
			</div>
		</>
		);	// end return
	}	// end ChildComponent







function Code()
	{
	const code = `
import React, { useState } from "react";

import useDebugInfo from "./hooks/useDebugInfo";
import useToggle from "./hooks/useToggle";


export default function HookUseDebugInfo()
	{
	const [value, toggleValue] = useToggle(false);
	const [count, setCount] = useState(0);

	return (
		<div className="hooks">
			<p className="counter">
				{value.toString()} {" "}
				<br />
				<button
					type="button"
					onClick={toggleValue}
					autoFocus
					>
					Toggle Value
				</button>
				{" "}
				<br />

				{count}
				<br />
				<button
					type="button"
					onClick={() => setCount( curr => curr + 1)}
					>
					Increment Counter
				</button>
			</p>
			<br />

				<ChildComponent boolean={value} count={count} />

			<hr />
			<Code />
		</div>
		);	// end return
	}	// end HookUseDebugInfo




function ChildComponent(props)
	{
	const info = useDebugInfo("ChildComponent", props);

	return (
		<>
			<h3>Debug Info</h3>
			<div style={{fontFamily:"monospace", whiteSpace:"pre"}}>
				<div>{props.boolean.toString()}</div>
				<div>{props.count}</div>
				<div style={{whiteSpace:"pre"}}>{JSON.stringify(info, null, 2)}</div>
			</div>
		</>
		);	// end return
	}	// end ChildComponent




import { useRef, useEffect } from "react";

import useDebugInfo from "./useDebugInfo";


export default function useDebugInfo(componentName, props)
	{
	const count = useDebugInfo();
	const changedProps = useRef({});
	const previousProps = useRef(props);
	const lastRenderTimestamp = useRef(Date.now());

	// Get all current props plus previous props for "diff":
	const propKeys = Object.keys({...props, ...previousProps});
	changedProps.current = propKeys.reduce( (obj,key) => {
		// Return obj if nothing has changed for this key:
		if (props[key] === previousProps.current[key]) return obj;

		// Something's changed, so... return object plus the key containing old & new values:
		return {
			...obj,
			[key]: { previous: previousProps.current[key], current: props[key]},
			}
		// end reducer, acc of empty obj:
		}, {});

	// Our debugging info to return:
	const info = {
		DebugInfo: count,
		changedProps: changedProps.current,
		timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
		lastRenderTimestamp: lastRenderTimestamp.current,
		};

	// Update stats for next time:
	useEffect( () => {
		previousProps.current = props;
		lastRenderTimestamp.current = Date.now();
		console.log("[useDebugInfo", componentName, info);
		});


	return info;
	}

`;
	const output = useSourceCode({code});
	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code
