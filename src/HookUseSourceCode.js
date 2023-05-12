
import React, { useEffect } from "react";

import useSourceCode from "./hooks/useSourceCode";


export default function HookUseSourceCode()
	{
	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[])


	return (
		<div className="hooks">
			<h2>Hook <code>HookUseSourceCode</code></h2>
			<p>
				This hook was not part of the course, but something I came
				up with myself to show nicely-formatted source code on
				each hook's page.
			</p>
			<p>
				I started out manually copying, pasting, and styling the
				relevant bits of source code on each page, but that became
				too time consuming.
			</p>
			<p>
				When playing with <code>hookUseClipboard</code>, I found that
				pasting code copied from VS Code included syntax highlighting.
			</p>
			<p>
				This lead me down a rabbit hole, where I found that installing
				<code>react-syntax-highlighter</code> made the work much
				faster and easier.
			</p>
			<hr />

			<Code />
		</div>
		);	// end return
	}	// end HookUseSourceCode








function Code()
	{
	const code = `
import useSourceCode from "./hooks/useSourceCode";

export default function HookBlahBlah()
	{
	return (
		<div>
			blah blah blah
			<Code />
		</div>
		); end return
	}	// end HookBlahBlah


function Code()
	{
	const code = "
	...
";
	const output = useSourceCode({code});
	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code



import React, { useState, useEffect } from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { atelierDuneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { atelierForestDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useLocalStorage } from "./useStorage";



export default function useSourceCode({code, options})
	{
	// The string version of the name:
	const [styleName, setStyleName] = useLocalStorage(
		"sourceCodeStyle", "stackoverflowDark");
	// Styles are objects, not strings:
	const [style, setStyle] = useState(styleName);

	useEffect( () => styleFromText(styleName), []);


	// Take the text from the select / drop-down and update state to the
	// object with same name:
	// Definitely feel like I'm overlooking an obvious better method!
	function styleFromText(styleText)
		{
		if (styleText === "a11yDark")
			{
			setStyle( () => a11yDark);
			setStyleName( () => styleText);
			}
		else if (styleText === "monokaiSublime")
			{
			setStyle( () => monokaiSublime);
			setStyleName( () => styleText);
			}
		else if (styleText === "stackoverflowDark")
			{
			setStyle( () => stackoverflowDark);
			setStyleName( () => styleText);
			}
		else if (styleText === "atelierCaveLight")
			{
			setStyle( () => atelierCaveLight);
			setStyleName( () => styleText);
			}
		else if (styleText === "atelierDuneDark")
			{
			setStyle( () => atelierDuneDark);
			setStyleName( () => styleText);
			}
		else if (styleText === "atelierForestDark")
			{
			setStyle( () => atelierForestDark);
			setStyleName( () => styleText);
			}
		}


	return (
		<>
			<label htmlFor="sourceStyle">
				Choose source code format: {" "}
			</label>
			<select name="sourceStyle"
				onChange={(e) => styleFromText(e.target.value)}
				value={styleName}
				>
				<optgroup label="Dark">
					<option value="a11yDark">
						a11y-dark
					</option>
					<option value="atelierDuneDark">atelier-dune-dark</option>
					<option value="atelierForestDark">atelier-forest-dark</option>
					<option value="monokaiSublime">monokai-sublime</option>
					<option value="stackoverflowDark">stackoverflow-dark</option>
				</optgroup>
				<optgroup label="Light">
					<option value="atelierCaveLight">atelier-cave-light</option>
				</optgroup>
			</select>

			<div className="jsx" style={{marginTop:"1rem"}}>
				<SyntaxHighlighter
					language="javascript"
					style={style}
					wrapLines={true}
					>
					{code.replaceAll("	", "  ")}
				</SyntaxHighlighter>
			</div>
		</>
		);	// end return
	}	// end function

`;
	const output = useSourceCode({code});
	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code
