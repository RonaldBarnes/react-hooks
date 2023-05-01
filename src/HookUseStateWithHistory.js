
import React, { useEffect } from "react";

import useStateWithHistory from "./hooks/useStateWithHistory";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseStateWithHistory(
		{
		language,
		t,
		}
	)
	{
	// console.log("%cHookUseStateWithHistory", "color: red");

	const [
		counter,
		setCounter,
			{
			history,
			pointer,
			back,
			forward,
			goto
			}
		] = useStateWithHistory(1);


	const [
		// We don't actually use the `name`, we use historyName[pointerName]:
		// eslint-disable-next-line
		name,
		setName,
			{
			history: historyName,
			pointer: pointerName,
			back: backName,
			forward: forwardName,
			goto: gotoName
			}
		] = useStateWithHistory("Ron");

	const namesArr = [
		"Ron",
		"Amy",
		"Bob",
		"Catherine",
		"Dan",
		"Evelyn",
		"Fami",
		"Moyun",
		];

	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		}, []);


	return (
		<div className="hooks">
			<h2>Hook <code>useStateWithHistory</code></h2>
			<p>
				The <code>useStateWithHistory</code> hook will save state changes
				to an array for navigating forward & back through changes.
			</p>
			<p>
				Buttons should be fairly self-explanitory. Where the beauty of this
				technique comes in is adding the "Name" state history:
				simply copy the <code>const name = useStateWithHistory(...)</code>
				declaration, and copy & paste, then change the history list and buttons
				and tack suffix "Name" on each of them...
			</p>
			<hr />

			<p>
				Counter / value: {" "} <span style={{fontSize:"2rem"}}>{counter}</span>
			</p>
			<p>
				History: [{history.map( (item,index) => {
						const comma = index === history.length - 1 ? "" : ", ";
						const fancyItem = index === pointer
							? <span style={{color:'red'}} key={index}>{item}{comma}</span>
							: `${item}${comma}`
						return fancyItem;
						})
					}]
			</p>
			<p>
				Current position: {" "} {pointer + 1} of {" "}
				{history.length} elements.
			</p>
			<p>
				<button
					type="button"
					onClick={ () => setCounter( c => c + 1)}
					>
					{t("Increment")}
				</button>
				<button
					type="button"
					onClick={ () => setCounter( c => c * 2)}
					>
					{t("Double")}
				</button>
				<button
					type="button"
					onClick={back}>
					{t("Back")}
				</button>
				<button
					type="button"
					onClick={forward}>
					{t("Forward")}
				</button>
				<button
					type="button"
					onClick={ () => goto(2-1)}>
					{t("Goto 2nd")}
				</button>
			</p>

			<h4>
				The hook can be easily re-used with another variable created from it:
			</h4>
			<p>
				Name History: [{historyName.map( (item,index) => {
						const comma = index === historyName.length - 1 ? "" : ", ";
						// If current position in mapped array == current pos in history,
						// make fancy display:
						const fancyItem = index === pointerName
							? <span style={{color:'red'}} key={index}>{item}{comma}</span>
							: `${item}${comma}`
						return fancyItem;
						})
					}]
			</p>

			<p>
				<button
					type="button"
					onClick={ () => {
						// Choose a name DIFFERENT than currently-pointed-at name:
						let tmpPtr = Math.floor(Math.random() * namesArr.length);
						while (namesArr[tmpPtr] === historyName[pointerName])
							{
							tmpPtr = Math.floor(Math.random() * namesArr.length);
							}
						setName( () => namesArr[tmpPtr]);
						}
						}
					autoFocus
					>
					{t("Add Random Name")}
				</button>
				<button
					type="button"
					onClick={backName}
					>
					{t("Back")}
				</button>
				<button
					type="button"
					onClick={forwardName}
					>
					{t("Forward")}
				</button>
				<button
					type="button"
					onClick={ () => gotoName(0)}
					>Goto 1st
				</button>
			</p>
			<Code />
		</div>
		);	// end return
	}	// end function HookUseStateWithHistory






