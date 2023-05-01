import { useState } from "react";
// import copy from "copy-to-clipboard";


// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
// Paste text about:config setting:
// dom.events.asyncClipboard.readText
// Paste images about:config setting:
// dom.events.asyncClipboard.clipboardItem



export default function useClipboard()
	{
	console.log(`%cuseClipboard`, "color:red");

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
				setCopiedVal(e => `ERROR: ${e.name} ${e.message}`);
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



	// const pasteClipboard = pasteClipboardAsync;
	// const pasteClipboard = pasteClipboardPromise;

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
