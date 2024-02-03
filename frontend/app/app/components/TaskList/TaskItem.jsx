import React, { useState } from "react";
import "./style.scss";

const TaskItem = ({ id, label, animationClass }) => {
  // チェックされているかの状態を管理するためのuseStateフック
  const [isChecked, setIsChecked] = useState(false);

  // チェックボックスの変更をハンドルし、状態変更をログに出力する関数
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState); // 状態を更新
    // チェックボックスの新しい状態をコンソールにログ出力
    console.log(
      `タスク ${id} は ${
        newCheckedState ? "チェックされました" : "チェックが外されました"
      }`
    );
  };

  const taskClass = isChecked
    ? "task-item task-complete-animation"
    : "task-item";

  return (
    <div className={`check-container ${isChecked ? animationClass : ""}`}>
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

export default TaskItem;
