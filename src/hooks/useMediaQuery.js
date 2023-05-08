import { useEffect, useState } from "react";

import useEventListener from "./useEventListener";


export default function useMediaQuery(mediaQuery)
	{
	const [isMatch, setIsMatch] = useState(false);
	const [mediaQueryList, setMediaQueryList] = useState(null);

	useEffect( () => {
			const list = window.matchMedia(mediaQuery);
console.log(`useMediaQuery list: ${list}`);
			setMediaQueryList(list);
console.log(`useMediaQuery list.matches: ${list.matches}`);
			setIsMatch(list.matches);
		}, [mediaQuery]);

	console.log(`useMediaQuery mediaQuery: "${mediaQuery}"`);
	console.table(mediaQueryList);
	useEventListener("change", e => setIsMatch(e.matches), mediaQueryList);

	return isMatch;
	}	// end function useMediaQuery
