// import { useState, useEffect } from "react";

import { useSessionStorage } from "./useStorage";
// import * as translations from "./translations";
import translations, {flags} from "./translations/index.js";


export default function useTranslation()
	{
	const [language, setLanguage] = useSessionStorage("language", "en");
	const [fallbackLanguage, setFallbackLanguage] =
		useSessionStorage("fallbackLanguage", "en");

	const PINYIN = 0;
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
// console.table(obj);
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
