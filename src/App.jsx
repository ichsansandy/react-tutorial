import { useState } from 'react';
import './App.css';
import ListTask from './components/listTask';

function App() {
  const [taskList, setTaskList] = useState([
    {
      id: 1,
      title: 'Setup development environment',
      completed: true,
    },
    {
      id: 2,
      title: 'Develop website and add content',
      completed: false,
    },
    {
      id: 3,
      title: 'Deploy to live server',
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState('');

  const handleInput = (e) => {
    setNewTask(e.target.value);
  };

  const addNewTask = (e) => {
    e.preventDefault();
    if (newTask !== '') {
      setTaskList([
        ...taskList,
        {
          id: taskList.length + 1,
          title: newTask,
          completed: false,
        },
      ]);
      setNewTask('');
    }
  };

  return (
    <>
      <div className="container">
        <h1>todo List</h1>
        <form>
          <input placeholder="Input your new task" onChange={handleInput} value={newTask} />
          <button onClick={addNewTask}>submit</button>
        </form>
        <ul>
          {taskList?.map((task) => (
            <ListTask key={task.id} task={task} setTaskList={setTaskList} taskList={taskList} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
