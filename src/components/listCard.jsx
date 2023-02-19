import { useState } from "react";
import "../styles/App.scss";
import NewTaskModal from "./createNewTask";
import Task from "./task";

const ListCard = ({ status, tasks, deleteTask, addTask, moveTask, updateTask, statuses }) => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    setTask('');
    setShowCreateTask(true);
  }

  const callUpdateTask = (id) => {
    setTask(tasks.find((task) => {
      return task.id === id;
    }));
    setShowCreateTask(true);
  }

  return (
    <>
      <div className="statusLine">
        <div className="headerRow">
          <h3>{status}</h3>
          <button onClick={handleAddTask} className="button addTask">+</button>
        </div>
        {tasks.filter((task) => task.status === status).map((task) =>
          <Task
            deleteTask={deleteTask}
            moveTask={(id, status) => moveTask(id, status)}
            key={task.id}
            task={task}
            callUpdateTask={callUpdateTask}
            statuses={statuses}
          />
        )}
      </div>
      {showCreateTask &&
        <NewTaskModal
          show={showCreateTask}
          setShow={setShowCreateTask}
          addTask={addTask}
          status={status}
          task={task}
          updateTask={updateTask}
        />
      }
    </>
  );
}

export default ListCard;
