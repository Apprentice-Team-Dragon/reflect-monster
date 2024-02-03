import "./style.scss";

export default function Monster({ animationClass }) {
  return (
    <div className={`monster-container ${animationClass}`}>
      <img src="img/firstegg.png" alt="卵" />
    </div>
  );
}
