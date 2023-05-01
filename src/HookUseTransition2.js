
// Kyle does NOT import React, but it fails without it here:
import React, { useState, useTransition } from "react"
// Newer versions of React do not require you to import React to get them to work.
// https://courses.webdevsimplified.com/view/courses/react-hooks-simplified/
// import { useTransition, useState } from "react";




export default function HookUseTransition2()
	{
  const [input, setInput] = useState("")
  const [list, setList] = useState([])
  const [isPending, startTransition] = useTransition()

  function handleChange(e) {
    setInput(e.target.value)
    startTransition(() => {
			const tmpList = []
			for (let i=0; i<5000; i++)
				{
				tmpList.push(e.target.value)
				}
      setList(tmpList)
    })
  }

  return (
		<div className="hooks">
			<h3>Kyle's <code>useTransition</code> blog example</h3>
{/*			<p>Somehow, I <b>still can't get it working</b></p> */}

	    <input type="text" value={input} onChange={handleChange} />
			<h4>list with transition:</h4>
	    {isPending
				? <div>Loading...</div>
	    	: list.map( (item,index) => {
						return <div key={index}>{index.toLocaleString()}: {item}</div>
					})
	    }
	  </div>
		);	// end return
	}	// end function
