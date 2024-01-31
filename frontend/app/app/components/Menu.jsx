export default function Menu({ onClickAddTaskButton }) {
  return (
    <div>
      <div className="menu-container">
        <ul className="menu-list">
          <li className="menu-item">
            <img src="img/Mission.png" alt="目標一覧" />
            <span>目標一覧</span>
          </li>
          <li className="menu-item" onClick={onClickAddTaskButton}>
            <img src="img/taskadd.png" alt="タスク追加" />
            <span>タスク追加</span>
          </li>
          <li className="menu-item">
            <img src="img/taskdone.png" alt="タスク完了" />
            <span>タスク完了</span>
          </li>
          <li className="menu-item">
            <img src="img/taskedit.png" alt="タスク編集" />
            <span>タスク編集</span>
          </li>
          <li className="menu-item">
            <img src="img/collection.png" alt="コレクション" />
            <span>コレクション</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
