import { useState } from "react";

import useEventListener from "./useEventListener";


export default function useOnlineStatus()
	{
	console.log(`%cuseOnlineStatus`, "color:red");

	const [isOnline, setIsOnline] = useState(true);

	useEventListener("online", () => {setIsOnline(true); console.log("ONLINE")});
	useEventListener("offline", () => {setIsOnline(false); console.log("OFFLINE");});

	return isOnline;
	}	// end function useOnlineStatus()
