
import React, { useEffect } from "react";

import useRenderCount from "./hooks/useRenderCount";
import useToggle from "./hooks/useToggle";
import useSourceCode from "./hooks/useSourceCode";
import PageTitle from "./PageTitle";


export default function HookUseRenderCount()
	{
	const [value, toggleValue] = useToggle(false);
	const renderCount = useRenderCount();

	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		},[])


	return (
		<div className="hooks">
      <PageTitle hookName="useRenderCount" />
			<p>Very simple render counter.</p>
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
				<br />
				Render counter: {renderCount}
			</p>

			<hr />
			<Code />
		</div>
		);	// end return
	}	// end HookUseRenderCount





function Code()
	{
	const code = `
import useRenderCount from "./hooks/useRenderCount";
import useToggle from "./hooks/useToggle";


export default function HookUseRenderCount()
	{
	const [value, toggleValue] = useToggle(false);
	const renderCount = useRenderCount();

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
				<br />
				Render counter: {renderCount}
			</p>
		</div>
		);	// end return
	}	// end HookUseRenderCount



import { useRef, useEffect } from "react";

export default function useRenderCount()
	{
	// NOTE: in strict mode, React will run this twice at load time, in
	// production, consider adjusting initial value:
	const renderCount = useRef(0);

	useEffect( () => {
		renderCount.current++;
		});

	return renderCount.current;
	}
`;
	const output = useSourceCode({code});
	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code
