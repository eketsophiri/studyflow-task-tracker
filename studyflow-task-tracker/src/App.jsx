import { useMemo, useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import ProgressSummary from './components/ProgressSummary'
import EmptyState from './components/EmptyState'
import Toast from './components/Toast'
import { useLocalStorage } from './hooks/useLocalStorage'
import { createTask, matchesFilter, sortTasks } from './utils/tasks'
import { starterTasks } from './data/starterTasks'

export default function App() {
  const [tasks, setTasks] = useLocalStorage('studyflow.tasks', starterTasks)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('dueDate')
  const [notice, setNotice] = useState('')

  const visibleTasks = useMemo(
    () => sortTasks(tasks.filter((task) => matchesFilter(task, filter, query)), sortBy),
    [tasks, filter, query, sortBy],
  )

  function addTask(values) {
    setTasks((current) => [...current, createTask(values)])
    setNotice(`Added “${values.title}”`)
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )))
  }

  function removeTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
    setNotice('Task removed')
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="workspace" id="main-content">
        <section className="intro" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">Your study command centre</p>
            <h1 id="page-title">Make every deadline feel manageable.</h1>
            <p>Organise coursework, focus on what matters, and watch your progress build.</p>
          </div>
          <ProgressSummary tasks={tasks} />
        </section>

        <div className="content-grid">
          <TaskForm onSubmit={addTask} />
          <section className="task-panel" aria-labelledby="task-list-title">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Plan for success</p>
                <h2 id="task-list-title">Your tasks</h2>
              </div>
              <span className="task-count">{visibleTasks.length} shown</span>
            </div>
            <TaskFilters
              filter={filter}
              onFilterChange={setFilter}
              query={query}
              onQueryChange={setQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            {visibleTasks.length > 0 ? (
              <TaskList tasks={visibleTasks} onToggle={toggleTask} onRemove={removeTask} />
            ) : (
              <EmptyState hasTasks={tasks.length > 0} onClear={() => { setFilter('all'); setQuery('') }} />
            )}
          </section>
        </div>
      </main>
      <Toast message={notice} onDismiss={() => setNotice('')} />
    </div>
  )
}
