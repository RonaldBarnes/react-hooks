
import React, { useEffect, useRef } from "react";

import useLongPress from "./hooks/useLongPress";
import useSourceCode from "./hooks/useSourceCode";
import PageTitle from "./PageTitle";


export default function HookUseLongPress()
	{
	const elementRef = useRef();
	const PRESS_TIME_LENGTH = 1500;


  // Scroll to top after a delay:
  useEffect( () => {
    setTimeout( () =>
      window.scrollTo({top:0, behavior:"smooth"}),
      500
      )
    }, [])

	useLongPress(
		elementRef,
		() => alert("Long press from HookUseLongPress"),
		{delay: PRESS_TIME_LENGTH},
		);


	return (
		<div className="hooks">
      <PageTitle hookName="useLongPress" />
			<p>
				Trigger an event if an element has been long-pressed (for {PRESS_TIME_LENGTH}ms).
			</p>
			<p>
				Mostly used in mobile environments.
			</p>
			<hr />

			<p>LongPress on the box to trigger an alert:</p>
			<div
				ref={elementRef}
				style={{
					width:"200px",
					height:"200px",
					margin:"auto",
					border:"2px solid cornflowerblue",
					// backgroundColor: LongPressed ? "green" : "red"
					}}
				>
			</div>

			<hr />
			<Code />
		</div>
		);	// end return
	}	// end HookUseLongPress








function Code()
	{
	const code = `
import useLongPress from "./hooks/useLongPress";


export default function HookUseLongPress()
	{
	const elementRef = useRef();
	const PRESS_TIME_LENGTH = 1500;

	useLongPress(
		elementRef,
		() => alert("Long press from HookUseLongPress"),
		{delay: PRESS_TIME_LENGTH},
		);


	return (
		<div className="hooks">
			<h2>Hook <code>HookUseLongPress</code></h2>
			<p>
				Trigger an event if an element has been long-pressed (for {PRESS_TIME_LENGTH}ms).
			</p>
			<p>
				Mostly used in mobile environments.
			</p>
			<hr />

			<p>LongPress on the box to trigger an alert:</p>
			<div
				ref={elementRef}
				style={{
					width:"200px",
					height:"200px",
					margin:"auto",
					border:"2px solid cornflowerblue",
					// backgroundColor: LongPressed ? "green" : "red"
					}}
				>
			</div>

			<hr />
			<Code />
		</div>
		);	// end return
	}	// end HookUseLongPress





import useEventListener from "./useEventListener";
import useEffectOnce from "./useEffectOnce";

// https://courses.webdevsimplified.com/view/courses/react-hooks-simplified/1327246-custom-hooks/4121589-20-custom-hooks-26-30-useonlinestatus-userendercount-usedebuginformation-usehover-uselongpre


export default function useLongPress(
		ref,
		callback = () => alert("FUCKING DEFAULT CALLBACK"),
		// Dafuq is this notation?
		{ delay = 250 } = {})
	{
	// Kyle uses reset, I used restart, this cost me HOURS of debugging time!
	const { restart, clear } = useTimeout(
		callback,
		delay
		);

// if (typeof ref.current !== "function") return;

	// Clear initial timeout, since it invokes on load and we don't want that one:
	useEffectOnce(clear);

	// Reset timer to zero at beginning of either event:
	useEventListener("mousedown", restart, ref.current);
	useEventListener("touchstart", restart, ref.current);

	// If these events happen before the delay, clear the timer since
	// we only want the callback to run if these happen AFTER the delay:
	useEventListener("mouseup", clear, ref.current);
	useEventListener("mouseleave", clear, ref.current);
	useEventListener("touchend", clear, ref.current);
	}	// end function useLongPress


`;
	const output = useSourceCode({code});
	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code
