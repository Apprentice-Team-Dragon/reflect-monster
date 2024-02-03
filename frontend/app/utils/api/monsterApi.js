import { getCredit } from "./monster";

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

// モンスター情報取得
export async function getMonster() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/monsters`;
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = await fetchFunction(url, config);
  return data;
}

// モンスターに経験値付与
export async function addExpPoint(monsterId, expPoint) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/monsters/${monsterId}`;
  const raw = JSON.stringify({
    monster: {
      expPoint: expPoint,
    },
  });
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

// TODO 卵生成用の関数を作成する

// モンスター進化
export async function postMonster(monsterId, imagePath, seedValue) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/monsters?monsterId=${monsterId}`;
  const raw = JSON.stringify({
    image: imagePath,
    seed: seedValue,
  });
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

// 目標のテキストを取得
// TODO Taskのcontentも取得する
export async function getGoalText(goalId) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/goals/${goalId}/contents`;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = await fetchFunction(url, config);
  return data.content;
}
