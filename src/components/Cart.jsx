import { useState } from 'react'
import PropTypes from 'prop-types'

function Cart({ cart, onRemove, onUpdateQuantity, onCheckout, totalPrice }) {
  const [discountCode, setDiscountCode] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [discountMessage, setDiscountMessage] = useState('')

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    setDiscountMessage('')
    
    const result = await onCheckout(discountCode)
    
    if (result.success) {
      setDiscountCode('')
      if (result.discountApplied) {
        setDiscountMessage(`Discount applied! You saved $${result.discountAmount.toFixed(2)}`)
      }
    } else {
      if (result.message && result.message.includes('discount')) {
        setDiscountMessage(result.message)
      }
    }
    
    setIsCheckingOut(false)
  }

  const handleQuantityChange = (productId, change) => {
    const item = cart.find(item => item.id === productId)
    if (item) {
      onUpdateQuantity(productId, item.quantity + change)
    }
  }

  return (
    <div className="cart-section">
      <h2 className="section-title">Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <br />
                <small>${item.price.toFixed(2)} each</small>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  className="btn"
                  onClick={() => handleQuantityChange(item.id, -1)}
                  style={{ padding: '0.25rem 0.5rem' }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  className="btn"
                  onClick={() => handleQuantityChange(item.id, 1)}
                  style={{ padding: '0.25rem 0.5rem' }}
                >
                  +
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => onRemove(item.id)}
                  style={{ marginLeft: '10px', padding: '0.25rem 0.5rem' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div className="cart-total">
            Total: ${totalPrice.toFixed(2)}
          </div>

          <div className="discount-section">
            <h4>Discount Code</h4>
            <input
              type="text"
              className="discount-input"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            {discountMessage && (
              <div className={discountMessage.includes('saved') ? 'discount-success' : 'discount-error'}>
                {discountMessage}
              </div>
            )}
          </div>

          <button 
            className="btn btn-success"
            onClick={handleCheckout}
            disabled={isCheckingOut}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {isCheckingOut ? 'Processing...' : 'Checkout'}
          </button>
        </>
      )}
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
}

export default Cart