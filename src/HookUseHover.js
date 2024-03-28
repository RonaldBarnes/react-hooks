
import React, { useEffect, useCallback, useContext, useState } from "react";

import useHover from "./hooks/useHover";
import useSourceCode from "./hooks/useSourceCode";

import { contextTranslate } from "./App.js";
import PageTitle from "./PageTitle";


export default function HookUseHover()
{
    const [domNode, setDomNode] = useState(null);
    const elementRef = useCallback(node => {
        setDomNode(node)
    });
    const { hovered, setHovered } = useHover(domNode);

    const { t } = useContext(contextTranslate);


	// // Scroll to top after a delay for autoFocus:
	// setTimeout( () =>
	// 	window.scrollTo({top:0, behavior:"smooth"}),
	// 	500
	// 	)
	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
    return () => {
      setHovered(false);
      }
		},[])


	return (
		<div className="hooks">
      <PageTitle hookName="useHover" />
			<p>
				A hook for determining if an element is being hovered over.
			</p>
			<p>
				Here's its used for styling a box, but normally
				more useful for invoking some code.
			</p>
			<hr />

			<p>Hover over the box to change its colour:</p>
			<div
				ref={elementRef}
				id="refID"
				style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          marginInline: "auto",
					width:"200px",
					height:"200px",
					backgroundColor: hovered ? "green" : "red",
					borderWidth: "1rem",
					borderStyle: "solid",
          borderColor: hovered ? "orange" : "black"
					}}
				>
          <p
           style={{textAlign:"center"}}
          >
            Hovering?<br />{t(hovered.toString())}
          </p>
			</div>

			<hr />
			<Code />
		</div>
		);	// end return
	}	// end HookUseHover








function Code()
	{
	const code = `
import React, { useRef } from "react";

import useHover from "./hooks/useHover";


export default function HookUseHover()
	{
	const elementRef = useRef();
	const hovered = useHover(elementRef);

	return (
		<div className="hooks">
			<p>Hover over the box to change its colour:</p>
			<div
				ref={elementRef}
				style={{
					width:"200px",
					height:"200px",
					margin:"auto",
					backgroundColor: hovered ? "green" : "red"
					}}
				>
			</div>

			<hr />
			<Code />
		</div>
		);	// end return
	}	// end HookUseHover




import { useState } from "react";

import useEventListener from "./useEventListener";

export default function useHover(elementRef)
	{
	const [hovered, setHovered] = useState(false);

	useEventListener("mouseover", () => setHovered(true), elementRef.current);
	useEventListener("mouseout", () => setHovered(false), elementRef.current);

	return hovered;
	}
`;
	const output = useSourceCode({code});
	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code
