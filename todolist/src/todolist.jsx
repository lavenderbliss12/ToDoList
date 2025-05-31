import React, {useState} from 'react'
import titleImage from './assets/TODO.jpeg';


function Todolist(){

        const [tasks, setTasks] = useState ([]);
        const [newTask, setNewTask] = useState("");

        const [editIndex, setEditIndex] = useState(null); //EDIT
        const [editText, setEditText] = useState("");

        function handleInputChange(event){
            setNewTask(event.target.value);
        }

        function addTask() {
            if (newTask.trim() !== "") {
                setTasks(t => [...t, { text: newTask, completed: false }]);
                setNewTask("");
            }
        }
        // COMPLETE TASK
        function toggleTaskCompleted(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
        }

        function startEditing(index) { //EDIT
        setEditIndex(index);
        setEditText(tasks[index].text);
        }

        function cancelEdit() { //EDIT
        setEditIndex(null);
        setEditText("");
        }

        function deleteTask(index){
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
        }

        function moveTaskUp(index){
            if (index > 0){
                const updatedTasks = [...tasks];
                [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks [index]];
                setTasks(updatedTasks);
            }
        }

        function moveTaskDown (index){
            if (index < tasks.length - 1){
                const updatedTasks = [...tasks];
                [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks [index]];
                setTasks(updatedTasks);
            }
        }

        function saveEdit(index) {
            const updatedTasks = [...tasks];
            updatedTasks[index].text = editText;
            setTasks(updatedTasks);
            setEditIndex(null);
            setEditText("");
        }

    return(
    <div className ="todo">
        <img className="title" src={titleImage} alt="TO DO LIST" />
        <div>
            <input
            type = "text"
            placeholder = "Enter A Task..."
            value = {newTask}
            onChange={handleInputChange}/>
            <button
                className="AddBtn"
                onClick={addTask}>
                    ADD TASK

            </button>
        </div>

        <ol>
        {tasks.map((task, index) => (
            <li key={index}>
            
            {/* ✅ Checkbox shown only when not editing */}
            {editIndex !== index && (
                <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompleted(index)}
                />
            )}

            {editIndex === index ? (
                <>
                <input
                    type="text"
                    value={editText}
                    className="editBox"
                    onChange={(e) => setEditText(e.target.value)}
                />
                <div style={{ display: "inline-flex", gap: "8px" }}>
                    <button className="SaveBtn" onClick={() => saveEdit(index)}>Save</button>
                    <button className="CancelBtn" onClick={cancelEdit}>Cancel</button>
                </div>
                </>
            ) : (
                <>
                <span
                    className="text"
                    style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "gray" : "black"
                    }}
                >
                    {task.text}
                </span>

                {!task.completed && (
                    <button className="EditBtn" onClick={() => startEditing(index)}>✏️</button>
                )}
                </>
            )}

            {editIndex !== index && (
                <>
                <button className="DeleteBtn" onClick={() => deleteTask(index)}>🗑️</button>
                <button className="MoveBtn" onClick={() => moveTaskUp(index)}>🔼</button>
                <button className="MoveBtn" onClick={() => moveTaskDown(index)}>🔽</button>
                </>
            )}
            </li>
        ))}
        </ol>

    </div>
);
}
export default Todolist