import { describe, expect, it } from 'vitest'
import { matchesFilter, sortTasks } from './tasks'

const tasks = [
  { title: 'Read React notes', subject: 'Development', priority: 'high', completed: false, dueDate: '2026-08-20', createdAt: '2026-08-10' },
  { title: 'Finish maths quiz', subject: 'Mathematics', priority: 'low', completed: true, dueDate: '2026-08-18', createdAt: '2026-08-11' },
]

describe('task utilities', () => {
  it('filters by status and query together', () => {
    expect(tasks.filter((task) => matchesFilter(task, 'active', 'react'))).toHaveLength(1)
    expect(tasks.filter((task) => matchesFilter(task, 'completed', 'react'))).toHaveLength(0)
  })

  it('sorts without mutating the original array', () => {
    const result = sortTasks(tasks, 'dueDate')
    expect(result[0].title).toBe('Finish maths quiz')
    expect(tasks[0].title).toBe('Read React notes')
  })

  it('places undated tasks after dated work', () => {
    const undated = { ...tasks[0], title: 'Open study session', dueDate: '' }
    expect(sortTasks([undated, tasks[1]], 'dueDate')[1].title).toBe('Open study session')
  })
})
