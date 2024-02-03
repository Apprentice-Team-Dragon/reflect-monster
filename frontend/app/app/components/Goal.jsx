"use client";
import React, { useEffect, useState } from "react";

export default function Goal() {
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    const getGoal = async () => {
      try {
        const goalContent = await fetch(
          `http://localhost:3000/api/goals/8/contents`
        );
        const data = await goalContent.json();
        setGoal(data);
      } catch (error) {
        console.error("Error fetching goal:", error);
      }
    };

    getGoal();
  }, []);

  return (
    <div className="mission">
      <div className="mission-contents">
        <h2>目標</h2>
        <p>{goal?.content}</p>
      </div>
    </div>
  );
}
