
import useEventListener from "./useEventListener";
import useTimeout from "./useTimeout";
import useEffectOnce from "./useEffectOnce";

// https://courses.webdevsimplified.com/view/courses/react-hooks-simplified/1327246-custom-hooks/4121589-20-custom-hooks-26-30-useonlinestatus-userendercount-usedebuginformation-usehover-uselongpre


export default function useLongPress(
		ref,
		callback = () => alert("FUCKING DEFAULT CALLBACK"),
		// Dafuq is this notation?
		{ delay = 250 } = {})
	{
// console.log(`useLongPress ref.current:`)
// console.table(ref);
// console.log(`useLongPress callback: ${callback}`)
// console.log(`useLongPress delay: ${delay}`)

	// Kyle uses reset, I used restart, this cost me HOURS of debugging time!
	// I switched the return from useTimeout to an array instead of object so
	// this won't happen again in the future:
	const [ restart, clear ] = useTimeout(
		callback,
		delay
		);

// if (typeof ref.current !== "function") return;

	// Clear initial timeout, since it invokes on load and we don't want that one:
	useEffectOnce(clear);

	// Reset timer to zero at beginning of either event:
	useEventListener("mousedown", restart, ref.current);
	useEventListener("touchstart", restart, ref.current);

	// If these events happen before the delay, clear the timer since
	// we only want the callback to run if these happen AFTER the delay:
	useEventListener("mouseup", clear, ref.current);
	useEventListener("mouseleave", clear, ref.current);
	useEventListener("touchend", clear, ref.current);
	}	// end function useLongPress
