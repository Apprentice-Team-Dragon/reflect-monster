import { useState, useEffect } from "react";
import { getTasks } from "../../utils/api/monsterApi";

export function useTasks(goalId, execDate) {
  const [tasks, setTasks] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
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
        console.log(data)
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
    setTasks((prevTask) => ([ ...prevTask, task ]));
  }
  function hundleUpdateTasks(tasks) {
    setTasks(tasks);
  }
  function hundleCompletedTasks(task, index) {
    // setTasks((prevTasks) => ([...prevTasks][index]["isCompleted"]: true))
  }

  const useTasksState = {
    tasks,
    isLoading,
    hasError,
    errorMessage,
    hundleCreateTasks,
    hundleUpdateTasks,
  };
  return { useTasksState };
}
