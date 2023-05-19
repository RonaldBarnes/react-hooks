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
