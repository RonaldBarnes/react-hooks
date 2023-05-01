
import React, { useContext, useState } from "react";

const ThemeContext = React.createContext()
// const ThemeUpdateContext = React.createContext()
// const ThemeStyles = React.createContext()

export function useTheme()
	{
	return useContext(ThemeContext)
	}
/*
export function useThemeUpdate()
	{
	return useContext(ThemeUpdateContext)
	}
export function useThemeStyles()
	{
	return useContext(ThemeStyles)
	}
*/


export function ThemeProvider( {children} )
	{
	// Default is light theme (darkTheme = false):
	const [darkTheme, setTheme] = useState(false)

	const themeStyles = {
		backgroundColor: darkTheme ? "#555" : "#eee",
		color: darkTheme ? "#eee" : "#555",
		border: "1px solid grey",
		borderRadius: "15px",
		boxShadow: "10px 10px 10px 5px grey",
		margin: "2rem 3rem",
		textAlign: "center",
		}

	function toggleTheme()
		{
		setTheme( prevTheme => !prevTheme);
		console.log(`ThemeContext darkTheme: ${darkTheme}`)
		}

	return (
		<>
			{/*
			// Multiple values, one context provider:
			*/}
			<ThemeContext.Provider value={{
				darkTheme: darkTheme,
				toggleTheme: toggleTheme,
				themeStyles: themeStyles,
				}}>
						{children}
{/*
			// Multiple, nested context providers, one value each:
			<ThemeContext.Provider value={darkTheme}>
				<ThemeUpdateContext.Provider value={toggleTheme}>
					<ThemeStyles.Provider value={themeStyles}>
						{children}
					</ThemeStyles.Provider>
				</ThemeUpdateContext.Provider>
*/}
			</ThemeContext.Provider>
		</>
		) // end return
	}	// end function
