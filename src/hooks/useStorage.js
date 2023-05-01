
import { useState, useEffect, useCallback } from "react";


export function useLocalStorage(key, defaultValue)
	{
	return useStorage(key, defaultValue, window.localStorage)
	}	// end function


export function useSessionStorage(key, defaultValue)
	{
	return useStorage(key, defaultValue, window.sessionStorage)
	}	// end function




export function useStorage(key, defaultValue, storageObject)
	{
	const [value, setValue] = useState( () => {
		const jsonValue = storageObject.getItem(key);
		if (jsonValue != null) return JSON.parse(jsonValue);

		if (typeof(defaultValue) === "function")
			{
			return defaultValue()
			}
		return defaultValue;
		});	// end useState()


	useEffect( () => {
		if (value === undefined) return storageObject.removeItem(key);

		// storageObject.removeItem(key);
		storageObject.setItem(key, JSON.stringify(value));
		}, [key, value, storageObject]
		);



	const remove = useCallback( () => {
		// Why not storageObject.removeItem(key)?
		// setValue(undefined);
		storageObject.removeItem(key);
		});	// end useCallback


	return [value, setValue, remove];
	}	// end function