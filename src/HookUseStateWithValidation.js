import React, { useEffect } from 'react';

import useStateWithValidation from "./hooks/useStateWithValidation";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseStateWithValidation()
	{
	console.log("%cHookUseStateWithValidation", "color: red");

	const VALID_LENGTH = 5;

	const [userName, setUserName, isValid] = useStateWithValidation(
		name => name.length >= VALID_LENGTH,
		""
		);

	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		},[])


	return (
		<div className="hooks">
			<h2>Hook <code>UseStateWithValidation</code></h2>
			<p>
				A form of <code>useState</code> that validates the variable stored in state.
			</p>
      <p>
        This simple hook is enormously useful and will likely appear frequently in future projects.
      </p>
			<hr />
			<p>
				Enter some text - it will be <b>invalid</b> if length &lt; {VALID_LENGTH} characters.
			</p>
			<hr />

			<label htmlFor="input">
				Valid: <b style={{fontSize:"2rem"}}>{isValid.toString()} {" "}</b>
			</label>
			<p>
				<input
					type="text"
					value={userName}
					id="input"
					onChange={ e => setUserName(e.target.value)}
					autoFocus
					style={{outline:isValid ? "1px solid green" : "1px solid red"}}
					/>
			</p>
			<Code />
		</div>
		);	// end return
	}	// end function HookUseStateWithValidation





// eslint-disable-next-line
function CodeOrig()
	{
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="green">
				{`
import { useStateWithValidation } from "./hooks/useStateWithValidation";
`}
			</code>
			<code>
{`
export default function HookUseStateWithValidation()
  {
  console.log("%cHookUseStateWithValidation", "color: red");

  const VALID_LENGTH = 5;
`}
			</code>
			<code className="red">
{`
  const [userName, setUserName, isValid] = useStateWithValidation(
    name => name.length > VALID_LENGTH,
    ""
    );
`}
			</code>
			<code>
{`...
    <label htmlFor="input">
      Valid: <b>{isValid.toString()} {" "}</b>
    </label>
    <p>
      <input
        type="text"
        id="input" `}
      </code>
      <code className="green"> {`
        value={userName}
        onChange={ e => setUserName(e.target.value)} `}
      </code>
      <code> {`
        />
    </p>
...`}
    	</code>
			<code className="green">
{`

import { useState, useCallback } from "react";


export function useStateWithValidation(validator, initialValue)
  {
  const [name, setName] = useState(initialValue);
  const [isValid, setIsValid] = useState( () => validator(name));

//  const isValid = validator(name);
  const onChange = useCallback(
    nextState => {
      // setState can take a function or a value: resolve which and derive a value:
      const value = typeof nextState === "function" ? nextState(name) : nextState;
      setName(value);
      setIsValid( validator(value));
      },
      [validator]
);

  return [name, onChange, isValid];
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

import useStateWithValidation from "./hooks/useStateWithValidation";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseStateWithValidation()
	{
	const VALID_LENGTH = 5;

	const [userName, setUserName, isValid] = useStateWithValidation(
		name => name.length >= VALID_LENGTH,
		""
		);

	return (
		<div className="hooks">

			<label htmlFor="input">
				Valid: <b style={{fontSize:"2rem"}}>{isValid.toString()} {" "}</b>
			</label>
			<p>
				<input
					type="text"
					value={userName}
					id="input"
					onChange={ e => setUserName(e.target.value)}
					autoFocus
					style={{outline:isValid ? "1px solid green" : "1px solid red"}}
					/>
			</p>
			<Code />
		</div>
		);	// end return
	}	// end function HookUseStateWithValidation




import { useState, useCallback } from "react";

export default function useStateWithValidation(validator, initialValue)
	{
	const [value, setValue] = useState(initialValue);
	const [isValid, setIsValid] = useState( () => validator(value));

	// onChange will be the setValue of the
	//	useStateWithValidation[value, setValue] initiator:
	const onChange = useCallback(
		nextState => {
			// setState can take a function or a value: resolve which and derive a value:
			const value = typeof nextState === "function"
				? nextState(value)
				: nextState
				;
			setValue(value);
			setIsValid( validator(value));
			},
		[validator]
		);	// end onChange

	return [value, onChange, isValid];
	}	// end function useStateWithValidation

`;

	const output = useSourceCode({code});

	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code
