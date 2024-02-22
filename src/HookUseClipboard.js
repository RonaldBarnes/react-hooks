import React, { useEffect, useState, useContext } from 'react';

import useClipboard from "./hooks/useClipboard";
import useSourceCode from "./hooks/useSourceCode";

import { contextTranslate } from "./App.js";


export default function HookUseClipboard()
	{
	console.log("%cHookUseClipboard", "color: red");

	// Entry field for user's test data:
	const [inputVal, setInputVal] = useState("");

  const { t } = useContext(contextTranslate);

	// Implement the useClipboard hook:
	const [
		// Next 2 are for text, not images / binary blobs, etc.
		copyTextToClipboard,
		pasteTextFromClipboard,
		// For binary blob pasting:
		pasteClipboardPromise,
		pasteClipboardAsync,
		{
			successCopy,
			copiedVal,
			successPaste,
			pastedVal,
			pastedDataType,
		},
		// Not implemented yet:
		// copyImageToClipboard,
		] = useClipboard();

// NOPE: poorly conceived:
			// Can be true / false / null: null === error copying due to empty field
			// Can be true / false / null: null === error due to unsupported feature in FF



	// Put focus into input field: (Note: the "autofocus" attribute doesn't work(?!?))
	// useEffect( () => document.querySelector("input").focus());
	// ONLY scroll up on load:
	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		}, []);

// If (accidentally) missing the "Paste" button in Firefox, this is thrown:
// DOMException: The user dismissed the 'Paste' button.

	return (
		<div className="hooks">
			<h2>Hook <code>useClipboard</code></h2>
			<p>
				This hook will give the browser access to read & write clipboard contents.
			</p>
{/* <blockquote>
			<h3>
				See component WtfHtml for very strange behaviour with clipboard and
				text/html contents!
			</h3>
			<p>
				Results differ between "Paste clipboard text" and the other 2 types of paste.
				Merely including the contents in this page as a comment breaks the page header!
			</p>
			<p>
				The contents turned out to be syntax-highlighted CSS code, <s>probably</s> copied
				in VS Codium?
			</p>
</blockquote> */}
			<hr />

			<p>
				Copy some text to your clipboard, or paste something from your clipboard
				(including images!). I've managed to detect the data type of the clipboard
				contents and currently handle "image/png" and "text/plain", will add more
				mime-types as I encounter them. Note: added "text/html" for beautiful,
				syntax-highlighted source code.
			</p>
			<h3>
				Note: if pasting an image, <code>useClipboard</code> will return a blob URL,
				which the calling component will need to use in an <code>img src</code>.
			</h3>
			<p>
				Note for Firefox users: only <code>readText()</code> is enabled by default, see {" "}
				<a href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/"
					target="ReactNotes"
					>
					Mozilla Dev Network
				</a>
				{" "} <i className="fa fa-external-link" aria-hidden="true"></i> {" "}
				notes about compatibility and browser support.
			</p>
			<blockquote>
In Firefox, to enable pasting text, go to: <code>about:config</code> and set: <br />
<code>dom.events.asyncClipboard.readText</code> True
<br />
To enable pasting images, go to: <code>about:config</code> and set: <br />
<code>dom.events.asyncClipboard.clipboardItem</code> True
			</blockquote>

			<p>
				This hook was particularly hard, and the issues with Firefox were only the
				beginning.  I spent a stupid amount of time trying to resolve the promise of a
				blob, then extracting the text from the blob. <br />
				<code>blob.text()</code> just returned another promise and it had me thinking
				I had <b>no</b> understanding of promises at all.
				However, the truth was, I needed a <code>FileReader</code> to extract the text.
				Which feels kind of weird, but now I know.
			</p>
			<p>
				Also spent too much time trying to set state within my function, then read
				that state's new value later in the function.  Didn't work.
				I used the functional method to set state (<code>setVar( () =&gt; newValue)</code>)
				and that didn't work, but I really thought the functional method would help me
				in this case.  Ended up using a separate, intermediary, temporary variable.
			</p>
			<p>
				In the end, I have 2 working functions, one using <code>async</code> and
				<code>await</code>, one using promises.
			</p>
			<p>
				Finally, I found that I got different results when pasting text vs promis / async
				methods. When I looked at KDE's clipboard app, I saw the text/plain version.
			</p>
			<p>
				I modified the code to output the raw text if text/html data found, as well
				as appending it into the DOM. It was some CSS I'd copied in VS Code (Codium).
				Looked beautiful as HTML.
			</p>
			<p>
				Spent countless <b>hours</b> trying to use the copy from VS Code, paste as HTML
				into web page, take that HTML and put into a text editor, and make React render
				it.  No. Way. Thousands of characters in a single line, double quotes, single
				quotes, and ticks all within it.
			</p>
			<p>
				Finally, I played with <code>react-syntax-highlighter</code>, made a separate
				hook for that, enabled multiple styles, imported <code>useLocalStorage</code>,
				and have much better source code formatting.
			</p>
			<p>
				All that in my pursuit of a simple clipboard tool...
			</p>
			<p>
				Also, got sidetracked in CSS to enable full dark / light mode theming as I found
				some elements that had been overlooked.  Refactored with CSS variables.
			</p>

			<hr />
			<p>
				<label htmlFor="input">
					Enter some text to copy: {" "}
				</label>
				<input
					type="text"
					autoFocus
					value={inputVal}
					id="input"
					onChange={ (e) => setInputVal(e.target.value) }
					/>
				{" "}
				<button
					type="button"
					onClick={() => copyTextToClipboard(inputVal)}
					>
					{t("Copy to clipboard")}
				</button>
			</p>
			<p>
				<button
					type="button"
					onClick={() => pasteTextFromClipboard()}
					>
					{t("Paste clipboard")}: {t("text")}
				</button>
			</p>
			<p>
				<button
					type="button"
					onClick={() => pasteClipboardPromise()}
					>
					{t("Paste clipboard")}: {t("anything")} via "promise"
				</button>
			</p>
			<p>
				<button
					type="button"
					onClick={() => pasteClipboardAsync()}
					>
					{t("Paste clipboard")}: {t("anything")} via "async"
				</button>
			</p>
			<p id="clipboardTarget">
			</p>
			<div>
				{/* This component will behave as a function, running AFTER calls to hooks */}
				<CopyStats
					successCopy={successCopy}
					copiedVal={copiedVal}
					successPaste={successPaste}
					pastedVal={pastedVal}
					pastedDataType={pastedDataType}
					/>
			</div>
			{/* This will NOT work properly; seems if above <p> uses .innerText = ... breaks it */}
			<div id="code">
				<Code />
			</div>
		</div>
		);	// end return
	}	// end function HookUseClipboard





