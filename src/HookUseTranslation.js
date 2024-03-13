import React, { useContext } from 'react';

// Lifted state to App.js, see props...
// import useTranslation from "./hooks/useTranslation";
import useSourceCode from "./hooks/useSourceCode";
import useEffectOnce from "./hooks/useEffectOnce";

import { contextTranslate } from "./App.js";
import PageTitle from "./PageTitle";
import { contextAppSettings } from "./App";


export default function HookUseTranslation()
	{
	console.log("%cHookUseTranslation", "color: red");

  const {
    language,
    setLanguage,
	// 	// eslint-disable-next-line
	// 	fallbackLanguage,
	// 	// eslint-disable-next-line
	// 	setFallbackLanguage,
    t,
    flags
  } = useContext(contextTranslate);

  const { basePath } = useContext(contextAppSettings);


  useEffectOnce( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			);
		},[])


	return (
		<div className="hooks">
      <PageTitle hookName="useTranslation" />
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
          src={ basePath + flags[language]}
					style={{verticalAlign:"bottom"}}
          alt={ language + " Flag" }
					/>
			</p>

      <ol
        /* Kanji needs more line height */
        style={{lineHeight: "2rem"}}
        >
        <li>{t("English")}</li>
        <li>{t("Cantonese")}</li>
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
          {t("English")} {" "}
          <img src={ basePath + "/images/canada.png" }
            alt="Canada flag"
            style={{verticalAlign:"bottom"}}
            />
				</button>
				<button
					type="button"
					onClick={() => setLanguage("hk")}
					>
          {t("Cantonese")} {" "}
          <img src={ basePath + "/images/hong-kong.png" }
						alt="Hong Kong flag"
						style={{verticalAlign:"bottom"}}
						/>
				</button>
			</p>

			<Code />
		</div>
		);	// end return
  }	// end HookUseTranslation




