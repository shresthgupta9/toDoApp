import { useEffect, useState } from "react";
import Main from "./components/Main";
import { addToDo, getToDo, updateToDo, deleteToDo } from "./utils/handleApi";

export default function App() {

  // setState function changes the state and re-renders the component
  // https://www.youtube.com/watch?v=SS1I7m-G2kk
  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  // to perfect side effect for a given dependency
  // https://www.youtube.com/watch?v=ZbUcN0LBqwY
  useEffect(() => {
    getToDo(setToDo);
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>To-Do App</h1>
        <div className="top">
          <input type="text" placeholder="Add a to-do" value={text} onChange={(e) => setText(e.target.value)} />
          <div className="add" onClick={isUpdating ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating) : () => addToDo(text, setText, setToDo)}>{isUpdating ? "Update" : "Add"}</div>
        </div>

        <div className="list">
          {toDo.map((item) => <Main text={item.text} updateMode={() => updateMode(item._id, item.text)} deleteToDo={() => deleteToDo(item._id, setToDo)} />)}
        </div>
      </div>
    </div>
  );
}
