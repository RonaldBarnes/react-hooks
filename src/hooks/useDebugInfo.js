import { useRef, useEffect } from "react";

import useRenderCount from "./useRenderCount";


export default function useDebugInfo(componentName, props)
	{
	const count = useRenderCount();
	const changedProps = useRef({});
	const previousProps = useRef(props);
	const lastRenderTimestamp = useRef(Date.now());

	// Get all current props plus previous props for "diff":
	const propKeys = Object.keys({...props, ...previousProps});
	changedProps.current = propKeys.reduce( (obj,key) => {
		// Return obj if nothing has changed for this key:
		if (props[key] === previousProps.current[key]) return obj;

		// Something's changed, so... return object plus the key containing old & new values:
		return {
			...obj,
			[key]: { previous: previousProps.current[key], current: props[key]},
			}
		// end reducer, acc of empty obj:
		}, {});


	// Our debugging info to return:
	const info = {
		renderCount: count,
		changedProps: changedProps.current,
		timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
		lastRenderTimestamp: lastRenderTimestamp.current,
		};


	// Update stats for next time:
	useEffect( () => {
		previousProps.current = props;
		lastRenderTimestamp.current = Date.now();
		console.log("[useDebugInfo]", componentName, info);
		});


	return info;
	}
