export default function TaskList() {

  return (
    <div>
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
  );
}
