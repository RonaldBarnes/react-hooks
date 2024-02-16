import { useEffect, useCallback } from "react";

import { useStorage } from "./useStorage";
import useMediaQuery from "./useMediaQuery";


export default function useDarkMode()
	{
  // console.log(`useDarkMode.js()`);

  // useMediaQuery adds a listener so changes (i.e. sunrise / sunset)
  // can invoke change to theme:
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const DEFAULT_THEME_DARK =
    !window.matchMedia("(prefers-color-scheme: light)").matches
    ;

/**
 * This is messeded up: initial return from useMediaQuery() is false, BUT
 * directly using matchMedia() for same term is true
 *
  console.log("useDarkMode.js: prefersDarkMode:", prefersDarkMode,
    ""(prefers-color-scheme: dark)":",
    matchMedia("(prefers-color-scheme: dark)").matches
    );
*/

  const [useDarkTheme, setUseDarkTheme] = useStorage(
    "useDarkMode",
    prefersDarkMode,
    localStorage
    );

  // Capture change to useDarkTheme, triggered by
  // user pressing button to change theme:
  useEffect( () => {
    console.log(`useDarkMode.js: useEffect(): useDarkTheme changed:`, useDarkTheme);
    if (useDarkTheme)
      {
      document.body.classList.add("darkModeTheme");
      document.body.classList.remove("lightModeTheme");
      }
    else
      {
      document.body.classList.add("lightModeTheme");
      document.body.classList.remove("darkModeTheme");
      }
    }, [useDarkTheme]
    );	// end useEffect()[useDarkTheme]


  // Capture change to prefersDarkMode, triggered by
  // event listener on prefers-color-scheme (i.e. sunrise / sunset, etc.)
  useEffect( () => {
    console.log(`useDarkMode.js: useEffect(): prefersDarkMode changed:`,
      prefersDarkMode);
    if (prefersDarkMode)
      {
      document.body.classList.add("darkModeTheme");
      document.body.classList.remove("lightModeTheme");
      }
    else
      {
      document.body.classList.add("lightModeTheme");
      document.body.classList.remove("darkModeTheme");
      }

    // Ensure change is passed to state and therefore re-renders new colours:
    setUseDarkTheme( curr => prefersDarkMode);
    }, [prefersDarkMode]
    );	// end useEffect()[prefersDarkMode]


	// Allow for removal of localStorage key:
	const removeTheme = useCallback( () => {
		localStorage.removeItem("useDarkMode");
    // Should we RESET theme as well as removing from localStorage?
    // For now, it's part of onClick on button
    // "Clear Theme Storage & Reset to Default" in HookUseDarkMode.js
    // setUseDarkTheme(defaultDarkTheme);
		});

  // Return object instead of array: order doesn't matter:
  // return [enabled, setUseDarkTheme, removeTheme]
  return {
    useDarkTheme,
    setUseDarkTheme,
    removeTheme,
    DEFAULT_THEME_DARK
    }
	}	// end function useDarkMode
