import PropTypes from 'prop-types'

function AdminPanel({ stats, onGenerateDiscount, onRefreshStats }) {
  if (!stats) {
    return (
      <div className="admin-section">
        <h2 className="section-title">Admin Panel</h2>
        <div className="loading">Loading admin statistics...</div>
      </div>
    )
  }

  return (
    <div className="admin-section">
      <h2 className="section-title">Admin Panel</h2>
      
      <div className="admin-grid">
        <div className="admin-card">
          <h4>Total Items Purchased</h4>
          <div className="value">{stats.totalItemsPurchased || 0}</div>
        </div>
        
        <div className="admin-card">
          <h4>Total Purchase Amount</h4>
          <div className="value">${(stats.totalPurchaseAmount || 0).toFixed(2)}</div>
        </div>
        
        <div className="admin-card">
          <h4>Active Discount Codes</h4>
          <div className="value">{stats.discountCodes ? stats.discountCodes.length : 0}</div>
        </div>
        
        <div className="admin-card">
          <h4>Total Discount Amount</h4>
          <div className="value">${(stats.totalDiscountAmount || 0).toFixed(2)}</div>
        </div>
      </div>

      {stats.discountCodes && stats.discountCodes.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Available Discount Codes:</h4>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
            {stats.discountCodes.map((code, index) => (
              <li key={index} style={{ marginBottom: '0.25rem' }}>
                <strong>{code.code}</strong> - {code.discountPercent}% off 
                {code.used ? ' (Used)' : ' (Available)'}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button 
          className="btn"
          onClick={onGenerateDiscount}
        >
          Generate Discount Code
        </button>
        <button 
          className="btn"
          onClick={onRefreshStats}
        >
          Refresh Stats
        </button>
      </div>
    </div>
  )
}

AdminPanel.propTypes = {
  stats: PropTypes.shape({
    totalItemsPurchased: PropTypes.number,
    totalPurchaseAmount: PropTypes.number,
    discountCodes: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      discountPercent: PropTypes.number.isRequired,
      used: PropTypes.bool.isRequired,
    })),
    totalDiscountAmount: PropTypes.number,
  }),
  onGenerateDiscount: PropTypes.func.isRequired,
  onRefreshStats: PropTypes.func.isRequired,
}

export default AdminPanel