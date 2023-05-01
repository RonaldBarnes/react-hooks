
import React, {
		useEffect,
		useReducer,
		useState }
	from "react";


const ACTIONS = {
	ADD_TODO: "add-todo",
	TOGGLE_TODO: "toggle-todo",
	DELETE_TODO: "delete-todo",
	}

function reducer(todos, action)
	{
	/*
	console.log(`reducer:`);
	console.table( todos);
	console.table( action);
	*/
	switch (action.type)
		{
		case ACTIONS.ADD_TODO:
			if (action.payload.name.length === 0) return todos;
			return [...todos,
				{
				id: Date.now(),
				name: action.payload.name || "HUH",
				completed: false,
				}]
		case ACTIONS.TOGGLE_TODO:
			return todos.map( todo => {
				if (todo.id === action.payload.id)
					{
					return {...todo, completed: !todo.completed}
					}
				return todo;
				})
		case ACTIONS.DELETE_TODO:
			return todos.filter( todo => (
				todo.id !== parseInt(action.payload.id)
				))
		default:
			return todos
		}	// end switch
	}	// end function

/*
https://survey.wcgservices.ca/surveys/WorkBCWorkshopSurvey
https://www.youtube.com/watch?v=-0TguKmrikM&t=6s
*/


export default function HookReducerTodos()
	{
	const [name, setName] = useState([]);
	const [todos, dispatch] = useReducer(reducer,[
		{
		id: Date.now() - 100,
		name: "Task 1",
		completed: true,
		},
		{
		id: Date.now() - 1000,
		name: "Buy food",
		completed: false,
		},
		{
		id: Date.now(),
		name: "Exercise",
		completed: false,
		}
		]
		);


	useEffect( () => {
		// Scroll to top after a delay for autoFocus:
		setTimeout( () =>
			window.scrollTo({top:0, behavior:"smooth"}),
			500
			)
	},[])


	function handleSubmit(e)
		{
		e.preventDefault();
		if (name.length === 0) return;
		dispatch({
			type: ACTIONS.ADD_TODO,
			payload: {name: name},
			});
		setName("");
		console.log(`DISPATCH ADD: ${name}`);
		}

/*
	function handleToggle(e)
		{
		e.preventDefault();
		dispatch({
			type: ACTIONS.TOGGLE_TODO,
			payload:
				{
				id: parseInt(e.target.id),
				},
			});
		console.log(`DISPATCH TOGGLE: ${e.target.name}`);
		}

	function handleDelete(e)
		{
		e.preventDefault();
		dispatch({
			type: ACTIONS.DELETE_TODO,
			payload:
				{
				id: parseInt(e.target.id),
				},
			});
		console.log(`DISPATCH DELETE: ${e.target.name}`);
		}
*/

	return (
		<div>
			<h3>Todo List</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="input">Add new todo item:{" "}</label>
				<input
					type="text"
					value={name}
					name="input"
					onChange={e => setName(e.target.value)}
					style={{ fontSize: "1.5rem", minWidth:"50vw"}}
					autoFocus
				/>
			</form>
			<div style={{marginTop:"1rem", fontSize:"1.5rem"}}>
				{todos.map(todo => {
					return <div key={todo.id} className="todos">
						<span className={todo.completed ? "todoItem todoItemCompleted":"todoItem"}>
							{todo.name}
						</span>
						<span style={{width:"100%"}}>
							<button
								id={todo.id}
								name={todo.name}
								onClick={ () =>
									dispatch({
										type: ACTIONS.TOGGLE_TODO,
										payload: {id: todo.id} }
									)}
								style={{
									backgroundColor:"lightgreen",
									color:"black",
									width:"100%"
									}}
								>
								{todo.completed ? "unComplete" : " Complete "}
							</button>
						</span>
						{" "}
						<span>
							<button
								style={{backgroundColor:"red", color:"black"}}
								id={todo.id}
								name={todo.name}
								onClick={ () => dispatch({
									type: ACTIONS.DELETE_TODO,
									payload: {id: todo.id} }
									)}
								>
								Delete
							</button>
						</span>
					</div>
					})}
				</div>
			<h3>
				Relevant code snippets:
			</h3>


{/* ************************************************************** */}
			<pre className="jsx"><code>
{`
const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  }
`}
<span style={{color:"red"}}>
{`
// Reducer where actions are processed via "dispatch":
`}</span>
<span style={{color:"lightgreen"}}>
{`function reducer(todos, action)
  {
  switch (action.type)
    {
    case ACTIONS.ADD_TODO:
      if (action.payload.name.length === 0) return todos;
      return [...todos,
        {
        id: Date.now(),
        name: action.payload.name || "HUH",
        completed: false,
        }]
    case ACTIONS.TOGGLE_TODO:
      return todos.map( todo => {
        if (todo.id === parseInt(action.payload.id))
          {
          return {...todo, completed: !todo.completed}
          }
        return todo
        })
    case ACTIONS.DELETE_TODO:
      return todos.filter( todo => (
        todo.id !== parseInt(action.payload.id)
        ))
    default:
      return todos
    }  // end switch
  }  // end function`}
</span>{`
...
  // Inside our function component:
  const [name, setName] = useState([]);
`}
<span style={{color:"red"}}>
{`
  // useReducer takes reducer function and initial state values for "todos":
  // It returns a todos array and dispatch function
`}
</span>
<span style={{color:"lightgreen"}}>
{`  const [todos, dispatch] = useReducer(reducer,[
    {
    id: Date.now() - 100,
    name: "Task 1",
    completed: true,
    },`}
</span>{`
    ...
    ]);

  // Invoked when Enter pressed: add new todo item:
  function handleSubmit(e)
    {
    e.preventDefault();
    if (name === "") return;`}
<span style={{color:"lightgreen"}}>{`
    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: {name: name},
      });`}
</span>{`
    setName("");
    }
`}
<span style={{color:"red"}}>
{`  // Form submission will dispatch ACTION.ADD_TODO with name from state:
`}
</span>
{`  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={name}
      // name of item stored in state:`}
<span style={{color:"red"}}>
{`
      onChange={e => setName(e.target.value)}
`}
</span>
{`    />
  </form>

  <button
    id={todo.id}
    name={todo.name}`}
<span style={{color:"red"}}>{`
    onClick={ () => dispatch({
      type: ACTIONS.TOGGLE_TODO,
      payload: {id: todo.id} }
      )} `}
</span>{`
    >
    Toggle Completed
  </button>

  <button
    id={todo.id}
    name={todo.name}`}
<span style={{color:"red"}}>
{`
    onClick={ () => dispatch({
      type: ACTIONS.DELETE_TODO,
      payload: {id: todo.id} }
      )}
`}
</span>{`    >
    Delete Item
  </button>
`}
			</code></pre>

		</div>
		);	// end return
	}	// end function
