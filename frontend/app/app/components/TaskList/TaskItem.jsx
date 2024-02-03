import "./style.scss";

const TaskItem = ({ key, id, tasks, task, hundleCompletedTasks }) => {

  return (
  <div key={key} className={`check-container ${task.isRemoved ? "moveToEgg" : ""}`} onChange={() => hundleCompletedTasks(tasks, id)}>
    <input type="checkbox" id={id} value={task.isCompleted} checked={task.isCompleted}/>
    <label htmlFor={id}></label>
    <span className="tag">{task.content}</span>
  </div>
  );
};

export default TaskItem;
