"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
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
import { useUpdateTasks } from "@/hooks/TaskHooks/useUpdateTasks"

export default function Home() {
  const searchParams = useSearchParams();
  const goalId = searchParams.get("goalId");
  const execDate = searchParams.get("execDate");

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
    useMonsterState.hundleMonsterExpPoint,
    goalId
  );

  const { useTasksState } = useTasks(goalId, execDate);
  useUpdateTasks(goalId, execDate, useTasksState.tasks, useTasksState.isUpdated, useTasksState.hundleFalseIsUpdated);

  return (
    <div>
      <div className="logo">
        <img src="img/refmon_logo.png" alt="" />
        </div>
      <AddTaskModal
        isModalOpen={isModalOpen}
        onClickCloseButton={() => setModalIsOpen(false)}
        goalId={goalId}
        execDate={execDate}
        tasks={useTasksState.tasks}
        hundleCreateTasks={useTasksState.hundleCreateTasks}
      />
      <div className="home-container">
        <Calender />
        <Goal goalId={goalId}/>
        <div className="main-tasks-monster-container">
          <TaskList
            useTasksState={useTasksState}
            animationClass={animationClasses["tasks"]}
            onClickCompleteTasks={handleClickCompleteButton}
            hundleAddExpPoint={() => hundleAddExpPoint()}
            hundleReduceExpPoint={() => hundleReduceExpPoint()}
          />
          <Monster
            animationClass={animationClasses["monster"]}
            useMonsterState={useMonsterState}
            generateMonsterInfo={generateMonsterInfo}
          />
        </div>
        <div className="expbar">
        <ExpBar
          useMonsterState={useMonsterState}
          isAddExpPoint={isAddExpPoint}
          currentExpPoint={currentExpPoint}
          hundleAddExpPoint={() => hundleAddExpPoint()}
          hundleReduceExpPoint={() => hundleReduceExpPoint()}
          hundleTrueIsAddExpPoint={() => hundleTrueIsAddExpPoint()}
        />
        </div>
        <div className="footer">
          <Menu
            onClickAddTaskButton={() => setModalIsOpen(true)}
            onClickCompleteButton={handleClickCompleteButton}
            useTasksState={useTasksState}
            useMonsterState={useMonsterState}
            currentExpPoint={currentExpPoint}
            hundleTrueIsAddExpPoint={hundleTrueIsAddExpPoint}
          />
        </div>
      </div>
    </div>
  );
}
