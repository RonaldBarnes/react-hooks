import React, { useState, useContext } from "react";

import useSourceCode from "./hooks/useSourceCode";

import Level2 from "./Level2";

export const CounterContext = React.createContext();


export default function Level0()
	{
	const [count,setCount] = useState(0);

	return(
		<>
			<hr />
			<h4>Level 0</h4>
			<p>
				In level 0 of nested children, we use <code>setState</code> to create
				a counter. The counter can be modified via nested child components
				by wrapping a call to the first child in a <code>context.Provider</code>.
			</p>
			<h4>{count}</h4>
			<hr />

			<CounterContext.Provider value={setCount}>
				<Level1 />
			</CounterContext.Provider>
		</>
		);
	}



function Level1()
	{
	const setCount = useContext(CounterContext);

	return (
		<>
			<h4>Level 1</h4>
			<button type="button"
				onClick={() => setCount( curr => curr - 1)}
				>
				-1
			</button>
			{" "}
			<button type="button"
				onClick={() => setCount( curr => curr + 1)}
				>
				+1
			</button>
			<Level2 />

			<Code />
		</>
		);
	}




function Code()
	{
	const code = `
import Level2 from "./Level2";

export const CounterContext = React.createContext();


export default function Level0()
	{
	const [count,setCount] = useState(0);

	return(
		<>
			<hr />
			<h4>Level 0</h4>
			<p>
				In level 0 of nested children, we use <code>setState</code> to create
				a counter. The counter can be modified via nested child components
				by wrapping a call to the first child in a <code>context.Provider</code>.
			</p>
			<h4>{count}</h4>
			<hr />

			<CounterContext.Provider value={setCount}>
				<Level1 />
			</CounterContext.Provider>
		</>
		);
	}



function Level1()
	{
	const setCount = useContext(CounterContext);

	return (
		<>
			<h4>Level 1</h4>
			<button type="button"
				onClick={() => setCount( curr => curr - 1)}
				>
				-1
			</button>
			{" "}
			<button type="button"
				onClick={() => setCount( curr => curr + 1)}
				>
				+1
			</button>
			<Level2 />
		</>
		);
	}



import React, { useContext } from "react";

import { CounterContext } from "./Level1";


export default function Level2()
	{
	const setCount = useContext(CounterContext);

	return (
		<>
			<h4>Level 2</h4>
			<button type="button"
				onClick={() => setCount( curr => curr - 1)}
				>
				-1
			</button>
			{" "}
			<button type="button"
				onClick={() => setCount( curr => curr + 1)}
				>
				+1
			</button>
		</>
		);
	}

`;

	const output = useSourceCode( {code});

	return (
		<div className="formattedCode">
			{output}
		</div>
		);
	}	// end Code
