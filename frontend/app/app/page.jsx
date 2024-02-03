"use client";

import React, { useEffect, useState } from "react";
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
import { formatDate } from "../utils/dateUtil";

export default function Home() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [animationClasses, setAnimationClasses] = useState({
    tasks: "",
    monster: "",
  });

  const today = formatDate(new Date());

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks?goal_id=1&exec_date=${today}`
      );
      const { tasks } = await response.json();
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  };

  const createTask = async (fieldValue) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks?goal_id=1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: {
              content: fieldValue,
              // 日付選ぶところないから常に今日の日付　YYYY-MM-DD形式で送る
              exec_date: today,
            },
          }),
        }
      );
      const { task } = await response.json();
      const newTasks = tasks.concat(task);

      setTasks(newTasks);
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  function handleClickCompleteButton() {
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
            tasks={tasks}
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
            onClickCompleteButton={handleClickCompleteButton}
            onClickAddTaskButton={() => setModalIsOpen(true)}
          />
        </div>
      </div>
    </div>
  );
}
