import React,
		{
		useImperativeHandle,
		useState,
		useRef,
		forwardRef,
		useEffect,
		}
	from 'react';

import useSourceCode from "./hooks/useSourceCode";
import PageTitle from "./PageTitle";


// Importing component FROM THIS FILE, so it can be wrapped in a
// React.forwardRef
// I'm certain there's a better way, but for now, this is a hack:
// import { ConfirmationModal } from "./HookUseImperativeHandle";


export default function HookUseImperativeHandle()
	{
	console.log("%cHookUseImperativeHandle", "color: yellow");

	const [open,setOpen] = useState(false);
	const modalRef = useRef()

  // Scroll to top after a delay:
  useEffect( () => {
    setTimeout( () =>
      window.scrollTo({top:0, behavior:"smooth"}),
      500
      )
    }, [])


	return (
		<div className="hooks">
      <PageTitle hookName="useImperativeHandle" />
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useImperativeHandle"
						target="ReactNotes">
						<code>useImperativeHandle</code>
					</a>
				</h3>
				<p>
					<code>useImperativeHandle</code> is a React Hook that lets you
					customize the handle exposed as a ref.
				</p>
				<p>
					By default, components don’t expose their DOM nodes to parent
					components.
				</p>
			</blockquote>
			<p>
				<a href="https://www.youtube.com/watch?v=zpEyAOkytkU"
					target="ReactNotes"
					>Course video
				</a> {" "} on <code>useImperativeHandle</code>.
			</p>
			<p>
				Pass refs to child components. Where <code>useForwardRef</code>
				works for passing a single ref, this hook is for custom refs.
			</p>
			<p>
				However, <code>forwardRef</code> is <b>also</b> used in this example.
			</p>
			<p>
				Here, a ref is passed to a child component, which is re-mapped(?) to
				three functions that will put focus on buttons within the
				child component.
			</p>
			<p>
				The child component uses <code>forwardRef</code> to pass back the
				modified ref, allowing the parent component to put focus onto buttons
				in the child.
			</p>

			<div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)"}}>
				<button
					type="button"
					id="btnOpen"
					onClick={() => setOpen(true)}
					autoFocus
					disabled={open}
					>
					Open
				</button>
				{ open && (
					<>
						{" "}
						<button type="button" onClick={() => modalRef.current.focusCloseBtn()}>
							Focus Close
						</button>
						<button type="button" onClick={() => modalRef.current.focusConfirmBtn()}>
							Focus Confirm
						</button>
						{" "}
						<button type="button" onClick={() => modalRef.current.focusDenyBtn()}>
							Focus Deny
						</button>
					</>
					) }
			</div>

			<ConfirmationModal
				ref={modalRef}
				isOpen={open}
				onClose={() => setOpen(false)}
				/>

			<Code />
		</div>
		);
	}




const ConfirmationModal = forwardRef(
	function ConfirmationModal( {isOpen, onClose}, ref)
		{
		const closeRef = useRef();
		const confirmRef = useRef();
		const denyRef = useRef();

		useImperativeHandle( ref, () => {
			return {
				focusCloseBtn: () => {console.log("CLOSE"); closeRef.current.focus()},
				focusConfirmBtn: () => {console.log("YES"); confirmRef.current.focus()},
				focusDenyBtn: () => {console.log("NO"); denyRef.current.focus()},
				}
			},
			// always throws error if empty dependency array passed in
			//	(should make it run only once):
			// []
			);

		if (!isOpen) return null;


		return (
			<div
					ref={ref}
					style={{
						boxShadow:"0px 0px 20px grey",
						marginTop:"2rem",
						borderRadius:"10px",
						border:"1px solid cornflowerblue",
						padding:"1rem",
						width:"max-content",
						display:"flex",
						flexDirection:"column",
						}}
					>

				<button
						onClick={onClose}
						ref={closeRef}
						className="btn"
						type="button"
						>
					&times;
				</button>
				<h1>sub-Component</h1>
				<h2>Do you wish to confirm?</h2>
				<button
						onClick={onClose}
						ref={confirmRef}
						className="btn"
						style={{backgroundColor:"lightgreen", color:"black"}}
						type="button"
						>
					Yes
				</button>
				<button
						onClick={onClose}
						ref={denyRef}
						className="btn"
						style={{backgroundColor:"red", color:"black"}}
						type="button"
						>
					No
				</button>
			</div>
			);	// end return
		}	// end function
	)	// end forwardRef


// export React.forwardRef(ConfirmationModal)



function Code()
	{
	const code = `
export default function HookUseImperativeHandle()
	{
	console.log("%cHookUseImperativeHandle", "color: yellow");

	const [open,setOpen] = useState(false);
	const modalRef = useRef()

	return (
		<div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)"}}>
			<button type="button" id="btnOpen" onClick={() => setOpen(true)}>
				Open
			</button>
			{ open && (
				<>
					{" "}
					<button type="button" onClick={() => modalRef.current.focusCloseBtn()}>
						Focus Close
					</button>
					<button type="button" onClick={() => modalRef.current.focusConfirmBtn()}>
						Focus Confirm
					</button>
					{" "}
					<button type="button" onClick={() => modalRef.current.focusDenyBtn()}>
						Focus Deny
					</button>
				</>
				) }


			<ConfirmationModal
				ref={modalRef}
				isOpen={open}
				onClose={() => setOpen(false)}
				/>
		</div>
		); // end return
	}	// end function HookUseImperativeHandle







// NOTE THE USEAGE OF forwardRef:
// NOTE THE USEAGE OF forwardRef:
// NOTE THE USEAGE OF forwardRef:
const ConfirmationModal = forwardRef(
	function ConfirmationModal( {isOpen, onClose}, ref)
		{
		const closeRef = useRef();
		const confirmRef = useRef();
		const denyRef = useRef();

		useImperativeHandle( ref, () => {
			return {
				focusCloseBtn: () => {console.log("CLOSE"); closeRef.current.focus()},
				focusConfirmBtn: () => {console.log("YES"); confirmRef.current.focus()},
				focusDenyBtn: () => {console.log("NO"); denyRef.current.focus()},
				}
			},
			// always throws error if empty dependency array passed in
			//	(should make it run only once):
			// []
			);

		if (!isOpen) return null;


		return (
			<div
					ref={ref}
					style={{
						boxShadow:"0px 0px 20px grey",
						marginTop:"2rem",
						borderRadius:"10px",
						border:"1px solid cornflowerblue",
						padding:"1rem",
						width:"max-content",
						display:"flex",
						flexDirection:"column",
						}}
					>

				<button
						onClick={onClose}
						ref={closeRef}
						className="btn"
						type="button"
						>
					&times;
				</button>
				<h1>sub-Component</h1>
				<h2>Do you wish to confirm?</h2>
				<button
						onClick={onClose}
						ref={confirmRef}
						className="btn"
						style={{backgroundColor:"lightgreen", color:"black"}}
						type="button"
						>
					Yes
				</button>
				<button
						onClick={onClose}
						ref={denyRef}
						className="btn"
						style={{backgroundColor:"red", color:"black"}}
						type="button"
						>
					No
				</button>
			</div>
			);	// end return
		}	// end function
	)	// end forwardRef

`;

	const output = useSourceCode({code});


	return (
		<div className="codeFormatted">
			<hr />
			{output}
		</div>
		);	// end return
	}	// end function Code