// Insert messages or pasted content into page:
function CopyStats( {
		successCopy,
		copiedVal,
		successPaste,
		pastedVal,
		pastedDataType,
		})
	{
	let message = "";

	let target = document.querySelector("#clipboardTarget");
	if (target != null) target.innerHTML = "";

	console.log(`stats copy  status: "${successCopy}" and msg: "${copiedVal}"`);
	console.log(`%cstats paste status: "${successPaste}" and msg: "${pastedVal}" and type: ${pastedDataType}`,
		"color:green");

	if (successCopy === true)
		{
		message = <pre>Copied "{copiedVal}" to clipboard</pre>;
		// target.innerText = message;
		// Newer method:
		// https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext
		// In short, textContent includes scripts, etc. All elements.
		// innerText causes a re-flow too.
		// target.setHTML = message;
		}
	else if (copiedVal.length > 0)
		{
		message = <pre>{copiedVal}</pre>;
		// target.innerText = message;
		// Newer method:
		// target.textContent = message;
		}
	else if (pastedVal !== "" && pastedDataType === "image/png")
		{
		message = <img
			// Images return a "blob"; create a link from that:
			src={URL.createObjectURL(pastedVal)}
			width="300px"
			height="300px"
			alt="Clipboard Contents"
			/>
		// target.innerHTML = message;
		target.setHTML = message;
		}
	else if (pastedVal !== "" && pastedDataType === "text/html")
		{
		message = pastedVal;
		target.innerHTML = pastedVal;
		// Here, setHTML does not work, target isn't set correctly:
		//	Uncaught TypeError: target.setHTML is not a function
		// setHTML strips out HTML in Vivaldi...
		// target.setHTML(pastedVal);
		}
	else if (pastedVal !== "" && pastedDataType === "text/plain")
		{
		message = <pre>{pastedVal}</pre>
		// target.textContent(pastedVal);
		// target.innerText = message;
		}


	return (
		<>
			<hr />
				{/*
					This (also) interferes with proper functioning, especially pasted images:
					allow the if...else above handle it
				*/}
			<span>{message}</span>
		</>
		);	// end return
	}	// end CopyStats()



