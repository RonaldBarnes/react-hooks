
import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from "react-router-dom";

// import './Hooks.css';
import { useSessionStorage } from "./hooks/useStorage";
import useMediaQuery from "./hooks/useMediaQuery";


// Figure out initial loading sidebar state (showing / hidden).
// If "small" screen, it's hidden, if wide screen, it's showing.
function deriveShowSidebar(smallScreen, sb)
	{
	if (sb === null) return false;
	// const sb = document.querySelector(".sidebar");
	if (smallScreen)
		{
		if (sb.classList.contains("display")) return true;
		return false
		}
	if (sb.classList.contains("nodisplay")) return false;
	return true;
	}



export function SidebarMenu()
	{
	// This will indicate when screen changes from "wide" to "small":
	let smallScreen = useMediaQuery("(max-width: 1000px)");

	// Get the sidebar so we can deal with responsive media-query / click on show/hide:
	const sb = document.querySelector(".sidebar");

	const showingSidebar = useRef(deriveShowSidebar(smallScreen, sb));

	// Save showing status to state, to trigger re-render of menu after changes,
	// like when window resizes to "small", sidebar disappears, sidebar-menu should
	// switch to hamburger menu from close "X":
	// let [showingSidebar2,setShowingSidebar2] = useState(showingSidebar.current);
	let [setShowingSidebar2] = useState(showingSidebar.current);



	const clickSidebarMenu = (e) =>
		{
		e.preventDefault();
		const sb = document.querySelector(".sidebar");


		showingSidebar.current = !showingSidebar.current;
		console.log("Sidebar.js clickSidebarmenu() NOW showSidebar = :",
			showingSidebar.current.toString());

		if (showingSidebar.current)
			{
			sb.classList.remove("nodisplay");
			sb.classList.add("display");
			}
		else
			{
			sb.classList.add("nodisplay");
			sb.classList.remove("display");
			}
		setShowingSidebar2( currval => !currval);
		}



	// Add ONE-TIME an event listener on the sidebar-menu for "click":
	useEffect( () => {
		// Use a setTimeout so the page can get all elements, else it *can*
		// return null for sidebar:
		setTimeout( () => {
			console.log("Sidebar.js setTimeout addEventListener next:");
			document.querySelector(".sidebar-menu")
				.addEventListener("click", (e) => clickSidebarMenu(e))
			}, 1000);

		return () => {
			console.log("Sidebar.js useEffect RETURN function remove eventListener...");
			document.querySelector(".sidebar-menu")
				.removeEventListener("click", clickSidebarMenu);
			}
		}, [])


	// Monitor changes in media-query from wide <--> small and
	// cleanup any applied CSS that may have been forcing showing / hidden:
	// i.e. if wide and "nodisplay", when becomes narrow, remove "nodisplay",
	// since it's specified in the CSS - allow CSS to handle it...
	useEffect( () => {
		const sb = document.querySelector(".sidebar");
		// console.log(`useEFFECT: smallScreen (show sidebar?)= ${smallScreen.toString()}`);
		if (smallScreen)
			{
			if (sb.classList.contains("display"))
				{
				showingSidebar.current = true;
				}
			else
				{
				showingSidebar.current = false;
				// Default for smallScreen is display:none, remove our over-rides:
				sb.classList.remove("display", "nodisplay");
				}
			}
		else if (sb.classList.contains("nodisplay"))
			{
			// Widescreen is true, remove residual class:
			showingSidebar.current = false;
			sb.classList.remove("display");
			}
		else
			{
			showingSidebar.current = true;
			// Widescreen is true, remove residual class:
			sb.classList.remove("display");
			}
		setShowingSidebar2( currval => !currval);
		},[showingSidebar.current, smallScreen]);


	return (
		<div className="sidebar-menu">
			{showingSidebar.current === true
				? " × "
				: " ☰ "
			}
		</div>
		);	// end return
	}	// end SidebarMenu




