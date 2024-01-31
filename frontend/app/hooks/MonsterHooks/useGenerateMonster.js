import { useState, useEffect } from "react";
import { generateMonster } from "../../utils/api/monster";

export function useGenerateMonster(goalId, monsterInfo, isEvolve) {
  const [monsterImage, setMonsterImage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    const hundleGenerateMonster = async () => {
      try {
        const response = await generateMonster(goalId, monsterInfo);
        if (!response.ok) {
          const error = await response.json();
          setErrorMessage(error);
          throw new Error(`API error: ${response.status}`);
        }
        const monsterImage = await response.json();
        setMonsterImage(monsterImage);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (isEvolve) {
      hundleGenerateMonster();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { monsterImage, isLoading, hasError, errorMessage  };
}
