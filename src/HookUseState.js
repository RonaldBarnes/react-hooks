import React, { useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import PageTitle from "./PageTitle";
/*
import { useParams, Link, Outlet } from "react-router-dom";
import HookUseStateMultiUpdates from './HookUseStateMultiUpdate';
import HookUseStateObjects from './HookUseStateObjects';

import './Hooks.css';
*/


export default function HookUseState()
	{
	console.log("%cHookUseState", "color: yellow");
/*
	// This can use useParams to determine which child component to render,
	// or it can be handled in the Routes section of App.js
	const childPage = useParams();
	let output = childPage.objects
		? <HookUseStateObjects />
		: childPage.multi
			? <HookUseStateMultiUpdates />
			: false
*/


  // Scroll to top after a delay:
  useEffect( () => {
    setTimeout( () =>
      window.scrollTo({top:0, behavior:"smooth"}),
      500
      )
    }, [])


//	output = output ? output :
	const output =
		<>
			<p>
				Kyle at Web Dev Simplified has a course on React hooks.
				We begin with the easy stuff,
				<a href="https://www.youtube.com/watch?v=O6P86uwfdR0"
					target="ReactHooks"
					>
					<code>useState</code>
				</a>.
			</p>
			<p>
				We'll look at performing multiple updates
				to a variable in a <code>setState()</code> so they don't cancel
				each other out in the {" "}
				<Link to="multi-updates">first example</Link>.
			</p>
		<p>
			In the {" "}
			<Link to="objects">second example</Link>, we'll examine updating
			multiple variables (scalar and an object) with
			<code>setState()</code> in an incorrect manner, then with a better
			manner, and finally in the best method.
		</p></>

	return (
		<div className="hooks">
      <PageTitle hookName="useState" />
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useState"
						target="ReactHooks">
						useState
					</a>
				</h3>
					<code>useState</code> is a React Hook that lets you add a state
					variable to your component.
			</blockquote>
			{output}
			<Outlet />
		</div>
		);
	}

