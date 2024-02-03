"use client";

import React, { useState } from "react";
import Calender from "./components/Calender";
import Goal from "./components/Goal";
import TaskList from "./components/TaskList/ index";
import Monster from "./components/Monster";
import ExpBar from "./components/ExpBar";
import Menu from "./components/Menu";
import AddTaskModal from "./components/AddTaskModal";

export default function Home() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [animationClasses, setAnimationClasses] = useState({
    tasks: "",
    monster: "",
  });

  const createTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks`, {
        method: "POST",
        body: JSON.stringify({
          tasks: [
            {
              content: "タスク1",
              execDate: "2024-01-01",
            },
            {
              content: "タスク2",
              execDate: "2024-01-01",
            },
          ],
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  };

  function handleClickCompleteButton() {
    console.log("aaaaaa");
    // ここでAPI呼び出す

    setAnimationClasses({
      tasks: "moveToEgg",
      monster: "bounce",
    });

    setTimeout(function () {
      setAnimationClasses({
        tasks: "moveToEgg",
        monster: "",
      });
    }, 300);
  }

  return (
    <div>
      <AddTaskModal
        isModalOpen={isModalOpen}
        onClickCreateButton={createTask}
        onClickCloseButton={() => setModalIsOpen(false)}
      />
      <div className="home-container">
        <Calender />
        <Goal />
        <div className="main-tasks-monster-container">
          <TaskList
            animationClass={animationClasses["tasks"]}
            onClickCompleteTasks={handleClickCompleteButton}
          />
          <Monster animationClass={animationClasses["monster"]} />
        </div>
        <ExpBar />
        <div className="footer">
          <Menu
            onClickCompleteButton={handleClickCompleteButton}
            onClickAddTaskButton={() => setModalIsOpen(true)}
          />
        </div>
      </div>
    </div>
  );
}
