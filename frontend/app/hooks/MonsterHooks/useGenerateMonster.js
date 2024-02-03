import { useState, useEffect } from "react";
import { generateMonster } from "../../utils/api/monster";
import {
  getMonster,
  addExpPoint,
  getGoalText,
  postMonster,
} from "../../utils/api/monsterApi";
import { getCredit } from "../../utils/api/monster";

// export function useGenerateMonster(goalId, monsterInfo, isEvolve) {
export function useGenerateMonster(monster, hundleMonsterImage, hundleMonsterExpPoint) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerateError, setHasGenerateError] = useState(false);

  useEffect(() => {
    const hundleGenerateMonster = async () => {
      // TODO ここで、モンスターの経験値をデータベースに保存 DBの値を使って進化できるか判定する
      setIsGenerating(true)
      try {
        const goalContent = await getGoalText(2)
        const { imagePath, seed } = await generateMonster(goalContent, monster);

        hundleMonsterImage(imagePath);
        hundleMonsterExpPoint(0);
        postMonster(monster.id, imagePath);
        console.log(seed)
      } catch (error) {
        setHasGenerateError(true);
      } finally {
        setIsGenerating(false);
      }
    };
    if (monster.exp_point >= monster.max_exp_point) {
      console.log(`id=${monster.id}のモンスターを進化します`);
      hundleGenerateMonster();
      // hundleMonsterImage("1706632518363_amg8wzx.png")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monster]);
  const generateMonsterInfo = {
    isGenerating,
    hasGenerateError
  };
  return { generateMonsterInfo };
}
