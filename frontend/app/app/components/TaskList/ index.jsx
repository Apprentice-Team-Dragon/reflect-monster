import React from "react";
import TaskItem from "./TaskItem";
import "./style.scss";
import { CircularProgress } from "@mui/material";

// TaskItem コンポーネントの定義
// const TaskItem = ({ key, id, tasks, task, hundleCompletedTasks}) => (
//   <div {`check-container ${isChecked ? animationClass : ""}`} key={key} onChange={() => hundleCompletedTasks(tasks, id)}>
//     <input type="checkbox" id={id} value={task.isCompleted} checked={task.isCompleted}/>
//     <label htmlFor={id}></label>
//     <span className="tag">{task.content}</span>
//   </div>
// );

// TaskList コンポーネントの定義
const TaskList = ({
  useTasksState,
  animationClass,
  hundleAddExpPoint,
  hundleReduceExpPoint,
}) => {
  const {
    tasks,
    isLoading,
    hasError,
    errorMessage,
    hundleCreateTasks,
    hundleUpdateTasks,
    hundleCompletedTasks,
  } = useTasksState;

  if (isLoading) {
    return (
      <div className="task-list-container">
        <div className="main-content-task-left">
          <div className="left-task-contents">
            <div className="container">
              <CircularProgress />
            </div>
          </div>
        </div>
        <div className="center-box">
          <div className="transparent-box"></div>
        </div>
        <div className="main-content-task-right">
          <div className="right-task-contents">
            <div className="container">
              <CircularProgress />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tasks) {
    const middleIndex = Math.floor(tasks.tasks.length / 2);
    const leftTasks = tasks.tasks.slice(0, middleIndex);
    const rightTasks = tasks.tasks.slice(middleIndex);

    return (
      <div className="task-list-container">
        <div className="main-content-task-left">
          <div className="left-task-contents">
            <div className="container">
              {leftTasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  itemKey={task.id}
                  id={index}
                  tasks={tasks}
                  task={task}
                  hundleCompletedTasks={hundleCompletedTasks}
                  position="left"
                  hundleAddExpPoint={hundleAddExpPoint}
                  hundleReduceExpPoint={hundleReduceExpPoint}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="center-box">
          <div className="transparent-box"></div>
        </div>
        <div className="main-content-task-right">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <div className="right-task-contents">
              <div className="container">
                {rightTasks.map((task, index) => (
                  <TaskItem
                    key={task.id + middleIndex}
                    itemKey={task.id + middleIndex}
                    id={index + middleIndex}
                    tasks={tasks}
                    task={task}
                    hundleCompletedTasks={hundleCompletedTasks}
                    position="right"
                    hundleAddExpPoint={hundleAddExpPoint}
                    hundleReduceExpPoint={hundleReduceExpPoint}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default TaskList;
