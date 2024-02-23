import React, { useEffect } from 'react';

import useSessionStorage from "./hooks/useSessionStorage";
import useSourceCode from "./hooks/useSourceCode";
import PageTitle from "./PageTitle";


export default function HookUseSessionStorage()
	{
	console.log("%cHookUseSessionStorage", "color: red");

	const [value,setValue, removeValue] = useSessionStorage( "data");


	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[]);


	return (
		<div className="hooks">
      <PageTitle hookName="useSessionStorage" />
			<p>
				This will be a drop-in replacement for <code>useState</code>
				that uses the browser's <strike>local</strike> session storage.
			</p>
			<p>
				Enter some data, watch the session storage in your browser,
				see storage populated.
			</p>
			<p>
				Navigate to another page, come back, see input entry field populated
				with previous data.
			</p>
			<p>
				Close browser / tab, reload page, session storage has been cleared.
			</p>

			<p>
				<label htmlFor="input">Enter something: {" "}</label>
				<input
					type="text"
					id="input"
					value={value == null ? "" : value}
					onChange={(e) => setValue(e.target.value)}
					autoFocus
					/>
				{" "}
				<button onClick={removeValue}>
					Clear storage
				</button>
			</p>
			<Code />
		</div>
		);	// end return
	}	// end function HookUseSessionStorage





// eslint-disable-next-line
function CodeOrig()
	{
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="green">
				{`
import { useSessionStorage } from "./hooks/useSessionStorage";
...
const [value,setValue, removeValue] = useSessionStorage( "data", "");
`}
			</code>
			<code>
{`...
    <input
      type="text"
      id="input"
      value={value == null ? "" : value}
`}
			</code>
			<code className="green"> {`
      onChange={(e) => setValue(e.target.value)}
      />
    <button onClick={removeValue}>
      Clear storage
    </button>
`}
			</code>
			<code className="red">
{`

function useSessionStorage(key, initialValue)
	{
	const [value2,setValue2] = useState( () => {
					return getSavedValue(key, initialValue)
					}
			);

	useEffect( () => {
					return sessionStorage.setItem(key, JSON.stringify(value2) )
					},
			[value2]
			)

	return ( [value2, setValue2] );
	}  // end function
	
	
`}
			</code>
			<code className="green">
				{`
function getSavedValue(key, initialValue)
  { `}
			</code>
			<code>
				{`
  // const savedValue = JSON.parse(localStorage.getItem(key) ); `}
			</code>
			<code className="green">
				{`
  const savedValue = JSON.parse(sessionStorage.getItem(key) );

  // If something was in storage, return it:
  if (savedValue) return savedValue;

  // If passed a function as 2nd parameter, run and return result:
  if (initialValue instanceof Function) return initialValue();
  // Else, return non-function value:
  return initialValue;
  }
`}
			</code>
		</div>

		); // end return
	}	// end function




function Code()
	{
	const code = `
import React, { useEffect } from 'react';

import { useSessionStorage } from "./hooks/useSessionStorage";


export default function HookUseSessionStorage()
	{
	const [value,setValue, removeValue] = useSessionStorage( "data");

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[]);


	return (
		<div className="hooks">
			<h2>Hook <code>useSessionStorage</code></h2>

			<p>
				<label htmlFor="input">Enter something: {" "}</label>
				<input
					type="text"
					id="input"
					value={value == null ? "" : value}
					onChange={(e) => setValue(e.target.value)}
					autoFocus
					/>
				{" "}
				<button onClick={removeValue}>
					Clear storage
				</button>
			</p>
			<Code />
		</div>
		);	// end return
	}	// end function HookUseSessionStorage





import
		{
		useState,
		useEffect,
		useCallback,
		}
	from 'react';


function getSavedValue(key, initialValue)
	{
	const savedValue = JSON.parse(sessionStorage.getItem(key) );

	// If something was in storage, return it:
	if (savedValue) return savedValue;

	// If passed a function as 2nd parameter, run and return result:
	if (initialValue instanceof Function) return initialValue();
	// Else, return non-function value:
	return initialValue;
	}


export default function useSessionStorage(key, initialValue = "")
	{
	const [value2,setValue2] = useState( () => {
			return getSavedValue(key, initialValue)
			}
		);

	useEffect( () => {
			return sessionStorage.setItem(key, JSON.stringify(value2) )
			},
		[value2]
		)


	const removeValue = useCallback( () => {
		setValue2("");
		sessionStorage.removeItem(key);
		});


	return (
		[value2, setValue2, removeValue]
		);	// end return
	}	// end function useSessionStorage

`;

	const output = useSourceCode({code});

	return(
		<div className="codeFormatted">
			{output}
		</div>
		)
	}	// end Code
