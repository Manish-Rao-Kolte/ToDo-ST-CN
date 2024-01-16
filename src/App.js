//css and different module imports
import React, { useLayoutEffect, useState } from "react";
import ToDoForm from "./Components/ToDoForm/ToDoForm";
import ToDoList from "./Components/ToDoList/ToDoList";
import axios from "axios";
import styles from "./App.module.css";

const App = () => {
  // setting local state using useSate hook.
  const [toDoList, setToDoList] = useState([]);
  const [title, setTitle] = useState("");

  // This function is to add new todo onto server and after that updating the local state.
  const addToDo = async (e, title) => {
    e.preventDefault();
    await axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        userId: (Math.random() * 10).toString().charAt(0),
        title,
        completed: false,
      })
      .then((res) => setToDoList([...toDoList, res.data]))
      .catch((err) => console.log(err));
  };

  // This function is to update existing todo onto server and after that updating the local state.
  const updateToDo = async (todo) => {
    await axios
      .put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      })
      .then((res) => {
        toDoList.map((toDo) => {
          if (toDo.id === res.data.id) {
            toDo.completed = !toDo.completed;
          }
          return toDo;
        });
        setToDoList([...toDoList]);
      })
      .catch((err) => console.log(err));
  };

  // This function is to delete existing todo onto server and after that updating the local state.
  const deleteToDo = async (todo) => {
    await axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .then((res) => {
        const list = toDoList.filter((toDo) => toDo.id !== todo.id);
        setToDoList([...list]);
      })
      .catch((err) => console.log(err));
  };

  //using useLayoutEffect hook to get data feom server on component mount and updating local state to render data on page.
  useLayoutEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setToDoList([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.App}>
      <ToDoForm addToDo={addToDo} title={title} setTitle={setTitle} />
      <ToDoList
        todoList={toDoList}
        updateToDo={updateToDo}
        deleteToDo={deleteToDo}
      />
    </div>
  );
};

export default App;