export default function Sidebar()
	{
	const [sortAlpha, setSortAlpha] = useSessionStorage("sortAlpha", false);
	const [sortDirAsc, setSortDirAsc] = useSessionStorage("sortDirAsc", true);

	return(
		<>
			<SidebarMenu />
		<nav className="sidebar" id="sidebar">

			<div style={{
				display:"flex",
				flexDirection:"row",
				justifyContent:"space-around",
				marginTop:"1rem",
				}}>
				<div>
				<i
					className="fa fa-arrow-down-a-z"
					aria-hidden="true"
					title="Sort alpha ascending"
					onClick={() => { setSortAlpha(true); setSortDirAsc( () => true) }}
					style={{ outline: sortAlpha === true && sortDirAsc === true ? "1px solid red" : "none"}}
					>
				</i> {" "}
				<i
					className="fa fa-arrow-up-z-a"
					aria-hidden="true"
					title="Sort alpha descending"
					onClick={() => { setSortAlpha(true); setSortDirAsc( () => false) }}
					style={{ outline: sortAlpha === true && sortDirAsc === false ? "1px solid red" : "none"}}
					>
				</i> {" "}
				</div>
				<div>
				<i
					className="fa fa-sort fa-arrow-down-1-9"
					aria-hidden="true"
					title="Sort by date ascending"
					onClick={() => { setSortAlpha(false); setSortDirAsc(true)}}
					style={{ outline: sortAlpha === false && sortDirAsc === true ? "1px solid red" : "none"}}
					>
				</i> {" "}
				<i
					className="fa fa-arrow-up-9-1"
					aria-hidden="true"
					title="Sort by date descending"
					onClick={() => { setSortAlpha(false); setSortDirAsc(false)}}
					style={{ outline: sortAlpha === false && sortDirAsc === false ? "1px solid red" : "none"}}
					>
				</i> {" "}
				</div>
			</div>
			<hr style={{width:"100%", marginTop:"12px"}} />
			<ul>
				<li>
					<i className="fa fa-house" aria-hidden="true"></i>{" "}
					<NavLink to="/">Home</NavLink>
				</li>
			</ul>

			<CustomHooks sortAlpha={sortAlpha} sortDirAsc={sortDirAsc} />


			<h4>React Hooks</h4>
			<ul>
				<li><NavLink to="/useState" end>useState</NavLink>
					<ul>
						<li>
							<NavLink to="/useState/multi-updates">multiple updates</NavLink>
						</li>
						<li>
							<NavLink to="/useState/objects">updating objects</NavLink>
						</li>
					</ul>
				</li>
				<li>
					<NavLink to="/useEffect">useEffect</NavLink>
				</li>
				<li>
					<NavLink to="/useContext" end>useContext</NavLink>
					<ul>
						<li>
							<NavLink to="/useContext/method-1">Method 1</NavLink>
						</li>
						<li>
							<NavLink to="/useContext/method-2">Method 2</NavLink>
						</li>
					</ul>
				</li>
				<li>
					<NavLink to="/useRef">useRef</NavLink>
				</li>
				<li>
					<NavLink to="/useMemo">useMemo</NavLink>
				</li>
				<li>
					<NavLink to="/useCallback">useCallback</NavLink>
				</li>
				<li>
					<NavLink to="/useReducer" end>useReducer</NavLink>
					<ul>
						<li>
							<NavLink to="/useReducer/counter">Counter</NavLink>
						</li>
						<li>
							<NavLink to="/useReducer/todos">Todos List</NavLink>
						</li>
					</ul>
				</li>
				<li>
					<NavLink to="/useTransition" end>useTransition</NavLink>
					<ul>
						<li>
							<NavLink to="/useTransition/WebDev">WebDev Simplified</NavLink>
						</li>
					</ul>
				</li>
				<li>
					<NavLink to="/useDeferredValue">useDeferredValue</NavLink>
				</li>
				<li>
					<NavLink to="/useLayoutEffect">useLayoutEffect</NavLink>
				</li>
				<li>
					<i className="fa fa-bug-slash" aria-hidden="true"></i>{" "}
					<NavLink to="/useDebugValue">useDebugValue</NavLink>
				</li>
				<li>
					<NavLink to="/useImperativeHandle">useImperativeHandle</NavLink>
				</li>
				<li>
					<NavLink to="/useId">useId</NavLink>
				</li>
			</ul>

		</nav>
		</>
		);
	}







