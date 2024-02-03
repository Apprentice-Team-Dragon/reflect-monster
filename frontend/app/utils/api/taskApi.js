// fetchからtry catchまでを関数化
async function fetchFunction(url, config) {
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      console.error(response);
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`API error: fetch error`);
  }
}

// タスク取得
export async function getTasks(goalId, execDate) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks?goalId=${goalId}&execDate=${execDate}`;
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = await fetchFunction(url, config);
  return data;
}

// タスク更新
export async function updateTasks(goalId, execDate, tasks) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks?goalId=${goalId}&execDate=${execDate}`;
  const raw = JSON.stringify({tasks});
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
  };
  const data = await fetchFunction(url, config);
  return data;
}

// タスク作成
export async function createTasks(goalId, tasks) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${goalId}`;
  const raw = JSON.stringify({tasks});
  const config = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: raw,
  };
  const data = await fetchFunction(url, config);
  return data;
}