function Code()
	{
	const code = `


export default function HookUseTranslation()
	{
	console.log("%cHookUseTranslation", "color: red");

  const {
    language,
    setLanguage,
	// 	// eslint-disable-next-line
	// 	fallbackLanguage,
	// 	// eslint-disable-next-line
	// 	setFallbackLanguage,
    t,
    flags
  } = useContext(contextTranslate);


  useEffectOnce( () => {
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
{\`
export * as en from "./en.json";
export * as zh from "./zh.json";

\`}
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

      <ol
        /* Kanji needs more line height */
        style={{lineHeight: "2rem"}}
        >
        <li>{t("English")}</li>
        <li>{t("Cantonese")}</li>
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
          {t("English")} {" "}
          <img src="/images/canada.png"
            alt="Canada flag"
            style={{verticalAlign:"bottom"}}
            />
				</button>
				<button
					type="button"
					onClick={() => setLanguage("hk")}
					>
          {t("Cantonese")} {" "}
					<img src="/images/hong-kong.png"
						alt="Hong Kong flag"
						style={{verticalAlign:"bottom"}}
						/>
				</button>
			</p>

			<Code />
		</div>
		);	// end return
  }	// end HookUseTranslation




/* hooks/useTranslation.js */

import { useSessionStorage } from "./useStorage";
// import * as translations from "./translations";
import translations, {flags} from "./translations/index.js";


export default function useTranslation()
	{
	const [language, setLanguage] = useSessionStorage("language", "en");
	const [fallbackLanguage, setFallbackLanguage] =
		useSessionStorage("fallbackLanguage", "en");

	// Which array element to present (PinYin is useless here):
	// const PINYIN = 0;
	const KANJI = 1;
	const RETURN_WORD = language === "en" ? 0 : KANJI;


	// Our translation function:
	const translate = key => {
		// Split into sentences, results in a 1-element array if no "." found:
		const keys = key.split(".");

			let retVal =
			// If there's a translation for language, return it:
			// Kyle uses the new "??" nullish coalescing test for null,
			// but not working in this version of ... webpack
			// See /.babelrc.json
			getNestedTranslation(language, keys) != null
				? getNestedTranslation(language,keys)
				// If there's a translation for our fallback language, return that:
				: getNestedTranslation(fallbackLanguage, keys) != null
					? getNestedTranslation(fallbackLanguage, keys)
					// Else, just return the original word:
					: keys

		return retVal
		}


	// There can be nested objects...
	function getNestedTranslation(language, keys)
		{
		// IF the keys (word(s) to translate) is an object (nested obj) within
		// translations[language], return the nested object:
		let retVal = keys.reduce( (obj, key) => {
		const keysLowerCase = key.toLocaleLowerCase();

		// Stoopid webpack not supporting nullish coalescing:
		let retVal2 = obj[keysLowerCase] === undefined
				? key
				: obj[keysLowerCase]
			retVal2 = Array.isArray(retVal2)
				? obj[keysLowerCase][RETURN_WORD]
				: obj[keysLowerCase]

			return retVal2;
			}, translations[language]);

		// // Stoopid webpack not supporting nullish coalescing:
		// 	(translations[language][keys] === undefined
		// 		|| translations[language][keys][RETURN_WORD] === undefined)
		// 	? keys
		// 	: translations[language][keys][RETURN_WORD]
		// 	;
		return retVal;
		}


  return {
		language,
		setLanguage,
		fallbackLanguage,
		setFallbackLanguage,
		t: translate,
		flags
		};
	}	// end function useTranslation










/* hooks/translations/index.js */

export const flags = {
		"en": "/images/canada.png",
		// "en": "/images/united-kingdom.png",
		"hk": "/images/hong-kong.png"
	}


const translations = {
	en: {
		"hi": ["Hello", "Hi"],
		"bye": ["Goodbye", "Bye"],
		"see you later": ["See you later", "See ya"],
		"nested": { "value": "is English nested obj"},
		"hungry": ["Hungry", "Starving"],
		"cold": ["cold", "Freezing"],
		"yellow": ["Yellow"],
		// "flag_icon": ["/images/canada.png"],
		},
	hk: {
    "english": [ "", "英語" ],
    "cantonese": [ "", "粵語" ],
		"hi": [ "dee2 mah3", "芝麻" ],
		"bye": [ "bye bye", "遲啲見"],
		"see you later": [ "chi3 dee1 geen3", "遲啲見"],
		"nested": {"value": "is Cantonese nested obj"},
		"hungry": [ "toh3 ngo3", "肚餓"],
		"cold": [ "dong", "講呀"],
		"red": [ "hong sik", "紅色"],
		"orange": [ "chan sik", "橙色"],	//顏色"],
		"yellow": [ "wong sik", "黃色"],
		"green": [ "loh sik", "綠色"],
    "light green": [ "cheng sik", "淺綠色"],
		"blue": [ "lam sik", "藍色" ],
		"purple": [ "gee sik", "紫色"],
		"black": [ "hah sik", "黑色"],
		"white": [ "bah sik", "白色"],
		// "flag_icon": ["/images/hong-kong.png","/images/hong-kong.png"],
		"increment": ["", "增加"],
		"double": ["", "双倍"],
		"back": ["", "后退"],
		"forward": ["", "向前-"],
		"goto 2nd":	["go number 2 spot", "去第二位"],
		"add random name": ["", "隨意加名字"],
		"counter": ["", ""],
		"value": ["", ""],
		"lesson notes": ["", "課堂筆記"],
		"theme": ["", "主題"],

		"clipboard": ["", "剪貼板"],
		"copy to clipboard": ["", "複製到剪貼板"],
		"paste clipboard": ["", "粘貼剪貼板"],
		"text": ["", "發短信"],
		"anything": ["", "咩話"],

		"true": ["", "真"],
		"false": ["", "假"],
		"yes": ["", "係"],
		"no": ["", "唔係"],
		"check": ["", ""],
		"uncheck": ["", ""],
		"toggle": ["", "切換"],

		"delete": ["", "删除"],
		"update": ["", "更新"],
		"scroll down": ["", "向下轆"],
		"more": ["", "更多"],
		"fully visible": ["", "完全可見"],

		"start": ["", "開始"],
		"stop": ["", "停"],
		"restart": ["", "重新啟動"],
		"timer": ["", "定時器"],
		},
	};


`;

	const output = useSourceCode({code});

	return (
		<>
			{output}
		</>
		);	// end return
	}	// end Code
