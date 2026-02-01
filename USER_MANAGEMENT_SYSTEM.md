# User Management System

## Overview
Comprehensive user management system for admins to view and manage all users with status updates and role-based controls.

## Components Created/Updated

### 1. **RoleStatusChange Action** (`src/action/RoleStatusChange.action.ts`)
Server action for updating user status via API.

#### Features:
- **Server-side action** with proper TypeScript typing
- **API integration** with backend endpoint
- **Error handling** with success/failure responses
- **Cookie-based authentication** for admin requests

#### API Endpoint:
```
PATCH /api/admin/users/{id}
Body: { "status": "active|inactive|suspended|banned" }
```

### 2. **AllUsersStatus Component** (`src/components/dashboard/adminComponents/Alluserstatus.tsx`)
Complete user management interface for administrators.

## User Data Structure

Based on your provided data:
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: string; // "customer" | "seller" | "admin"
  createdAt: string;
  updatedAt: string;
}
```

## Features Implemented

### 1. **User Display**
- **Card-based layout** for each user
- **Avatar display** with fallback initials
- **User information** clearly organized
- **Role and status badges** with color coding

### 2. **Status Management**
- **Dropdown selector** for status changes
- **Real-time updates** with loading states
- **Toast notifications** for success/error feedback
- **Status options**: Active, Inactive, Suspended, Banned

### 3. **User Information Display**

#### **Header Section:**
- **User avatar** (image or initials)
- **Name and email** with verification status
- **Role badge** (Customer/Seller/Admin)
- **Email verification badge** (Verified/Unverified)

#### **Details Section:**
- **User ID** (last 8 characters for display)
- **Role information** with color coding
- **Email verification status**
- **Account creation date**
- **Last update timestamp**

#### **Status Management:**
- **Current status display**
- **Status dropdown** for changes
- **Loading indicator** during updates
- **Success/error feedback**

## Visual Design

### **Role Color Coding:**
- 🔵 **Customer**: Blue badges
- 🟣 **Seller**: Purple badges  
- 🟠 **Admin**: Orange badges

### **Status Color Coding:**
- 🟢 **Active**: Green badges
- 🔴 **Inactive/Banned**: Red badges
- 🟡 **Suspended**: Yellow badges

### **Verification Status:**
- ✅ **Verified**: Green checkmark icon
- ❌ **Unverified**: Red X icon

## User Management Features

### 1. **Status Options**
```typescript
const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
  { value: "banned", label: "Banned" }
];
```

### 2. **Role Recognition**
- **Customer**: Shopping and ordering capabilities
- **Seller**: Product management and order fulfillment
- **Admin**: Full system administration access

### 3. **Account Timeline**
- **Creation date** with formatted timestamp
- **Last update** information
- **Visual timeline** with colored indicators

## API Integration

### **Status Update Flow:**
1. **Admin selects** new status from dropdown
2. **Loading state** shows during API call
3. **Server action** sends PATCH request to backend
4. **Success response** updates UI and shows toast
5. **Error response** shows error message

### **Error Handling:**
- **Network errors**: "Network error occurred"
- **API errors**: Shows specific error from backend
- **Validation errors**: Prevents invalid status changes

## Security Features

### 1. **Admin-Only Access**
- Component should be wrapped with admin role guard
- Server action validates admin permissions
- API endpoint requires admin authentication

### 2. **Data Validation**
- TypeScript interfaces ensure data integrity
- Status options are predefined and validated
- User ID validation before API calls

## User Experience

### 1. **Loading States**
- **Spinner animation** during status updates
- **Disabled dropdown** while processing
- **"Updating status..."** message

### 2. **Feedback System**
- **Success toast**: "User status updated successfully"
- **Error toast**: Specific error messages
- **Visual status changes** immediately reflected

### 3. **Responsive Design**
- **Mobile-friendly** card layout
- **Flexible grid** system
- **Proper spacing** and typography

## Usage Example

```tsx
// In admin dashboard page
import Alluserstatus from '@/components/dashboard/adminComponents/Alluserstatus';

const AdminUsersPage = ({ userData }) => {
  return (
    <RoleGuard allowedRoles={[Role.ADMIN]}>
      <Alluserstatus data={userData} />
    </RoleGuard>
  );
};
```

## Benefits

### 1. **Administrative Control**
- **Complete user overview** in one interface
- **Quick status changes** with immediate feedback
- **User activity tracking** with timestamps

### 2. **User Safety**
- **Account suspension** for policy violations
- **Status management** for security purposes
- **Role-based access** control

### 3. **System Management**
- **User verification** status tracking
- **Account lifecycle** management
- **Audit trail** with update timestamps

## Testing Scenarios

### 1. **Status Updates**
- ✅ Change user from Active to Suspended
- ✅ Change user from Inactive to Active
- ✅ Handle API errors gracefully
- ✅ Show loading states during updates

### 2. **User Display**
- ✅ Show all user information correctly
- ✅ Display proper role badges
- ✅ Handle missing user images
- ✅ Format dates properly

### 3. **Error Handling**
- ✅ Network connection issues
- ✅ Invalid status values
- ✅ Unauthorized access attempts
- ✅ API server errors

The user management system provides administrators with comprehensive control over user accounts while maintaining security and providing excellent user experience.