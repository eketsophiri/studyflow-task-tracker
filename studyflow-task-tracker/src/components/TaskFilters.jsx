const filters = [
  ['all', 'All'],
  ['active', 'To do'],
  ['completed', 'Completed'],
  ['high', 'High priority'],
]

export default function TaskFilters({ filter, onFilterChange, query, onQueryChange, sortBy, onSortChange }) {
  return (
    <div className="filter-area">
      <div className="filter-tabs" role="group" aria-label="Filter tasks">
        {filters.map(([value, label]) => (
          <button key={value} className={filter === value ? 'active' : ''} type="button" aria-pressed={filter === value} onClick={() => onFilterChange(value)}>
            {label}
          </button>
        ))}
      </div>
      <div className="filter-controls">
        <label>
          <span>Search tasks</span>
          <input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search title or subject" />
        </label>
        <label>
          <span>Sort by</span>
          <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
            <option value="dueDate">Due date</option>
            <option value="priority">Priority</option>
            <option value="newest">Newest first</option>
          </select>
        </label>
      </div>
    </div>
  )
}
