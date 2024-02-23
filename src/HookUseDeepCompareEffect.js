import React, { useState, useEffect, useRef } from 'react';
import { isEqual } from "lodash";
import "./Hooks.css";
import PageTitle from "./PageTitle";


export default function HookUseDeepCompareEffect()
	{
	console.log("%cHookUseDeepCompareEffect", "color: red");

	const [age, setAge] = useState(0);
	const [count, setCount] = useState(0);
	const useEffectCountRef = useRef();
	const useDeepCompareEffectCountRef = useRef();

	// This object will be re-created each render:
	const person = { name: "Ron", age: age};


	useEffect( () => {
//console.table(useEffectCountRef.current);
		useEffectCountRef.current.textContent =
			parseInt(useEffectCountRef.current.textContent) + 1
		},
		// Only run effect when person object changes (via Increment Age button):
		// This will fail, in that each render, person will become a NEW object!
		[person]
		);

	useDeepCompareEffect( () => {
		useDeepCompareEffectCountRef.current.textContent =
			parseInt(useDeepCompareEffectCountRef.current.textContent) + 1;
		},
		// Only run effect when person object changes (via Increment Age button):
		// This will WORK, because re-render's new object's CONTENTS will be
		// compared to previous object content's, only updating when age changed:
		[person]
		);

  // Scroll to top after a delay:
  useEffect( () => {
    setTimeout( () =>
      window.scrollTo({top:0, behavior:"smooth"}),
      500
      )
    }, [])


	return (
		<div className="hooks">
      <PageTitle hookName="useDeepCompareEffect" />
			<p>
				Basic custom hooks that can be incorporated into a developer's toolkit.
			</p>
			<p>
				Here, we use <code>lodash isEqual()</code> to do deep compare on
				objects.
			</p>

			<hr />
			<p>
				useEffect change counter: {" "}
				<span
					ref={useEffectCountRef}
					style={{fontSize:"2rem"}}>
					-1
				</span>
			</p>
			<p>
				useDeepCompareEffect change counter: {" "}
				<span
					ref={useDeepCompareEffectCountRef}
					style={{fontSize:"2rem"}}
					>
					-1
				</span>
			</p>
			<p>
				Unaffiliated counter (to invoke re-render):
				<span style={{fontSize:"2rem"}}>
					{" "} {count}
				</span>
			</p>
			<p>
				Person object:
			</p>
			<pre>{JSON.stringify(person, null, 2)}</pre>
			<button
				type="button"
				onClick={ () => setAge( age => age + 1)}
				autoFocus>
				Increment Age
			</button>
			{" "}
			<button
				type="button"
				onClick={ () => setCount( c => c + 1)}>
				Increment Counter
			</button>
			<p>
				Incrementing the counter will cause a re-render, in turn causing
				<code>useEffect</code> to increment the Unaffiliated counter,
				(meaning Person object has updated).
			</p>
			<p>
				Incrementing the age, however, is the only thing that will cause the
				<code>useDeepCompareEffect</code> hook to increment its counter.
				It will "deep" compare the person object to the previous version.
			</p>

<Code />

		</div>
		);
	}



function useDeepCompareEffect(callback, dependencies)
	{
	console.log(`%cuseDeepCompareEffect`, "color:lightblue");

	// Dependencies are just person object, which gets re-instantiated each
	// render, becoming a different object with same contents (unless age
	// changed):
	const currentDependenciesRef = useRef();

	// Do deep compare on previous person obj contents with current one's:
	if (!isEqual(currentDependenciesRef.current, dependencies))
		{
		// If different (i.e. age changed), update our ref:
		currentDependenciesRef.current = dependencies;
		}

	// Run our update function / callback if deep compare indicates differences:
	useEffect(callback, [currentDependenciesRef.current]);
	}	// end function






function Code()
	{
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="red">
				{`
import { isEqual } from "lodash"; `}
			</code>
			<code>
				{`
...
  const [age, setAge] = useState(0);
  const [count, setCount] = useState(0); `}
			</code>
			<code className="green">
				{`
  const useEffectCountRef = useRef();
  const useDeepCompareEffectCountRef = useRef();

  // This object will be re-created each render:
  const person = { name: "Ron", age: age};
`}
			</code>
			<code>
{`
  useEffect( () => {
    useEffectCountRef.current.textContent =
      parseInt(useEffectCountRef.current.textContent) + 1
    },`}
			</code>
			<code className="red">
				{`
    // Only run effect when person object changes (via Increment Age button):
    // This will fail, in that each render, person will become a NEW object!
    [person] `}
			</code>
			<code>
				{`
    );

  useDeepCompareEffect( () => {
    useDeepCompareEffectCountRef.current.textContent =
      parseInt(useDeepCompareEffectCountRef.current.textContent) + 1;
    }, `}
			</code>
			<code className="green">
				{`
    // Only run effect when person object changes (via Increment Age button):
    // This will WORK, because re-render's new object's CONTENTS will be
    // compared to previous object content's, only updating when age changed:
    [person]
				`}
			</code>
			<code>
{`    );
...
      <p>
        useEffect change counter: {" "}
        <span
`}
				<span style={{color:"red"}}>
{`          ref={useEffectCountRef}
`}
</span>
{`          style={{fontSize:"2rem"}}
          >-1</span>
      </p>
      <p>
        useDeepCompareEffect change counter: {" "}
        <span
`}
				<span style={{color:"red"}}>
{`          ref={useDeepCompareEffectCountRef}
`}
</span>
{`          style={{fontSize:"2rem"}}
          >-1</span>
      </p>
      <p>
        Unaffiliated counter (to invoke re-render):
        <span style={{fontSize:"2rem"}}>
          {count}
        </span>
      </p>
      <p>
        Person object:
      </p>
      <pre>{JSON.stringify(person, null, 2)}</pre>
      <button onClick={ () => setAge( age => age + 1)}>
        Increment Age
      </button>
      {" "}
      <button onClick={ () => setCount( c => c + 1)}>
        Increment Counter
      </button>
...

`}
				<span style={{color:"lightgreen"}}>
{`
export default function HookUseDeepCompareEffect()
  {
  // Dependencies are just person object, which gets re-instantiated each
  // render, becoming a different object with same contents (unless age
  // changed):
  const currentDependenciesRef = useRef();

  // Do deep compare on previous person obj contents with current one's:
  if (!isEqual(currentDependenciesRef.current, dependencies))
    {
    // If different (i.e. age changed), update our ref:
    currentDependenciesRef.current = dependencies;
    }

  // Run our update function / callback if deep compare indicates differences:
  useEffect(callback, [currentDependenciesRef.current]);
  }  // end function

`}

				</span>
			</code></div>
		);	// end return
	}	// end function

