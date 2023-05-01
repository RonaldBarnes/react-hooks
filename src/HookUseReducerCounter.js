
import React, { useReducer } from "react";


const ACTIONS = {
	INCREMENT: "increment",
	DECREMENT: "decrement",
	}

function reducer(state, action, payload)
	{
	switch (action.type)
		{
		case ACTIONS.INCREMENT:
			return { count: state.count + 1 }
		case ACTIONS.DECREMENT:
			return { count: state.count - 1 }
		default:
			return state
		}	// end switch
	}	// end function




export default function HookReducerCounter()
	{
	const [state, dispatch] = useReducer(reducer, { count: 0 });

	// Scroll to top after a delay for autoFocus:
	setTimeout( () =>
		window.scrollTo({top:0, behavior:"smooth"}),
		500
		)
	// window.scrollTo({top:0, behavior:"smooth"});


	return (
		<>
			<p>
				A simple example: toggling the theme also recreates the
				<code>getItems</code> function (which generates the list of 3 items).
			</p>

			<div className="counter">
				<span style={{ fontSize: '2rem' }}>
				<button
					type="button"
					onClick={() => dispatch( {type: "decrement"}) }
					>
					-1
				</button>
				{" "} {state.count} {" "}
				<button
					onClick={() => dispatch( {type: "increment"}) }
					autoFocus
					>
					+1
				</button>
				</span>
			</div>

			<p>
				Code example:
			</p>
			<pre className="jsx"><code>
				<span style={{color:"lightgreen"}}>
{`
// **************************************************************
const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  }

function reducer(state, action, payload)
  {
  switch (action.type)
    {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 }
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 }
    case ACTIONS.ADD_TODO:
      return {
        state, {id: Date.now(), name: payload.todo.name, completed: false}
        }
    case ACTIONS.TOGGLE_TODO:
      return {
        state, {payload.todo}, completed: !payload.todo.completed}
        }
    default:
      return state
    }  // end switch
  }  // end function
`}
				</span>
{`
function ...`}
				<span style={{color:"lightgreen"}}>
{`
  const [state, dispatch] = useReducer(reducer, { count: 0 });
...
  <button onClick={() => dispatch( {type: "decrement"}) }> -1 </button>
  {" "} {state.count} {" "}
  <button onClick={() => dispatch( {type: "increment"}) }> +1 </button>
// **************************************************************
`}
				</span>
			</code></pre>
		</>
		);	// end return
	}	// end function
