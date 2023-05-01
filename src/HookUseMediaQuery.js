import React, { useEffect } from 'react';

import useMediaQuery from "./hooks/useMediaQuery";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseMediaQuery()
	{
	console.log("%cHookUseMediaQuery", "color: red");
	const WIDTH = "1100px";
	const isLandscape = useMediaQuery(`(orientation: landscape)`);

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[])


	return (
		<div className="hooks">
			<h2>Hook <code>UseMediaQuery</code></h2>
			<p>
				Monitor media query on window.
			</p>
{/*
			<p>
					In this case, merely check window width for being &gt; {WIDTH}. In future hooks, this
					will become much more useful.
			</p>
*/}
			<p>
				In this case, we'll test for the window being portrait or landscape. For mobile,
				rotate the device, otherwise resize it.
			</p>
			<hr />

			<h2>
			{isLandscape
				? "Window is LANDSCAPE mode"
				: "Window is PORTRAIT mode"
				}
{/*
			{isLarge
					? `Window width is GREATER THAN ${WIDTH}`
					: `Window width is LESS THAN ${WIDTH}`}
*/}
			</h2>
			<Code WIDTH={WIDTH} />
		</div>
		);	// end return
	}	// end function HookUseMediaQuery






// eslint-disable-next-line
function CodeOrig( {WIDTH} )
	{
//    console.table(WIDTH)
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="green">
				{`
import { useMediaQuery } from "./hooks/useMediaQuery";
`}
			</code>
            <code>
{`
export default function HookUseMediaQuery()
	{
    console.log("%cHookUseMediaQuery", "color: red");
    const WIDTH = "1100px";
`}
            </code>
            <code className="red">
{`
     const isLandscape = useMediaQuery("(orientation: landscape)");
`}
    </code>
    <code>
{`...
        {isLandscape
            ? "Window is LANDSCAPE mode"
            : "Window is PORTRAIT mode"
        }
...
`}
			</code>
            <code className="green">
{`
import { useEffect, useState } from "react";

import { useEventListener } from "../HookUseEventListener";


export function useMediaQuery(mediaQuery)
	{
    const [isMatch, setIsMatch] = useState(false);
    const [mediaQueryList, setMediaQueryList] = useState(null);

    useEffect( () => {
        const list = window.matchMedia(mediaQuery);
        setMediaQueryList(list);
        setIsMatch(list.matches);
    }, [mediaQuery]);

    console.table(mediaQueryList);
    useEventListener("change", e => setIsMatch(e.matches), mediaQueryList);

    return isMatch;
	}	// end function

`}
            </code>

		</div>

		); // end return
	}	// end function




function Code()
	{
	const code = `
import React, { useEffect } from 'react';

import useMediaQuery from "./hooks/useMediaQuery";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseMediaQuery()
	{
	console.log("%cHookUseMediaQuery", "color: red");
	const WIDTH = "1100px";
	const isLandscape = useMediaQuery(\`(orientation: landscape)\`);

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[])


	return (
		<div className="hooks">

			<h2>
			{isLandscape
				? "Window is LANDSCAPE mode"
				: "Window is PORTRAIT mode"
				}
{/*
			{isLarge
					? \`Window width is GREATER THAN \${WIDTH}\`
					: \`Window width is LESS THAN \${WIDTH}\`}
*/}
			</h2>
			<Code WIDTH={WIDTH} />
		</div>
		);	// end return
	}	// end function HookUseMediaQuery



import { useEffect, useState } from "react";

import useEventListener from "./useEventListener";


export default function useMediaQuery(mediaQuery)
	{
	const [isMatch, setIsMatch] = useState(false);
	const [mediaQueryList, setMediaQueryList] = useState(null);

	useEffect( () => {
			const list = window.matchMedia(mediaQuery);
			setMediaQueryList(list);
			setIsMatch(list.matches);
		}, [mediaQuery]);

	useEventListener("change", e => setIsMatch(e.matches), mediaQueryList);

	return isMatch;
	}	// end function useMediaQuery
`;

	const output = useSourceCode({code});

	return(
		<div className="codeFormatted">
			{output}
		</div>
		)
	}	// end Code

