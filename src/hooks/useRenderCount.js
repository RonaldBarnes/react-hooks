import { useRef, useEffect } from "react";

export default function useRenderCount()
	{
	// NOTE: in strict mode, React will run this twice at load time, in
	// production, consider adjusting initial value:
	const renderCount = useRef(1);

	useEffect( () => {
		renderCount.current++;
		});

	// console.log(`useRenderCount: renderCount.current = "${renderCount.current}"`)

	return renderCount.current;
	}