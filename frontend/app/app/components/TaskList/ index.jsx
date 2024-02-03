import React, { useState } from "react";
import "./style.scss";
import { CircularProgress } from "@mui/material";

// TaskItem コンポーネントの定義
const TaskItem = ({ id, label, isCompleted, isRemoved }) => (
  <div className="check-container" key={id}>
    <input type="checkbox" id={id} value={isCompleted}/>
    <label htmlFor={id}></label>
    <span className="tag">{label}</span>
  </div>
);

// TaskList コンポーネントの定義
const TaskList = ({ useTasksState }) => {
  const {
    tasks,
    isLoading,
    hasError,
    errorMessage,
    hundleCreateTasks,
    hundleUpdateTasks,
  } = useTasksState;

  if (isLoading) {
    return (
      <div className="task-list-container">
        <div className="main-content-task-left">
          <div className="left-task-contents">
            <h2>左側のタスクリスト</h2>
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
            <h2>右側のタスクリスト</h2>
            <div className="container">
              <CircularProgress />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if (tasks) {
    const middleIndex = Math.floor(tasks.tasks.length / 2);
    const leftTasks = tasks.tasks.slice(0, middleIndex);
    const rightTasks = tasks.tasks.slice(middleIndex);
    console.log(leftTasks);
    console.log(rightTasks);
    return (
      <div className="task-list-container">
        <div className="main-content-task-left">
          <div className="left-task-contents">
            <h2>左側のタスクリスト</h2>
            <div className="container">
              {leftTasks.map((task, id) => (
                <TaskItem key={id} id={id} label={task.content} />
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
              <h2>右側のタスクリスト</h2>
              <div className="container">
                {rightTasks.map((task, id) => (
                  <TaskItem key={id} id={id} label={task.content} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  // }
};

export default TaskList;