// eslint-disable-next-line
function WtfHtml()
	{
	return (
<>


<blockquote>
<h3>NOTE THIS WEIRD BEHAVIOUR:</h3>
<h4>IT is syntax-highlighted CSS, from VS Codium?!?</h4>
<p>
paste text:
</p>
<pre>{`.App-header {
	background-color: #222;
	color: white;
	box-shadow: 0px 0px 25px 0px lightgrey;
	/* border-bottom-right-radius: 5px; */
	overflow: hidden;
/*
	height: 150px;
	padding: 20px;
*/
	position: sticky;
	top: 0;
	z-index: 10;
	} `}
</pre>
<p>paste async / paste promise:</p>
<h1>type: text/html</h1>
<pre>{`
<div style="color: #d4d4d4;background-color: #1e1e1e;font-family: 'Droid Sans Mono', 'monospace', monospace;font-weight: normal;font-size: 14px;line-height: 19px;white-space: pre;"><br><div><span style="color: #d7ba7d;">.App-header</span><span style="color: #d4d4d4;"> {</span></div><div><span style="color: #d4d4d4;">  </span><span style="color: #9cdcfe;">background-color</span><span style="color: #d4d4d4;">: </span><span style="color: #ce9178;">#222</span><span style="color: #d4d4d4;">;</span></div><div><span style="color: #d4d4d4;">  </span><span style="color: #9cdcfe;">color</span><span style="color: #d4d4d4;">: </span><span style="color: #ce9178;">white</span><span style="color: #d4d4d4;">;</span></div><div><span style="color: #d4d4d4;">  </span><span style="color: #9cdcfe;">box-shadow</span><span style="color: #d4d4d4;">: </span><span style="color: #b5cea8;">0px</span><span style="color: #d4d4d4;"> </span><span style="color: #b5cea8;">0px</span><span style="color: #d4d4d4;"> </span><span style="color: #b5cea8;">25px</span><span style="color: #d4d4d4;"> </span><span style="color: #b5cea8;">0px</span><span style="color: #d4d4d4;"> </span><span style="color: #ce9178;">lightgrey</span><span style="color: #d4d4d4;">;</span></div><div><span style="color: #d4d4d4;">  </span><span style="color: #6a9955;">/* border-bottom-right-radius: 5px; */</span></div><div><span style="color: #d4d4d4;">  </span><span style="color: #9cdcfe;">overflow</span><span style="color: #d4d4d4;">: </span><span style="color: #ce9178;">hidden</span><span style="color: #d4d4d4;">;</span></div><div><span style="color: #6a9955;">/*</span></div><div><span style="color: #6a9955;">  height: 150px;</span></div><div><span style="color: #6a9955;">  padding: 20px;</span></div><div><span style="color: #6a9955;">*/</span></div><div><span style="color: #d4d4d4;">  </span><span style="color: #9cdcfe;">position</span><span style="color: #d4d4d4;">: </span><span style="color: #ce9178;">sticky</span><span style="color: #d4d4d4;">;</span></div><div><span style="color: #d4d4d4;">  </span><span style="color: #9cdcfe;">top</span><span style="color: #d4d4d4;">: </span><span style="color: #b5cea8;">0</span><span style="color: #d4d4d4;">;</span></div><div><span style="color: #d4d4d4;">  </span><span style="color: #9cdcfe;">z-index</span><span style="color: #d4d4d4;">: </span><span style="color: #b5cea8;">10</span><span style="color: #d4d4d4;">;</span></div><div><span style="color: #d4d4d4;">  }</span></div><br></div>
`}</pre>
<p>Plain ol' paste:</p>
<pre>
{`

.App-header {
	background-color: #222;
	color: white;
	box-shadow: 0px 0px 25px 0px lightgrey;
	/* border-bottom-right-radius: 5px; */
	overflow: hidden;
/*
	height: 150px;
  padding: 20px;
*/
	position: sticky;
	top: 0;
	z-index: 10;
	}

`}</pre>
</blockquote>


</>
		);	// end return
	} // end WtfHtml






