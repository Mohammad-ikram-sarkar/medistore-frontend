# Google Authentication Setup Guide

## Overview
Complete setup for Google OAuth authentication with proper redirect handling and error management.

## Files Created/Updated

### 1. **Auth Client** (`src/lib/auth-client.ts`)
- ✅ **Fixed**: Now uses environment variable for baseURL
- ✅ **Fallback**: Defaults to localhost:8080 if env var missing

### 2. **Login Form** (`src/components/login-form.tsx`)
- ✅ **Fixed callback URL**: Points to proper API route
- ✅ **Error handling**: Displays OAuth errors with toast notifications
- ✅ **Redirect management**: Stores redirect URL in sessionStorage
- ✅ **URL cleanup**: Removes error params from URL after display

### 3. **OAuth Callback API** (`src/app/api/auth/callback/google/route.ts`)
- ✅ **Handles OAuth callback**: Processes Google OAuth response
- ✅ **Error handling**: Manages OAuth errors and missing codes
- ✅ **Backend integration**: Forwards callback to your backend
- ✅ **Cookie management**: Sets auth tokens from backend response
- ✅ **Redirect handling**: Redirects to auth success page

### 4. **Auth Success Page** (`src/app/auth-success/page.tsx`)
- ✅ **Post-auth redirect**: Handles redirects after successful OAuth
- ✅ **Role-based routing**: Redirects based on user role
- ✅ **Stored redirect**: Uses sessionStorage for custom redirects
- ✅ **Loading state**: Shows loading while processing

## Google OAuth Flow

### **1. User Clicks "Sign in with Google"**
```
User → Login Form → Google OAuth → Callback API → Auth Success → Dashboard
```

### **2. Detailed Flow:**
1. **User clicks Google button** → `signInWithGoogle()` function
2. **Store redirect URL** → `sessionStorage.setItem('auth_redirect', url)`
3. **Redirect to Google** → `authClient.signIn.social({ provider: "google" })`
4. **Google OAuth** → User authenticates with Google
5. **Google callback** → `GET /api/auth/callback/google?code=...`
6. **Forward to backend** → `GET ${BACKEND_URL}/api/auth/callback/google`
7. **Set auth cookies** → Store tokens from backend response
8. **Redirect to auth-success** → `/auth-success` page
9. **Check session** → Verify user is authenticated
10. **Final redirect** → Dashboard or stored redirect URL

## Environment Variables Required

### **Frontend (.env.local):**
```env
NEXT_PUBLIC_AUTH_URL=http://localhost:8080
BACKEND_URL=http://localhost:8080
```

### **Backend Environment:**
Your backend needs Google OAuth credentials:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
```

## Google Cloud Console Setup

### **1. Create OAuth 2.0 Credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create new one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client IDs**
5. Choose **Web application**

### **2. Configure Authorized URLs:**

#### **Authorized JavaScript origins:**
```
http://localhost:3000
https://yourdomain.com
```

#### **Authorized redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
https://yourdomain.com/api/auth/callback/google
```

## Error Handling

### **OAuth Errors Handled:**
- ✅ **oauth_error**: Google authentication failed
- ✅ **missing_code**: Authorization code missing
- ✅ **callback_failed**: Backend callback failed
- ✅ **Network errors**: Connection issues

### **Error Display:**
```typescript
// Automatic error toast display
useEffect(() => {
  if (errorParam) {
    switch (errorParam) {
      case 'oauth_error':
        toast.error('Google authentication failed. Please try again.')
        break
      // ... other cases
    }
  }
}, [errorParam])
```

## Redirect Management

### **1. Store Redirect URL:**
```typescript
// Before OAuth
if (safeRedirect !== '/dashboard') {
  sessionStorage.setItem('auth_redirect', safeRedirect)
}
```

### **2. Retrieve After Auth:**
```typescript
// After successful auth
const storedRedirect = sessionStorage.getItem('auth_redirect');
if (storedRedirect) {
  sessionStorage.removeItem('auth_redirect');
  router.push(storedRedirect);
}
```

### **3. Role-Based Default Redirects:**
```typescript
switch (userRole.toLowerCase()) {
  case 'admin':
    router.push('/dashboard/admin');
    break;
  case 'seller':
    router.push('/dashboard/seller');
    break;
  case 'customer':
  default:
    router.push('/dashboard');
    break;
}
```

## Backend Integration

### **Your Backend Should Handle:**
```
GET /api/auth/callback/google?code=...&state=...
```

### **Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "customer"
  },
  "token": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

## Security Features

### **1. CSRF Protection:**
- ✅ **State parameter**: Google OAuth includes state for CSRF protection
- ✅ **Origin validation**: Callback validates request origin

### **2. Secure Cookies:**
```typescript
nextResponse.cookies.set('auth-token', authData.token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7, // 7 days
});
```

### **3. Safe Redirects:**
```typescript
// Prevent open redirect attacks
const safeRedirect = redirectParam?.startsWith('/') ? redirectParam : '/dashboard'
```

## Testing Checklist

### **✅ Google OAuth Flow:**
- [ ] Click "Sign in with Google" button
- [ ] Redirected to Google OAuth page
- [ ] Authenticate with Google account
- [ ] Redirected back to your app
- [ ] Successfully logged in and redirected to dashboard

### **✅ Error Handling:**
- [ ] Handle OAuth cancellation
- [ ] Display error messages for failed auth
- [ ] Clean up error params from URL
- [ ] Fallback to login page on errors

### **✅ Redirect Management:**
- [ ] Store custom redirect URLs
- [ ] Redirect to stored URL after auth
- [ ] Role-based default redirects
- [ ] Prevent open redirect attacks

## Troubleshooting

### **Common Issues:**

#### **1. "Redirect URI mismatch"**
- ✅ **Fix**: Update Google Cloud Console redirect URIs
- ✅ **Check**: Exact URL match including protocol and port

#### **2. "Invalid client"**
- ✅ **Fix**: Verify GOOGLE_CLIENT_ID in backend environment
- ✅ **Check**: Client ID matches Google Cloud Console

#### **3. "Callback failed"**
- ✅ **Fix**: Ensure backend `/api/auth/callback/google` endpoint exists
- ✅ **Check**: Backend can process OAuth callback

#### **4. "Session not found"**
- ✅ **Fix**: Verify auth cookies are being set correctly
- ✅ **Check**: Cookie domain and path settings

The Google authentication system is now properly configured with comprehensive error handling and redirect management!