
import React, { useEffect } from 'react';
// import PageTitle from "./PageTitle";


export default function Home()
	{
	console.log("%cHome", "color: red");

	useEffect( () => {
		setTimeout( () => {
			window.scrollTo({top:0, behavior:"smooth"})
			})
		});

  const pageTitle = process.env.REACT_APP_APP_NAME || "React Hooks";
  document.title = `${pageTitle}: Home`


	return(
		<div className="hooks">
      <h2>React Hooks Home Page</h2>
			<blockquote>
				<a href="https://legacy.reactjs.org/docs/hooks-rules.html"
					target="ReactHooks"
					>
					Rules of Hooks
					</a>
				<br />
				Hooks are a new addition in React 16.8. They let you use state and
				other React features without writing a class.
			</blockquote>
			<p>
				Took a brief but {" "}
				<a href="https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h"
					target="ReactHooks"
					>
					informative course on React hooks
				</a>, and implemented
				the main concepts here as a learning enhancement project as well as
				a set of notes.
			</p>
			<p>
				Kyle at <a href="https://www.youtube.com/@WebDevSimplified"
					target="ReactHooks">Web Dev Simplified</a> is a pretty good instructor.
				Since I've been watching his and {" "}
				<a href="https://www.youtube.com/@kevinpowell"
					target="ReactHooks">Kevin Powell</a>'s channels quite a bit,
				I signed up for Kyle's {" "}
				<a href="https://courses.webdevsimplified.com/react-hooks-simplified"
					target="ReactHooks">React Hooks course</a>.
			</p>
			<p>
				I learned React on versions prior to hooks being implemented, and
				hence wanted to really get a better understanding of their benefits.
			</p>
			<h3>
				"Mission Accomplished."
			</h3>
			<p>
				This project also uses <code>BrowserRouter</code>,
				<code>Routes</code>, <code>Route</code>, plus
				<code>Link</code>, <code>NavLink</code>, and <code>Outlet</code>
				from <code>react-router-dom</code>.
				<br />
				I implemented some <code>useParams</code>, but then removed them,
				as nested <code>Route</code>s did the job perfectly.
			</p>
			<hr />
			<p>
				I kinda messed up the responsive design. When I made a button to expand / collapse
				the sidebar, it interfered / conflicted with the media query that determined whether
				to display it.
			</p>
			<p>
				Got that worked out, and I'm really happy with the result!
			</p>
		</div>
		);
	}
