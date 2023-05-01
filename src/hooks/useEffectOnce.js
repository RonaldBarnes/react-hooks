import { useEffect, useRef } from "react";

// https://www.linkedin.com/pulse/preventing-useeffect-from-running-twice-strict-mode-useref-tingre


export default function useEffectOnce(callback)
	{
	let firstTime = useRef(true);

	// Kyle's solution, but... strict mode runs / renders twice at load time.
	// useEffect(callback, []);

	// Run the callback function only ONCE, but NOT at load
	// (in dev mode / strict, renders occur twice at load):
	useEffect(() => {
		// console.log(`firstTime.current EFFECT: ${firstTime.current}`);
		if (firstTime.current === true)
			{
		console.log(`firstTime.current CALLBACK: ${firstTime.current}`);
					callback();
			// firstTime.current += 1;
			}
		else
			{
			// console.log(`ELSE: ${firstTime.current}`)
			firstTime.current = false;
			}
		// firstTime.current === 1
		// 	? 					console.log(`firstTime.current CALLBACK: ${firstTime.current}`)
			// : firstTime.current += 1
			// : firstTime.current = firstTime.current

		return () => {
			// firstTime.current += 1;
		// console.log(`firstTime.current RETURN: ${firstTime.current}`);
			}
		},
		// Run each time, filter output inside callback:
		// Because we do NOT want to fire on load, but on action:
		[firstTime.current]
		// []
		);
	}	// end function
