import React, { useEffect, useState, useContext } from 'react';

import useCookies from "./hooks/useCookies";

import { contextTranslate } from "./App.js";
import PageTitle from "./PageTitle";


export default function HookUseCookies()
	{
	console.log("%cHookUseCookies", "color: red");

	// Entry field for user's test data:
	const [cookieName, setCookieName] = useState("name");
	const [cookieValue, setCookieValue] = useState("Ron");

  const { t } = useContext(contextTranslate);

	// const updateCookie = () => {
	// 	console.log(`UPDATE: ${cookieName}`);
	// 	return;
	// 	};
	// const deleteCookie = () => {
	// 	console.log(`DELETE: ${cookieName}`);
	// 	setcookieName( () => "");
	// 	return;
	// 	};

	const [
		setCookie,
		updateCookie,
		deleteCookie,
		getCookie,
		getCookiesAllArray,
		getCookieCount,
		// eslint-disable-next-line
		findCookie,
		{
			cookieCounter,
			setCookieCounter,
			optionsDefault,
			// eslint-disable-next-line
			success,
			status,
		}
		] = useCookies();

	const options = {"max-age": 300};

	// Seed a couple test cookies, only at first load, only no cookies exist:
	useEffect( () => {
		if (getCookieCount() < 3)
			{
			setCookie( "test 1", "a 5 minute test cookie", {"max-age":300});
			setCookie( "test 2", "a 6 minute test cookie", {"max-age":360});
			}
		}, []);
	// let [cookieCounter, setCookieCounter] = useState( () => getCookiesAll().split("; ").length);
	// let [cookieCounter, setCookieCounter] = useState(getCookiesAll().split("; ").length);
// let cookieCounter = getCookiesAll().split("; ").length

	// let tmpCount = document.cookie.split("; ").length || 0;

	// Put focus into input field: (USE autoFocus)
	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"});
		},[]);


	return (
		<div className="hooks">
      <PageTitle hookName="useCookies" />
			<p>
				This hook will give the browser easy ability to manipulate cookies.
			</p>
			<p>
				There are functions for setting, getting, getting all as an array, getting a
				count, deleting, and finding (by name) cookies.
			</p>
			<p>
				The course material used an external library, but I wrote it in pure JS & React,
				similar to the <code>useClipboard</code> hook.
			</p>
			<hr />

			<form onSubmit={(e) => {e.preventDefault()} }>
				<fieldset><legend>Test Cookie</legend>
					<p>
					<label htmlFor="cookie-name">Cookie Name:</label> {" "}
					<input
						type="text"
						value={cookieName}
						id="cookie-name"
						onChange={(e) => setCookieName(e.target.value)}
						autoFocus
						/>
					{/* {findCookie(cookieName) === true && " Cookie exists"} */}
					</p>
					<p>
						<label htmlFor="cookie-value">Cookie Value:</label> {" "}
						<input
							type="text"
							value={cookieValue}
							id="cookie-value"
							onChange={(e) => {
								setCookieValue(e.target.value);
								}}
							/>
					</p>
					<p>
						<button onClick={() => {
							setCookie(cookieName, cookieValue, {"max-age":60});
							setCookieCounter(getCookieCount());
							}}>
							{t("Set")} Cookie
						</button>
						{" "}
						<button onClick={() => {
							deleteCookie(cookieName);
							setCookieCounter(getCookieCount());
							}} >
							{t("Delete")} Cookie
						</button>
						{" "}
						<button onClick={() => {
							updateCookie(cookieName, cookieValue, {...options, "max-age":120});
							setCookieCounter(getCookieCount());
							}} >
							{t("Update")} Cookie
						</button>
					</p>
				</fieldset>
			</form>
			<h3>Activity Log:</h3>
			<ul style={{listStyleType:"none"}}>
				{status.map( (m,i) => 
					<li key={i}>
						{m}
					</li>
					)
				}
			</ul>

			<CookieList
				getCookiesAllArray={getCookiesAllArray}
				cookieCounter={cookieCounter}
				getCookie={getCookie}
				/>
			{/* <p style={{whiteSpace:"pre"}}> {`
				Counter1: ${cookieCounter}
				Counter2: ${tmpCount}
				Counter3: ${getCookieCount()}
			`}</p> */}

			<OptionsList
				options={ {...optionsDefault, ...options} }
				/>

			<Code />
		</div>
		);	// end return
	}	// end function




function CookieList({getCookiesAllArray, cookieCounter=0, getCookie})
	{
	let list = getCookiesAllArray().map( (c,idx) => <li key={idx}>{c}</li>)

	return (
		<>
			<h3>
				Cookies List:
			</h3>
			<pre style={{whiteSpace:"pre"}}>
				<ol>
					{list}
				</ol>
			{/* getCookie("test 1"): "{getCookie("test 1")}" */}
			</pre>
		</>
		);
	}	// end function CookieList



