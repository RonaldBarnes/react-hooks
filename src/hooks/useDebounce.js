
import { useEffect } from "react";

import useTimeout from "./useTimeout";

export default function useDebounce(
	callback,
	delay,
	dependencies
	)
	{
// console.log(`%cuseDEBOUNCE`, "color:lightblue");

	const [restart, clear] = useTimeout(callback, delay);

	useEffect(restart, [...dependencies, restart]);
	// At page load, clear any timer(s):
	useEffect(clear, []);
	}
