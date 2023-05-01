import React,
		{
		useEffect,
		}
	from 'react';

import useLocalStorage from "./hooks/useLocalStorage";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseLocalStorage()
	{
	console.log("%cHookUseLocalStorage", "color: red");

	const [value, setValue, removeValue] = useLocalStorage("data");

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[]);


	return (
		<div className="hooks">
			<h2>Hook <code>useLocalStorage</code></h2>
			<p>
				This will be a drop-in replacement for <code>useState</code>
				that uses the browser's local storage.
			</p>
			<p>
				Enter some data, watch the local storage in your browser,
				see storage populated.
			</p>
			<p>
				Navigate to another page, come back, see input entry field populated
				with previous data.
			</p>
			<p>
				Close browser / tab, reload page, local storage has
				persisted.
			</p>

			<p>
				<label htmlFor="input">Enter something: {" "}</label>
				<input
					type="text"
					id="input"
					value={value}
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
	}	// end function





// eslint-disable-next-line
function CodeOrig()
	{
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="green">
				{`
import { uselocalStorage } from "./hooks/uselocalStorage";
...
const [value, setValue, removeValue] = useLocalStorage("data");
`}
			</code>
			<code>
{`
...
    <input
      type="text"
      id="input"
      value={value} `}
			</code>
			<code className="green">
{`
      onChange={(e) => setValue(e.target.value)}
`}
			</code>
			<code>
{`      />
`}
			</code>
			<code className="green">
{`
      <button onClick={removeValue}>
        Clear storage
      </button>
`}
			</code>
			<code>
{`...`}
			</code>

			<code className="red">
{`


function uselocalStorage(key, initialValue)
  {
  const [value2,setValue2] = useState( () => {
    return getSavedValue(key, initialValue)
    }
    );

  useEffect( () => {
    return localStorage.setItem(key, JSON.stringify(value2) )
    },
    [value2]
    )

  const removeValue = useCallback( () => {
    setValue2("");
    localStorage.removeItem(key);
    });

  return ( [value2, setValue2, removeValue] );
  }  // end function


`}
			</code>
			<code className="green">
				{`
function getSavedValue(key, initialValue)
    { `}
			</code>
			<code className="green">
				{`
    const savedValue = JSON.parse(localStorage.getItem(key) );

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
import useLocalStorage from "./hooks/useLocalStorage";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseLocalStorage()
	{
	const [value, setValue, removeValue] = useLocalStorage("data");

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[]);


	return (
		<div className="hooks">
			<h2>Hook <code>useLocalStorage</code></h2>
			<p>
				<label htmlFor="input">Enter something: {" "}</label>
				<input
					type="text"
					id="input"
					value={value}
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
	}	// end function





import
		{
		useState,
		useEffect,
		useCallback,
		}
	from 'react';


export default function useLocalStorage(key, initialValue = "")
	{
	const [value2,setValue2] = useState( () => {
			return getSavedValue(key, initialValue)
			}
		);

	useEffect( () => {
			localStorage.setItem(key, JSON.stringify(value2) )
			},[value2])


	const removeValue = useCallback( () => {
		setValue2("");
		localStorage.removeItem(key);
		});


	return (
		[value2, setValue2, removeValue]
		);	// end return
	}	// end function






function getSavedValue(key, initialValue)
	{
	const savedValue = JSON.parse(localStorage.getItem(key) );

	// If something was in storage, return it:
	if (savedValue) return savedValue;

	// If passed a function as 2nd parameter, run and return result:
	if (initialValue instanceof Function) return initialValue();
	// Else, return non-function value:
	return initialValue;
	}



`;
	const output = useSourceCode({code});

	return (
		<div className="codeFormatted">
			{output}
		</div>
		);
	}	// end Code