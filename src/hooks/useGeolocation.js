import { useRef, useState, useEffect } from 'react';

export default function useGeolocation(options, addListener = false)
	{
	console.log(`%cuseGeolocation`, "color:lightblue");

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [data, setData] = useState( {} );

	// watchPosition id:
	const id = useRef();
	// id.current = 1;


// console.log(`%cuseGeolocation OPTIONS:`, "color:lightblue");
useEffect( () => {
	console.log("OPTIONS:");
	console.table(options)}
	, [options]);
	
// console.table(data || {});
// console.log(`%cuseGeolocation addListener: ${addListener}`, "color:lightblue");
console.log(`%cuseGeolocation WATCH ID: ${id.current}`, "color:lightblue");


	useEffect( () => {
		const successHandler = e => {
			setLoading(false);
			setError(false);
// console.log(`%csuccessHandler:`, "color:yellow");
// console.table(e);
			setData(e);
			}
		const errorHandler = e => {
			setData(e);
			setError(e);
			setLoading(false);
			console.table(e);
			}
		navigator.geolocation.getCurrentPosition(
			successHandler,
			errorHandler,
			options
			);

		if (addListener)
			{
			console.log(`%cuseGeolocation addListener: ${addListener}`,
				"color:lightgreen");

			// Disable this, it checks ~once per second
			// (per maxTimeout, now set to 5+ seconds):
			id.current = navigator.geolocation.watchPosition(
				successHandler,
				errorHandler,
				options
				);
console.log(`%cuseGeolocation WATCH ID: ${id.current}`, "color:red");
			}
		// cleanup:
		return () => {
			if (id.current != null)
				{
				navigator.geolocation.clearWatch(id.current);
console.log(`%cuseGeolocation REMOVED WATCH ID: ${id.current}`, "color:red");
				}
			}
		}, [options, addListener]
	);

	return { loading, error, data };
	}	// end function
