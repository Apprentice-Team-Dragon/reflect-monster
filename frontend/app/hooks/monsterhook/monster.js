import { generateMonster } from "@/utils/api/monster";
import { useState, useEffect } from "react";

export function useUpdateMonster(monsterId, monsterObject) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/monsters/${monsterId}`;
  const raw = JSON.stringify(monsterObject);
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
  };
  const { data, isLoading, hasError, errorMessage } = useFetch(url, {
    ...config,
  });
  return { data, isLoading, hasError, errorMessage };
}

export function useGetMonster(monsterId) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/monsters/${monsterId}`;
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data, isLoading, hasError, errorMessage } = useFetch(url, {
    ...config,
  });
  return { data, isLoading, hasError, errorMessage };
}

export function useIsEvolve(expPoint, maxExpPoint) {
  const [isEvolve, setIsEvolve] = useState(false);
  useEffect(() => {
    function hundleIsEvolve() {
      setIsEvolve(true);
    }
    function hundleNotIsEvolve() {
      setIsEvolve(false);
    }
    if (expPoint >= maxExpPoint) {
      hundleIsEvolve();
    } else {
      hundleNotIsEvolve();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expPoint]);
  return { isEvolve };
}

// export function useGenerateMonster(goalText, evolutionStage, isEvolve) {
//   const [monsterImage, setMonsterImage] = useState();
//   useEffect(() => {
//     const hundleGenerateMonster = async () => {
//       const response = await generateMonster(goalText, evolutionStage);
//       const image = await response.json();
//       setMonsterImage(image);
//     };
//     if (isEvolve) {
//       hundleGenerateMonster();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return { monsterImage };
// }
