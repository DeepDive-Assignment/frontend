import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [taskInput, setTaskInput] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTaskInput({ ...taskInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      taskInput.title === "" ||
      taskInput.description === "" ||
      taskInput.dueDate === ""
    ) {
      console.log("handleSubmit");
      await setShow(true);
      await setTimeout(() => {
        setShow(false);
      }, 1000);
    } else {
      Axios.post(`http://localhost:8080/api/addtask`, taskInput).then((res) => {
        if (res.status === 201) {
          console.log(res);
          navigate("/");
        } else {
          console.log(res);
        }
      });
    }
  };
  return (
    <div className="d-flex my-4 px-4 text-light">
      <div className="container align-self-center formLayout">
        <h2 className="mb-2 text-start fw-bold">Add New Task</h2>
        <Form className="">
          {show && <Alert variant={"danger"}>Please fill all the field!</Alert>}
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={taskInput.title}
              placeholder="Enter task title here..."
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Task Due Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="dueDate"
              value={taskInput.dueDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              value={taskInput.description}
              placeholder="Enter task description here..."
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="success" type="submit" onClick={handleSubmit}>
            Create New Task
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddTask;
