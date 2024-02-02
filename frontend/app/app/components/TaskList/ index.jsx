import React, { useState } from 'react';
import './style.scss';

const TaskItem = ({ id, label }) => {
  // チェックされているかの状態を管理するためのuseStateフック
  const [isChecked, setIsChecked] = useState(false);

  // チェックボックスの変更をハンドルし、状態変更をログに出力する関数
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState); // 状態を更新
    // チェックボックスの新しい状態をコンソールにログ出力
    console.log(`タスク ${id} は ${newCheckedState ? "チェックされました" : "チェックが外されました"}`);
  };

  return (
    <div className="check-container">
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={id}></label>
      <span className="tag">{label}</span>
    </div>
  );
};


// TaskList コンポーネントの定義
const TaskList = () => {
  return (
    <div className="task-list-container">
      <div className="main-content-task-left">
        <div className="left-task-contents">
          <h2>左側のタスクリスト</h2>
          <div className="container">
            <TaskItem id="one" label="Choice One" />
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
}

export default TaskList;
