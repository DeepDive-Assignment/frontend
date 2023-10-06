import React, { useEffect, useState } from "react";
import TaskCard from "../Components/TaskCard";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Container, Pagination } from "react-bootstrap";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);

  //getTaskList method call when page state changes
  useEffect(() => {
    getTaskList();
  }, [page]);

  //this method is used to fetch task list according to page number
  const getTaskList = async () => {
    Axios.get(`http://localhost:8080/api/gettaskList?page=${page}`).then(
      (res) => {
        if (res.status === 200) {
          setTaskList(res.data.data);
          console.log(res.data.data);
          setLoading(false);
          setTotalPages(res.data.totalPages);
        } else {
          console.log(res);
        }
      }
    );
  };

  //for this method is used to delete specific task data
  const deleteTask = async (id) => {
    Axios.delete(`http://localhost:8080/api/deletetask/${id}`).then((res) => {
      if (res.status === 200) {
        getTaskList();
      } else {
        console.log(res);
      }
    });
  };
  return (
    <>
      <div className="container my-4 px-4">
        <div className="text-end">
          <Link className="btn btn-primary mb-3" to={"/add-task"}>
            Create New Task
          </Link>
        </div>
        {loading ? (
          <Container>
            <h1 className="text-light text-center">Loading...</h1>
          </Container>
        ) : taskList.length === 0 ? (
          <Container className="mt-3">
            <h1 className="text-light text-break">No Task Added yet!</h1>
          </Container>
        ) : (
          <div className="row">
            {taskList.map((task, key) => (
              <TaskCard task={task} onDelete={deleteTask} key={key} />
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="d-flex mt-3 justify-content-center">
            <Pagination>
              {Array.from(Array(totalPages).keys()).map((p) => (
                <Pagination.Item
                  key={p}
                  active={p + 1 === page}
                  onClick={() => setPage(p + 1)}
                >
                  {p + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
