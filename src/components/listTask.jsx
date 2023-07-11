import { useState } from 'react';
import PropTypes from 'prop-types';

function ListTask({ task, setTaskList, taskList }) {
  const [edit, setEdit] = useState(false);

  let viewMode = {};
  let editMode = {};

  if (edit) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  ListTask.propTypes = {
    task: PropTypes.object.isRequired,
    setTaskList: PropTypes.func,
    taskList: PropTypes.array,
  };

  const handleChecked = (id) => {
    setTaskList((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const delTodo = (id) => {
    setTaskList([
      ...taskList.filter((todo) => {
        return todo.id !== id;
      }),
    ]);
  };

  const setUpdate = (editTask, id) => {
    setTaskList(
      taskList.map((todo) => {
        if (todo.id === id) {
          todo.title = editTask;
        }
        return todo;
      })
    );
  };

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setEdit(false);
    }
  };

  return (
    <li>
      <input className="checkbox" type="checkbox" style={viewMode} checked={task.completed} onChange={() => handleChecked(task.id)} />
      <input
        className="editbox"
        value={task.title}
        style={editMode}
        onChange={(e) => {
          setUpdate(e.target.value, task.id);
        }}
        onKeyDown={handleUpdatedDone}
      />
      <p style={viewMode} className={task.completed === true ? 'strikethroug' : ''}>
        {task.title}
      </p>
      <button
        style={viewMode}
        onClick={(e) => {
          e.preventDefault();
          setEdit(true);
        }}>
        Edit
      </button>
      <button
        style={viewMode}
        onClick={() => {
          delTodo(task.id);
        }}>
        Delete
      </button>
    </li>
  );
}

export default ListTask;
