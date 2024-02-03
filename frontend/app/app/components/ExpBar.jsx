export default function ExpBar({
  useMonsterState,
  currentExpPoint,
  hundleAddExpPoint,
  hundleReduceExpPoint,
  hundleTrueIsAddExpPoint,
}) {
  const { monster, isLoading, hundleMonsterExpPoint } = useMonsterState;
  const hundleExpPoint = (currentExpPoint) => {
    hundleMonsterExpPoint(currentExpPoint);
    hundleTrueIsAddExpPoint();
  };

  return (
    <div className="exp-container">
      <div className="exp-bar-text">
        次の成長まで「
        {isLoading ? "..." : monster?.max_exp_point - monster.exp_point}」
        {currentExpPoint === monster?.exp_point ? null : (
          <button onClick={() => hundleReduceExpPoint()}>-</button>
        )}
        {currentExpPoint === monster?.max_exp_point ? null : (
          <button onClick={() => hundleAddExpPoint()}>+</button>
        )}
        <div>
          {currentExpPoint > monster?.exp_point ? (
            <button onClick={() => hundleExpPoint(currentExpPoint)}>
              経験値を「{currentExpPoint - monster?.exp_point}」与える
            </button>
          ) : null}
          {/* {monster?.exp_point >= monster?.max_exp_point ? (
            <button>モンスター進化</button>
          ) : null} */}
        </div>
      </div>
      <div className="exp-bar" />
      現在の経験値 「{monster?.exp_point}」
    </div>
  );
}
