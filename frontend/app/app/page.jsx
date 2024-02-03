"use client";

import React, { useState } from "react";
import Calender from "./components/Calender";
import Goal from "./components/Goal";
import TaskList from "./components/TaskList/ index";
import Monster from "./components/Monster";
import ExpBar from "./components/ExpBar";
import Menu from "./components/Menu";
import AddTaskModal from "./components/AddTaskModal";
import { useMonster } from "@/hooks/MonsterHooks/useMonster";
import { useExpPoint } from "@/hooks/MonsterHooks/useExpPoint";
import { useIsAddExpPoint } from "@/hooks/MonsterHooks/useIsAddExpPoint";
import { useAddMonsterExpPoint } from "@/hooks/MonsterHooks/useAddMonsterExpPoint";
import { useGenerateMonster } from "@/hooks/MonsterHooks/useGenerateMonster";
import { useTasks } from "@/hooks/TaskHooks/useTasks"

export default function Home() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [animationClasses, setAnimationClasses] = useState({
    tasks: "",
    monster: "",
  });

  function handleClickCompleteButton() {
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

  const { useMonsterState } = useMonster();
  const { currentExpPoint, hundleAddExpPoint, hundleReduceExpPoint } =
    useExpPoint();
  const { isAddExpPoint, hundleTrueIsAddExpPoint, hundleFalseIsAddExpPoint } =
    useIsAddExpPoint();
  useAddMonsterExpPoint(
    currentExpPoint,
    isAddExpPoint,
    hundleFalseIsAddExpPoint
  );

  const { generateMonsterInfo } = useGenerateMonster(
    useMonsterState.monster,
    useMonsterState.hundleMonsterImage,
    useMonsterState.hundleMonsterExpPoint
  );

  const { useTasksState } = useTasks(2, "2024-02-04");

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
          <TaskList
            useTasksState={useTasksState}
            animationClass={animationClasses["tasks"]}
            onClickCompleteTasks={handleClickCompleteButton}
          />
          <Monster
            animationClass={animationClasses["monster"]}
            useMonsterState={useMonsterState}
            generateMonsterInfo={generateMonsterInfo}
          />
        </div>
        <ExpBar
          useMonsterState={useMonsterState}
          isAddExpPoint={isAddExpPoint}
          currentExpPoint={currentExpPoint}
          hundleAddExpPoint={() => hundleAddExpPoint()}
          hundleReduceExpPoint={() => hundleReduceExpPoint()}
          hundleTrueIsAddExpPoint={() => hundleTrueIsAddExpPoint()}
        />
        <div className="footer">
          <Menu
            onClickAddTaskButton={() => setModalIsOpen(true)}
            onClickCompleteButton={handleClickCompleteButton}
            useTasksState={useTasksState}
          />
        </div>
      </div>
    </div>
  );
}
