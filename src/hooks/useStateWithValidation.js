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
				? nextState()
				: nextState
				;
			setValue(value);
			setIsValid( validator(value));
			},
		[validator]
		);	// end onChange

	return [value, onChange, isValid];
	}	// end function useStateWithValidation
