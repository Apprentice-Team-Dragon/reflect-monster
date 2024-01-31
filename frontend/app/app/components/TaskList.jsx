export default function TaskList() {
  return (
    <div className="task-list-container">
      <div className="main-content-task-left">
        <div className="left-task-contents">
          <h2>左側のタスクリスト</h2>
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
      <div className="center-box">
        {/* 中央の透明な箱 */}
        <div className="transparent-box"></div>
      </div>
      <div className="main-content-task-right">
        <div className="right-task-contents">
          <h2>右側のタスクリスト</h2>
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
  );
}