// eslint-disable-next-line
function CodeOrig()
	{
	return(
		<div className="jsx"><code>

<span style={{color:"lightgreen"}}>
{`
function useStateWithHistory(callback, dependencies)
  {
  const [
    counter,
    setCounter,
      {
      history,
      pointer,
      back,
      forward,
      go }] = useStateWithHistory(1);

  const [
    name,
    setName,
      {
      history: historyName,
      pointer: pointerName,
      back: backName,
      forward: forwardName,
      go: goName }] = useStateWithHistory("Ron");

...
      <p>
        History: [{history.map( (item,index) => {
            const comma = index === history.length - 1 ? "" : ", ";
            const fancyItem = index === pointer
              ? <span style={{color:'red'}} key={index}>{item}{comma}</span>
              : \`\${item}\${comma}\`
            return fancyItem;
            })
          }]
      </p>
      <p>
        Current position: {" "} {pointer + 1} of {" "}
        {history.length} elements.
      </p>
      <p>
        <button onClick={ () => setCounter( c => c + 1)}>
          Increment
        </button>
        <button onClick={ () => setCounter( c => c * 2)}>
          Double
        </button>
        <button onClick={back}>
          Back
        </button>
        <button onClick={forward}>
          Forward
        </button>
        <button onClick={ () => go(2-1)}>
          Goto 2nd
        </button>
      </p>
...

function useStateWithHistory(defaultValue, { size = 10 } = {})
  {
  const [value, setValue] = useState(defaultValue);
  const historyRef = useRef([defaultValue]);
  const pointerRef = useRef(0);

  // Use set() as the hook's setter function:
  const set = useCallback(
    val => {
      // If initialized with function format, eval it, else get scalar value:
      const resolvedVal = typeof val === "function" ? val(value) : val;
      // Check if current pos in history has value different than parameter:
      if (historyRef.current[pointerRef.current] !== resolvedVal)
        {
        // Are we mid-way through history?
        if (pointerRef.current < historyRef.current.length - 1)
          {
          // Remove rest of history, we've gone back and made changes:
          historyRef.current.splice(pointerRef.current + 1);
          }
        // Now we can add new item to end of history:
        historyRef.current.push(resolvedVal);
        pointerRef.current = historyRef.current.length - 1;
        }
      setValue(val);
      }, [size, value])  // end set()


  // Move back one position in history:
  const back = useCallback( () => {
    if (pointerRef.current <= 0) return;
    pointerRef.current--;
    setValue( historyRef.current[pointerRef.current] );
    });


  // Move forward one position in history, but not past end of array:
  const forward = useCallback( () => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current++;
    setValue( historyRef.current[pointerRef.current]);
    });


  // Move to specific position in history:
  const go = useCallback( pos => {
    // Do not go outside bounds of history array:
    if (pos <=0 || pos > historyRef.current.length) return;
    pointerRef.current = pos;
    setValue( historyRef.current[pointerRef.current]);
    });


  return [value, set,
      {
      history: historyRef.current,
      pointer: pointerRef.current,
      back,
      forward,
      goto }];

  }  // end function

`}

				</span>
			</code>
		</div>

		);
	}	// end CodeOrig








