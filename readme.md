# Ecommerce Frontend

A simple React frontend for the ecommerce store assignment, built with Vite for fast development and hot reloading.

## Features

### Customer Features
- Browse products with clean, responsive design
- Add items to cart with quantity management
- Apply discount codes during checkout
- Real-time cart total calculation
- Responsive design for mobile and desktop

### Admin Features
- View total items purchased
- Monitor total purchase amount
- Track active discount codes
- Monitor total discount amount given
- Generate new discount codes
- Refresh statistics in real-time

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with responsive design
- **Fetch API** - HTTP requests to backend

## Project Structure

```
src/
├── components/
│   ├── ProductList.jsx    # Product display and add to cart
│   ├── Cart.jsx          # Shopping cart with checkout
│   └── AdminPanel.jsx    # Admin statistics and controls
├── App.jsx               # Main application component
├── App.css              # App-specific styles
├── index.css            # Global styles
└── main.jsx             # React app entry point
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Backend Integration

The app expects your backend to be running on `http://localhost:8000` with the following API endpoints:

### Customer Endpoints
- `POST /api/cart/add` - Add item to cart
- `POST /api/checkout` - Process checkout with optional discount code

### Admin Endpoints
- `GET /api/admin/stats` - Get purchase statistics
- `POST /api/admin/generate-discount` - Generate new discount code

## API Request/Response Format

### Add to Cart
```javascript
// Request
POST /api/cart/add
{
  "productId": 1,
  "name": "Laptop",
  "price": 999.99,
  "quantity": 1
}

// Response
{
  "success": true,
  "message": "Item added to cart"
}
```

### Checkout
```javascript
// Request
POST /api/checkout
{
  "items": [
    {
      "productId": 1,
      "name": "Laptop",
      "price": 999.99,
      "quantity": 1
    }
  ],
  "discountCode": "SAVE10"
}

// Response
{
  "success": true,
  "orderId": "ORDER123",
  "totalAmount": 899.99,
  "discountApplied": true,
  "discountAmount": 100.00
}
```

### Admin Stats
```javascript
// Response
GET /api/admin/stats
{
  "totalItemsPurchased": 150,
  "totalPurchaseAmount": 15000.00,
  "discountCodes": [
    {
      "code": "SAVE10",
      "discountPercent": 10,
      "used": false
    }
  ],
  "totalDiscountAmount": 500.00
}
```

## Features Implementation

### Cart Management
- Add items with automatic quantity increment for duplicates
- Remove items completely
- Update quantities with +/- buttons
- Real-time total calculation

### Discount System
- Input field for discount codes
- Validation feedback during checkout
- Success/error messages for discount application

### Admin Dashboard
- Real-time statistics display
- Discount code generation
- Manual stats refresh capability

## Customization

### Adding New Products
Edit the `products` array in `src/App.jsx`:

```javascript
const [products] = useState([
  { 
    id: 7, 
    name: 'New Product', 
    price: 299.99, 
    description: 'Product description' 
  },
  // ... existing products
])
```

### Styling
- Global styles: `src/index.css`
- Component-specific styles: `src/App.css`
- Responsive breakpoints configured for mobile-first design

### Backend URL
Update the proxy configuration in `vite.config.js` if your backend runs on a different port:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:YOUR_PORT',
    changeOrigin: true,
  },
}
```

## Browser Support

- Modern browsers with ES6+ support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development Notes

- Hot reloading enabled for fast development
- PropTypes included for component prop validation
- Error handling implemented for all API calls
- Loading states for async operations
- Responsive design with CSS Grid and Flexbox

## Production Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure your server to proxy `/api` requests to your backend
4. Set up proper CORS headers on your backend for production domain

## Troubleshooting

### Common Issues

1. **Backend connection errors**: Ensure your backend is running on port 8000
2. **CORS issues**: Configure CORS headers on your backend
3. **Build failures**: Check for any missing dependencies or syntax errors

### Error Messages
The app includes comprehensive error handling with user-friendly messages for:
- Network connectivity issues
- Invalid discount codes
- Checkout failures
- Admin operation errors