import { useState, useEffect } from "react";
import "../styles/App.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSVLink } from "react-csv";
import AddListModal from "./addListModal";
import ListCard from "./listCard";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState(["Tasks"]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  const addTask = (status, title, description) => {
    const lastTask = tasks[tasks.length - 1];
    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    let newTasks = [
      ...tasks,
      {
        id: newTaskId,
        title: title,
        description: description,
        status: status,
      },
    ]
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  }

  const updateTask = (id, status, title, description) => {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    let newTasks = [
      ...filteredTasks,
      {
        id: id,
        title: title,
        description: description,
        status: status,
      },
    ]

    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  }

  const deleteTask = (taskId) => {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTasks);
    saveTasksToLocalStorage(filteredTasks);
  }

  const moveTask = (id, newStatus) => {
    let task = tasks.find((task) => {
      return task.id === id;
    });

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    task.status = newStatus;
    let newTaskList = [...filteredTasks, task];
    setTasks(newTaskList);
    saveTasksToLocalStorage(newTaskList);
  }

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  const loadTasksFromLocalStorage = () => {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
      setStatuses(Array.from(new Set(tasks.map(task => task.status))));
    }
  }

  useEffect(() => {
    setStatuses(Array.from(new Set(tasks.map(task => task.status))));
  }, [tasks]);

  return (
    <div className="App">
      <div style={{ display: "flex", alignItems: "left", gap: "5px", justifyContent: "space-between", margin: "2rem 0", paddingLeft: "10px" }}>
        <h1>Task Manager</h1>
        <CSVLink filename="task_list" style={{ textDecoration: "none" }} data={tasks}>
          <p className="download">Export as .CSV</p>
        </CSVLink>
        <button onClick={() => setShow(true)} className="button">
          + LIST
        </button>
      </div>
      <main>
        <section>
          {statuses.map((status, key) => {
            return (
              <ListCard
                key={key}
                tasks={tasks}
                addTask={addTask}
                deleteTask={deleteTask}
                moveTask={moveTask}
                status={status}
                updateTask={updateTask}
                statuses={statuses}
              />
            )
          }
          )}
        </section>
      </main>
      {show &&
        <AddListModal
          show={show}
          setShow={setShow}
          setStatuses={setStatuses}
          statuses={statuses}
        />
      }
    </div>
  );
}

export default App;
