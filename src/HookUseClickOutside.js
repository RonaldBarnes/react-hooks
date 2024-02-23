import React, { useState, useRef, useEffect } from 'react';

import useClickOutside from "./hooks/useClickOutside";
import PageTitle from "./PageTitle";


export default function HookUseClickOutside()
	{
	console.log("%cHookUseClickOutside", "color: red");

	const [open, setOpen] = useState(false);
	const modalRef = useRef();

	// This hook will determine boundaries of what modalRef points to,
	// and run the callback if OUTSIDE of it:
	useClickOutside(modalRef, () => {
		if (open)
			{
			setOpen( prev => !prev);
			}
		});

	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		},[])


	return (
		<div className="hooks">
      <PageTitle hookName="useClickOutside" />
			<p>
				This hook will determine boundaries of what a Ref points to,
				and run the callback if click is OUTSIDE of it.
			</p>
			<p>
				Detect when user clicks outside a "modal" (or other DOM item).
			</p>
			<hr />
			<p>
				Click button to open "modal", click inside modal for no action,
				then click outside modal to close it.
			</p>
			<div className="counter">
				<button
					type="button"
					onClick={ () => setOpen(true)}
					autoFocus
					>
					Open Modal {open.toString()}
				</button>
				{ open && <div
						ref={modalRef}
						style={{ /* display: open ? "block" : "none", */
							width: "200px",
							height: "100px",
							margin: "1rem auto",
							padding: "1rem",
							border: "1px solid red",
							opacity: 1,
							color: "hsl(150, 50%, 50%)",
							boxShadow: "1px 1px 20px 0px lightgrey",
							}}
						>
						Modal...
					</div>
				}
			</div>
			<Code />
		</div>
		);	// end return
	}	// end function






function Code()
	{
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="green">
				{`
import { useClickOutside } from "./hooks/useClickOutside";

export default function HookUseClickOutside()
  {
  const [open, setOpen] = useState(false);
  const modalRef = useRef();

  // This hook will determine boundaries of what modalRef points to,
  // and run the callback if OUTSIDE of it:
  useClickOutside(modalRef, () => {
    if (open)
      {
      setOpen( prev => !prev);
      }
    });
`}
			</code>

			<code>
{`...
      <div className="counter">
        <button onClick={ () => setOpen(true)}>
          Open Modal {open.toString()}
        </button>
        { open && <div
            ref={modalRef}
            style={{ /* display: open ? "block" : "none", */
              width: "200px",
              height: "100px",
              margin: "1rem auto",
              padding: "1rem",
              border: "1px solid red",
              opacity: 1,
              color: "hsl(150, 50%, 50%)",
              boxShadow: "1px 1px 20px 0px lightgrey",
              }}
            >
            Modal...
          </div>
...
`}
			</code>

			<code className="green">
{`

import { useState, useRef } from "react";

import { useEventListener } from "../HookUseEventListener";

`}
			</code>
			<code className="red">
{`
export function useClickOutside(ref, callback)
  {
  // Opens then closes immediately due to dev mode?
  // This fixes it:
  let justOpened = useRef(true);

  useEventListener("click",
    e => {
      if (ref.current == null
          || ref.current.contains(e.target)
          || justOpened
          )
        {
        justOpened = false;
        return;
        }
      callback(e)
      },
    document
    );

  }  // end function

`}
			</code>
		</div>

		); // end return
	}	// end function
