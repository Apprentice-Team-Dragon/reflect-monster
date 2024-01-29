
 export default function Home() {
  return (
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title>サンプルページ</title>
  <header>
    <div className="calendar-container">
      <div className="calendar-contents">
        <img src="img/Calendar.png" alt="カレンダー" />
        <div className="calendar-date">2024/2/5</div>
      </div>
    </div>
  </header>
  <div className="mission">
    <div className="mission-contents">
      エンジニアにーなりーたーーーたいいーー
    </div>
  </div>
  <div className="main-contents">
    <div className="main-content-task-left">
      <div className="left-task-contents">
        <ul className="task-list">
          <li className="task-item">
            <label>
              <input type="checkbox" className="task-checkbox" />
              <span className="task-text">テキストテキスト</span>
            </label>
          </li>
          <li className="task-item">
            <label>
              <input type="checkbox" className="task-checkbox" />
              <span className="task-text">テキストテキスト</span>
            </label>
          </li>
          <li className="task-item">
            <label>
              <input type="checkbox" className="task-checkbox" />
              <span className="task-text">テキストテキスト</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div className="monster-container">
      <img src="img/firstegg.png" alt="卵" />
    </div>
    <div className="main-content-task-right">
      <div className="right-task-contents">
        <ul className="task-list">
          <li className="task-item">
            <label>
              <input type="checkbox" className="task-checkbox" />
              <span className="task-text">テキストテキスト</span>
            </label>
          </li>
          <li className="task-item">
            <label>
              <input type="checkbox" className="task-checkbox" />
              <span className="task-text">テキストテキスト</span>
            </label>
          </li>
          <li className="task-item">
            <label>
              <input type="checkbox" className="task-checkbox" />
              <span className="task-text">テキストテキスト</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="exp-container">
    <div className="exp-bar-text">次の成長まで</div>
    <div className="exp-bar" />
  </div>
  <footer>
    <div className="menu-container">
      <ul className="menu-list">
        <li className="menu-item">
          <img src="img/Mission.png" alt="目標一覧" />
          <span>目標一覧</span>
        </li>
        <li className="menu-item">
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
          <img src="img/collectionegg.png" alt="コレクション" />
          <span>コレクション</span>
        </li>
      </ul>
    </div>
  </footer>
</>

  );
}
