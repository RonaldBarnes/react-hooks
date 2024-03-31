
import React, { useEffect, useCallback, useState } from "react";

import useLongPress from "./hooks/useLongPress";
import useSourceCode from "./hooks/useSourceCode";
import PageTitle from "./PageTitle";


export default function HookUseLongPress()
	{
  const [domNode, setDomNode] = useState(null);
  // Jamal's trick of using a `callback ref` - pass a function to
  // ref= in JSX below, instead of a ref object.
  // This fixes navigating away from page, back again, and getting listener
  // bound to `window` instead of desired DOM node:
  const elementRef = useCallback( node => {
    setDomNode( prev => node);
    });
	const PRESS_TIME_LENGTH = 1500;


  // Scroll to top after a delay:
  useEffect( () => {
    setTimeout( () =>
      window.scrollTo({top:0, behavior:"smooth"}),
      500
      )
    }, [])

	useLongPress(
    domNode,  //    elementRef,
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
import React, { useEffect, useCallback, useState } from "react";
import useLongPress from "./hooks/useLongPress";

import useSourceCode from "./hooks/useSourceCode";
import PageTitle from "./PageTitle";


export default function HookUseLongPress()
	{
  const [domNode, setDomNode] = useState(null);
  // Jamal's trick of using a \`callback ref\` - pass a function to
  // ref= in JSX below, instead of a ref object.
  // This fixes navigating away from page, back again, and getting listener
  // bound to \`window\` instead of desired DOM node:
  const elementRef = useCallback( node => {
    setDomNode( prev => node);
    });
	const PRESS_TIME_LENGTH = 1500;

	useLongPress(
    domNode,  // elementRef,
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



/**
 * useLongPress.js
 */

import useEventListener from "./useEventListener";
import useTimeout from "./useTimeout";
import useEffectOnce from "./useEffectOnce";

// https://courses.webdevsimplified.com/view/courses/react-hooks-simplified/1327246-custom-hooks/4121589-20-custom-hooks-26-30-useonlinestatus-userendercount-usedebuginformation-usehover-uselongpre


export default function useLongPress(
		ref,
    callback = () => alert("DEFAULT CALLBACK - should not execute"),
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
  useEventListener("mousedown", restart, ref);
  useEventListener("touchstart", restart, ref);

	// If these events happen before the delay, clear the timer since
	// we only want the callback to run if these happen AFTER the delay:
  useEventListener("mouseup", clear, ref);
  useEventListener("mouseleave", clear, ref);
  useEventListener("touchend", clear, ref);
	}	// end function useLongPress


`;
	const output = useSourceCode({code});
	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code
