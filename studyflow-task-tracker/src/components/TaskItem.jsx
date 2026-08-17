import PriorityBadge from './PriorityBadge'
import { formatDueDate, getDueState } from '../utils/dates'

export default function TaskItem({ task, onToggle, onRemove }) {
  const dueState = getDueState(task.dueDate, task.completed)
  return (
    <li className={`task-item ${task.completed ? 'is-complete' : ''}`}>
      <input className="task-checkbox" id={`task-${task.id}`} type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
      <label className="task-copy" htmlFor={`task-${task.id}`}>
        <span className="task-title">{task.title}</span>
        <span className="task-meta">
          {task.subject || 'General study'}
          {task.dueDate && <span className={dueState.className}> · {formatDueDate(task.dueDate)}{dueState.label}</span>}
        </span>
      </label>
      <PriorityBadge priority={task.priority} />
      <button className="delete-button" type="button" onClick={() => onRemove(task.id)} aria-label={`Delete ${task.title}`}>Delete</button>
    </li>
  )
}
