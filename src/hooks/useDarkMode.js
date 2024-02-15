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

  const [darkTheme, setDarkTheme] = useStorage(
    "useDarkMode",
    prefersDarkMode,
    localStorage
    );

  // Capture change to darkTheme, triggered by
  // user pressing button to change theme:
  useEffect( () => {
    console.log(`useDarkMode.js: useEffect(): darkTheme changed:`, darkTheme);
    if (darkTheme)
      {
      document.body.classList.add("darkModeTheme");
      document.body.classList.remove("lightModeTheme");
      }
    else
      {
      document.body.classList.add("lightModeTheme");
      document.body.classList.remove("darkModeTheme");
      }
    }, [darkTheme]
    );	// end useEffect()[darkTheme]


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
    setDarkTheme( curr => prefersDarkMode);
    }, [prefersDarkMode]
    );	// end useEffect()[prefersDarkMode]


	// Allow for removal of localStorage key:
	const removeTheme = useCallback( () => {
		localStorage.removeItem("useDarkMode");
    // Should we RESET theme as well as removing from localStorage?
    // For now, it's part of onClick on button
    // "Clear Theme Storage & Reset to Default" in HookUseDarkMode.js
    // setDarkTheme(defaultDarkTheme);
		});

  // Return object instead of array: order doesn't matter:
  // return [enabled, setDarkTheme, removeTheme]
  return {
    darkMode: darkTheme,
    setDarkTheme,
    removeTheme,
    DEFAULT_THEME_DARK
    }
	}	// end function useDarkMode
