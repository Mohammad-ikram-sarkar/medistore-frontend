# CORS and Cookie Authentication Fix

## Problem Summary

The application is experiencing CORS (Cross-Origin Resource Sharing) and cookie authentication issues when trying to use the production API (`https://medistore-three.vercel.app`) from a localhost development environment (`http://localhost:3000`).

### Key Issues:
1. **CORS Policy Blocking**: Requests from `http://localhost:3000` to `https://medistore-three.vercel.app` are blocked
2. **Cookie Not Set**: Authentication cookies are not being set or shared between domains
3. **Session Null**: `authClient.useSession()` returns null even after successful login
4. **Mixed Environment**: Development frontend + Production backend causes cross-domain issues

## Root Cause Analysis

### 1. CORS Configuration
The production backend needs to allow requests from localhost during development:
```javascript
// Backend CORS configuration needed
app.use(cors({
  origin: ['http://localhost:3000', 'https://medistore-three.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}))
```

### 2. Cookie Domain Issues
Cookies set by `https://medistore-three.vercel.app` cannot be read by `http://localhost:3000` due to:
- Different domains (vercel.app vs localhost)
- Different protocols (https vs http)
- SameSite cookie policies

### 3. Better Auth Configuration
The auth client needs proper configuration for cross-domain requests.

## Solutions Implemented

### 1. Enhanced Auth Client (`src/lib/auth-client.ts`)

```typescript
import { createAuthClient } from "better-auth/react"

const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    const envURL = process.env.NEXT_PUBLIC_AUTH_URL || process.env.AUTH_URL
    if (envURL) {
      return envURL.replace('/api/auth', '')
    }
    
    const isLocalhost = window.location.hostname === 'localhost'
    return isLocalhost ? 'http://localhost:8080' : 'https://medistore-three.vercel.app'
  }
  
  const envURL = process.env.AUTH_URL || process.env.NEXT_PUBLIC_AUTH_URL
  return envURL ? envURL.replace('/api/auth', '') : 'http://localhost:8080'
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  fetchOptions: {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  },
})
```

### 2. Debug Components Created

#### Cookie Debug (`src/components/debug/CookieDebug.tsx`)
- Shows all browser cookies
- Identifies auth-related cookies
- Displays environment information

#### Session Test (`src/components/debug/SessionTest.tsx`)
- Tests `authClient.getSession()` method
- Tests direct fetch to `/get-session` endpoint
- Shows `useSession()` hook results
- Provides detailed error information

### 3. Enhanced Login Form (`src/components/login-form.tsx`)
- Added session status display
- Integrated debug components (toggleable)
- Enhanced error logging
- Better user feedback

## Environment Configuration

### Development (Localhost Backend)
```env
AUTH_URL=http://localhost:8080/api/auth
BASE_URL=http://localhost:8080
BACKEND_URL=http://localhost:8080
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:8080
NEXT_PUBLIC_AUTH_URL=http://localhost:8080
```

### Production (Vercel Backend)
```env
AUTH_URL=https://medistore-three.vercel.app/api/auth
BASE_URL=https://medistore-three.vercel.app
BACKEND_URL=https://medistore-three.vercel.app
FRONTEND_URL=https://medistore-three.vercel.app
API_URL=https://medistore-three.vercel.app
NEXT_PUBLIC_AUTH_URL=https://medistore-three.vercel.app
```

### Mixed Environment (NOT RECOMMENDED)
```env
# This configuration will have CORS/cookie issues
AUTH_URL=https://medistore-three.vercel.app/api/auth
BACKEND_URL=https://medistore-three.vercel.app
FRONTEND_URL=http://localhost:3000
```

## Backend Requirements

For the mixed environment to work, the backend needs:

### 1. CORS Configuration
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://medistore-three.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie']
}))
```

### 2. Cookie Configuration
```javascript
// Better Auth configuration
export const auth = betterAuth({
  // ... other config
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      options: {
        httpOnly: true,
        sameSite: "none", // Required for cross-domain
        secure: true, // Required for SameSite=none
        domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
      }
    }
  }
})
```

### 3. Proxy Configuration (Alternative Solution)
Instead of CORS, use Next.js API routes as a proxy:

```typescript
// pages/api/auth/[...auth].ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const backendURL = process.env.BACKEND_URL
  const authPath = req.url?.replace('/api/auth', '') || ''
  
  const response = await fetch(`${backendURL}/api/auth${authPath}`, {
    method: req.method,
    headers: {
      ...req.headers,
      host: new URL(backendURL).host,
    },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
  })
  
  // Forward cookies
  const cookies = response.headers.get('set-cookie')
  if (cookies) {
    res.setHeader('set-cookie', cookies)
  }
  
  const data = await response.json()
  res.status(response.status).json(data)
}
```

## Testing Steps

### 1. Test with Debug Components
1. Go to `/login`
2. Click "Show Debug Info"
3. Check Cookie Debug for auth cookies
4. Use Session Test to test different methods
5. Try quick login buttons

### 2. Check Browser Network Tab
1. Open Developer Tools → Network
2. Try to login
3. Look for CORS errors in console
4. Check if cookies are being set in Application tab

### 3. Environment Switching
1. Test with localhost backend (should work perfectly)
2. Test with production backend (may have CORS issues)
3. Compare results

## Recommended Solutions

### Option 1: Use Localhost Backend for Development
- Set environment to localhost backend
- No CORS issues
- Cookies work properly
- Fastest development experience

### Option 2: Fix Production Backend CORS
- Update backend CORS configuration
- Update cookie settings for cross-domain
- Requires backend deployment

### Option 3: Use Proxy (Next.js API Routes)
- Create proxy API routes in Next.js
- Forward requests to production backend
- Handle cookies properly
- No backend changes needed

## Current Status

✅ **Fixed Issues:**
- Missing debug components created
- Auth client enhanced with environment detection
- Login form improved with better debugging
- Comprehensive error logging added

⚠️ **Remaining Issues:**
- Production backend CORS configuration needed
- Cookie domain/SameSite settings need backend update
- Mixed environment still has limitations

## Next Steps

1. **Immediate**: Use localhost backend for development
2. **Short-term**: Implement proxy solution if production data needed
3. **Long-term**: Update production backend CORS and cookie configuration

## Files Modified

- `src/lib/auth-client.ts` - Enhanced with environment detection
- `src/components/login-form.tsx` - Added debugging and better error handling
- `src/components/debug/CookieDebug.tsx` - New debug component
- `src/components/debug/SessionTest.tsx` - New session testing component
- `CORS_COOKIE_FIX.md` - This documentation