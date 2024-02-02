import { useState } from "react";

export function useIsAddExpPoint() {
  const [isAddExpPoint, setIsAddExpPoint] = useState(false);
  function hundleTrueIsAddExpPoint() {
    setIsAddExpPoint(true);
  }
  function hundleFalseIsAddExpPoint() {
    setIsAddExpPoint(false);
  }
  return { isAddExpPoint, hundleTrueIsAddExpPoint, hundleFalseIsAddExpPoint };
}
