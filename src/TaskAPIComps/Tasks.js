import React, { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import Switch from "@material-ui/core/Switch";
import LinearProgress from "@material-ui/core/LinearProgress";
import { motion } from "framer-motion";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const Tasks = () => {
  const [isloading, setLoading] = useState(false);
  const [usertasks, setUserTasks] = useState([]);
  const [completed, setCompleted] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [editdetails, setEditDetails] = useState(null);

  useEffect(() => {
    let isRendered = true;
    if (isRendered) {
      setLoading(true);
      const taskurl = `${process.env.REACT_APP_API}/tasks?sortBy=createdAt_desc`;
      fetch(taskurl, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) =>
          res
            .json()
            .then((data) => {
              setUserTasks(data);
              // console.log(data)
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            })
        )
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    return () => {
      isRendered = false;
    };
  }, []);

  const formhandler = async (e) => {
    const apiUrl = `${process.env.REACT_APP_API}/tasks`;
    e.preventDefault();
    // setLoading(true)
    const userdata = {
      description: e.target.description.value,
      complete: e.target.complete.checked,
    };
    e.target.description.value = "";
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(userdata),
    });
    const data = await result.json();
    setUserTasks((prevState) => [data, ...prevState]);
  };

  const updateformhandler = async (e) => {
    e.preventDefault();
    const userdata = {
      description: e.target.description.value,
      complete: e.target.complete.checked,
    };
    // console.log(e.target.description.value,e.target.complete.checked)
    const updateurl = `${process.env.REACT_APP_API}/tasks/${editdetails.id}`;
    const result = await fetch(updateurl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(userdata),
    });
    const data = await result.json();
    const zunaindex = usertasks.findIndex((el) => el._id === editdetails.id);
    const copytasks = [...usertasks];
    copytasks[zunaindex] = data;
    e.target.description.value = "";
    setUserTasks(copytasks);
    setEdit(false);
    setEditDetails(null);
  };

  const updater = (id, desc, comp) => {
    setEditDetails({ id, desc, comp });
    setEdit(true);
  };

  const deleteTask = async (id) => {
    const wanttodeltask = usertasks.findIndex((el) => el._id === id);
    const copytasks = [...usertasks];
    copytasks.splice(wanttodeltask, 1);
    const deletetaskurl = `${process.env.REACT_APP_API}/tasks/${id}`;
    fetch(deletetaskurl, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) =>
        res
          .json()
          .then((data) => {
            setUserTasks(copytasks);
          })
          .catch((err) => console.log(err))
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const updateswitchhandler = () => {
    setEditDetails((prev) => {
      return { id: prev.id, comp: !prev.comp, desc: prev.desc };
    });
  };

  return (
    <div className="todo-app">
      {isEdit ? (
        <form className="todo-form" onSubmit={updateformhandler}>
          <Switch
            checked={editdetails.comp}
            onChange={updateswitchhandler}
            name="complete"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <input
            placeholder={editdetails.desc || "sad"}
            name="description"
            className="todo-input edit"
          />
          <button type="submit" className="todo-button edit">
            Update
          </button>
          <IconButton
            onClick={() => setEdit(false)}
            color="primary"
            aria-label="add task"
          >
            <AddCircleIcon />
          </IconButton>
        </form>
      ) : (
        <form className="todo-form" onSubmit={formhandler}>
          <Switch
            checked={completed}
            onChange={() => setCompleted(!completed)}
            name="complete"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <input
            className="todo-input"
            placeholder="Enter Task"
            name="description"
            type="text"
          />
          <button className="todo-button" type="submit">
            Create Task
          </button>
        </form>
      )}

      {isloading ? (
        <LinearProgress />
      ) : (
        <>
          {usertasks.length !== 0 &&
            usertasks.map((todo, index) => {
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transistion={{ delay: 1 }}
                  whileHover={{ opacity: 1 }}
                  className={todo.complete ? "todo-row complete" : "todo-row"}
                  key={todo._id}
                  tp={todo._id}
                >
                  <div key={todo.id}>{todo.description}</div>
                  <div className="icons">
                    <RiCloseCircleLine
                      onClick={() => deleteTask(todo._id)}
                      className="delete-icon"
                    />
                    <TiEdit
                      onClick={() =>
                        updater(todo._id, todo.description, todo.complete)
                      }
                      className="edit-icon"
                    />
                  </div>
                </motion.div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default Tasks;
