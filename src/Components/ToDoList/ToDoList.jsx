import React from "react";
import styles from "./todoList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";

const ToDoList = (props) => {
  //geetind data and functions from parent.
  const { todoList, updateToDo, deleteToDo } = props;

  return (
    <div className={styles.toDoListContainer}>
      {todoList.map((todo) => {
        return (
          <div className={styles.todoCard} key={todo.id}>
            <div className={styles.titleContainer}>
              <input
                type="checkbox"
                defaultChecked={todo.completed}
                onChange={() => updateToDo(todo)}
              />
              <p
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </p>{" "}
            </div>
            <FontAwesomeIcon
              icon={faTrashArrowUp}
              className={styles.deleteIcon}
              onClick={() => deleteToDo(todo)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ToDoList;
