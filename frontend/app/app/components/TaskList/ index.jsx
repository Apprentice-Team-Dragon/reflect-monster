import React from 'react';
import './style.scss';

// TaskItem コンポーネントの定義
const TaskItem = ({ id, label }) => (
  <div className="check-container">
    <input type="checkbox" id={id} />
    <label htmlFor={id}></label>
    <span className="tag">{label}</span>
  </div>
);

// TaskList コンポーネントの定義
const TaskList = () => {
  return (
    <div className="task-list-container">
      <div className="main-content-task-left">
        <div className="left-task-contents">
          <h2>左側のタスクリスト</h2>
          <div className="container">
            <TaskItem id="one" label="Choice One" />
            <TaskItem id="two" label="Choice Two" />
            <TaskItem id="three" label="Choice Three" />
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
            <TaskItem id="four" label="Choice One" />
            <TaskItem id="five" label="Choice Two" />
            <TaskItem id="six" label="Choice Three" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
