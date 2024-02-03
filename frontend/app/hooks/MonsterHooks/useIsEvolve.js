import { useState, useEffect } from "react";

export function useIsEvolve() {
  const [isEvolve, setIsEvolve] = useState(false);
  useEffect(() => {
    function hundleTrueIsEvolve() {
      setIsEvolve(true);
    }
    function hundleFalseIsEvolve() {
      setIsEvolve(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isEvolve, hundleTrueIsEvolve, hundleFalseIsEvolve };
}
