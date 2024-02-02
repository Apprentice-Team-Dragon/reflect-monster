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
  }, [expPoint, maxExpPoint]);
  return { isEvolve };
}
