"use client";
import React, { useEffect, useState } from "react";

export default function Goal({goalId}) {
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    const url = `http://localhost:3000/api/goals/${goalId}`;
    // URL内の{id}を実際のIDで置き換え
    // const url = `http://localhost:3000/api/goals/1`;

    const getGoal = async () => {
      try {
        const response = await fetch(url);
        const { goal } = await response.json();
        setGoal(goal.goal);
      } catch (error) {
        console.error("Error fetching goal:", error);
      }
    };

    getGoal();
  }, []);

  return (
    <div className="mission">
      <div className="mission-contents">
        <div className="mission-goal">✨Goal✨</div>
        <p>{goal?.content}</p>
      </div>
    </div>
  );
}
