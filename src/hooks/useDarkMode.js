import { useEffect, useCallback } from "react";

// import { useLocalStorage } from "./useLocalStorage";
import { useStorage } from "./useStorage";
import useMediaQuery from "./useMediaQuery";


export default function useDarkMode(defaultValue)
	{
// console.log(`useDarkMode defaultValue ${defaultValue}`);

	const [darkTheme, setDarkTheme] = useStorage("useDarkMode", defaultValue, localStorage);
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const enabled = typeof(darkTheme) !== "undefined"
		? darkTheme
		: prefersDarkMode

	useEffect( () => {
		document.body.classList.toggle("darkModeTheme", enabled)
		}, [enabled]
		);

	// Allow for removal of localStorage key:
	const removeTheme = useCallback( () => {
		localStorage.removeItem("useDarkMode");
		// setDarkTheme(useDarkMode);
		});

// 	// If storage changes, see if theme preference has been modified outside
// 	// normal scope:
// window.addEventListener("storage", updatedStorage)
// function updatedStorage(event)
// 	{
// // console.table({storage: "STORAGE!", ...event} );
// console.table( event );
// 		if (event.key === "useDarkMode")
// 			{
// window.removeEventListener("storage", updatedStorage)
// 			setDarkTheme( () => !enabled);
// window.addEventListener("storage", updatedStorage)
// 			}
// 	};

	// useEventListener("storage", (event) => {
	// 	if (event.key === "useDarkMode")
	// 		{
	// 		setDarkTheme( () => !darkTheme);
	// 		}
	// 	})

	return [enabled, setDarkTheme, removeTheme]
	}	// end function useDarkMode
