import { useEffect, useRef } from "react";

// https://courses.webdevsimplified.com/view/courses/react-hooks-simplified/1327246-custom-hooks/4121581-17-custom-hooks-11-15-usescript-usedeepcompareeffect-useeventlistener-useonscreen-usewindowsi


export default function useEventListener(
	eventType,
	callback,
	element = window
	)
	{
	// console.log(`%cuseEventListener`, "color:lightblue");
	// console.log(`%cuseEventListener element:`, "color:lightblue");
	// console.table(element);
	// console.log(`%cuseEventListener callback: ${callback}`, "color:red");

	const callbackRef = useRef(callback);

	// When our function changes, save for future reference:
	useEffect( () => {
		callbackRef.current = callback;
		}, [callback]
		);

	useEffect( () => {
		// KYLE DID NOT INCLUDE THIS IN THE LESSON, BUT IT IS **REQUIRED**:
		if (element == null) return;

		const handler = e => callbackRef.current(e);
		// Default element is window:
		element.addEventListener(eventType, handler);

		// Cleanup previous listeners:
		return () => element.removeEventListener(eventType, handler);
		}, [eventType, element]
		);
	}	// end function
