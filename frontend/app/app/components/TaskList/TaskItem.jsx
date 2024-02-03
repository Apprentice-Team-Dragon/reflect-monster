import "./style.scss";

const TaskItem = ({ key, id, tasks, task, hundleCompletedTasks, hundleAddExpPoint, hundleReduceExpPoint }) => {
  const hundleChecked = (tasks, id, isCompleted) => {
    if (isCompleted) {
      hundleReduceExpPoint()
    } else {
      hundleAddExpPoint()
    }
    hundleCompletedTasks(tasks, id);
  }
  return (
  <div key={key} className={`check-container ${task.isRemoved ? "moveToEgg" : ""}`} onChange={() => hundleChecked(tasks, id, task.isCompleted)}>
    <input type="checkbox" id={id} value={task.isCompleted} checked={task.isCompleted}/>
    <label htmlFor={id}></label>
    <span className="tag">{task.content}</span>
  </div>
  );
};

export default TaskItem;
