import React from 'react';
import Calender from "./components/Calender";
import Goal from "./components/Goal";
import TaskList from "./components/TaskList"; 
import Monster from "./components/Monster";
import ExpBar from "./components/ExpBar";
import Menu from "./components/Menu";

export default function Home() {
  return (
    <div className="home-container"> 
      <Calender />
      <Goal />
      <div className="main-tasks-monster-container"> 
        <TaskList />
        <Monster />
      </div>
      <ExpBar />
      <div className='footer'>
        <Menu />
      </div>
    </div>
  );
}
