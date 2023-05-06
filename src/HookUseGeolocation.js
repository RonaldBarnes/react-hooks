import React, { useRef, useState, useEffect } from 'react';

import useGeolocation from "./hooks/useGeolocation";
import useClipboard from "./hooks/useClipboard";
import useSourceCode from "./hooks/useSourceCode";


export default function HookUseGeolocation({
		language,
		t
		})
	{
	console.log("%cHookUseGeolocation", "color: red");

	const [addListener, setAddListener] = useState(false);

	const options = useRef( {
		maximumAge: 10000,
		timeout: 5000,
		enableHighAccuracy: true,
		// enableHighAccuracy: false,
		} );

	const {
		loading,
		error,
		data,
		} = useGeolocation(
			options.current,
			addListener
			);

	const [copyTextToClipboard, { successCopy } ] = useClipboard();


	return (
		<div className="hooks">
			<h2>Hook <code>UseGeolocation</code></h2>
			<p>
				Basic custom hooks that can be incorporated into a developer's toolkit.
			</p>
			<p>
				A hook for retrieving geo-location data.
			</p>

{/*
			<p>
				Normally, https is a hard requirement for geo-location data, but
				supposedly there is (was?) a work-around in FF 96.
			</p>
			<p>
				Currently that work-around is not working, so I've switched to https,
				but React / Node is <b>not</b> honouring my certificates and keeps
				insisting on some self-signed ones.  Still working on that.
			</p>
			<h4>
				Note: for non-https fetching of geo-location data, Firefox requires
				this setting created and set to true in about:config:
			</h4>
			<h4>
				geo.security.allowinsecure :: True
			</h4>

			<blockquote style={{whiteSpace:"pre"}}>
{`The behaviour can actually be changed by setting:
geo.security.allowinsecure to True
– Mattia Galati
`}
<a href="https://stackoverflow.com/questions/46597231/enable-http-geolocation-for-local-firefox-debugging"
	target="ReactHooks"
	>
https://stackoverflow.com/questions/46597231/enable-http-geolocation-for-local-firefox-debugging
</a>
			</blockquote>
*/}

			<hr />
			<h4>
				Note, in dev mode, to force proper certificates to be used, ignore
				modifying <code>package.json</code> or <code>.env</code> and do this:
			</h4>
			<blockquote>
<span style={{whiteSpace:"pre", fontFamily:"monospace"}}>
{`cd node_modules/webpack-dev-server/ssl
cat privkey.pem cert.pem > server.pem
`}
</span>
			</blockquote>
			<h4>
				Quirks in <code>useGeolocation</code>
			</h4>
			<p>
				Firefox mobile on Android 13:
			</p>
			<ul>
				<li>Constant updates happen every second, though maxTimeout is 5s</li>
				<li>altitudeAccuracy is given</li>
			</ul>
			<p>
				Chrome mobile on Android 13:
			</p>
			<ul>
				<li>Constant updates happen 5 seconds</li>
				<li>altitudeAccuracy is never supplied</li>
			</ul>
			<br />
			<p>
				It's left as an exercise for the user to generate (LetsEncrypt) and
				copy the certificate files into place.
			</p>

			{/* *********************************************************** */}
			<hr />

			<div style={{fontSize:"1.5rem"}}>
				<h4>Geolocation data:</h4>
				<div>Loading: <b>{loading.toString()}</b></div>
				<div>Error: <b>{error ? error.message : "None"}</b></div>
				<GeoDataList data={data} />
				<OptionsList options={options} />


				<label htmlFor="checkbox">Constant Updates {" "}</label>
				<input
					type="checkbox"
					checked={addListener}
					id="checkbox"
					onChange={ () => setAddListener( f => !f)}
					/>
				<p>
					<button onClick={() =>
						copyTextToClipboard(document.querySelector("#geoLocationStats").innerText)
						}
						>
						{t("Copy to Clipboard")}
					</button>
				</p>
			<p>
				{ successCopy && "Copied to clipboard." }
			</p>
			</div>
			<Code1 />
			<Code2 />
		</div>
		);	// end return
	}	// end HookUseGeolocation













function GeoDataList( {data = {} })
	{
	let output = [];

	for (const i in data.coords)
		{
//				output.push( `<li key=${i}>${i}: ${data[i]}</li>`);
		output.push(i);
		}
	//output.length === 0 ? "N/A" : output;
	let tmpDate = new Date(data.timestamp);


	return (
		<code style={{padding:"0px"}}>
			<ul id="geoLocationStats">
			{output.length > 0 && output.map( (item,index) =>
				<li
					key={index}>
						{item}:	{
							data.coords[item] === null
								? "null"
								: ["latitude", "longitude", "heading"].includes(item)
									? data.coords[item].toPrecision(6) + "°"
									: data.coords[item].toPrecision(4) + "m"
							}
							{item === "speed" && data.coords[item] !== null && "/s"}
				</li>
				)
			}
			{output.length > 0 &&
				<li key="timestamp">timestamp: {
					tmpDate.toTimeString().split(" ")[0]
					}</li>
			}
			</ul>
		</code>
		);
	}	// end function GeoDataList






function OptionsList( {options = {} })
	{
	let output = [];

	for (const i in options.current)
		{
//				output.push( `<li key=${i}>${i}: ${data[i]}</li>`);
		output.push(i);
		}

	useEffect( () => {
		window.scrollTo({top:0, behavior:"smooth"})
		}, []);


	return (
		<>
			<h4>
				Options:
			</h4>
			<code style={{padding:"0px"}}>
				<ul>
					{
					Object.keys(options.current).map( (key,idx) => (
						<li key={idx}>
							{key}: {options.current[key].toLocaleString()}
							{key === "enableHighAccuracy" ? "" : "ms"}
						</li>
						))
					}
				</ul>
			</code>
		</>
		);	// end return
	}	// end function OptionsList





