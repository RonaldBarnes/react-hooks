import React,
		{
    useEffect,
		useId,
		}
	from 'react';

import PageTitle from "./PageTitle";


export default function HookUseId()
	{
	console.log("%cHookUseId", "color: yellow");


  // Scroll to top after a delay:
  useEffect( () => {
    setTimeout( () =>
      window.scrollTo({top:0, behavior:"smooth"}),
      500
      )
    }, [])


	return (
		<div className="hooks">
      <PageTitle hookName="useId" />
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useId"
						target="ReactHooks">
						<code>useId</code>
					</a>
				</h3>
				<p>
					<code>useId</code> is a React Hook that lets you create random IDs
				</p>
			</blockquote>

			<p>
				This is (finally) and easy one.  Generate random <code>id</code>
				values on-the-fly.
			</p>
			<p>
				Below are two email entry fields, both calls to the Email
				child component.
			</p>
			<p>
				For the labels to work correctly (click the word "Email" and focus
				into the associated entry field), they need unique IDs.
				This can be achieved easily with the <code>useId</code> hook.
			</p>
			<p>
				<Email />
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
				ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
				pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
				culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<p>
				<Email />
			</p>

			<div className="jsx" style={{marginTop:"2rem"}}><code>
{`
export default function HookUseId()
  {
function Email()
  {
  const id = useId();

  return (
    <>
      <label htmlFor={id}>Email:{" "}</label>
      <input type="email" id={id} />
    </>
    );  // end return
  }  // end function
`}
			</code></div>

		</div>
		);
	}




function Email()
	{
	const id = useId();

	return (
		<>
			<label htmlFor={ `${id}-email` }>Email:{" "}</label>
			<input type="email" id={ `${id}-email` } />
		</>
		);	// end return
	}	// end function


// export React.forwardRef(ConfirmationModal)

