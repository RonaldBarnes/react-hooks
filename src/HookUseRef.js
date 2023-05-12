
import React, { useState, useRef, useEffect } from "react";



export default function HookUseRef()
	{
	const [counter, setCounter] = useState(0);
	const renderCounter = useRef(0);

	useEffect( () => {
		setTimeout( () => {
			window.scrollTo({top:0, behavior:"smooth"});
			}, 500)
		},[])

	function updateCounter(value)
		{
		setCounter( counter => counter + value);
		}

	useEffect( () => {
		// Using brace brackets to enclose, else implied "return" and useEffect
		// can NOT return anything but a cleanup function
		renderCounter.current += 1;
		console.log("%cHookUseRef:useEffect", "color:lightgreen");
		return () => {
			console.log("%cHookUseRef:useEffect return()", "color:yellow");
			}
//		}, [counter, inputRef1, inputRef2]);
		});

	const [input1, setInput1] = useState("");
	const [input2, setInput2] = useState("");

	const inputRef1 = useRef();
	const inputRef2 = useRef();

	function setFocus(refName)
		{
		refName.current.focus()
		}


	return (
		<div className="hooks">
			<h2>
				Hook useRef
			</h2>
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useRef"
						target="ReactHooks">
						useRef
					</a>
				</h3>
					<p>
						<code>useRef</code> is a React Hook that lets you
						reference a value that’s not needed for rendering.
					</p>
					<p>
						useRef returns a ref object with a single current property
						initially set to the initial value you provided.
					</p>
					<p>
						On the next renders, useRef will return the same object.
						You can change its current property to store information
						and read it later. This might remind you of state, but there
						is an important difference.
					</p>
					<p>
						Changing a ref does not trigger a re-render. This means refs are
						perfect for storing information that doesn’t affect the visual
						output of your component.
					</p>
			</blockquote>
			<p>
				The <code>useRef()</code> hook is handy for preserving a variable's
				value between renders, and the variable can be updated without
				triggering a re-render.
			</p>
			<p>
				It also has uses when one needs to refer to DOM elements, as they get
				refs assigned automatically by React.
			</p>

			<p>
				A render counter using <code>useRef</code>, where we update a
				variable without triggering another render, entering an infinite
				loop of
			</p>
			<ol>
				<li>render</li>
				<li>update render counter via state</li>
				<li>re-render</li>
				<li>goto 1</li>
			</ol>
			<p>
				The <code>useEffect</code> hook is used to trigger an update of
				the <code>renderCounter</code> when the <code>counter</code> is
				updated via <code>useState</code>.
			</p>
			<div className="counter">
				<button
					type="button"
					onClick={ () => updateCounter(-1)}
					> -1 
				</button>
				{" "} {counter} {" "}
				<button
					type="button"
					onClick={ () => updateCounter(1)}
					autoFocus
					> +1 
				</button>
				<p>
					Render counter: {renderCounter.current}
				</p>
				<input
					name="input1"
					ref={inputRef1}
					value={input1}
					type="text"
					onChange={ e => setInput1(e.target.value) }
					/>
				{" "}
				<input
					name="input2"
					ref={inputRef2}
					value={input2}
					type="text"
					onChange={ e => setInput2(e.target.value) }
					/>
				<p>
					<button
						onClick={() => setFocus(inputRef1)}
						>
						Focus input 1
					</button>
					{" "}
					<button
						onClick={() => setFocus(inputRef2)}
						>
						Focus input 2
						</button>
				</p>
			</div>
		</div>
		);	// end return
	}	// end function
