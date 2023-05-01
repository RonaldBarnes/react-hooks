
import { useRef, useCallback, useState } from "react";


export default function useStateWithHistory(defaultValue, { size = 10 } = {})
	{
	const [value, setValue] = useState(defaultValue);
	const historyRef = useRef([defaultValue]);
	const pointerRef = useRef(0);

	// const {
	// 	language,
	// 	setLanguage,
	// 	// eslint-disable-next-line
	// 	fallbackLanguage,
	// 	// eslint-disable-next-line
	// 	setFallbackLanguage,
	// 	t,
	// 	flags
	// 	} = useTranslation();

	// Use set() as the hook's setter function:
	const set = useCallback(
		val => {
			// If initialized with function format, eval it, else get scalar value:
			const resolvedVal = typeof val === "function" ? val(value) : val;
			// Check if current pos in history has value different than parameter:
			if (historyRef.current[pointerRef.current] !== resolvedVal)
				{
				// Are we mid-way through history?
				if (pointerRef.current < historyRef.current.length - 1)
					{
					// Remove rest of history, we've gone back and made changes:
					historyRef.current.splice(pointerRef.current + 1);
					}
				// Now we can add new item to end of history:
				historyRef.current.push(resolvedVal);
				pointerRef.current = historyRef.current.length - 1;
				}
			setValue(val);
			}, [size, value])	// end set()


	// Move back one position in history:
	const back = useCallback( () => {
		if (pointerRef.current <= 0) return;
		pointerRef.current--;
		setValue( historyRef.current[pointerRef.current] );
		});


	// Move forward one position in history, but not past end of array:
	const forward = useCallback( () => {
		if (pointerRef.current >= historyRef.current.length - 1) return;
		pointerRef.current++;
		setValue( historyRef.current[pointerRef.current]);
		});


	// Move to specific position in history:
	const goto = useCallback( pos => {
		// Do not go outside bounds of history array:
		if (pos < 0 || pos > historyRef.current.length) return;
		pointerRef.current = pos;
		setValue( historyRef.current[pointerRef.current]);
		});


	return [value, set,
			{
			history: historyRef.current,
			pointer: pointerRef.current,
			back,
			forward,
			goto }];

	}	// end function useStateWithHistory
