export default function ProgressSummary({ tasks }) {
  const completed = tasks.filter((task) => task.completed).length
  const percentage = tasks.length ? Math.round((completed / tasks.length) * 100) : 0
  return (
    <section className="progress-card" aria-label="Study progress">
      <div className="progress-value">{percentage}%</div>
      <div>
        <strong>{completed} of {tasks.length} complete</strong>
        <div className="progress-track" aria-hidden="true"><span style={{ width: `${percentage}%` }} /></div>
        <span className="sr-only">{percentage} percent of tasks completed</span>
      </div>
    </section>
  )
}
