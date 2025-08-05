import PropTypes from 'prop-types'

function ProductList({ products, onAddToCart }) {
  return (
    <div className="products-section">
      <h2 className="section-title">Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-price">${product.price.toFixed(2)}</div>
            <button 
              className="btn"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default ProductList