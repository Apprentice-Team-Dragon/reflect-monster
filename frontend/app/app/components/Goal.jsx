"use client";

import React, { useEffect } from "react";
import { useGoal } from "../hooks/useGoal";

export default function Goal() {
  const { goal, getGoal } = useGoal();

  useEffect(() => {
    getGoal();
  }, [getGoal]);

  return (
    <div className="mission">
      <div className="mission-contents">
        {goal ? (
          <div>
            <h2>目標</h2>
            <p>{goal.content}</p>
          </div>
        ) : (
          <p>目標を読み込み中...</p>
        )}
      </div>
    </div>
  );
}
