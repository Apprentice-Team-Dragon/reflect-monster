import { useState, useEffect } from "react";
import { generateMonster } from "../../utils/api/monster";
import { getGoalText, postMonster } from "../../utils/api/monsterApi";

export function useGenerateMonster(
  monster,
  hundleMonsterImage,
  hundleMonsterExpPoint,
  goalId
) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerateError, setHasGenerateError] = useState(false);

  useEffect(() => {
    const hundleGenerateMonster = async () => {
      // TODO ここで、モンスターの経験値をデータベースに保存 DBの値を使って進化できるか判定する
      setIsGenerating(true);
      try {
        const goalContent = await getGoalText(goalId);
        const { imagePath, seedValue } = await generateMonster(goalContent, monster);

        hundleMonsterImage(imagePath);
        hundleMonsterExpPoint(0);
        postMonster(monster.id, imagePath, seedValue);
        console.log(seedValue);

      } catch (error) {
        setHasGenerateError(true);
      } finally {
        setIsGenerating(false);
      }
    };
    if (monster.exp_point >= monster.max_exp_point && monster.evolution_satage !== 2) {
      console.log(`id=${monster.id}のモンスターを進化します`);
      hundleGenerateMonster();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monster]);
  const generateMonsterInfo = {
    isGenerating,
    hasGenerateError,
  };
  return { generateMonsterInfo };
}
