import React, { useState } from "react";
import TaskItem from "./TaskItem";
import "./style.scss";

// TaskList コンポーネントの定義
const TaskList = ({ tasks, animationClass }) => {
  return (
    <div className="task-list-container">
      <div className="main-content-task-left">
        <div className="left-task-contents">
          <h2>左側のタスクリスト</h2>
          <div className="container">
            {tasks.map((task) => (
              <TaskItem
                onComplete={null}
                id={`task${task.id}`}
                label={task.content}
                animationClass={animationClass}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="center-box">
        <div className="transparent-box"></div>
      </div>
      <div className="main-content-task-right">
        <div className="right-task-contents">
          {/* <h2>右側のタスクリスト</h2>
          <div className="container">
            <TaskItem id="four" label="Choice One" />
            <TaskItem id="five" label="Choice Two" />
            <TaskItem id="six" label="Choice Three" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
