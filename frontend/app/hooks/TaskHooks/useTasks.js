import { useState, useEffect } from "react";
import updateTasks from "../../utils/api/monsterApi";

export function useTasks(goalId, execDate) {
  const [tasks, setTasks] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks?goalId=${goalId}&execDate=${execDate}`;
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    const hundleTasks = async () => {
      try {
        const response = await fetch(url, config);
        if (!response.ok) {
          const error = await response.json();
          setErrorMessage(error);
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    hundleTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function hundleCreateTasks(task) {
    setTasks((prevTask) => [...prevTask, task]);
  }
  function hundleUpdateTasks(tasks) {
    setTasks(tasks);
  }
  function hundleCompletedTasks(tasks, index) {
    const updatedTasks = [...tasks.tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks({ tasks: updatedTasks });
  }

  async function hundleRemovedTasks(tasks) {
    const removedTasks = [...tasks.tasks];
    for (let index = 0; index < removedTasks.length; index++) {
      if (removedTasks[index].isCompleted) {
        removedTasks[index].isRemoved = true;
      }
    }
    setTasks({ tasks: removedTasks });
    setIsUpdated(true);
  }

  function hundleFalseIsUpdated() {
    setIsUpdated(false);
  }

  const useTasksState = {
    tasks,
    isLoading,
    hasError,
    errorMessage,
    hundleCreateTasks,
    hundleUpdateTasks,
    hundleCompletedTasks,
    hundleRemovedTasks,
    isUpdated,
    hundleFalseIsUpdated
  };
  return { useTasksState };
}
