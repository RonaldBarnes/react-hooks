import React, { useEffect } from 'react';

import useAsync from "./hooks/useAsync";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseAsync()
	{
	console.log("%cHookUseAsync", "color: red");

	const { loading, error, value } = useAsync( () => {
		return new Promise( (resolve, reject) => {
			const success = true;
			setTimeout( () => {
				return success
					? resolve("Succeeded")
					: reject("Error - rejected")
				}, 2000
				);	// end setTimeout
			});	// end Promise
		});	// end useAsync

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[])

	return (
		<div className="hooks">
			<h2>Hook <code>UseAsync</code></h2>
			<p>
				Basic custom hooks that can be incorporated into a developer's toolkit.
			</p>
			<p>
				This is a simple-ish (as much as Promises can be simple) asyncronous
				helper hook. It will be used in a <code>useFetch</code> hook later.
			</p>
			<hr />

			<div style={{fontSize:"2rem"}}>
				<div>Loading: {loading.toString()}</div>
				<div>{error}</div>
				<div>{value}</div>
			</div>
			<Code />
		</div>
		);
	}





function Code()
	{
	const code = `
import useAsync from "./hooks/useAsync";


export default function HookUseAsync()
	{
	const { loading, error, value } = useAsync( () => {
		return new Promise( (resolve, reject) => {
			const success = true;
			setTimeout( () => {
				return success
					? resolve("Succeeded")
					: reject("Error - rejected")
				}, 2000
				);	// end setTimeout
			});	// end Promise
		});	// end useAsync

	return (
		<div className="hooks">
			<h2>Hook <code>UseAsync</code></h2>
			<div style={{fontSize:"2rem"}}>
				<div>Loading: {loading.toString()}</div>
				<div>{error}</div>
				<div>{value}</div>
			</div>
		</div>
		);
	}






import { useState, useEffect, useCallback } from 'react';


export default function useAsync(callback, dependencies = [])
	{
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [value, setValue] = useState();

	const callbackMemoized = useCallback( () => {
		console.log(\`%cuseAsync MEMOIZED\`, "color:lightblue");
		setLoading(true);
		setError(undefined);
		setValue(undefined);
		callback()
			.then(setValue)
			.catch(setError)
			.finally( () => setLoading(false))
		}, dependencies
		);	// end callbackMemoized


	useEffect( () => {
		callbackMemoized()
		}, [callbackMemoized]
		);

	return {loading, error, value};
	}

`;

	const output = useSourceCode({code});

	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code











// eslint-disable-next-line
function CodeOrig()
	{
	return (
			<div className="jsx" style={{marginTop:"2rem"}}><code>

				<span style={{color:"lightgreen"}}>
{`
export default function HookUseAsync()
  {
  const { loading, error, value } = useAsync( () => {
    return new Promise( (resolve, reject) => {
      const success = true;
      setTimeout( () => {
        return success
          ? resolve("Succeeded")
          : reject("Error - rejected")
        }, 2000
        );  // end setTimeout
      });  // end Promise
    });  // end useAsync
`}</span>{`
  ...
  }	// end function
`}
        <span style={{color:"lightgreen"}}>
{`
export function useAsync(callback, delay, dependencies)
  {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  const callbackMemoized = useCallback( () => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    callback()
      .then(setValue)
      .catch(setError)
      .finally( () => setLoading(false))
    }, dependencies
    );  // end callbackMemoized


  useEffect( () => {
    callbackMemoized()
    }, [callbackMemoized]
    );

  return {loading, error, value};
  }  // end function

`}

				</span>
			</code></div>

		);	// end return
	}	// end CodeOrig
