import React, { useEffect } from 'react';

// Lifted state to App.js, see props...
// import useTranslation from "./hooks/useTranslation";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseTranslation(
	{
		language,
		setLanguage,
		fallbackLanguage,
		setFallbackLanguage,
		t,
		flags
	})
	{
	console.log("%cHookUseTranslation", "color: red");

	// const {
	// 	language,
	// 	setLanguage,
	// 	// eslint-disable-next-line
	// 	fallbackLanguage,
	// 	// eslint-disable-next-line
	// 	setFallbackLanguage,
	// 	t,
	// 	flags
	// 	} = useTranslation();

	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		},[])


	return (
		<div className="hooks">
			<h2>Hook <code>useTranslation</code></h2>
			<p>
				The <code>useTranslation</code> hook can make
				translations of buttons, menus, etc. simple
				(if one has a fluent translator to populate
				the files with content).
			</p>
			<h2>NOTE: issues with webpack</h2>
			<p>
				The following code fails in this module - a back-end, webpack issue:
				<span className="jsx" style={{marginTop:"2rem"}}>
					<code className="red">
{`
export * as en from "./en.json";
export * as zh from "./zh.json";

`}
				</code></span> fails, so I made a work-around via hand crafting the JSON.
			</p>
			<hr />

			<p style={{fontSize:"2rem", fontVariantCaps:"small-caps"}}>
				{language} <img
					src={flags[language]}
					style={{verticalAlign:"bottom"}}
					alt="Language Flag"
					/>
			</p>

			<ol>
				<li>{t("hi")}</li>
				<li>{t("bye")}</li>
				<li>{t("see you later")}</li>
				<li>{t("hungry")}</li>
				<li>{t("cold")}</li>
				<li>{t("red")}</li>
				<li>{t("orange")}</li>
				<li>{t("yellow")}</li>
				<li>{t("Untranslatable")}!</li>
				<li>{t("nested.value")}</li>
			</ol>

			<p>
				<button
					type="button"
					onClick={() => setLanguage("en")}
					>
					English
				</button>
				<button
					type="button"
					onClick={() => setLanguage("hk")}
					>
					Cantonese {" "}
					<img src="/images/hong-kong.png"
						alt="Hong Kong flag"
						style={{verticalAlign:"bottom"}}
						/>
				</button>
			</p>

			<Code />
		</div>
		);	// end return
	}	// end HookUseToggle




function Code()
	{
	const code = `

`;

	const output = useSourceCode({code});

	return (
		<>
			{output}
		</>
		);	// end return
	}	// end Code
