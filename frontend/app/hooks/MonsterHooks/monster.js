import { generateMonster } from "@/utils/api/monster";
import { useState, useEffect } from "react";



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
