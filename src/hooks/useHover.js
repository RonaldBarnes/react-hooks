import { useState } from "react";

import useEventListener from "./useEventListener";


export default function useHover(elementRef)
	{
	const [hovered, setHovered] = useState(false);

	useEventListener("mouseover", () => setHovered(true), elementRef.current);
	useEventListener("mouseout", () => setHovered(false), elementRef.current);

	return hovered;
	}