function CustomHooks({sortAlpha, sortDirAsc})
	{
	const hooksList = [
		{ seq:  1, name: "useLocalStorage", icon: "fa fa-database" },
		{ seq:  2, name: "useSessionStorage", icon: "fa fa-database" },
		{ name: "<hr />" },
		{ seq:  3, name: "useToggle", icon: "fa fa-toggle-on", },
		{ seq:  4, name: "useTimeout", icon: "fa fa-hourglass-half", },
		{ seq:  5, name: "useDebounce", icon: "fa fa-hourglass-half", },
		{ seq:  6, name: "useUpdateEffect", icon: "fa fa-spinner" },
		{ seq:  7, name: "useArray", icon: "fa fa-layer-group fa-list-ol" },
		{ name: "<hr />" },
		{ seq:  8, name: "usePrevious", icon: "fa fa-clock-rotate-left" },
		{ seq:  9, name: "useStateWithHistory", icon: "fa fa-clock-rotate-left" },
		{ seq: 10, name: "useStorage", icon: "fa fa-database" },
		{ seq: 11, name: "useAsync", icon: "fa fa-rotate", },
		{ seq: 12, name: "useFetch", icon: "fa fa-dog", },
		{ name: "<hr />" },
		{ seq: 13, name: "useScript", icon: "fa fa-code", },
		{ seq: 14, name: "useDeepCompareEffect", icon: "fa fa-balance-scale", },
		{ seq: 15, name: "useEventListener", icon: "fa fa-headphones-simple", },
		{ seq: 16, name: "useOnScreen", icon: "fa fa-display", },
		{ name: "<hr />" },
		{ seq: 17, name: "useMediaQuery", icon: "fa fa-mobile-screen", },
		{ seq: 18, name: "useGeolocation", icon: "fa fa-location-dot", },
		{ seq: 19, name: "useStateWithValidation", icon: "fa fa-check", },
		{ seq: 20, name: "useSize", icon: "fa fa-ruler", },
		{ seq: 21, name: "useEffectOnce", icon: "fa fa-1", },
		{ name: "<hr />" },
		{ seq: 21.5, name: "useClickOutside", icon: "fa fa-computer-mouse", },
		{ seq: 22, name: "useDarkMode", icon: "fa fa-moon", },
		{ seq: 23, name: "useClipboard", icon: "fa fa-clipboard", },
		{ seq: 24, name: "useCookies", icon: "fa fa-cookie-bite", },
		{ seq: 25, name: "useTranslation", icon: "fa fa-language", },
		{ name: "<hr />" },
		{ seq: 26, name: "useOnlineStatus", icon: "fa fa-wifi", },
		{ seq: 27, name: "useRenderCount", icon: "fa fa-list-ol", },
		{ seq: 28, name: "useDebugInfo", icon: "fa fa-bug-slash" },
		{ seq: 29, name: "useHover", icon: "fa fa-paper-plane fa-overline", },
		{ seq: 30, name: "useLongPress", icon: "fa fa-hand-point-down", },
		{ seq: 40, name: "useSourceCode", icon: "fa fa-code", },
		];

	let displayList = [];

console.log(`sortAlpha: ${sortAlpha.toString()} sortDirAsc: ${sortDirAsc.toString()} `)

	if (sortAlpha === true)
		{
		if (sortDirAsc === true)
			{
			displayList = hooksList
				.filter( (hook, idx) => hook.name !== "<hr />")
				.sort( (a,b) => {
					if (a.name < b.name) return -1
					if (b.name < a.name) return 1
					return 0
					})
			}
		else
			{
			displayList = hooksList
				.filter( (hook, idx) => hook.name !== "<hr />")
				.sort( (b,a) => {
					if (a.name < b.name) return -1
					if (b.name < a.name) return 1
					return 0
					})
			}
		}
	else if (sortDirAsc === true)
		{
		displayList = hooksList
			// .filter( (hook, idx) => hook.name !== "<hr />")
			// .sort( (a,b) => {
			// 	if (a.seq < b.seq) return -1
			// 	if (b.seq < a.seq) return 1
			// 	return 0
			// 	})
		}
	else
		{
		displayList = hooksList.reverse()
			// .filter( (hook, idx) => hook.name !== "<hr />")
			// .sort( (b,a) => {
			// 	if (a.seq < b.seq) return -1
			// 	if (b.seq < a.seq) return 1
			// 	return 0
			// 	})
		}


	return (
		<>
			<h4>Custom Hooks</h4>
			<ul>
				{
				displayList.map( (hook,idx) => {
					return hook.name === "<hr />" ? <hr key={idx} /> : <li key={idx}>
						<i className={hook.icon} aria-hidden="true"></i> {" "}
						<NavLink to={hook.name}>{hook.name}</NavLink>
					</li>
					})
				}
			</ul>
		</>
		);	// end return
	}	// end function

/*
				// <hr />
				// <li>
				// 	<i className="fa fa-ban" aria-hidden="true"></i>{" "}
				// 	<NavLink to="/useNext">404</NavLink>
				// </li>

*/



