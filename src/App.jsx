import { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import AdminPanel from './components/AdminPanel'
import './App.css'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [cart, setCart] = useState([])
  const [message, setMessage] = useState({ text: '', type: '' })
  const [adminStats, setAdminStats] = useState(null)

  // Mock products data - in real app this would come from API
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop' },
    { id: 2, name: 'Smartphone', price: 699.99, description: 'Latest smartphone' },
    { id: 3, name: 'Headphones', price: 199.99, description: 'Wireless headphones' },
    { id: 4, name: 'Tablet', price: 449.99, description: '10-inch tablet' },
    { id: 5, name: 'Smart Watch', price: 299.99, description: 'Fitness tracking watch' },
    { id: 6, name: 'Camera', price: 799.99, description: 'Digital camera' },
  ])

  // Load admin stats on component mount
  useEffect(() => {
    fetchAdminStats()
  }, [])

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: '', type: '' }), 5000)
  }

  const addToCart = async (product) => {
    try {
      const response = await fetch(`${BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setCart(prev => {
          const existingItem = prev.find(item => item.id === product.id)
          if (existingItem) {
            return prev.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
          return [...prev, { ...product, quantity: 1 }]
        })
        showMessage(`${product.name} added to cart!`)
      } else {
        throw new Error('Failed to add item to cart')
      }
    } catch (error) {
      showMessage('Error adding item to cart', 'error')
      console.error('Error:', error)
    }
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
    showMessage('Item removed from cart')
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCart(prev => prev.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ))
  }

  const checkout = async (discountCode = '') => {
    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        discountCode: discountCode.trim()
      }

      const response = await fetch(`${BASE_URL}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (response.ok) {
        setCart([])
        showMessage(`Order placed successfully! ${result.discountApplied ? `Discount applied: ${result.discountAmount}` : ''}`)
        fetchAdminStats() // Refresh admin stats after successful order
        return { success: true, ...result }
      } else {
        showMessage(result.message || 'Checkout failed', 'error')
        return { success: false, message: result.message }
      }
    } catch (error) {
      showMessage('Error during checkout', 'error')
      console.error('Error:', error)
      return { success: false, message: 'Network error' }
    }
  }

  const fetchAdminStats = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/stats`)
      if (response.ok) {
        const stats = await response.json()
        setAdminStats(stats)
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error)
    }
  }

  const generateDiscountCode = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/generate-discount`, {
        method: 'POST',
      })
      
      const result = await response.json()
      
      if (response.ok) {
        showMessage(`Discount code generated: ${result.code}`)
        fetchAdminStats() // Refresh stats
      } else {
        showMessage(result.message || 'Failed to generate discount code', 'error')
      }
    } catch (error) {
      showMessage('Error generating discount code', 'error')
      console.error('Error:', error)
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>Ecommerce Store</h1>
        </div>
      </header>

      <div className="container">
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="main-content">
          <ProductList products={products} onAddToCart={addToCart} />
          <Cart 
            cart={cart}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onCheckout={checkout}
            totalPrice={getTotalPrice()}
          />
        </div>

        <AdminPanel 
          stats={adminStats}
          onGenerateDiscount={generateDiscountCode}
          onRefreshStats={fetchAdminStats}
        />
      </div>
    </div>
  )
}

export default App