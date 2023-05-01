/*
// See timestamp 08:30 of
// https://courses.webdevsimplified.com/view/courses/react-hooks-simplified/1327246-custom-hooks/4121574-19-custom-hooks-21-25-useclickoutside-usedarkmode-usecopytoclipboard-usecookie-usetranslatio
*/

// export * as en from "./en.json";
// export * as zh from "./zh.json";

export const flags = {
		"en": "/images/canada.png",
		"en": "/images/united-kingdom.png",
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
		"hi": [ "dee2 mah3", "芝麻" ],
		"bye": [ "bye bye", "Bye-bye"],
		"see you later": [ "chi3 dee1 geen3", "遲啲見"],
		"nested": {"value": "is Cantonese nested obj"},
		"hungry": [ "toh3 ngo3", "肚餓"],
		"cold": [ "dong", "講呀"],
		"red": [ "hong sik", "紅色"],
		"orange": [ "chan sik", "顏色"],
		"yellow": [ "wong sik", "黃色"],
		"green": [ "loh sik", "綠色"],
		"light green": [ "cheng sik", "" ],
		"blue": [ "lam sik", "藍色" ],
		"purple": [ "gee sik", "紫色"],
		"black": [ "hah sik", "黑色"],
		"white": [ "bah sik", "白色"],
		// "flag_icon": ["/images/hong-kong.png","/images/hong-kong.png"],
		"increment": ["", "+1"],
		"double": ["", "双倍"],
		"back": ["", "后退"],
		"forward": ["", "向前-"],
		"goto 2nd":	["go number 2 spot", "去第二位"],
		"add random name": ["", "隨意加名字"],
		"counter": ["", ""],
		"value": ["", ""],
		"lesson notes": ["", "課堂筆記"],
		"theme": ["", "主題"],
		"true": ["", ""],
		"false": ["", ""],
		"yes": ["", ""],
		"no": ["", ""],
		"check": ["", ""],
		"uncheck": ["", ""],
		"toggle": ["", ""]
		},
	};

// 去第二位-go 2
//  增量
// Double 双倍
// 后退
// 向前
// 去2位
// 隨意加名字 add random name(?)
// 課堂筆記/lesson notes

export default translations;