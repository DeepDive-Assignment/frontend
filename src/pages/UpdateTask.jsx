import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [taskInput, setTaskInput] = useState({
    title: "",
    description: "",
    dueDate: "",
    // status: "",
  });
  useEffect(() => {
    Axios.get(`http://localhost:8080/api/singletask/${id}`).then((res) => {
      if (res.status === 200) {
        console.log(res);
        let d = new Date(res.data.data.dueDate);
        setTaskInput({
          title: res.data.data.title,
          description: res.data.data.description,
          dueDate: `${
            d.getFullYear() <= 9 ? "0" + d.getFullYear() : d.getFullYear()
          }-${d.getMonth() < 9 ? "0" + d.getMonth() + 1 : d.getMonth() + 1}-${
            d.getDate() <= 9 ? "0" + d.getDate() : d.getDate()
          }T${d.getHours() <= 9 ? "0" + d.getHours() : d.getHours()}:${
            d.getMinutes() <= 9 ? "0" + d.getMinutes() : d.getMinutes()
          }`,
          //   status: res.data.data.status,
        });
      } else {
        console.log(res);
      }
    });
  }, [id]);

  const handleChange = (e) => {
    setTaskInput({ ...taskInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskInput.title === "" || taskInput.description === "") {
      await setShow(true);
      await setTimeout(() => {
        setShow(false);
      }, 5000);
    } else {
      Axios.post(`http://localhost:8080/api/updatetask/${id}`, taskInput).then(
        (res) => {
          if (res.status === 200) {
            console.log(res);
            navigate("/");
          }
        }
      );
    }
  };
  console.log(taskInput.dueDate, id);
  return (
    <div className="d-flex my-4 px-4 text-light">
      <div className="container formLayout">
        <h2 className="mb-2 text-start fw-bold">Edit Task</h2>
        <Form>
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
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Update Task
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateTask;
