import React, { useEffect } from 'react';

import useToggle from "./hooks/useToggle";
import useSourceCode from "./hooks/useSourceCode";

export default function HookUseToggle({language, t})
	{
	console.log("%cHookUseToggle", "color: yellow");

	const [value,toggleValue] = useToggle(false);
	const [checked1,toggleChecked1] = useToggle(false);

	// Scroll to top after a delay for autoFocus:
	useEffect( () => {
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			)}
		,[])


	return (
		<div className="hooks">
			<h2>Hook <code>useToggle</code></h2>
			<p>
				Once the <code>useToggle</code> hook has been setup, we can re-use
				it with ease by simply creating another call to it.
			</p>
			<hr />

			<p>
				Use the buttons below to affect this value: {" "}
				<span style={{fontWeight:"bold", fontSize:"2rem", fontVariantCaps:"small-caps"}}>
					{value.toString()} {" "}
					{language !== "en" && t(value.toString())}
				</span>
			</p>
			<p>
				<button
					type="button"
					onClick={toggleValue}
					autoFocus
					>
					{t("Toggle")}
				</button>
				<button
					type="button"
					onClick={() => toggleValue(true)}
					>
					{t("True")}
				</button>
				<button
					type="button"
					onClick={() => toggleValue(false)}
					>
					{t("False")}
				</button>
			</p>

			<p>
				<input
					type="checkbox"
					name="box1"
					checked={checked1}
					onChange={() => toggleChecked1(!checked1)}
					/>
				<br />
				<button
					type="button"
					onClick={toggleChecked1}
					>
					Toggle Check
				</button>
				<button
					type="button"
					onClick={() => toggleChecked1(true)}
					>
					Check
				</button>
				<button
					type="button"
					onClick={() => toggleChecked1(false)}
					>
					unCheck
				</button>
			</p>

			<Code />
		</div>
		);	// end return
	}	// end HookUseToggle




function Code()
	{
	const code = `
import useToggle from "./hooks/useToggle";

export default function HookUseToggle()
	{
	const [value,toggleValue] = useToggle(false);
	const [checked1,toggleChecked1] = useToggle(false);

	return (
		<div className="hooks">
			<p>
				Use the buttons below to affect this value: {" "}
				<span style={{fontWeight:"bold", fontSize:"2rem", fontVariantCaps:"small-caps"}}>
					{value.toString()}
				</span>
			</p>
			<p>
				<button type="button" onClick={toggleValue}>Toggle</button>
				<button type="button" onClick={() => toggleValue(true)}>True</button>
				<button type="button" onClick={() => toggleValue(false)}>False</button>
			</p>

			<p>
				<input
					type="checkbox"
					name="box1"
					checked={checked1}
					onChange={() => toggleChecked1(!checked1)}
					/>
				<br />
				<button
					type="button"
					onClick={toggleChecked1}
					>
					Toggle Check
				</button>
				<button
					type="button"
					onClick={() => toggleChecked1(true)}
					>
					Check
				</button>
				<button
					type="button"
					onClick={() => toggleChecked1(false)}
					>
					unCheck
				</button>
			</p>
		</div>
		); // end return
	}	// end HookUseToggle




// useToggle.js

import { useState } from 'react';

export default function useToggle(initialValue)
	{
	const [value,setValue] = useState(initialValue);

	function toggleValue(value)
		{
		setValue(currentValue =>
			// Check for boolean, if so, use it, else NOT (invert) current value:
			typeof value === "boolean" ? value : !currentValue
			);
		}

	return [value,toggleValue];
	}	// end useToggle

`;

	const output = useSourceCode({code});

	return (
		<>
			{output}
		</>
		);	// end return
	}	// end Code
