import { useState, useCallback } from "react";

export function useGoal() {
  const [goal, setGoal] = useState(null);
  const API_URL = "http://localhost:3000/api/goal/{id}";

  const getGoal = useCallback(async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("ネットワーク接続が悪いです");
      const data = await response.json();
      setGoal(data);
    } catch (error) {
      console.error("目標を取得できません", error);
    }
  }, [API_URL]);

  return { goal, getGoal };
}
