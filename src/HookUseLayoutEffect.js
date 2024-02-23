
import React,
		{
		useState,
		useRef,
		useEffect,
		useLayoutEffect
		}
	from "react";
import { Link } from 'react-router-dom';
import PageTitle from "./PageTitle";


export default function HookUseLayoutEffect()
	{
	console.log("%cHookUseLayoutEffect", "color: red");

	useEffect( () => {
		// Focus on "Open" button after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			)
		},[])



	return(
		<div className="hooks">
      <PageTitle hookName="useLayoutEffect" />
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useLayoutEffect"
						target="ReactHooks">
						useLayoutEffect
					</a>
				</h3>
				<code>useLayoutEffect</code> is a version of useEffect that fires
				before the browser repaints the screen.
			</blockquote>
			<p>
				Very similar to
				<Link to="/useEffect">
					<code>useEffect</code>
				</Link>, {" "}
				<b>except</b> this hook is syncronous and <code>useEffect</code>
				is <b>asyncronous</b>.
			</p>
			<p>
				Used when modifying the DOM in ways visible to the user,
				placing elements positionally within the page, for example, or
				changing themes.
			</p>
			<p>
				I'm struggling to devise a test scenario. The course material had to
				slow down the video to make the effect visible.
				I think I'll move on to the next hook.
			</p>
			<h4>Update</h4>
			<p>
				Since React 18, <code>useLayout</code> examples like what I've
				attempted to implement will not work:
			</p>
			<blockquote>
				<h4>
					New in 18: <code>useEffect</code> fires synchronously when it's the
					result of a discrete input {" "}
					<a href="https://github.com/reactwg/react-18/discussions/128"
						target="ReactHooks"
						>
						#128
					</a>.
				</h4>
				<h4>Background</h4>
				<p>
					A discrete input is a type of event where the result of one event
					can affect the behavior of the next, like clicks or presses.
					Multiple discrete events cannot be batched or throttled without
					affecting program behavior.
				</p>
			</blockquote>

			<div style={{
					display:"grid",
					gridTemplateColumns:"1fr 1fr",
					gap:"2rem",
					backgroundColor:"hsl(250,20%,50%)",
					borderRadius:"15px",
					boxShadow:"0px 0px 15px lightgrey",
					padding:"1rem",
					marginTop:"2rem",
					}}>
				<WithoutLayoutEffect />
				<WithLayoutEffect />
			</div>
		</div>
		);	// end return
	}	// end function




function WithoutLayoutEffect()
	{
	const [show, setShow] = useState(false);
	const popup = useRef();
	const button = useRef();

/*
	function updateShow(e)
		{
		console.log("updateShow()");
		let x = [];
		for (let i = 0; i < 10000000; i++)
			{
			x.push(Math.random());
			}
		setShow( prevShow => !prevShow );
		}
*/

	useEffect( () => {
		if (popup.current == null || button.current == null) return;
		const { left,bottom } = button.current.getBoundingClientRect();
		popup.current.style.left = `${left}px`;
		// popup.current.style.top = `${bottom + 50}px`;
		popup.current.style.top = `${bottom + 100}px`;

		let x = [];
		for (let i = 0; i < 10000000; i++)
			{
			x.push(Math.random());
			}
		}, [show]);

	return (
		<div style={{display:"grid", gridTemplateRows:"2fr 1fr 2fr"}}>
			<div>
				With <code>useEffect</code>, the pop-up should appear very briefly
				under the button before it gets
				moved down by ~50px. It's too quick to see though, despite trying
				to add a timer / delay.
			</div>
			<div className="counter">
				<button
					ref={button}
					onClick={() => setShow(prev => !prev)}
					autoFocus
					>
					Click for pop-up
				</button>
			</div>
			{show && (
			<div className="counter"
				style={{position:"static"}}
				// style={{position:"fixed"}}
				ref={popup}
				>
				This is a pop-up
			</div>
			)}
		</div>
		);	// end return
	}	// end function WithoutLayoutEffect






function WithLayoutEffect()
	{
	const [show, setShow] = useState(false);
	const popup = useRef();
	const button = useRef();

	useLayoutEffect( () => {
		if (popup.current == null || button.current == null) return;

		let x = [];
		for (let i = 0; i < 10000000; i++)
			{
			x.push(Math.random());
			}
		const { left,bottom } = button.current.getBoundingClientRect();
		popup.current.style.left = `${left}px`;
		popup.current.style.top = `${bottom + 100}px`;
		}, [show]);

	// A div for constant-display of button top/bottom coords, since issues
	// with placement of pop-up. Resolved via position:static instead of :absolute
	// let xxx = document.querySelector("#xxx");
	// useEventListener("scroll", e => {
	// 	if (xxx === null) return;
	// 	xxx.innerHTML = "";
	// 	let para = document.createElement("p");
	// 	const {top, bottom} = button.current.getBoundingClientRect();
	// 	para.textContent = `top: ${parseInt(top)}px  bottom: ${parseInt(bottom)}px`;
	// 	xxx.appendChild(para)
	// 	})


	return (
		<div style={{display:"grid", gridTemplateRows:"2fr 1fr 2fr"}}>
			<div>
				With <code>useEffectLayout</code>, the pop-up should appear
				at its final location under the button without rendering artifacts.
			</div>
			<div className="counter">
				<button
					ref={button}
					onClick={ () => setShow(prev => !prev)}
					>
					Click for pop-up
				</button>
			</div>
			{/* <div id="xxx">Button position:</div> */}
			{show && (
				<div className="counter"
					// style={{position:"absolute"}}
					// style={{position:"relative"}}	// way to bottom, right; off screen both axes
					style={{position:"static"}}		// kind of works, directly below button...
					// style={{position:"fixed"}}	// works: Npx below button, fixed when scrolling
					ref={popup}
					>
					This is a pop-up
				</div>
				)}
			</div>
		);	// end return
	}	// end function WithLayoutEffect
