
import { useRef, useEffect, useCallback } from "react";

export default function useTimeout(callback, delay)
	{
	// A new function is passed each render, useRef allows function persistance
	const callbackRef = useRef(callback);
	const timeoutRef = useRef();

	// Initialize
	useEffect( () => {
		// console.log(`INITIALIZE callbackRef.current: ${callbackRef.current}`);
		// Update our ref to new function each re-render:
		callbackRef.current = callback;
		}, [callback]);

	// 
	const set = useCallback( () => {
		// console.log(`SET callbackRef.current: ${callbackRef.current} delay: ${delay}`);
		timeoutRef.current = setTimeout( () => callbackRef.current(), delay)
		}, [delay]);

	const clear = useCallback( () => {
		// console.log(`CLEAR timeoutRef.current: ${timeoutRef.current}`);
		timeoutRef.current && clearTimeout(timeoutRef.current);
		}, []);

	// At start-up, not each timer tick:
	useEffect( () => {
		console.log(`ANY ... delay: ${delay}`);
		set()
		return clear
		}, [delay, set, clear]
		);

	const restart = useCallback( () => {
		clear();
		set();
		}, [clear, set]
		);

	// I spend HOURS trying to debug an issue where I used "reset" instead of "restart"
	// to capture the return vars.
	// Switching to array method to avoid in future:
	// return { restart, clear }
	return [ restart, clear ];
	}	// end function useTimeout
