import React, { useLayoutEffect, useRef } from "react";
import styles from "./todoForm.module.css";

const ToDoForm = (props) => {
  //getting data from parent using prop drilling and destructuring it.
  const { addToDo, title, setTitle } = props;
  //using useRef to get reference of input field.
  const inputRef = useRef();

  useLayoutEffect(() => {
    //setting focus automatically on input on page relaod or mount.
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles.formContainer}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          addToDo(e, title);
          setTitle("");
        }}
      >
        <input
          ref={inputRef}
          className={styles.formInput}
          placeholder="Write ToDo..."
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className={styles.formBtn}>Add ToDo</button>
      </form>
    </div>
  );
};

export default ToDoForm;
