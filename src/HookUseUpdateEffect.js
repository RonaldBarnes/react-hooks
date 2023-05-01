
import React, { useRef, useEffect, useState } from "react";


export default function HookUseUpdateEffect()
	{
	console.log("%cHookUseUpdateEffect", "color: red");

	const [counter, setCounter] = useState(0);
	useUpdateEffect( () =>
		alert(`Changed to ${counter}`),
		[counter]
		);


	// Scroll to top after a delay for autoFocus:
	useEffect( () => {
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		}, [])


	return (
		<div className="hooks">
			<h2>Hook <code>useUpdateEffect </code></h2>
			<p>
				<code>useEffect</code> runs on first mount and each re-render (unless
				empty dependencies array used).
			</p>
			<p>
				The <code>useUpdateEffect</code> hook will <b>NOT</b> run on first
				load. On each change of the counter, an alert will pop up.
			</p>
			<p>
				<input
					type="text"
					value={counter}
					name="input"
					id="input"
					onChange={ (e) => setCounter( parseFloat(e.target.value) ) }
					/>
			</p>
			<p>
				<button
					type="button"
					onClick={ () => setCounter(c => c + 1) }
					autoFocus
					>
						Increment
					</button>
			</p>

			<div className="jsx"><code>
{`
  const [counter, setCounter] = useState(0); `}
<span style={{color:"lightgreen"}}>
{`
  const callback = useUpdateEffect( () =>`}
</span>
<span style={{color:"red"}}>
{`
    alert(\`Changed to ${counter}\`), `}
</span><span style={{color:"lightgreen"}}>
{`
    [counter]
    );
`}
</span>
{`...`}
<span style={{color:"lightgreen"}}>
{`
function useUpdateEffect(callback, dependencies)
  {
  const isFirstLoad = useRef(true);

  useEffect( () => {
    if (isFirstLoad.current)
      {
      isFirstLoad.current = false;
      // Do not run callback on initial page load:
      return;
      }
    return callback();
    }, dependencies
    );
  }  // end function
`}

				</span>
			</code></div>
		</div>
		);	// end return
	}	// end function




function useUpdateEffect(callback, dependencies)
	{
	const isFirstLoad = useRef(true);

	useEffect( () => {
		if (isFirstLoad.current)
			{
			isFirstLoad.current = false;
			// Do not run callback on initial page load:
			return;
			}
		return callback();
		}, dependencies
		);
	}	// end function