function Code()
	{
		const code = `
import useClipboard from "./hooks/useClipboard";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseClipboard()
	{
	// Entry field for user's test data:
	const [inputVal, setInputVal] = useState("");

	// Implement the useClipboard hook:
	const [
		// Next 2 are for text, not images / binary blobs, etc.
		copyTextToClipboard,
		pasteTextFromClipboard,
		// For binary blob pasting:
		pasteClipboardPromise,
		pasteClipboardAsync,
		{
			successCopy,
			copiedVal,
			successPaste,
			pastedVal,
			pastedDataType,
		},
		// Not implemented yet:
		// copyImageToClipboard,
		] = useClipboard();



	return (
		<div className="hooks">
			<p>
				<label htmlFor="input">
					Enter some text to copy: {" "}
				</label>
				<input
					type="text"
					autofocus
					value={inputVal}
					id="input"
					onChange={ (e) => setInputVal(e.target.value) }
					/>
				{" "}
				<button
					type="button"
					onClick={() => copyTextToClipboard(inputVal)}
					>
					Copy to clipboard
				</button>
			</p>
			<p>
				<button
					type="button"
					onClick={() => pasteTextFromClipboard()}
					>
					Paste clipboard text
				</button>
			</p>
			<p>
				<button
					type="button"
					onClick={() => pasteClipboardPromise()}
					>
					Paste anything via "promise"
				</button>
			</p>
			<p>
				<button
					type="button"
					onClick={() => pasteClipboardAsync()}
					>
					Paste anything via "async"
				</button>
			</p>
			<p id="clipboardTarget">
			</p>
			<div>
				{/* This component will behave as a function, running AFTER calls to hooks */}
				<CopyStats
					successCopy={successCopy}
					copiedVal={copiedVal}
					successPaste={successPaste}
					pastedVal={pastedVal}
					pastedDataType={pastedDataType}
					/>
			</div>
		</div>
		);	// end return
	}	// end function HookUseClipboard



// Insert messages or pasted content into page:
function CopyStats( {
		successCopy,
		copiedVal,
		successPaste,
		pastedVal,
		pastedDataType,
		})
	{
	let message = "";

	let target = document.querySelector("#clipboardTarget");
	if (target != null) target.innerHTML = "";

	if (successCopy === true)
		{
		message = <pre>Copied "{copiedVal}" to clipboard</pre>;
		// target.innerText = message;
		// Newer method:
		// https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext
		// In short, textContent includes scripts, etc. All elements.
		// innerText causes a re-flow too.
		// target.setHTML = message;
		}
	else if (copiedVal.length > 0)
		{
		message = <pre>{copiedVal}</pre>;
		// target.innerText = message;
		// Newer method:
		// target.textContent = message;
		}
	else if (pastedVal !== "" && pastedDataType === "image/png")
		{
		message = <img
			// Images return a "blob"; create a link from that:
			src={URL.createObjectURL(pastedVal)}
			width="300px"
			height="300px"
			alt="Clipboard Contents"
			/>
		// target.innerHTML = message;
		target.setHTML = message;
		}
	else if (pastedVal !== "" && pastedDataType === "text/html")
		{
		message = pastedVal;
		// target.innerHTML = pastedVal;
		target.textContent(pastedVal);
		}
	else if (pastedVal !== "" && pastedDataType === "text/plain")
		{
		message = <pre>{pastedVal}</pre>
		// target.textContent(pastedVal);
		// target.innerText = message;
		}


	return (
		<>
			<hr />
				{/*
					This (also) interferes with proper functioning, especially pasted images:
					allow the if...else above handle it
				*/}
			<span>{message}</span>
		</>
		);	// end return
	}	// end CopyStats






export default function useClipboard()
	{
	const [successCopy, setSuccessCopy] = useState(false);
	const [copiedVal, setCopiedVal] = useState("");
	const [successPaste, setSuccessPaste] = useState(false);
	const [pastedVal, setPastedVal] = useState("");
	const [pastedDataType, setPastedDataType] = useState();


	// Should this be a wrapper to a function that simply uses .write()
	// instead of using .writeText()?
	// Would be a better implementation!
	const copyTextToClipboard = (value) => {
		// Clear unused state vars:
		setSuccessCopy(false);
		setCopiedVal("");
		setSuccessPaste(false);
		setPastedVal("");
		// Reset this variable, used by calling code to determine how to display
		// clipboard contents:
		setPastedDataType();

		// Empty strings report success BUT nothing copied to clipboard
		// KDE 5.27 and Firefox 110
		if (value === "")
			{
			setSuccessCopy(false);
			setCopiedVal("Cannot copy empty string.");
			// Clear unused state vars:
			setSuccessPaste(false);
			setPastedVal("");
			setPastedDataType();
			console.log("useClipboard() cannot copy empty string to clipboard.")
			return {successCopy, copiedVal}
			}
		navigator.clipboard
			.writeText(value)
			.then( () => {
				setSuccessCopy(true);
				setCopiedVal(value);
				})	// end .then()
			.catch( e => {
				setSuccessCopy(false);
				setCopiedVal(e => \`ERROR: \${e.name} \${e.message}\`);
				})	// end .catch()
			.finally( () => {
				// // Clear unused state vars:
				// setSuccessPaste(false);
				// setPastedVal("");
				// setPastedDataType();
				})	// end .finally()
			;
		}	// end function copyTextToClipboard()







	// NOTE: FF 110 ONLY SUPPORTS writeText()  (WTH?)
	// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText
	const pasteTextFromClipboard = () => {
		// Clear unused state vars:
		setSuccessCopy(false);
		setCopiedVal("");
		setSuccessPaste(false);
		setPastedVal("");
		// Reset this variable, used by calling code to determine how to display
		// clipboard contents:
		setPastedDataType("text/plain");

		if (navigator.clipboard.readText === undefined)
			{
			setSuccessPaste(false);
			setPastedVal("<h3>ERROR - browser does not support navigator.clipboard.readText()</h3> "
				+ "<h4>See https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText</h4>"
				);
			return;
			}
		navigator.clipboard
			.readText()
			.then( value => {
				if (value.length === 0)
					throw new Error( "Empty string or non-text data on clipboard.");
				setPastedVal(value);
				setSuccessPaste(true);
				})	// end .then()
			.catch( value => {
				// Clear unused state vars:
				setSuccessPaste(false);
				setPastedVal(value.toString());
				// Indicate the type of return value, error message in this case:
				// setPastedDataType("text/plain");
				})	// end .catch()
			.finally( () => {
				})	// end .finally()
			;
		}	// end function pasteTextFromClipboard()





	// Paste clipboard data (any time: tested text/plain and image/png) using
	// async, not promises:
	async function pasteClipboardAsync()
		{
		// Clear unused state vars:
		setSuccessCopy(false);
		setCopiedVal("");
		setSuccessPaste(false);
		setPastedVal("");
		// Reset this variable, used by calling code to determine how to display
		// clipboard contents:
		setPastedDataType();

		let blob;

		if (navigator.clipboard.read === undefined)
			{
			setSuccessPaste(false);
			setPastedVal(
				"<h3>ERROR - browser does not support navigator.clipboard.read()</h3> "
				+ "<h4>See https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read</h4>"
				);
			setPastedDataType("text/plain");
			return;
			}
		try
			{
			const clipboardContents = await navigator.clipboard.read();
			for (const item of clipboardContents)
				{
				// Get blob-ular data from clipboard
				blob = await item.getType(item.types[0]);
				// Store clipboard content type & use in determining
				// how to present the returned data:
				setPastedDataType(item.types[0]);
				setSuccessPaste(true);
				setPastedVal(item.types[0] === "image/png"
					// img tag will create blob-ular URL from *blob*:
					? blob
					// Non-img data will get presented as text string:
					: await (await blob.text()).toString()
					);
					}	// end for loop
			}	// end .then() or try()
		catch( e )
			{
			setSuccessPaste(false);
			setPastedVal(e.toString());
			// For error message display:
			setPastedDataType("text/plain");
			}	// end navigator.clipboard.read().catch()
		}	// end function




	// Paste clipboard data (any time: tested text/plain and image/png) using
	// promises, not async:
	const pasteClipboardPromise = () => {
		// Clear unused state vars:
		setSuccessCopy(false);
		setCopiedVal("");
		setSuccessPaste(false);
		setPastedVal("");
		// Reset this variable, used by calling code to determine how to display
		// clipboard contents:
		setPastedDataType();

		let blob;

		if (navigator.clipboard.read === undefined)
			{
			setSuccessPaste(false);
			setPastedVal("<h3>ERROR - browser does not support navigator.clipboard.read()</h3> "
				+ "<h4>See https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read</h4>"
				);
			setPastedDataType("text/plain");
			return;
			}

		navigator.clipboard.read()
			.then( clipboardContents => {
				// Clipboard can contain an array of items comprising a single entry,
				// hence for-loop iterator.
				// HOWEVER, eslint does not like functions inside loops, so...
				/* eslint-disableXXX no-loop-func */
				for (const item of clipboardContents)
					{
					blob = item.getType(item.types[0]);
					// Store clipboard content type & use in determining
					// how to present the returned data:
					setPastedDataType( () => item.types[0]);
					setSuccessPaste(true);

					blob
						.then( val => {
							if (item.types[0] === "image/png")
								{
								setPastedVal(val);
								}
							return val;
							})
						// Chaining .then isn't needed, but as long as return val of previous
						// .then is correct, it can be used here & is easier to read:
						.then( val => {
							if (item.types[0] !== "image/png")
								{
								// Extract the text from the blob (what a stupid method):
								const r = new FileReader();
								r.addEventListener("load", () => setPastedVal(r.result));
								r.readAsText(val);
								}
							return val;
							})
					}	// end for loop
				})	// end navigator.clipboard.read().then()
			.catch( e => {
				setSuccessPaste(false);
				setPastedVal(e.toString());
				// For error message display:
				setPastedDataType("text/plain");
				})	// end navigator.clipboard.read().catch()
			// .finally(() => {
			// 	})	// end .finally()
			;
		}






	// Not implemented
	function copyImageToClipboard()
		{
		// Clear unused state vars:
		setSuccessCopy(false);
		setCopiedVal("");
		setSuccessPaste(false);
		setPastedVal("");
		setPastedDataType();
		alert("Not implemented (yet?)");
		}



	// const pasteClipboard = pasteClipboardAsync;
	const pasteClipboard = pasteClipboardPromise;


	return [
		copyTextToClipboard,
		pasteTextFromClipboard,
		pasteClipboardPromise,
		pasteClipboardAsync,
		{
			successCopy,
			copiedVal,
			successPaste,
			pastedVal,
			pastedDataType,
		},
		copyImageToClipboard,
		]
	}	// end function useClipboard()

`;

	const output = useSourceCode({code});

	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}




























