import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//this is Card Component.It contain Card Details
const TaskCard = ({ task, onDelete }) => {
  const [dateTime, setDateTime] = useState("DD/MM/YYYY HH:mm");
  useEffect(() => {
    let d = new Date(task.dueDate);
    setDateTime(
      `${d.getDate()}-${
        month[d.getMonth()]
      }-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    );
  }, [task.dueDate]);

  return (
    <div className="col-lg-4 col-md-6 col-12 p-2">
      <Card
        className={`overflow-auto ${
          Date.parse(new Date(task.dueDate)) > Date.now()
            ? "bg-secondary"
            : "bg-success"
        } text-light`}
      >
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span className="fs-4">{task.title}</span>
            <span className="fs-6">
              {Date.parse(new Date(task.dueDate)) > Date.now()
                ? "Not Completed"
                : "Completed"}
            </span>
          </Card.Title>
          <Card.Text>
            <span>Due Date: {dateTime}</span>
          </Card.Text>
          <Card.Text>{task.description}</Card.Text>
          <Link to={`/edit-task/${task._id}`} className="btn btn-primary me-2">
            Update
          </Link>
          <Button
            className="me-2"
            variant="danger"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskCard;
