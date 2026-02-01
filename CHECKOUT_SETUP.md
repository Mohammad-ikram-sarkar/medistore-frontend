# Checkout System with API Integration

## Overview
A complete checkout system has been implemented for your medicine shop with backend API integration using your specified endpoint `localhost:8080/api/orders`.

## API Integration

### Order Data Format
The system now sends orders to your backend API with this exact JSON structure:
```json
{
  "phone": "01734536",
  "address": "kasba", 
  "quantity": 1,
  "medicineId": "01KG4SE92CB39R6YWJRFCTA70V",
  "authorId": "email"
}
```

### Backend Integration Files
- **`src/service/customer.service.ts`**: Server-side service for API calls
- **`src/action/order.action.ts`**: Server action wrapper for client components
- **API Endpoint**: `POST localhost:8080/api/orders`

## Features Implemented

### 1. API-Integrated Checkout Page (`/checkout`)
- **Authentication Required**: Users must be logged in to place orders
- **Customer Information**: Auto-populated from user session (name, email)
- **Delivery Information**: Phone and address input (required fields)
- **Order Processing**: Each cart item creates a separate API call to your backend
- **Error Handling**: Proper error messages for failed API calls
- **Order Confirmation**: Success page with order ID after successful API submission

### 2. Simplified Form (API-focused)
- **Removed**: Payment method selection, city, postal code (not in your API)
- **Required Fields**: Only phone and address (matching your API)
- **Validation**: Bangladesh phone number format validation
- **User Data**: Name and email from authenticated session

### 3. Order Processing Flow
```
Cart Items → Multiple API Calls → Backend Orders → Local Order Summary → Confirmation
```

### 4. Updated Components

#### API Integration
- **customer.service.ts**: Fixed and properly typed service
- **order.action.ts**: Server action for client-side API calls
- **checkout/page.tsx**: Complete rewrite with API integration

#### Authentication Flow
- **Login Required**: Redirects to login if not authenticated
- **User Session**: Uses `authClient.useSession()` for user data
- **Author ID**: Uses logged-in user's ID as `authorId` in API calls

## How It Works

### Order Placement Process
1. **Authentication Check**: Verifies user is logged in
2. **Form Validation**: Validates phone number and address
3. **API Calls**: Creates separate order for each cart item via your API
4. **Error Handling**: Shows errors if any API calls fail
5. **Success Handling**: Clears cart and shows confirmation
6. **Local Storage**: Saves order summary for user's order history

### API Call Details
- **Method**: POST
- **Endpoint**: `${env.BACKEND_URL}/api/orders`
- **Headers**: Includes cookies for authentication
- **Body**: JSON with phone, address, quantity, medicineId, authorId
- **Response Handling**: Checks for success/error responses

### Error Handling
- **Network Errors**: "Something Went Wrong" message
- **API Errors**: Shows specific error message from backend
- **Validation Errors**: Client-side validation before API calls
- **Partial Failures**: If some orders fail, shows error and doesn't clear cart

## Technical Details

### Authentication Integration
- Uses `authClient.useSession()` for user data
- Requires login before checkout
- User ID becomes `authorId` in API calls
- Name and email auto-populated from session

### API Service Structure
```typescript
interface CreateOrderData {
  phone: string;
  address: string;
  quantity: number;
  medicineId: string;
  authorId: string;
}
```

### Multiple Orders
- Each cart item creates a separate API call
- All calls must succeed for order completion
- Failed orders prevent cart clearing
- Success confirmation only after all API calls succeed

## Environment Setup

### Required Environment Variables
Make sure your `env.ts` file includes:
```typescript
BACKEND_URL: "http://localhost:8080"
```

### Backend Expectations
Your API should:
- Accept POST requests to `/api/orders`
- Handle the JSON structure shown above
- Return success/error responses
- Handle authentication via cookies

## Usage

### For Customers
1. **Login Required**: Must be authenticated to place orders
2. **Add to Cart**: Add medicines to cart from shop
3. **Checkout**: Fill phone and address (name/email auto-filled)
4. **Place Order**: System sends each item to your backend API
5. **Confirmation**: Receive order confirmation after successful API calls

### For Developers
- **API Integration**: Real backend calls replace localStorage-only approach
- **Error Handling**: Comprehensive error handling for API failures
- **Authentication**: Integrated with your auth system
- **Scalable**: Each cart item becomes separate order in backend

## Next Steps
1. **Test API**: Ensure your backend API is running on localhost:8080
2. **Authentication**: Verify cookie-based auth works with your backend
3. **Error Responses**: Test error handling with various API failure scenarios
4. **Order Management**: Implement order viewing in dashboard using API data