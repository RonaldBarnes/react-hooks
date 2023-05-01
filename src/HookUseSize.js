import React, { useRef, useEffect } from 'react';

import useSize from "./hooks/useSize";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseSize()
	{
	console.log("%cHookUseSize", "color: red");

	const textRef = useRef();
	const size = useSize(textRef);

	// useEffect( () =>
	// 	document.querySelector("textarea").focus()
	// 	);

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[])


	return (
		<div className="hooks">
			<h2>Hook <code>UseSize</code></h2>
			<p>
				A listener on an element.
			</p>
			<p>
				Resize text area, see listener update the measurements.
				Makes use of <code>ResizeObserver</code> and
				<code>observer.observe()</code>...
			<hr />

			</p>
			<p>
				<textarea ref={textRef} autoFocus></textarea>
			</p>
			<pre>
					{JSON.stringify(size, null, 2)}
			</pre>
			<Code />
		</div>
		);	// end return
	}	// end function HookUseSize





// eslint-disable-next-line
function CodeOrig()
	{
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="green">
				{`
import { UseSize } from "./hooks/UseSize";
`}
			</code>
			<code>
{`
export default function HookUseSize()
  {
  console.log("%cHookUseSize", "color: red");

`}
			</code>
			<code className="green">
{`
  const textRef = useRef();
  const size = useSize(textRef);
`}
			</code>
			<code>
{`...
`}
      </code>
      <code className="green"> {`
      <p>
      <textarea ref={textRef}></textarea>
    </p>
    <pre>
        {JSON.stringify(size, null, 2)}
    </pre>
`}
			</code>
			<code> {`
        />
    </p>
...`}
    	</code>
			<code className="green">
{`

export function useSize(ref)
  {
  const [size, setSize] = useState( {} );

    useEffect( () => {
        if (ref.current == null) return;
        const observer = new ResizeObserver( ([entry]) => setSize(entry.contentRect));
        observer.observe(ref.current);
        return () => observer.disconnect();
        },
        []);

  return size;
  }  // end function

`}
			</code>
		</div>

		); // end return
	}	// end function



function Code()
	{
	const code = `
import React, { useRef } from 'react';

import useSize from "./hooks/useSize";


export default function HookUseSize()
	{
	const textRef = useRef();
	const size = useSize(textRef);

	return (
		<div className="hooks">
			<p>
				<textarea ref={textRef} autoFocus></textarea>
			</p>
			<pre>
					{JSON.stringify(size, null, 2)}
			</pre>
		</div>
		);	// end return
	}	// end function HookUseSize




import { useState } from "react";

export default function useSize(ref)
	{
	const [size, setSize] = useState( {} );

	useEffect( () => {
			if (ref.current == null) return;
			const observer = new ResizeObserver( ([entry]) => setSize(entry.contentRect));
			observer.observe(ref.current);
			return () => observer.disconnect();
			}, []);

	return size;
	}	// end function useSize
`;

	const output = useSourceCode({code});

	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code
