import React, { useEffect, useRef, useContext } from "react";

import useOnScreen from "./hooks/useOnScreen";
import useSourceCode from "./hooks/useSourceCode";

import { contextTranslate } from "./App.js";
import PageTitle from "./PageTitle";


export default function HookUseOnScreen()
	{
	console.log("%cHookUseOnScreen", "color: red");

  const { t } = useContext(contextTranslate);

	const header2Ref = useRef();

	const visibleAlmost = useOnScreen( header2Ref, { threshold:"1.0" } );
	const visible = useOnScreen( header2Ref, { rootMargin:"-250px" } );


	// Use autoFocus instead:
	// useEffect( () => document.querySelector("input").focus());

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"})
		}, []);


	return (
		<div className="hooks">
      <PageTitle hookName="useOnScreen" />
			<p>
				Basic custom hooks that can be incorporated into a developer's toolkit.
			</p>
			<p>
				A hook for lazily loading / displaying elements once they have
				scrolled into view.
			</p>
			<p>
				This one has two listeners, one for when threshold is 1.0 (fully
				visible) and a second when a little more scrolling occurs.
				Neat effect.
			</p>

			<hr />
			<h2>Header 1</h2>
			<pre style={{whiteSpace:"pre", textAlign:"center"}}><code>
{`
Scroll down to see second header...










Scroll down to see second header...










Scroll down to see second header...










Scroll down to see second header...




`}
			</code></pre>
			<h2 ref={header2Ref}
					style={{height:"2rem", padding:"2rem", outline:"1px solid red", whiteSpace:"nowrap"}}>
				
				{
					(visible && `Header 2: ${t("Fully Visible")}!`)
				||
					(visibleAlmost && `Header 2: ${t("scroll down")} ${t("more")}`)
				}
			</h2>

			<Code />
		</div>
		);	// end return
	}	// end HookUseOnScreen






// eslint-disable-next-line
function CodeOrig()
	{
	return(
			<div className="jsx" style={{marginTop:"2rem"}}><code>
				<span style={{color:"lightgreen"}}>
{`
  const header2Ref = useRef();

  const visibleAlmost = useOnScreen( header2Ref, { threshold:"1.0" } );
  const visible = useOnScreen( header2Ref, { rootMargin:"-110px" } );
`}
</span>
{`...`}
        <span style={{color:"lightgreen"}}>
{`
      <h2 ref={header2Ref}>Header 2 {" "}
        {visible && "(Visible!)" || visibleAlmost && "(A little more...)"}</h2>
...
`}
				</span>
        <span style={{color:"lightgreen"}}>
{`
function useOnScreen(ref, options = { rootMargin: "0px" })
  {
  const [isVisible, setIsVisible] = useState(false);

  // When ref or options change, run this:
  useEffect( () => {
    if (ref.current == null) return;

    const observer = new IntersectionObserver(
      // Callback for when visible (considering options): setIsVisible()
      ([entry]) => setIsVisible(entry.isIntersecting),
      // Visibility threshold or CSS-style margins:
      options
      );  // end observer


    // Observe the second <h2> header (in this case):
    observer.observe(ref.current);

    // Cleanup callback:
    return () => {
      if (ref.current == null) return;
      observer.unobserve(ref.current)
      }
    }, [ref.current, options]
    );  // end useEffect

  return isVisible;
  }  // end function

`}

				</span>
			</code>
		</div>

		);	// end return
	}	// end CodeOrig







function Code()
	{
	const code = `
import React, { useEffect, useRef } from "react";

import useOnScreen from "./hooks/useOnScreen";
import useSourceCode from "./hooks/useOnScreen";


export default function HookUseOnScreen()
	{
	const header2Ref = useRef();

	const visibleAlmost = useOnScreen( header2Ref, { threshold:"1.0" } );
	const visible = useOnScreen( header2Ref, { rootMargin:"-200px" } );

	// Use autoFocus instead:
	// useEffect( () => document.querySelector("input").focus());

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"})
		}, []);


	return (
		<div className="hooks">
			<h2>Hook <code>UseOnScreen</code></h2>
			<p>
				Basic custom hooks that can be incorporated into a developer's toolkit.
			</p>
			<p>
				A hook for lazily loading / displaying elements once they have
				scrolled into view.
			</p>
			<p>
				This one has two listeners, one for when threshold is 1.0 (fully
				visible) and a second when a little more scrolling occurs.
				Neat effect.
			</p>

			<hr />
			<h2>Header 1</h2>
			<pre style={{whiteSpace:"pre", textAlign:"center"}}><code>
{\`
Scroll down to see second header...










Scroll down to see second header...










Scroll down to see second header...










Scroll down to see second header...




\`}
			</code></pre>
			<h2 ref={header2Ref}>Header 2 {" "}
				{ (visible
					&& "(Fully Visible!)" )
					|| (visibleAlmost && "(A little more scrolling...)" )
				}
			</h2>




		</div>
		);	// end return
	}	// end HookUseOnScreen





import { useEffect, useState } from "react";


export default function useOnScreen(
		ref,
		options = { rootMargin: "-100px" }
		)
	{
	const [isVisible, setIsVisible] = useState(false);

	// When visible
	useEffect( () => {
		if (ref.current == null) return;

		const observer = new IntersectionObserver(
			// Callback for when visible (considering options): setIsVisible()
			([entry]) => setIsVisible(entry.isIntersecting),
			// Visibility threshold or CSS-style margins:
			//	{ rootMargin }
			options
			);	// end observer


		// Observe the second <h2> header (in this case):
		observer.observe(ref.current);

		// Cleanup callback:
		return () => {
			if (ref.current == null) return;
			observer.unobserve(ref.current)
			}
		//	}, [ref.current, rootMargin]
		}, [ref.current, options]
		);	// end useEffect

	return isVisible;
	}	// end function useOnScreen
`;

	const output = useSourceCode({code});
// console.log(code);
console.log("output NEXT:");
console.log(output);	// outputs false
console.log("output ABOVE:");

	return(
		<div className="codeFormatted">
			<hr />
			{output}
		</div>
		);	// end return
	}	// end Code
