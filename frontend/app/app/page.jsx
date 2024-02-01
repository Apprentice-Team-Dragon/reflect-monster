"use client";

import React, { useState } from "react";
import Calender from "./components/Calender";
import Goal from "./components/Goal";
import TaskList from "./components/TaskList";
import Monster from "./components/Monster";
import ExpBar from "./components/ExpBar";
import Menu from "./components/Menu";
import AddTaskModal from "./components/AddTaskModal";

export default function Home() {
  const [isModalOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <AddTaskModal
        isModalOpen={isModalOpen}
        onClickCloseButton={() => setModalIsOpen(false)}
      />
      <div className="home-container">
        <Calender />
        <Goal />
        <div className="main-tasks-monster-container">
          <TaskList />
          <Monster />
        </div>
        <ExpBar />
        <div className="footer">
          <Menu onClickAddTaskButton={() => setModalIsOpen(true)} />
        </div>
      </div>
    </div>
  );
}
