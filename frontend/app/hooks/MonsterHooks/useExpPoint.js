import { useState, useEffect } from "react";
import { getMonster } from "@/utils/api/monsterApi";
export function useExpPoint() {
  const [currentExpPoint, setCurrentExpPoint] = useState();

  // 現在のモンスターのEXPポイントをセットする関数
  useEffect(() => {
    const hundleExpPoint = async () => {
      const monster = await getMonster();
      const monsterExpPoint = await monster.exp_point;
      setCurrentExpPoint(monsterExpPoint);
    };
    hundleExpPoint();
  }, []);

  // タスクのチェック/解除で付与する経験値を設定
  const hundleAddExpPoint = () => {
    setCurrentExpPoint((prevExpPoint) => prevExpPoint + 1);
  };
  const hundleReduceExpPoint = () => {
    setCurrentExpPoint((prevExpPoint) => prevExpPoint - 1);
  };

  return {
    currentExpPoint,
    hundleAddExpPoint,
    hundleReduceExpPoint,
  };
}
