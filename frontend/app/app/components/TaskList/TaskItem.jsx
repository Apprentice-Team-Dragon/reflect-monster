import "./style.scss";

const TaskItem = ({
  itemKey,
  id,
  tasks,
  task,
  hundleCompletedTasks,
  hundleAddExpPoint,
  hundleReduceExpPoint,
}) => {
  const hundleChecked = (tasks, id, isCompleted) => {
    if (isCompleted) {
      hundleReduceExpPoint();
    } else {
      hundleAddExpPoint();
    }
    hundleCompletedTasks(tasks, id);
  };
  return (
    <div
      key={itemKey}
      className={`check-container ${task.isRemoved ? "moveToEgg" : ""}`}
      onChange={() => hundleChecked(tasks, id, task.isCompleted)}
    >
      <input
        type="checkbox"
        id={id}
        value={task.isCompleted}
        // checked={task.isCompleted}
        defaultChecked={task.isCompleted}
      />
      <label htmlFor={id}></label>
      <span className="tag">{task.content}</span>
    </div>
  );
};

export default TaskItem;
