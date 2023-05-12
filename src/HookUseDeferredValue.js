
import React, {
	useState,
	useDeferredValue,
	useMemo,
	// useEffect
	} from "react";



export default function HookDeferredValue()
	{
	console.log("%cHookUseDeferredValue", "color: yellow");

	const [input, setInput] = useState("");
	const deferredInput = useDeferredValue(input);

	// Fade list when awaiting pending update:
	const pendingStyle = {opacity: deferredInput === input ? 1 : 0.5}

	// focus input field upon load + 2 seconds (autoFocus has then fired):
	// 	document.querySelector("input").focus()
	setTimeout( () =>
		window.scrollTo({top:0, behavior:"smooth"}),
		500
		)


	function handleChange(e)
		{
		e.preventDefault()
		setInput(e.target.value);
		}

	return (
		<div className="hooks">
			<h2>Hook <code>useDeferredValue</code></h2>
			<blockquote>
				<a href="https://react.dev/reference/react/useDeferredValue"
					target="ReactHooks"
					>
					<code>useDeferredValue</code>
				</a> is a React Hook that lets you defer
				updating a part of the UI.
			</blockquote>
			<p>
				Once again, we'll use an input field to generate a large list of
				div elements in a separate component.
			</p>
			<p>
				We'll pass a deferredValue to the sub-component, which will combine
				the <code>useMemo</code> to only update the large list once the
				deferred value has updated.
			</p>

			<input
				type="text"
				value={input}
				onChange={handleChange}
				name="input"
				autoFocus
				/>
			<div style={{...pendingStyle,
					maxHeight:"200px",
					overflow:"scroll",
					margin:"0 0 2rem 1rem",
					}}>
				<LargeList
					value={deferredInput}
					/>
			</div>

		<pre className="jsx"><code>
{`
const [input, setInput] = useState("");
const deferredInput = useDeferredValue(input);

// Fade list when awaiting pending update:
const pendingStyle = {opacity: deferredInput === input ? 1 : 0.5}

// focus input field upon load:
useEffect( () =>
  document.querySelector("input").focus()
  )

<input
  type="text"
  value={input}
  onChange={handleChange}
  name="input"
  />
<div style={{...pendingStyle,
    maxHeight:"200px",
    overflow:"scroll",
    margin:"0 0 2rem 1rem",
    }}>
`}
<span style={{color:"lightgreen"}}>
{`  <LargeList
    value={deferredInput}
    />
`}
</span>
{`
// Generate large list of elements containing contents of input field.
// Defer rendering so input field remains responsive.
`}
<span style={{color:"lightgreen"}}>
{`function LargeList( {value} )
  {
  const [largeList, setLargeList] = useState([]);

  // useMemo to cache the value (when value is a deferredValue):
  useMemo( () =>
    {
    // Unless input field empty, generate large list:
    const tmpArray = value.length > 0 ? new Array(5000).fill(value) : [];
    setLargeList(tmpArray);
    }, [value]
  );  // end useMemo
`}
</span>
{`
  return (
    <>
      <h4 style={{marginTop:"0.5rem"}}>
        LargeList
      </h4>
      {largeList.map( (item,index) => {
        return <div
          key={index}>
            {index.toLocaleString()}: {item}
          </div>
        })
        }
    </>
    );  // end return
  }  // end function

`}
		</code></pre>
		</div>
		);	// end return
	}	// end function





// Generate large list of elements containing contents of input field.
// Defer rendering so input field remains responsive.
function LargeList( {value} )
	{
	const [largeList, setLargeList] = useState([]);

	// useMemo to cache the value (when value is a deferredValue):
	useMemo( () =>
		{
		// Unless input field empty, generate large list:
		const tmpArray = value.length > 0 ? new Array(5000).fill(value) : [];
		setLargeList(tmpArray);
		}, [value]
	);	// end useMemo


	return (
		<>
			<h4 style={{marginTop:"0.5rem"}}>
				LargeList
			</h4>
			{largeList.map( (item,index) => {
				return <div
					key={index}>
						{index.toLocaleString()}: {item}
					</div>
				})
				}
		</>
		);	// end return
	}	// end function

