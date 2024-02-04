export default function ExpBar({
  useMonsterState,

}) {
  const { monster, isLoading } = useMonsterState;

  return (
    <div className="exp-container">
      <div className="exp-bar-text">
        次の成長まで「
        {isLoading ? "..." : monster?.max_exp_point - monster.exp_point}」
      </div>
      <div className="exp-bar" />
    </div>
  );
}
