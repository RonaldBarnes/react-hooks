import { useRef } from "react";

import useEventListener from "./useEventListener";



// My solution was to add the fix inside the hook.
//
// Will require further testing, but works for this lesson.

export default function useClickOutside(ref, callback)
	{
	// Opens then closes immediately due to dev mode?
	// This fixes it:
	let justOpened = useRef(true);

	useEventListener("click",
		e => {
			if (ref.current == null
					|| ref.current.contains(e.target)
					|| justOpened
					)
				{
				justOpened = false;
				return;
				}
			callback(e)
			},
		document
		);

	}	// end function