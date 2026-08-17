import { useState } from 'react'

const initialValues = { title: '', subject: '', dueDate: '', priority: 'medium' }

export default function TaskForm({ onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState('')

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (name === 'title' && value.trim()) setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!values.title.trim()) {
      setError('Enter a task title before adding it.')
      return
    }
    onSubmit({ ...values, title: values.title.trim(), subject: values.subject.trim() })
    setValues(initialValues)
    setError('')
  }

  return (
    <aside className="form-card" aria-labelledby="add-task-title">
      <p className="eyebrow">Capture the next step</p>
      <h2 id="add-task-title">Add a study task</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="title">Task title</label>
        <input id="title" name="title" value={values.title} onChange={updateField} aria-describedby={error ? 'title-error' : undefined} aria-invalid={Boolean(error)} placeholder="e.g. Review chapter 4" />
        {error && <p className="field-error" id="title-error" role="alert">{error}</p>}

        <label htmlFor="subject">Subject</label>
        <input id="subject" name="subject" value={values.subject} onChange={updateField} placeholder="e.g. Application Development" />

        <label htmlFor="dueDate">Due date</label>
        <input id="dueDate" name="dueDate" type="date" value={values.dueDate} onChange={updateField} />

        <label htmlFor="priority">Priority</label>
        <select id="priority" name="priority" value={values.priority} onChange={updateField}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className="primary-button" type="submit">Add task</button>
      </form>
    </aside>
  )
}
