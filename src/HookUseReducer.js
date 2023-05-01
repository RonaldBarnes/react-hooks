
import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
// import HookReducerCounter from "./HookUseReducerCounter";
// import HookReducerTodos from "./HookUseReducerTodos";


export default function HookUseReducer()
	{
	// Scroll to top after a delay for autoFocus:
	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"})
		}, [])


	return (
		<div className="hooks">
			<h2>
				Hook useReducer
			</h2>
			<blockquote>
				<h3>
					<a href="https://react.dev/reference/react/useReducer"
						target="new">
						useReducer
					</a>
				</h3>
					<p>
						<code>useReducer</code> is a React Hook that lets you
						add a {" "}
						<a href="https://react.dev/learn/extracting-state-logic-into-a-reducer"
							target="new"
							>
							reducer
						</a> to your component.
					</p>
					<p>
						Components with many state updates spread across many event handlers can 
						get overwhelming. For these cases, you can consolidate all the
						state update logic outside your component in a single function,
						called a reducer.
					</p>
			</blockquote>
			<p>
				This hook really exciting, <code>useReducer</code>
				is probably the one hook I'm most looking forward to implementing.
			</p>
			<p>
				I like Redux, but it's a bit hard to
				implement and track all the moving parts.
			</p>
			<p>
				I did use Redux during the {" "}
				<a href="http://bclug.ca:3000/"
					target="new"
					>
					gaming excercises
				</a>
				{" "} of the {" "}
				<a href="https://www.udemy.com/course/the-advanced-web-developer-bootcamp/"
					target="new"
					>
					Advanced JavaScript Bootcamp Course
				</a> projects.
				This allowed the state to be "lifted" out of a couple games so that
				game state could be preserved when switching between them.
				Pretty neat, but overkill.
			</p>
			<p>
				There's a {" "}
				<Link to="counter">simple counter</Link>.
			</p>
			<p>
				There's also the {" "}
				<Link to="todos">obligatory Todos List</Link>.
			</p>
			<Outlet />
		</div>
		);	// end return
	}	// end function