// eslint-disable-next-line
function CodeOrig()
	{
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="green">
				{`
  // Entry field for user's test data:
  const [inputVal, setInputVal] = useState("");

  // Implement the useClipboard hook:
  const [
    // Next 2 are for text, not images / binary blobs, etc.
    copyTextToClipboard,
    pasteTextFromClipboard,
    // For binary blob pasting:
    pasteClipboardPromise,
    pasteClipboardAsync,
    {
      successCopy,
      copiedVal,
      successPaste,
      pastedVal,
      pastedDataType,
    },
    // Not implemented yet:
    // copyImageToClipboard,
    ] = useClipboard();
...
      <p>
        <button onClick={() => pasteClipboardPromise()} >
          Paste anything via "promise"
        </button>
      </p>
      <p>
        <button onClick={() => pasteClipboardAsync()} >
          Paste anything via "async"
        </button>
      </p>
      <p id="clipboardTarget">
      </p>
      <div>
        {/* This component will behave as a function, running AFTER calls to hooks */}
        <CopyStats
          successCopy={successCopy}
          copiedVal={copiedVal}
          successPaste={successPaste}
          pastedVal={pastedVal}
          pastedDataType={pastedDataType}
          />
      </div>
      <Code />
...



// Insert messages or pasted content into page:
function CopyStats( {
    successCopy,
    copiedVal,
    successPaste,
    pastedVal,
    pastedDataType,
    })
  {
  let message = "";

  if (successCopy === true)
    {
    message = <pre>Copied "{copiedVal}" to clipboard</pre>;
    }
  else if (copiedVal.length > 0)
    {
    message = <pre>{copiedVal}</pre>;
    }
  else if (pastedVal !== "" && pastedDataType === "image/png")
    {
    // Images return a "blob"; create a link from that:
    message = <img
      src={URL.createObjectURL(pastedVal)}
      width="300px"
      height="300px"
      alt="Clipboard Contents"
      />
    }
  else if (pastedVal !== "")  // && pastedDataType === "text/plain")
    {
    message = <pre>{pastedVal}</pre>
    }


  return (
    <>
      <hr />
      <span>{message}</span>
    </>
    );
  }





// Paste clipboard data (any time: tested text/plain and image/png) using
// promises, not async:
const pasteClipboardPromise = () => {
  // Clear unused state vars:
  setSuccessCopy(false);
  setCopiedVal("");
  setSuccessPaste(false);
  setPastedVal("");
  // Reset this variable, used by calling code to determine how to display
  // clipboard contents:
  setPastedDataType();

  let blob;

  if (navigator.clipboard.read === undefined)
    {
    setSuccessPaste(false);
    setPastedVal("<h3>ERROR - browser does not support navigator.clipboard.read()</h3> "
      + "<h4>See https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read</h4>"
      );
    setPastedDataType("text/plain");
    return;
    }

  navigator.clipboard.read()
    .then( clipboardContents => {
      // Clipboard can contain an array of items comprising a single entry,
      // hence for-loop iterator.
      // HOWEVER, eslint does not like functions inside loops, so...
      /* eslint-disableXXX no-loop-func */
      for (const item of clipboardContents)
        {
        blob = item.getType(item.types[0]);
        // Store clipboard content type & use in determining
        // how to present the returned data:
        setPastedDataType( () => item.types[0]);
        setSuccessPaste(true);

        blob
          .then( val => {
            if (item.types[0] === "image/png")
              {
              setPastedVal(val);
              }
            return val;
            })
          // Chaining .then isn't needed, but as long as return val of previous
          // .then is correct, it can be used here & is easier to read:
          .then( val => {
            if (item.types[0] !== "image/png")
              {
              // Extract the text from the blob (what a stupid method):
              const r = new FileReader();
              r.addEventListener("load", () => setPastedVal(r.result));
              r.readAsText(val);
              }
            return val;
            })
        }  // end for loop
      })  // end navigator.clipboard.read().then()
    .catch( e => {
      setSuccessPaste(false);
      setPastedVal(e.toString());
      // For error message display:
      setPastedDataType("text/plain");
      })  // end navigator.clipboard.read().catch()
    // .finally(() => {
    //   })  // end .finally()
    ;
  }



// const pasteClipboard = pasteClipboardAsync;
const pasteClipboard = pasteClipboardPromise;

return [
  copyTextToClipboard,
  pasteTextFromClipboard,
  pasteClipboardPromise,
  pasteClipboardAsync,
  {
    successCopy,
    copiedVal,
    successPaste,
    pastedVal,
    pastedDataType,
  },
  copyImageToClipboard,
  ]
}  // end function useClipboard()

    		`}
			</code>
		</div>
		); // end return
	}	// end function CodeOrig

