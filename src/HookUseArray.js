import React, { useEffect, useContext } from 'react';

import useArray from "./hooks/useArray";
import useSourceCode from "./hooks/useSourceCode";

import { contextTranslate } from "./App.js";
import PageTitle from "./PageTitle";


export default function HookUseArray()
	{
	console.log("%cHookUseArray", "color: yellow");

	const initialArray = [1,2,3,4,5,6];
	const {
		array,
		remove,
		push,
		filter,
		update,
		set,
		clear,
		// eslint-disable-next-line
		reset,
		} = useArray(initialArray);

  const {t} = useContext(contextTranslate);


	useEffect( () => {
		// Scroll to top after a delay:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			)
		}, [])


	return (
		<div className="hooks">
      <PageTitle hookName="useArray" />
			<p>
				Basic custom hooks that can be incorporated into
				a developer's toolkit.
			</p>
			<p>
				This hook is handy for array manipulation via buttons, etc. Saves
				having to (re-)write array handling functions in each component.
			</p>


			<p>
				Array: {" "}
				<span style={{fontWeight:"bold", fontVariantCaps:"small-caps"}}>
					{array.join(",")}
				</span>
			</p>
			<hr />

			<button
				type="button"
				onClick={() => push(7)}
				autoFocus
        >{t("Add")} 7
			</button>
			<button
				type="button"
				onClick={() => remove(1)}
				>Remove Second Element
			</button>
			<button
				type="button"
				onClick={() => update(1,9)}
				>Change Second Element to 9
			</button>
			<button
				type="button"
				onClick={() => filter(n => n < 4)}
				>Keep Numbers &lt; 4
			</button>
			<button
				type="button"
				onClick={() => set([1,2])}
				>Set to 1,2
			</button>
			<button
				type="button"
				onClick={clear}
        >{t("Clear")}
			</button>
			<button
				type="button"
				onClick={() => set(initialArray)}>
        {t("Reset")}
			</button>
			<Code />
		</div>
		);	// end return
	}	// end function HookUseArray




function Code()
	{
	const code = `
import React, { useEffect } from 'react';

import useArray from "./hooks/useArray";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseArray()
	{
	console.log("%cHookUseArray", "color: yellow");

	const initialArray = [1,2,3,4,5,6];
	const {
		array,
		remove,
		push,
		filter,
		update,
		set,
		clear,
		// eslint-disable-next-line
		reset,
		} = useArray(initialArray);


	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		}, [])


	return (
		<div className="hooks">
			<h2>Hook <code>useArray</code></h2>

			<button
				type="button"
				onClick={() => push(7)}
				autoFocus
				>Add 7
			</button>
			<button
				type="button"
				onClick={() => remove(1)}
				>Remove Second Element
			</button>
			<button
				type="button"
				onClick={() => update(1,9)}
				>Change Second Element to 9
			</button>
			<button
				type="button"
				onClick={() => filter(n => n < 4)}
				>Keep Numbers &lt; 4
			</button>
			<button
				type="button"
				onClick={() => set([1,2])}
				>Set to 1,2
			</button>
			<button
				type="button"
				onClick={clear}
				>Clear
			</button>
			<button
				type="button"
				onClick={() => set(initialArray)}>
				Reset
			</button>
		</div>
		);	// end return
	}	// end function HookUseArray




import { useState, useEffect } from 'react';


export default function useArray(initialValue)
	{
	const [array,setArray] = useState(initialValue);

	function push(element)
		{
		setArray([...array,element]);
		}

	function remove(element)
		{
		setArray(
			array.filter( (item,index) =>
			{
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
		setArray(a => a.filter(callback));
		}

	function clear()
		{
		setArray([]);
		}

	// eslint-disable-next-line
	function reset(initialValue)
		{
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

`;

	const output = useSourceCode({code});

	return(
		<div className="codeFormatted">
			{output}
		</div>
		);
	}	// end Code


// eslint-disable-next-line
function CodeOrig()
	{
	return(
		<div className="jsx" style={{marginTop:"2rem"}}><code>
			<span style={{color:"lightgreen"}}>
{`
  const initialArray = [1,2,3,4,5,6];
  const {
    array,
    remove,
    push,
    filter,
    update,
    set,
    clear,
    reset,
    } = useArray(initialArray);
`}
				</span>
{`...`}
			<span style={{color:"lightgreen"}}>
{`
    <button onClick={() => push(7)}>Add 7</button>
    <button onClick={() => remove(1)}>Remove Second Element</button>
    <button onClick={() => update(1,9)}>Change Second Element to 9</button>
    <button onClick={() => filter(n => n < 4)}>Keep Numbers &lt; 4</button>
    <button onClick={() => set([1,2])}>Set to 1,2</button>
    <button onClick={clear}>Clear</button>
    <button onClick={() => set(initialArray)}>Reset</button>
`}
</span>
{`...`}


			<span style={{color:"lightgreen"}}>
{`


function useArray(initialValue)
	{
	const [array,setArray] = useState(initialValue);

	function push(element)
		{
		setArray([...array,element]);
		}

	function remove(element)
		{
		setArray(
			array.filter( (item,index) =>
			{
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
    setArray(a => a.filter(callback));
    }

  function clear()
    {
    setArray([]);
    }

  return {
    array,
    remove,
    push,
    update,
    filter,
    clear,
    set:setArray,
    reset:setArray,  // unused, try set(initialArray) instead
    }

`}
				</span>
			</code>
		</div>
		);
	}
