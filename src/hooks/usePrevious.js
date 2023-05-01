
import { useRef } from "react";


export default function usePrevious(value)
	{
	const currentRef = useRef(value);
	const previousRef = useRef();

	// If new value passed, save "current" value to
	// "previous" value and update "current" value:
	if (currentRef.current !== value)
		{
		previousRef.current = currentRef.current;
		currentRef.current = value;
		}

	return previousRef.current;
	}	// end function usePrevious