function Code1()
	{
	const code = `
import useGeolocation from "./hooks/useGeolocation";
import useClipboard from "./hooks/useClipboard";


export default function HookUseGeolocation()
	{
	const [addListener, setAddListener] = useState(false);

	const options = useRef( {
		maximumAge: 10000,
		timeout: 5000,
		enableHighAccuracy: true,
		// enableHighAccuracy: false,
		} );

	const {
		loading,
		error,
		data,
		} = useGeolocation(
			options.current,
			addListener
			);

	const [copyTextToClipboard, { successCopy } ] = useClipboard();


	return (
		<div className="hooks">
			<div style={{fontSize:"1.5rem"}}>
				<h4>Geolocation data:</h4>
				<div>Loading: <b>{loading.toString()}</b></div>
				<div>Error: <b>{error ? error.message : "None"}</b></div>
				<GeoDataList data={data} />
				<OptionsList options={options} />


				<label htmlFor="checkbox">Constant Updates {" "}</label>
				<input
					type="checkbox"
					checked={addListener}
					id="checkbox"
					onChange={ () => setAddListener( f => !f)}
					/>
				<p>
					<button onClick={() =>
						copyTextToClipboard(document.querySelector("#geoLocationStats").innerText)
						}
						>
						Copy Location to Clipboard
					</button>
				</p>
			<p>
				{ successCopy && "Copied to clipboard." }
			</p>
			</div>
		</div>
		);	// end return
	}	// end HookUseGeolocation




function GeoDataList( {data = {} })
	{
	let output = [];

	for (const i in data.coords)
		{
		output.push(i);
		}
	//output.length === 0 ? "N/A" : output;
	let tmpDate = new Date(data.timestamp);


	return (
		<code style={{padding:"0px"}}>
			<ul id="geoLocationStats">
			{output.length > 0 && output.map( (item,index) =>
				<li
					key={index}>
						{item}:	{
							data.coords[item] === null
								? "null"
								: ["latitude", "longitude", "heading"].includes(item)
									? data.coords[item].toPrecision(6) + "°"
									: data.coords[item].toPrecision(4) + "m"
							}
							{item === "speed" && data.coords[item] !== null && "/s"}
				</li>
				)
			}
			{output.length > 0 &&
				<li key="timestamp">timestamp: {
					tmpDate.toTimeString().split(" ")[0]
					}</li>
			}
			</ul>
		</code>
		);	// end return
	}	// end function GeoDataList







function OptionsList( {options = {} })
	{
	let output = [];

	for (const i in options.current)
		{
		output.push(i);
		}


	return (
		<>
			<h4>
				Options:
			</h4>
			<code style={{padding:"0px"}}>
				<ul>
					{
					Object.keys(options.current).map( (key,idx) => (
						<li key={idx}>
							{key}: {options.current[key].toLocaleString()}
							{key === "enableHighAccuracy" ? "" : "ms"}
						</li>
						))
					}
				</ul>
			</code>
		</>
		);	// end return
	}	// end function OptionsList



`;
	const output = useSourceCode({code});

	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code





function Code2()
	{
	const code = `
import { useRef, useState, useEffect } from 'react';

export default function useGeolocation(options, addListener = false)
	{
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [data, setData] = useState( {} );

	// watchPosition id:
	const id = useRef();


	useEffect( () => {
		const successHandler = e => {
			setLoading(false);
			setError(false);
			setData(e);
			}
		const errorHandler = e => {
			setData(e);
			setError(e);
			setLoading(false);
			console.table(e);
			}
		navigator.geolocation.getCurrentPosition(
			successHandler,
			errorHandler,
			options
			);

		if (addListener)
			{
			// Disable this, it checks ~once per second
			// (per maxTimeout, now set to 5+ seconds):
			id.current = navigator.geolocation.watchPosition(
				successHandler,
				errorHandler,
				options
				);
			}
		// cleanup:
		return () => {
			if (id.current != null)
				{
				navigator.geolocation.clearWatch(id.current);
				}
			}
		}, [options, addListener]
	);

	return { loading, error, data };
	}	// end function

`;
	const output = useSourceCode({code});

	return (
		<div className="codeFormatted">
			{output}
		</div>
		);	// end return
	}	// end Code2



// eslint-disable-next-line
function CodeOrig()
	{
	return (
			<div className="jsx" style={{marginTop:"2rem"}}><code>
				<span style={{color:"lightgreen"}}>
{`
  const {
    loading,
    error,
    data  //: {latitude, longitude},
    }
    = useGeolocation();
...
      <div style={{fontSize:"1.5rem"}}>
        <h4>Geolocation data:</h4>
        <div>Loading: {loading.toString()}</div>
        <div>Error: {error ? error.message : "None"}</div>
        <ul>
          <GeoDataList data={data} />
        </ul>
      </div>
...

function useGeolocation(options)
  {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState( {} );

  useEffect( () => {
    const successHandler = e => {
      setLoading(false);
      setError(false);
      setData(e.coords ? e.coords : {latitude:"X North", longitude: "Y West"} );
      console.table(e);
      }
    const errorHandler = e => {
      setError(e);
      setLoading(false);
      console.table(e);
      }
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
      );
/*
    // Disable this, it checks ~once per second:
    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
      );
    // cleanup:
    return () => navigator.geolocation.clearWatch(id);
*/
    }, [options]
  );

  return { loading, error, data };
  }  // end function

`}

				</span>
			</code></div>

		);	// end return
	}	// end CodeOrig
