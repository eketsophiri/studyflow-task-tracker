export default function EmptyState({ hasTasks, onClear }) {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden="true">✓</div>
      <h3>{hasTasks ? 'No tasks match your view' : 'Your task list is clear'}</h3>
      <p>{hasTasks ? 'Try another filter or search term.' : 'Add a study task to begin planning.'}</p>
      {hasTasks && <button type="button" className="secondary-button" onClick={onClear}>Clear filters</button>}
    </div>
  )
}
