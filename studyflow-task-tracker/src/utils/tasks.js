const priorityRank = { high: 0, medium: 1, low: 2 }

export function createTask(values) {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    ...values,
    completed: false,
    createdAt: new Date().toISOString(),
  }
}

export function matchesFilter(task, filter, query) {
  const normalizedQuery = query.trim().toLowerCase()
  const matchesQuery = !normalizedQuery || [task.title, task.subject].some((value) => value.toLowerCase().includes(normalizedQuery))
  const matchesState = filter === 'all'
    || (filter === 'active' && !task.completed)
    || (filter === 'completed' && task.completed)
    || (filter === 'high' && task.priority === 'high')
  return matchesQuery && matchesState
}

export function sortTasks(tasks, sortBy) {
  return [...tasks].sort((a, b) => {
    if (sortBy === 'priority') return priorityRank[a.priority] - priorityRank[b.priority]
    if (sortBy === 'newest') return b.createdAt.localeCompare(a.createdAt)
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return a.dueDate.localeCompare(b.dueDate)
  })
}
