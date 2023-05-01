
import { useState } from 'react';


export default function useToggle(initialValue)
	{
	const [value,setValue] = useState(initialValue);

	function toggleValue(value)
		{
		setValue(currentValue =>
			// Check for boolean, if so, use it, else NOT (invert) current value:
			typeof value === "boolean" ? value : !currentValue
			);
		}

	return [value,toggleValue];
	}	// end function useToggle
