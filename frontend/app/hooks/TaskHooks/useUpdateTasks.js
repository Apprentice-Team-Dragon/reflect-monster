import { useState, useEffect } from "react";

export function useUpdateTasks(
  goalId,
  execDate,
  tasks,
  isUpdated,
  hundleFalseIsUpdated
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks?goalId=${goalId}&execDate=${execDate}`;
  const transformedTasks = {
    tasks: tasks?.tasks.map((task) => {
      const { exec_date, ...newTask } = task;
      return newTask;
    }),
  };
  const raw = JSON.stringify(transformedTasks);
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
  };

  useEffect(() => {
    const updateTasks = async () => {
      const response = await fetch(url, config);
      const data = await response.json();
    };
    if (isUpdated) {
      updateTasks();
      hundleFalseIsUpdated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated]);
}
