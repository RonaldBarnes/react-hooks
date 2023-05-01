
import { useEffect, useState } from "react";


export default function useOnScreen(
		ref,
		options = { rootMargin: "-100px" }
		)
	{
	console.log(`%cuseOnScreen`, "color:lightblue");

	const [isVisible, setIsVisible] = useState(false);

	// When visible:
	useEffect( () => {
		if (ref.current == null) return;
		console.log("useOnScreen ref.current: " + ref.current + " VISIBLE!");

		const observer = new IntersectionObserver(
			// Callback for when visible (considering options): setIsVisible()
			([entry]) => setIsVisible(entry.isIntersecting),
			// Visibility threshold or CSS-style margins:
			//	{ rootMargin }
			options
			);	// end observer


		// Observe the second <h2> header (in this case):
		observer.observe(ref.current);

		// Cleanup callback:
		return () => {
			if (ref.current == null) return;
			observer.unobserve(ref.current)
			}
		//	}, [ref.current, rootMargin]
		}, [ref.current, options]
		);	// end useEffect

	return isVisible;
	}	// end function useOnScreen
