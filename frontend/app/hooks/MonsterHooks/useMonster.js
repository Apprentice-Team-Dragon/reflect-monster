import { useState, useEffect } from "react";
import { getMonster } from "../../utils/api/monsterApi";

export function useMonster() {
  const [monster, setMonster] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/monsters`;
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    const hundleMonster = async () => {
      try {
        const response = await fetch(url, config);
        if (!response.ok) {
          const error = await response.json();
          setErrorMessage(error);
          throw new Error(`API error: ${response.status}`);
        }
        const monster = await response.json();
        setMonster(monster);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    hundleMonster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function hundleMonsterImage(monsterImage) {
    setMonster((prevMonster) => ({ ...prevMonster, image: monsterImage }));
  }
  function hundleMonsterExpPoint(monsterExpPoint) {
    setMonster((prevMonster) => ({
      ...prevMonster,
      exp_point: monsterExpPoint,
    }));
  }

  const useMonsterState = {
    monster,
    isLoading,
    hasError,
    errorMessage,
    hundleMonsterImage,
    hundleMonsterExpPoint,
  };
  return { useMonsterState };
}
