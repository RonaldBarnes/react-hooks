/*
// See timestamp 08:30 of
// https://courses.webdevsimplified.com/view/courses/react-hooks-simplified/1327246-custom-hooks/4121574-19-custom-hooks-21-25-useclickoutside-usedarkmode-usecopytoclipboard-usecookie-usetranslatio
*/

// export * as en from "./en.json";
// export * as zh from "./zh.json";

export const flags = {
		"en": "images/canada.png",
		// "en": "/images/united-kingdom.png",
		"hk": "images/hong-kong.png"
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
//		"bye": [ "bye bye", "Bye-bye"],
		"bye": [ "bye bye", "遲啲見"],
		"see you later": [ "chi3 dee1 geen3", "遲啲見"],
		"nested": {"value": "is Cantonese nested obj"},
		"hungry": [ "toh3 ngo3", "肚餓"],
		"cold": [ "dong", "講呀"],
		"red": [ "hong4 sik1", "紅色"],
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
		"back": ["hau6 teui3", "后退"],
		"forward": ["", "向前-"],
		"goto 2nd":	["go number 2 spot", "去第二位"],
		"add random name": ["", "隨意加名字"],
		"counter": ["", ""],
		"value": ["", ""],
		"lesson notes": ["fo3 tong4 bat1 gei3", "課堂筆記"],
		"theme": ["", "主題"],

		"clipboard": ["", "剪貼板"],
		"copy to clipboard": ["", "複製到剪貼板"],
		"paste clipboard": ["", "粘貼剪貼板"],
		"text": ["", "發短信"],
		"anything": ["", "咩話"],
		"add": ["", "加"],

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
		"reset": ["", "重置"],
		"clear": ["", "清楚"],
		"restart": ["", "重新啟動"],
		"timer": ["", "定時器"],
		"": ["", ""],
		"": ["", ""],
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
