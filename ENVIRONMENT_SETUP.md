# Environment Configuration Guide

## Current Status
Your application is currently configured for **localhost development mode**.

## Environment Options

### 1. Development Mode (Current) ✅
```env
AUTH_URL=http://localhost:8080/api/auth
BASE_URL=http://localhost:8080
BACKEND_URL=http://localhost:8080
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:8080
NEXT_PUBLIC_AUTH_URL=http://localhost:8080
```

**Use when:**
- Developing locally
- Backend running on localhost:8080
- Frontend running on localhost:3000

### 2. Production Mode
```env
AUTH_URL=https://medistore-three.vercel.app/api/auth
BASE_URL=https://medistore-three.vercel.app
BACKEND_URL=https://medistore-three.vercel.app
FRONTEND_URL=https://medistore-three.vercel.app
API_URL=https://medistore-three.vercel.app
NEXT_PUBLIC_AUTH_URL=https://medistore-three.vercel.app
```

**Use when:**
- Deploying to production
- Both frontend and backend on Vercel

### 3. Mixed Mode (Not Recommended)
```env
AUTH_URL=https://medistore-three.vercel.app/api/auth
BASE_URL=https://medistore-three.vercel.app
BACKEND_URL=https://medistore-three.vercel.app
FRONTEND_URL=http://localhost:3000
API_URL=https://medistore-three.vercel.app
NEXT_PUBLIC_AUTH_URL=https://medistore-three.vercel.app
```

**Issues with Mixed Mode:**
- CORS errors
- Cookie domain mismatches
- Authentication problems

## How to Switch Environments

1. **For Development:** Keep current .env settings
2. **For Production:** 
   - Uncomment production lines in .env
   - Comment out development lines
   - Deploy to Vercel

## Troubleshooting

### Common Issues:
1. **CORS Errors:** Use same domain for frontend and backend
2. **Authentication Issues:** Check cookie domains match
3. **API Not Working:** Verify backend is running and accessible

### Debug Steps:
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Check authentication cookies in browser dev tools
4. Use the ApiDebug component for testing