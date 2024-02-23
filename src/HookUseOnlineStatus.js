import React, { useEffect } from 'react';

import useOnlineStatus from "./hooks/useOnlineStatus";
import PageTitle from "./PageTitle";


export default function HookUseOnlineStatus()
	{
	console.log("%cHookUseOnlineStatus", "color: red");

	const isOnline = useOnlineStatus();


	// Put focus into input field:
	// useEffect( () => document.querySelector("input").focus(), []);

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[])


	return (
		<div className="hooks">
      <PageTitle hookName="useOnlineStatus" />
			<p>
				This hook will give the browser an indication of whether online or not.
				Not entirely reliable as there are many reasons connectivity may be lost.
			</p>
			<p>
				Per the HTML Standard on {" "}
					<a href="https://html.spec.whatwg.org/multipage/system-state.html#navigator.online:event-offline"
						target="ReactHooks"
						>
						online status:
						</a>
			</p>
			<blockquote>
				This attribute is inherently unreliable.
				A computer can be connected to a network without having Internet access.
			</blockquote>
			<p>
				Also, online status is read-only.
			</p>

			<hr />
			<h3>
				Online Status: {isOnline === true ? "true" : "false"}
			</h3>
			<Code />
		</div>
		);	// end return
	}	// end function





function Code()
	{
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="green">
				{`
import useOnlineStatus from "./hooks/useOnlineStatus";


export default function HookUseOnlineStatus()
  {
  return (
 
      <hr />
      <h3>
        Online Status: {isOnline === true ? "true" : "false"}
      </h3>
      <Code />
    </div>
    )  // end return
  }  // end function






import { useState } from "react";

import { useEventListener } from "./useEventListener";


export default function useOnlineStatus()
  {
  const [isOnline, setIsOnline] = useState(true);

  useEventListener("online", () => {setIsOnline(true); console.log("ONLINE")});
  useEventListener("offline", () => {setIsOnline(false); console.log("OFFLINE");});

  return isOnline;
  }  // end function useOnlineStatus()


				`}
			</code>
		</div>
		); // end return
	}	// end function
