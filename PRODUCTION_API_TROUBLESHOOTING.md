# Production API Troubleshooting Guide

## Current Configuration Issues

You're trying to use production URLs with a local development setup. This can cause several issues:

### 🚨 Common Problems

1. **CORS Errors**
   - Browser blocks requests from `localhost:3000` to `https://medistore-three.vercel.app`
   - Solution: Backend must allow `localhost:3000` in CORS settings

2. **Cookie Domain Issues**
   - Cookies from `medistore-three.vercel.app` won't work on `localhost:3000`
   - Authentication sessions won't persist
   - Solution: Use same domain for frontend and backend

3. **SSL/HTTP Protocol Mismatch**
   - Production uses HTTPS, localhost uses HTTP
   - Can cause security policy violations

## 🔧 Solutions

### Option 1: Full Production Setup (Recommended)
Deploy your frontend to Vercel and use production URLs:
```bash
# Deploy to Vercel
vercel --prod

# Use production environment
# All URLs point to https://medistore-three.vercel.app
```

### Option 2: Full Development Setup
Use local backend and frontend:
```env
# .env - Development
AUTH_URL=http://localhost:8080/api/auth
BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_AUTH_URL=http://localhost:8080
```

### Option 3: Mixed Environment (Advanced)
If you must use production backend with local frontend:

1. **Update Backend CORS Settings**
   ```javascript
   // Backend CORS configuration
   app.use(cors({
     origin: ['http://localhost:3000', 'https://medistore-three.vercel.app'],
     credentials: true
   }));
   ```

2. **Use Proxy Configuration**
   ```javascript
   // next.config.js
   module.exports = {
     async rewrites() {
       return [
         {
           source: '/api/:path*',
           destination: 'https://medistore-three.vercel.app/api/:path*'
         }
       ]
     }
   }
   ```

## 🔍 Debugging Steps

1. **Check Browser Console**
   - Look for CORS errors
   - Check network tab for failed requests

2. **Test API Endpoints**
   ```bash
   # Test if API is accessible
   curl https://medistore-three.vercel.app/api/medicines
   ```

3. **Check Cookie Settings**
   - Open browser dev tools
   - Check Application > Cookies
   - Verify authentication cookies are set

4. **Use Debug Component**
   Add the ApiDebug component to test authentication:
   ```tsx
   import { ApiDebug } from '@/components/debug/ApiDebug';
   
   // Add to any page
   <ApiDebug />
   ```

## 🚀 Recommended Approach

For development: Use local backend
For production: Deploy both frontend and backend to same domain

This avoids all CORS and cookie domain issues.