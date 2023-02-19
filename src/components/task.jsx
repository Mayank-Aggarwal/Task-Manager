import "../styles/App.scss";
import { Col, Dropdown, DropdownButton, Row } from "react-bootstrap";

const Task = ({ moveTask, task, deleteTask, callUpdateTask, statuses }) => {
  return (
    <div className={`task`}>
      <Row style={{ width: '100%' }}>
        <Col md={2}>
          {task.title}
        </Col>
        <Col md={7}>
          {task.description}
        </Col>
        <Col md={3} style={{ display: 'flex' }}>
          <button onClick={() => callUpdateTask(task.id)} className="button">Edit</button>
          <button onClick={() => deleteTask(task.id)} className="button delete">Delete</button>
          <DropdownButton id="dropdown-basic-button" variant="secondary" title="Move" style={{ color: "white" }}>
            {statuses?.filter(status => status !== task.status).map(status =>
              <Dropdown.Item onClick={() => moveTask(task.id, status)}>{status}</Dropdown.Item>
            )}
          </DropdownButton>
        </Col>
      </Row>
    </div>
  );
}

export default Task;