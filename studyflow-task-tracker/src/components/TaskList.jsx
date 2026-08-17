import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onRemove }) {
  return (
    <ul className="task-list" aria-label="Study tasks">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  )
}
