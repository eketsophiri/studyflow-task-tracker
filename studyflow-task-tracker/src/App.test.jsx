import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('StudyFlow', () => {
  it('adds, completes, filters, and deletes a task', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Task title'), 'Prepare presentation')
    await user.type(screen.getByLabelText('Subject'), 'Application Development')
    await user.click(screen.getByRole('button', { name: 'Add task' }))
    expect(screen.getByText('Prepare presentation')).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: /Prepare presentation/ }))
    await user.click(screen.getByRole('button', { name: 'Completed' }))
    expect(screen.getByText('Prepare presentation')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete Prepare presentation' }))
    expect(screen.queryByText('Prepare presentation')).not.toBeInTheDocument()
  })

  it('shows an accessible validation message', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Add task' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a task title')
  })
})
