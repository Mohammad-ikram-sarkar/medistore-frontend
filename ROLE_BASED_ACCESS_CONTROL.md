# Role-Based Access Control Implementation

## Overview
Implemented role-based access control for cart and checkout pages to ensure only customers can access these features.

## Components Created

### 1. RoleGuard Component (`src/components/auth/RoleGuard.tsx`)
A reusable component that wraps pages/components to enforce role-based access control.

#### Features:
- **Authentication Check**: Verifies user is logged in
- **Role Verification**: Checks if user has required role(s)
- **Loading States**: Shows loading spinner while checking permissions
- **Error Handling**: Displays appropriate messages for different scenarios
- **Fallback Navigation**: Redirects unauthorized users to appropriate pages

#### Props:
```typescript
interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackPath?: string; // Default: "/"
}
```

#### Usage:
```tsx
<RoleGuard allowedRoles={[Role.CUSTOMER]} fallbackPath="/shop">
  <YourProtectedComponent />
</RoleGuard>
```

## Protected Pages

### 1. Cart Page (`src/app/(mainlayout)/cart/page.tsx`)
- **Protection**: Only CUSTOMER role can access
- **Fallback**: Redirects to `/shop` if unauthorized
- **Features**: View cart items, remove items, proceed to checkout

### 2. Checkout Page (`src/app/(mainlayout)/checkout/page.tsx`)
- **Protection**: Only CUSTOMER role can access  
- **Fallback**: Redirects to `/shop` if unauthorized
- **Features**: Place orders, enter delivery info, payment processing

## Role Constants

### Role Definition (`src/constants/Role.ts`)
```typescript
export const Role = {
  CUSTOMER: "customer",
  ADMIN: "admin", 
  SELLER: "seller",
} as const;
```

## Access Control Flow

### 1. **User Not Logged In**
```
User visits protected page → RoleGuard detects no session → Redirects to /login
```

### 2. **User Logged In but Wrong Role**
```
User visits protected page → RoleGuard checks role → Shows "Access Denied" message → Provides navigation options
```

### 3. **User Logged In with Correct Role**
```
User visits protected page → RoleGuard verifies role → Renders protected content
```

## Error States Handled

### 1. **Not Authenticated**
- Shows login required message
- Provides "Go to Login" button
- Automatically redirects to login page

### 2. **Wrong Role**
- Shows access denied message
- Displays required vs actual role
- Provides "Go Back" and "Go to Dashboard" buttons

### 3. **Loading State**
- Shows loading spinner
- "Checking permissions..." message
- Prevents flash of unauthorized content

## Implementation Details

### Authentication Integration
- Uses `authClient.useSession()` from better-auth
- Handles loading states with `isPending`
- Accesses user role with fallback to "customer"

### TypeScript Handling
- Uses type assertion for role property (not in type definition)
- Provides fallback role if undefined
- Maintains type safety throughout

### Navigation
- Automatic redirects for unauthorized access
- Fallback paths for different scenarios
- Breadcrumb navigation in protected pages

## Security Features

### 1. **Client-Side Protection**
- Immediate UI feedback
- Prevents unauthorized page rendering
- Smooth user experience

### 2. **Role Validation**
- Checks against allowed roles array
- Supports multiple roles per component
- Flexible role-based permissions

### 3. **Graceful Degradation**
- Handles missing role data
- Provides meaningful error messages
- Maintains app functionality

## Usage Examples

### Single Role Protection
```tsx
<RoleGuard allowedRoles={[Role.CUSTOMER]}>
  <CustomerOnlyComponent />
</RoleGuard>
```

### Multiple Role Protection
```tsx
<RoleGuard allowedRoles={[Role.ADMIN, Role.SELLER]}>
  <AdminOrSellerComponent />
</RoleGuard>
```

### Custom Fallback Path
```tsx
<RoleGuard allowedRoles={[Role.CUSTOMER]} fallbackPath="/dashboard">
  <ProtectedComponent />
</RoleGuard>
```

## Benefits

### 1. **Security**
- Prevents unauthorized access to sensitive features
- Role-based permissions system
- Clear access control boundaries

### 2. **User Experience**
- Clear error messages
- Appropriate navigation options
- Loading states for smooth transitions

### 3. **Developer Experience**
- Reusable component
- TypeScript support
- Easy to implement and maintain

### 4. **Scalability**
- Can be extended to more roles
- Flexible permission system
- Easy to add to new pages

## Testing Scenarios

### 1. **Customer Access**
- ✅ Can access cart page
- ✅ Can access checkout page
- ✅ Can place orders

### 2. **Non-Customer Access**
- ❌ Cannot access cart page
- ❌ Cannot access checkout page
- ✅ Gets appropriate error message

### 3. **Unauthenticated Access**
- ❌ Cannot access protected pages
- ✅ Redirected to login
- ✅ Can return after login

The role-based access control system ensures that only customers can access cart and checkout functionality, providing a secure and user-friendly experience.