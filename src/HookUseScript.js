import React, { useEffect } from 'react';

import useScript from "./hooks/useScript";
import useSourceCode from "./hooks/useSourceCode";
import PageTitle from "./PageTitle";


export default function HookUseScript()
	{
	console.log("%cHookUseScript", "color: red");
	const URL =  "https://code.jquery.com/jquery-3.6.0.min.js"
	const { loading, error } = useScript( URL );

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[])


	return (
		<div className="hooks">
      <PageTitle hookName="useScript" />
			<p>
				Load a script / external JavaScript into a page.
			</p>
			<p>
					In this case, simply load some jQuery, then run the
					<code>window.$(window).width()</code> function and
					display the results.
			</p>
			<p>
					Such external JS code is used in analyitics, payment processing, etc.
			</p>
			<p>
				<code>useScript</code> makes use of <code>useAsync</code>;
			</p>
			<hr />

				{ loading
						? <div>Loading...</div>
						: error
						? <div>Error {error.message}</div>
						: <div>
								Window width: {" "} { window.$(window).width()}
						</div>
				}
				<Code />
				</div>
		);	// end return
	}	// end function HookUseScript





// eslint-disable-next-line
function CodeOrig()
	{
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="green">
				{`
export default function HookUseScript()
  {
  const URL =  "https://code.jquery.com/jquery-3.6.0.min.js"
  const { loading, error } = useScript( URL );
`}
			</code>
			<code>
{`
...
	{ loading
    ? <div>Loading...</div>
    : error
    ? <div>Error {error.message}</div>
    : <div>
        Window width: {" "} { window.$(window).width()}
    </div>
  }
`}
			</code>
			<code className="green">
{`
`}
			</code>
{`
`}
			<code className="red">
{`

import { useAsync } from "../HookUseAsync";

export function useScript(url)
  {
  return useAsync( () => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;

      return new Promise( (resolve,reject) => {
          // Once loaded, resolve:
          script.addEventListener("load", resolve);
          // If error event, reject:
          script.addEventListener("error", reject);
          document.body.appendChild(script);
      }, [url])
    }); // end return useAsync
  }  // end function

`}
			</code>
		</div>

		); // end return
	}	// end function





function Code()
	{
	const code = `
import React, { useEffect } from 'react';

import useScript from "./hooks/useScript";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseScript()
	{
	const URL =  "https://code.jquery.com/jquery-3.6.0.min.js"
	const { loading, error } = useScript( URL );

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[])


	return (
		<div className="hooks">
			<h2>Hook <code>useScript</code></h2>

				{ loading
						? <div>Loading...</div>
						: error
						? <div>Error {error.message}</div>
						: <div>
								Window width: {" "} { window.$(window).width()}
						</div>
				}
				<Code />
				</div>
		);	// end return
	}	// end function HookUseScript




import useAsync from "./useAsync";

export default function useScript(url)
	{
	return useAsync( () => {
		const script = document.createElement("script");
		script.src = url;
		script.async = true;

		return new Promise( (resolve,reject) => {
			// Once loaded, resolve:
			script.addEventListener("load", resolve);
			// If error event, reject:
			script.addEventListener("error", reject);
			document.body.appendChild(script);
			}, [url])	// end useAsync
		}); // end return useAsync
	}	// end function useScript
`;

	const output = useSourceCode({code})

	return(
		<div className="codeFormatted">
			{output}
		</div>
		)
	}	// end Code
