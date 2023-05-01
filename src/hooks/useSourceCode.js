
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

console.log(`%cuseSourceCode`, "color:green");
console.log(code);


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
