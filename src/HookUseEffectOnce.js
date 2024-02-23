import React, { useState } from 'react';

import useEffectOnce from "./hooks/useEffectOnce";
import PageTitle from "./PageTitle";


export default function HookUseEffectOnce()
	{
	console.log("%cHookUseEffectOnce", "color: red");

	const [count, setCount] = useState(0);


	useEffectOnce( () =>
		{
		console.log(`First time: ${count}`);
		setTimeout( () => alert(`First time: ${count}`), 1000);
		return;
		});

  // Scroll to top after a delay:
  useEffectOnce( () => {
    setTimeout( () =>
      window.scrollTo({top:0, behavior:"smooth"}),
      500
      )
    }, [])

	// useEffect( () =>
	// 	{
	// 	console.log(`First time: ${count}`);
	// 	alert(`First time: ${count}`);
	// 	return;
	// 	}
	// 	);

	// useEffect( () => document.querySelector("button").focus());

	return (
		<div className="hooks">
      <PageTitle hookName="useEffectOnce" />
			<p>
				A <code>useEffect</code> implementation that only runs <b>once</b>, despite
								state changing counter (hence a page re-render) each button click.
			</p>
			<p>
				Change the counter value, only the first time will throw an alert message.
			</p>
			<hr />

			<p className="counter">
				<button
					onClick={ () => setCount(prevCount => prevCount + 1)}
					autoFocus
					>
					Increment Counter
				</button>
				{" "}
				{count}
			</p>
			<Code />
		</div>
		);	// end return
	}	// end function HookUseEffectOnce






function Code()
	{
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="green">
				{`
import { useEffectOnce } from "./hooks/useEffectOnce";
`}
			</code>
			<code>
{`
export default function HookUseEffectOnce()
  {
  const [count, setCount] = useState(0);
`}
			</code>
			<code className="green">
{`
  useEffectOnce( () =>
    alert("First time")
    );
`}
			</code>
			<code>
{`...
    <button onClick={ () => setCount(prevCount => prevCount + 1)}>
      Increment Counter
    </button>
    {" "}
    {count}
`}
			</code>
			<code>
{`
...`}
			</code>
			<code className="green">
{`

export function useEffectOnce(callback)
  {
  let firstTime = useRef(0);

  // Run the callback function only ONCE, but NOT at load
  // (in dev mode / strict, renders occur twice at load):
  useEffect(() => {
    firstTime.current === 1 ? callback() : firstTime.current += 1
    },
    // Run each time, filter output inside callback:
    // Because we do NOT want to fire on load, but on action:
    [firstTime.current]
    );
  }  // end function

`}
			</code>
		</div>

		); // end return
	}	// end function