function OptionsList({options})
	{
	let list = Object.keys(options).map( (c,idx) =>
		<li key={idx}>{c}={options[c].toString()}</li>
		);

	return (
		<>
			<h3>
				Cookie Options:
			</h3>
			<pre style={{whiteSpace:"pre"}}>
				<ol>
					{list}
				</ol>
			</pre>
		</>
		);
	}	// end function CookieList




function Code()
	{
	return (
		<div className="jsx" style={{marginTop:"2rem"}}>
			<code className="green">
				{`
import useCookies from "./hooks/useCookies";


export default function HookUseCookies()
  {
  const [cookieName, setCookieName] = useState("name");
  const [cookieValue, setCookieValue] = useState("Ron");

  const [
    setCookie,
    updateCookie,
    deleteCookie,
    getCookie,
    getCookiesAllArray,
    getCookieCount,
    findCookie,
    {
      cookieCounter,
      setCookieCounter,
      optionsDefault,
      success,
      status,
    }
    ] = useCookies();

  const options = {"max-age": 300};

      <form onSubmit={(e) => {e.preventDefault()} }>
        <fieldset><legend>Test Cookie</legend>
          <p>
          <label htmlFor="cookie-name">Cookie Name:</label> {" "}
          <input
            type="text"
            value={cookieName}
            id="cookie-name"
            onChange={(e) => setCookieName(e.target.value)}
            />
          {/* {findCookie(cookieName) === true && " Cookie exists"} */}
          </p>
          <p>
            <label htmlFor="cookie-value">Cookie Value:</label> {" "}
            <input
              type="text"
              value={cookieValue}
              id="cookie-value"
              onChange={(e) => {
                setCookieValue(e.target.value);
                }}
              />
          </p>
          <p>
            <button onClick={() => {
              setCookie(cookieName, cookieValue, {"max-age":60});
              setCookieCounter(getCookieCount());
              }}>
              Set Cookie
            </button>
            {" "}
            <button onClick={() => {
              deleteCookie(cookieName);
              setCookieCounter(getCookieCount());
              }} >
              Delete Cookie
            </button>
            {" "}
            <button onClick={() => {
              updateCookie(cookieName, cookieValue, {...options, "max-age":120});
              setCookieCounter(getCookieCount());
              }} >
              Update Cookie
            </button>
          </p>
        </fieldset>
      </form>
      <h3>Activity Log:</h3>
      <ul style={{listStyleType:"none"}}>
        {
        status.map( (m,i) => 
          <li key={i}>
            {m}
          </li>
          )
        }
      </ul>

      <CookieList
        getCookiesAllArray={getCookiesAllArray}
        cookieCounter={cookieCounter}
        getCookie={getCookie}
        />

      <OptionsList
        options={ {...optionsDefault, ...options} }
        />

      <Code />
    </div>
    );  // end return
  }  // end function




function CookieList({getCookiesAllArray, cookieCounter=0, getCookie})
  {
  let list = getCookiesAllArray().map( (c,idx) => <li key={idx}>{c}</li>)

  return (
    <>
      <h3>
        Cookies List:
      </h3>
      <pre style={{whiteSpace:"pre"}}>
        <ol>
          {list}
        </ol>
      {/* getCookie("test 1"): "{getCookie("test 1")}" */}
      </pre>
    </>
    );
  }  // end function CookieList



function OptionsList({options})
  {
  let list = Object.keys(options).map( (c,idx) =>
    <li key={idx}>{c}={options[c].toString()}</li>
    );

  return (
    <>
      <h3>
        Cookie Options:
      </h3>
      <pre style={{whiteSpace:"pre"}}>
        <ol>
          {list}
        </ol>
      </pre>
    </>
    );
  }  // end function CookieList





import { useState, useRef } from "react";

export default function useCookies()
  {
  const [cookieCounter, setCookieCounter] = useState( () =>
    document.cookie.split("; ").length
    );

  const statusLogLength = 4;
  let newestMessage = useRef("");

  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState([]);


  // Prevent duplicate messages in Activity Log:
  function updateStatusNoDups(newmsg)
    {
    if (newestMessage.current !== newmsg && newmsg.length > 0)
      {
      setStatus( (curr) => [newmsg, ...curr].slice(0,statusLogLength));
      newestMessage.current = newmsg;
      }
    };


  const optionsDefault = {
    SameSite: "lax",
    Secure: true,
    "max-age": 24*60*60*7,
    // The HttpOnly doesn't take a true/false, just by existing it is invoked:
    // HttpOnly: false,
    };




  const setCookie = (name="?", value="", options) => {
    // console.table(options);
    try
      {
      if (findCookie(name)) throw new Error(\`Cookie "\${name}" already exists, aborting.\`)

      const allOpts = {...optionsDefault, ...options};
      let optsString = Object.keys(allOpts).map( key =>
        \`\${key}=\${allOpts[key]}\`).join(";")
        ;
      document.cookie = \`\${name}=\${value};\${optsString}\`;
      setSuccess( () => true);
      updateStatusNoDups(\`Set cookie "\${name}=\${value};\${optsString}"\`);
      }
    catch(e)
      {
      setSuccess(false);
      updateStatusNoDups(e.toString());
      }
    }; // end setCookie



  const getCookie = (name="") => {
    try
      {
      let cookieVal = document.cookie.split("; ").find( c => c.indexOf(\`\${name}=\`) === 0);
      if (cookieVal === undefined)
        {
        return "";
        setSuccess( () => false);
        // throw new Error( \`Could not retrieve cookie "\${name}"\`);
        }

      // console.log(\`getCookie name: \${name} value: \${cookieVal}\`)
      let retVal = cookieVal.split("=").slice(1);
      setSuccess( () => true);
      // Can happen on each page render, pollutes Activity Log:
      // updateStatusNoDups(\`Retrieved value for cookie "\${name}"\`);
      return retVal[0];
      }
    catch(e)
      {
      setSuccess( () => false);
      updateStatusNoDups(e.toString());
      }
    }



  const getCookiesAllArray = () => {
    try
      {
      const arr = document.cookie.split("; ");
      // setSuccess( () => arr.length > 0 ? true : false);
      // In example page, this overwrites actions like "delete" and "set":
      // updateStatusNoDups(\`Retrieved \${arr.length} cookies\`);
      return arr;
      }
    catch(e)
      {
      setSuccess(false);
      updateStatusNoDups(e.toString());
      }
    }


  const getCookieCount = () => {
    return getCookiesAllArray().length;
    };


  const deleteCookie = (name="") => {
    try
      {
      // console.log(\`DELETE COOKIE name: \${name}\`);
      if (! findCookie(name))
        throw new Error(\`Cookie named "\${name}" does not exist, can't delete...\`);

      // Delete via expiring it immediately:
      // document.cookie = \`\${name}=\${value};\${tmp};max-age=0;\`;
      document.cookie = \`\${name}=;max-age=0;\`;
      setSuccess( () => true);
      updateStatusNoDups(\`Deleted cookie "\${name}"\`);
      }
    catch(e)
      {
      setSuccess(false);
      updateStatusNoDups(e.toString());
      }
    };  // end deleteCookie




  const findCookie = (name="") => {
    try
      {
      let found = document.cookie
        .split("; ")
        .filter( c => c.indexOf(\`\${name}=\`) === 0)
          .length === 1
        ;
      setSuccess(() => found);
      // updateStatusNoDups(found
      //   ? \`Found cookie "\${name}"\`
      //   : \`Did not find cookie "\${name}"\`);
      // setStatus( (curr) => found
      //   ? [\`Found cookie "\${name}"\`, ...curr].slice(0,2)
      //   : [\`Did not find cookie "\${name}"\`, ...curr].slice(0,2)
      //   );

      return found;
      }
    catch(e)
      {
      setSuccess(false);
      updateStatusNoDups(e.toString());
      // setStatus((curr) => [e.toString(), ...curr].slice(0,statusLogLength));
      }
    };




  const updateCookie = (name="", value="", options) =>
    {
    try
      {
      if (! findCookie(name))
        throw new Error(\`Cannot update cookie "\${name}" - it doesn't exist...\`);

      const allOpts = {...optionsDefault, ...options};
      let optsString = Object.keys(allOpts).map( key =>
        \`\${key}=\${allOpts[key]}\`).join(";")
        ;
      document.cookie = \`\${name}=\${value};\${optsString}\`;
      setSuccess( () => true);
      updateStatusNoDups(\`Updated cookie "\${name}=\${value};\${optsString}"\`);
      // setStatus( (curr) =>
      //   [\`Updated cookie "\${name}=\${value};\${optsString}"\`, ...curr]
      //   .slice(0, statusLogLength)
      //   );
      }
    catch(e)
      {
      setSuccess(false);
      updateStatusNoDups(e.toString());
      // setStatus( (curr) => [e.toString(), ...curr].slice(0, statusLogLength))
      }
    };

  return [
    setCookie,
    updateCookie,
    deleteCookie,
    getCookie,
    getCookiesAllArray,
    getCookieCount,
    findCookie,
    { cookieCounter, setCookieCounter, optionsDefault, success, status }
    ];
  }  // end function useCookies()

				`}
			</code>
		</div>
		); // end return
	}	// end function
