import { describe, expect, it } from 'vitest'
import { formatDueDate, getDueState } from './dates'

describe('date utilities', () => {
  it('formats dates in a concise South African-friendly style', () => {
    expect(formatDueDate('2026-08-20')).toBe('20 Aug')
  })

  it('marks incomplete past tasks as overdue', () => {
    const result = getDueState('2026-08-16', false, new Date('2026-08-17T12:00:00'))
    expect(result.label).toContain('overdue')
  })

  it('does not warn about completed tasks', () => {
    expect(getDueState('2026-08-16', true).label).toBe('')
  })
})
