import { useState, useRef } from "react";


export default function useCookies()
	{
	console.log(`%cuseCookies`, "color:red");

	const [cookieCounter, setCookieCounter] = useState( () =>
		document.cookie === "" ? 0 : document.cookie.split("; ").length
		);

	const statusLogLength = 4;
	let newestMessage = useRef("");

	const [success, setSuccess] = useState(false);
	const [status, setStatus] = useState([]);


	// Prevent duplicate messages in Activity Log:
	function updateStatusNoDups(newmsg)
		{
		if (newestMessage.current !== newmsg && newmsg.length > 0)
			{
			setStatus( (curr) => [newmsg, ...curr].slice(0,statusLogLength));
			newestMessage.current = newmsg;
			}
		};


	const optionsDefault = {
		SameSite: "lax",
		Secure: true,
		"max-age": 24*60*60*7,
		// The HttpOnly doesn't take a true/false, just by existing it is invoked:
		// HttpOnly: false,
		};




	const setCookie = (name="?", value="", options) => {
		// console.table(options);
		try
			{
			if (findCookie(name)) throw new Error(`Cookie "${name}" already exists, aborting.`)

			const allOpts = {...optionsDefault, ...options};
			let optsString = Object.keys(allOpts).map( key =>
				`${key}=${allOpts[key]}`).join(";")
				;
			document.cookie = `${name}=${value};${optsString}`;
			setSuccess( () => true);
			updateStatusNoDups(`Set cookie "${name}=${value};${optsString}"`);
			}
		catch(e)
			{
			setSuccess(false);
			updateStatusNoDups(e.toString());
			}
		}; // end setCookie



	const getCookie = (name="") => {
		try
			{
			let cookieVal = document.cookie.split("; ").find( c => c.indexOf(`${name}=`) === 0);
			if (cookieVal === undefined)
				{
				setSuccess( () => false);
				// throw new Error( `Could not retrieve cookie "${name}"`);
				return "";
				}

			// console.log(`getCookie name: ${name} value: ${cookieVal}`)
			let retVal = cookieVal.split("=").slice(1);
			setSuccess( () => true);
			// Can happen on each page render, pollutes Activity Log:
			// updateStatusNoDups(`Retrieved value for cookie "${name}"`);
			return retVal[0];
			}
		catch(e)
			{
			setSuccess( () => false);
			updateStatusNoDups(e.toString());
			}
		}



	const getCookiesAllArray = () => {
		try
			{
			const arr = document.cookie.split("; ");
			// setSuccess( () => arr.length > 0 ? true : false);
			// In example page, this overwrites actions like "delete" and "set":
			// updateStatusNoDups(`Retrieved ${arr.length} cookies`);
			return arr;
			}
		catch(e)
			{
			setSuccess(false);
			updateStatusNoDups(e.toString());
			}
		}


	const getCookieCount = () => {
		return getCookiesAllArray().length;
		};


	const deleteCookie = (name="") => {
		try
			{
			// console.log(`DELETE COOKIE name: ${name}`);
			if (! findCookie(name))
				throw new Error(`Cookie named "${name}" does not exist, can't delete...`);

			// Delete via expiring it immediately:
			// document.cookie = `${name}=${value};${tmp};max-age=0;`;
			document.cookie = `${name}=;max-age=0;`;
			setSuccess( () => true);
			updateStatusNoDups(`Deleted cookie "${name}"`);
			}
		catch(e)
			{
			setSuccess(false);
			updateStatusNoDups(e.toString());
			}
		};	// end deleteCookie




	const findCookie = (name="") => {
		try
			{
			let found = document.cookie
				.split("; ")
				.filter( c => c.indexOf(`${name}=`) === 0)
					.length === 1
				;
			setSuccess(() => found);
			// updateStatusNoDups(found
			// 	? `Found cookie "${name}"`
			// 	: `Did not find cookie "${name}"`);
			// setStatus( (curr) => found
			// 	? [`Found cookie "${name}"`, ...curr].slice(0,2)
			// 	: [`Did not find cookie "${name}"`, ...curr].slice(0,2)
			// 	);

			return found;
			}
		catch(e)
			{
			setSuccess(false);
			updateStatusNoDups(e.toString());
			// setStatus((curr) => [e.toString(), ...curr].slice(0,statusLogLength));
			}
		};




	const updateCookie = (name="", value="", options) =>
		{
		try
			{
			if (! findCookie(name))
				throw new Error(`Cannot update cookie "${name}" - it doesn't exist...`);

			const allOpts = {...optionsDefault, ...options};
			let optsString = Object.keys(allOpts).map( key =>
				`${key}=${allOpts[key]}`).join(";")
				;
			document.cookie = `${name}=${value};${optsString}`;
			setSuccess( () => true);
			updateStatusNoDups(`Updated cookie "${name}=${value};${optsString}"`);
			// setStatus( (curr) =>
			// 	[`Updated cookie "${name}=${value};${optsString}"`, ...curr]
			// 	.slice(0, statusLogLength)
			// 	);
			}
		catch(e)
			{
			setSuccess(false);
			updateStatusNoDups(e.toString());
			// setStatus( (curr) => [e.toString(), ...curr].slice(0, statusLogLength))
			}
		};


	return [
		setCookie,
		updateCookie,
		deleteCookie,
		getCookie,
		getCookiesAllArray,
		getCookieCount,
		findCookie,
		{ cookieCounter, setCookieCounter, optionsDefault, success, status }
		];
	}	// end function useCookies()