function Code()
	{
	const code = `
import React, { useRef, useCallback, useEffect, useState } from "react";

import useStateWithHistory from "./hooks/useStateWithHistory";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseStateWithHistory()
	{
	const [
		counter,
		setCounter,
			{
			history,
			pointer,
			back,
			forward,
			goto
			}
		] = useStateWithHistory(1);

	const [
		// We don't actually use the "name", we use historyName[pointerName]:
		// eslint-disable-next-line
		name,
		setName,
			{
			history: historyName,
			pointer: pointerName,
			back: backName,
			forward: forwardName,
			goto: gotoName
			}
		] = useStateWithHistory("Ron");

	const namesArr = [
		"Ron",
		"Amy",
		"Bob",
		"Catherine",
		"Dan",
		"Evelyn",
		"Fami",
		"Moyun",
		];

	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		}, []);


	return (
		<div className="hooks">
			<h2>Hook <code>useStateWithHistory</code></h2>
			<p>
				Counter / value: {" "} <span style={{fontSize:"2rem"}}>{counter}</span>
			</p>
			<p>
				History: [{history.map( (item,index) => {
						const comma = index === history.length - 1 ? "" : ", ";
						const fancyItem = index === pointer
							? <span style={{color:'red'}} key={index}>{item}{comma}</span>
							: \`\${item}\${comma}\`
						return fancyItem;
						})
					}]
			</p>
			<p>
				Current position: {" "} {pointer + 1} of {" "}
				{history.length} elements.
			</p>
			<p>
				<button
					type="button"
					onClick={ () => setCounter( c => c + 1)}
					>
					Increment
				</button>
				<button
					type="button"
					onClick={ () => setCounter( c => c * 2)}
					>
					Double
				</button>
				<button
					type="button"
					onClick={back}>
					Back
				</button>
				<button
					type="button"
					onClick={forward}>
					Forward
				</button>
				<button
					type="button"
					onClick={ () => goto(2-1)}>
					Goto 2nd
				</button>
			</p>

			<h4>
				The hook can be easily re-used with another variable created from it:
			</h4>
			<p>
				Name History: [{historyName.map( (item,index) => {
						const comma = index === historyName.length - 1 ? "" : ", ";
						// If current position in mapped array == current pos in history,
						// make fancy display:
						const fancyItem = index === pointerName
							? <span style={{color:'red'}} key={index}>{item}{comma}</span>
							: \`\${item}\${comma}\`
						return fancyItem;
						})
					}]
			</p>

			<p>
				<button
					type="button"
					onClick={ () => {
						// Choose a name DIFFERENT than currently-pointed-at name:
						let tmpPtr = Math.floor(Math.random() * namesArr.length);
						while (namesArr[tmpPtr] === historyName[pointerName])
							{
							tmpPtr = Math.floor(Math.random() * namesArr.length);
							}
						setName( () => namesArr[tmpPtr]);
						}
						}
					autoFocus
					>
					Add Random Name
				</button>
				<button
					type="button"
					onClick={backName}
					>Back
				</button>
				<button
					type="button"
					onClick={forwardName}
					>Forward
				</button>
				<button
					type="button"
					onClick={ () => gotoName(0)}
					>Goto 1st
				</button>
			</p>
		</div>
		);	// end return
	}	// end function HookUseStateWithHistory








import { useRef, useCallback, useState } from "react";


export default function useStateWithHistory(defaultValue, { size = 10 } = {})
	{
	const [value, setValue] = useState(defaultValue);
	const historyRef = useRef([defaultValue]);
	const pointerRef = useRef(0);

	// Use set() as the hook's setter function:
	const set = useCallback(
		val => {
			// If initialized with function format, eval it, else get scalar value:
			const resolvedVal = typeof val === "function" ? val(value) : val;
			// Check if current pos in history has value different than parameter:
			if (historyRef.current[pointerRef.current] !== resolvedVal)
				{
				// Are we mid-way through history?
				if (pointerRef.current < historyRef.current.length - 1)
					{
					// Remove rest of history, we've gone back and made changes:
					historyRef.current.splice(pointerRef.current + 1);
					}
				// Now we can add new item to end of history:
				historyRef.current.push(resolvedVal);
				pointerRef.current = historyRef.current.length - 1;
				}
			setValue(val);
			}, [size, value])	// end set()


	// Move back one position in history:
	const back = useCallback( () => {
		if (pointerRef.current <= 0) return;
		pointerRef.current--;
		setValue( historyRef.current[pointerRef.current] );
		});


	// Move forward one position in history, but not past end of array:
	const forward = useCallback( () => {
		if (pointerRef.current >= historyRef.current.length - 1) return;
		pointerRef.current++;
		setValue( historyRef.current[pointerRef.current]);
		});


	// Move to specific position in history:
	const goto = useCallback( pos => {
		// Do not go outside bounds of history array:
		if (pos < 0 || pos > historyRef.current.length) return;
		pointerRef.current = pos;
		setValue( historyRef.current[pointerRef.current]);
		});


	return [value, set,
			{
			history: historyRef.current,
			pointer: pointerRef.current,
			back,
			forward,
			goto }];

	}	// end function useStateWithHistory
`;

	const output = useSourceCode({code});

	return(
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code




























// <h1>under construction, will fix tomorrow</h1>
// <h2>What the hell happened?</h2>
// <h3>I'm importing things correctly, I just cleaned up the formatting some time ago.</h3>
// <h4>Now, I can't even import the hook, modified to do NOTHING but a simple 
// <code>useState</code> and return that value.</h4>
// <h5>It's fucked UP and I can't find it and it's late.</h5>
// TypeError: _hooks_useStateWithHistory__WEBPACK_IMPORTED_MODULE_2___default() is not a function		</div>
//	***********************************************************************
//	When I split useStateWithHistory into a separate file, I missed the .js
//	extension, so that was f-ing me up.
