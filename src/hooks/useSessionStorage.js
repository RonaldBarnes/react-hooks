import
		{
		useState,
		useEffect,
		useCallback,
		}
	from 'react';


function getSavedValue(key, initialValue)
	{
	const savedValue = JSON.parse(sessionStorage.getItem(key) );

	// If something was in storage, return it:
	if (savedValue) return savedValue;

	// If passed a function as 2nd parameter, run and return result:
	if (initialValue instanceof Function) return initialValue();
	// Else, return non-function value:
	return initialValue;
	}


export default function useSessionStorage(key, initialValue = "")
	{
	const [value2,setValue2] = useState( () => {
			return getSavedValue(key, initialValue)
			}
		);

	useEffect( () => {
			return sessionStorage.setItem(key, JSON.stringify(value2) )
			},
		[value2]
		)


	const removeValue = useCallback( () => {
		setValue2("");
		sessionStorage.removeItem(key);
		});


	return (
		[value2, setValue2, removeValue]
		);	// end return
	}	// end function useSessionStorage

