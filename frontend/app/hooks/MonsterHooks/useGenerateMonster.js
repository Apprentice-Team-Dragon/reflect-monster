import { useState, useEffect } from "react";
import { generateMonster } from "../../utils/api/monster";
import { getMonster, addExpPoint } from "../../utils/api/monsterApi";

// export function useGenerateMonster(goalId, monsterInfo, isEvolve) {
export function useGenerateMonster(currentExpPoint, isAddExpPoint) {
  const [monsterImage, setMonsterImage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const hundleGenerateMonster = async () => {
      // TODO ここで、モンスターの経験値をデータベースに保存 DBの値を使って進化できるか判定する
      //   try {
      //     const response = await generateMonster(goalId, monsterInfo);
      //     if (!response.ok) {
      //       const error = await response.json();
      //       setErrorMessage(error);
      //       throw new Error(`API error: ${response.status}`);
      //     }
      //     const monsterImage = await response.json();
      //     setMonsterImage(monsterImage);
      //   } catch (error) {
      //     setHasError(true);
      //   } finally {
      //     setIsLoading(false);
      //   }
      const monster = await getMonster();
      if (monster.expPoint >= monster.maxExpPoint) {
        console.log(`id=${monster.id}のモンスターを進化します`);
      }
    };
    // const hundleAddExpPoint = async (currentExpPoint) => {
    //   const monster = await getMonster();
    //   console.log(`モンスターに${currentExpPoint - monster.exp_point}経験値を与えます`);
    //   const response = await addExpPoint(monster.id, currentExpPoint);
    //   if (response.ok) {
    //     hundleResetExpPoint();
    //   }
    // };
    // console.log(isAddExpPoint)
    // console.log(currentExpPoint)
    // if (isAddExpPoint) {
    //   hundleAddExpPoint(currentExpPoint);
    // }
    hundleGenerateMonster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const generateMonsterInfo = {
    monsterImage,
    isLoading,
    hasError,
    errorMessage,
  };
  return { generateMonsterInfo };
}