/*
		<h4>Custom Hooks</h4>
			<ul>
				<li>
					<i className="fa fa-database" aria-hidden="true"></i>{" "}
					<NavLink to="/useLocalStorage">useLocalStorage</NavLink>
				</li>
				<li>
					<i className="fa fa-database" aria-hidden="true"></i>{" "}
					<NavLink to="/useSessionStorage">useSessionStorage</NavLink>
				</li>
				<hr />
				<li>
					<i className="fa fa-toggle-off" aria-hidden="true"></i>{" "}
					<NavLink to="/useToggle">useToggle</NavLink>
				</li>
				<li>
					<i className="fa fa-hourglass-3 fa-clock-o" aria-hidden="true"></i>{" "}
					<NavLink to="/useTimeout">useTimeout</NavLink>
				</li>
				<li>
					<i className="fa fa-soccer-ball-o" aria-hidden="true"></i>{" "}
					<i className="fa fa-hourglass-half" aria-hidden="true"></i>{" "}
					<NavLink to="/useDebounce">useDebounce</NavLink>
				</li>
				<li>
					<i className="fa fa-spinner" aria-hidden="true"></i>{" "}
					<NavLink to="/useUpdateEffect">useUpdateEffect</NavLink>
				</li>
				<li>
					<i className="fa fa-layer-group fa-list-ol" aria-hidden="true"></i>{" "}
					<NavLink to="/useArray">useArray</NavLink>
				</li>

				<hr />
				<li>
					<i className="fa fa-clock-rotate-left" aria-hidden="true"></i>{" "}
					<NavLink to="/usePrevious">usePrevious</NavLink>
				</li>
				<li>
					<i className="fa fa-clock-rotate-left" aria-hidden="true"></i>{" "}
					<NavLink to="/useStateWithHistory">useStateWithHistory</NavLink>
				</li>
				<li>
					<i className="fa fa-database" aria-hidden="true"></i>{" "}
					<NavLink to="/useStorage">useStorage</NavLink>
				</li>
				<li>
					<i className="fa fa-rotate" aria-hidden="true"></i>{" "}
					<NavLink to="/useAsync">useAsync</NavLink>
				</li>
				<li>
					<i className="fa fa-dog" aria-hidden="true"></i>{" "}
					<NavLink to="/useFetch">useFetch</NavLink>
				</li>

				<hr />
				<li>
					<i className="fa fa-code" aria-hidden="true"></i>{" "}
					<NavLink to="/useScript">
						useScript
					</NavLink>
				</li>
				<li>
					<i className="fa fa-balance-scale" aria-hidden="true"></i>{" "}
					<NavLink to="/useDeepCompareEffect">useDeepCompareEffect</NavLink>
				</li>
				<li>
					<i className="fa fa-headphones-simple" aria-hidden="true"></i>{" "}
					<NavLink to="/useEventListener">useEventListener</NavLink>
				</li>
				<li>
					<i className="fa fa-display" aria-hidden="true"></i>{" "}
					<NavLink to="/useOnScreen">useOnScreen</NavLink>
				</li>
				<hr />
				<li>
					<i className="fa fa-mobile-screen" aria-hidden="true"></i>{" "}
					<NavLink to="/useMediaQuery">useMediaQuery</NavLink>
				</li>
				<li>
					<i className="fa fa-location-dot" aria-hidden="true"></i>{" "}
					<NavLink to="/useGeolocation">useGeolocation</NavLink>{" "}
//					<i className="fa fa-globe fa-map-marker" aria-hidden="true"></i>
				</li>
				<li>
					<i className="fa fa-check" aria-hidden="true"></i>
					<NavLink to="/useStateWithValidation">
						useStateWithValidation
					</NavLink>
				</li>
				<li>
					<i className="fa fa-ruler" aria-hidden="true"></i>{" "}
					<NavLink to="/useSize">useSize</NavLink>
				</li>
				<li>
					<i className="fa fa-1" aria-hidden="true"></i>{" "}
					<NavLink to="/useEffectOnce">useEffectOnce</NavLink>
				</li>
				<hr />
				<li>
					<i className="fa fa-computer-mouse" aria-hidden="true"></i>{" "}
					<NavLink to="/useClickOutside">useClickOutside</NavLink>
				</li>
				<li>
					<i className="fa fa-moon" aria-hidden="true"></i>{" "}
					<NavLink to="/useDarkMode">useDarkMode</NavLink>
				</li>
				<li>
					<i className="fa fa-clipboard" aria-hidden="true"></i>{" "}
					<NavLink to="/useClipboard">useClipboard</NavLink>
				</li>
				<li>
					<i className="fa fa-cookie-bite" aria-hidden="true"></i>{" "}
					<NavLink to="/useCookies">useCookies</NavLink>
				</li>
				<li>
					<i className="fa fa-language" aria-hidden="true"></i>{" "}
					<NavLink to="/useTranslations">useTranslations</NavLink>
				</li>
				<li>
					<i className="fa fa-wifi" aria-hidden="true"></i>{" "}
					<NavLink to="/useOnlineStatus">useOnlineStatus</NavLink>
				</li>

				<hr />
				<li>
					<NavLink to="/useRenderCount">useRenderCount</NavLink>
				</li>
				<li>
					<i className="fa fa-bug-slash" aria-hidden="true"></i>{" "}
					<NavLink to="/useDebugInfo">useDebugInfo</NavLink>
				</li>
				<li>
					<NavLink to="/useHover">useHover</NavLink>
				</li>
				<li>
					<NavLink to="/useLongPress">useLongPress</NavLink>
				</li>

				<hr />
				<li>
					<i className="fa fa-ban" aria-hidden="true"></i>{" "}
					<NavLink to="/useNext">404</NavLink>
				</li>
			</ul>
*/
