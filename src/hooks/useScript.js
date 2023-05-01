
import useAsync from "./useAsync";

export default function useScript(url)
	{
	return useAsync( () => {
		const script = document.createElement("script");
		script.src = url;
		script.async = true;

		return new Promise( (resolve,reject) => {
			// Once loaded, resolve:
			script.addEventListener("load", resolve);
			// If error event, reject:
			script.addEventListener("error", reject);
			document.body.appendChild(script);
			}, [url])	// end useAsync
		}); // end return useAsync
	}	// end function useScript
