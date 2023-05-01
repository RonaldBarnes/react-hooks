import { useState } from 'react';


export default function useArray(initialValue)
	{
	const [array,setArray] = useState(initialValue);

	function push(element)
		{
		console.log(`PUSH element: ${element}`)
		setArray([...array,element]);
		}

	function remove(element)
		{
		setArray(
			array.filter( (item,index) =>
			{
			// console.log(`REMOVE idx: ${index} element: ${element} item: ${item}`)
			return index !== element
			}
			));
		}

	function update(pos,value)
		{
		// Kyle spreads and slices and spreads array, I find this more readable:
		setArray(array.map( (item,index) =>
			{
			return index === pos ? value : item;
			}))
		}

	// Passes a FUNCTION to this function (i.e. a callback):
	function filter( callback )
		{
		console.log(`FILTER callback: ${callback}`);
		setArray(a => a.filter(callback));
		}

	function clear()
		{
		setArray([]);
		}

	// eslint-disable-next-line
	function reset(initialValue)
		{
console.log(`RESET initialValue: ${initialValue}`);
		setArray(initialValue);
		}

	return {
		array,
		remove,
		push,
		update,
		filter,
		clear,
		set:setArray,
		reset:setArray,
		}
	}	// end function useArray
