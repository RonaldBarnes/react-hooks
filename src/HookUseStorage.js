
import React, { useEffect } from "react";

import { useLocalStorage, useSessionStorage } from "./hooks/useStorage";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseStorage()
	{
	console.log("%cHookUseStorage", "color: red");

	const [localName, setLocalName, removeLocalName] = useLocalStorage("localName", "");
	const [sessionName, setSessionName, removeSessionName] = useSessionStorage("sessionName", "");

	// use autoFocus (NOTE capitalization!)
	// useEffect( () => document.querySelector("input").focus(), []);

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[])


	return (
		<div className="hooks">
			<h2>
				Hook useStorage
			</h2>
			<p>
				The <code>useStorage</code> hook integrates <b>both</b> sessionStorage
				and localStorage into a single hook file.
			</p>
			<p>
				Changing the text input fields will store their values into the corresponding
				browser location.
			</p>

			<hr />
			<p>
				<label htmlFor="local">
					Local Storage Data: {" "}
				</label>
				<input
					type="text"
					onChange={ (e) => setLocalName(e.target.value)}
					value={localName == null ? "" : localName}
					id="local"
					/>
				{" "}
				<button onClick={() => removeLocalName()}>
					Clear Local Storage
				</button>
			</p>

			<p>
				<label htmlFor="session">
					Session Storage Data: {" "}
				</label>
				<input
					type="text"
					onChange={ (e) => setSessionName(e.target.value)}
					value={sessionName == null ? "" : sessionName}
					id="session"
					autoFocus
					/>
				{" "}
				<button
					onClick={() => removeSessionName()}
					>
					Clear Session Storage
				</button>
			</p>


			<Code />
		</div>
		);	// end return
	}	// end function




function Code()
	{
	const code = `
import { useLocalStorage, useSessionStorage } from "./hooks/useStorage";


export default function HookUseStorage()
	{
	const [localName, setLocalName, removeLocalName] = useLocalStorage("localName", "");
	const [sessionName, setSessionName, removeSessionName] = useSessionStorage("sessionName", "");


	return (
		<div className="hooks">
			<p>
				<label htmlFor="local">
					Local Storage Data: {" "}
				</label>
				<input
					type="text"
					onChange={ (e) => setLocalName(e.target.value)}
					value={localName == null ? "" : localName}
					id="local"
					/>
				{" "}
				<button onClick={() => removeLocalName()}>
					Clear Local Storage
				</button>
			</p>

			<p>
				<label htmlFor="session">
					Session Storage Data: {" "}
				</label>
				<input
					type="text"
					onChange={ (e) => setSessionName(e.target.value)}
					value={sessionName == null ? "" : sessionName}
					id="session"
					autoFocus
					/>
				{" "}
				<button onClick={() => removeSessionName()}>
					Clear Session Storage
				</button>
			</p>
		</div>
		);	// end return
	}	// end function





import { useState, useEffect, useCallback } from "react";


export function useLocalStorage(key, defaultValue)
	{
	return useStorage(key, defaultValue, window.localStorage)
	}	// end function


export function useSessionStorage(key, defaultValue)
	{
	return useStorage(key, defaultValue, window.sessionStorage)
	}	// end function




export function useStorage(key, defaultValue, storageObject)
	{
	const [value, setValue] = useState( () => {
		const jsonValue = storageObject.getItem(key);
		if (jsonValue != null) return JSON.parse(jsonValue);

		if (typeof(defaultValue) === "function")
			{
			return defaultValue()
			}
		return defaultValue;
		});	// end useState()


	useEffect( () => {
		if (value === undefined) return storageObject.removeItem(key);

		// storageObject.removeItem(key);
		storageObject.setItem(key, JSON.stringify(value));
		}, [key, value, storageObject]
		);



	const remove = useCallback( () => {
		// Why not storageObject.removeItem(key)?
		// setValue(undefined);
		storageObject.removeItem(key);
		});	// end useCallback


	return [value, setValue, remove];
	}	// end function
`;
	const output = useSourceCode({code});

	return (
		<>
			{output}
		</>
		); // end return
	}	// end Code()


// eslint-disable-next-line
function CodeOrig()
	{
	return (
		<div className="jsx">
			<code>

{`
import { useLocalStorage, useSessionStorage } from "./hooks/useStorage";


export default function HookUseStorage()
  {
  const [localName, setLocalName, removeLocalName] = useLocalStorage("localName", "");
  const [sessionName, setSessionName, removeSessionName] = useSessionStorage("sessionName", "");
...
      <p>
        <label htmlFor="local">
          Local Storage Data: {" "}
        </label>
        <input
          type="text"
          onChange={ (e) => setLocalName(e.target.value)}
          value={localName == null ? "" : localName}
          id="local"
          />
        {" "}
        <button onClick={() => removeLocalName()}>
          Clear Local Storage
        </button>
      </p>
...



`}
			</code>
			<code className="green">
{`

export function useLocalStorage(key, defaultValue)
	{
	return useStorage(key, defaultValue, window.localStorage)
	}	// end function


export function useSessionStorage(key, defaultValue)
	{
	return useStorage(key, defaultValue, window.sessionStorage)
	}	// end function




function useStorage(key, defaultValue, storageObject)
  {
  const [value, setValue] = useState( () => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof(defaultValue) === "function")
      {
      return defaultValue()
      }
    return defaultValue;
    });  // end useState()


  useEffect( () => {
    if (value === undefined) return storageObject.removeItem(key);

    // storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
    }, [key, value, storageObject]
    );



  const remove = useCallback( () => {
    // Why not storageObject.removeItem(key)?
    // setValue(undefined);
    storageObject.removeItem(key);
    });  // end useCallback


  return [value, setValue, remove];
  }  // end function

`}

			</code></div>
		);	// end return
	}	// end function Code()