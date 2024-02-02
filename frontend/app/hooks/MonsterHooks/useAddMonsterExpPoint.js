import { useEffect } from "react";
import { getMonster, addExpPoint } from "../../utils/api/monsterApi";

export function useAddMonsterExpPoint(
  currentExpPoint,
  isAddExpPoint,
  hundleFalseIsAddExpPoint
) {
  useEffect(() => {
    const hundleAddExpPoint = async (currentExpPoint) => {
      const monster = await getMonster();
      await addExpPoint(monster.id, currentExpPoint);
      hundleFalseIsAddExpPoint();
    };
    if (isAddExpPoint) {
      hundleAddExpPoint(currentExpPoint);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddExpPoint]);
}
