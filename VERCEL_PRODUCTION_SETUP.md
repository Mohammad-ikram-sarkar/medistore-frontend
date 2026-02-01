# Vercel Production Setup Guide

## Current Issue: Google OAuth State Mismatch

The `state_mismatch` error occurs because of environment variable mismatches between development and production. Here's how to fix it:

## 🚨 Critical Fix Steps

### 1. **Update Vercel Environment Variables**

Go to your Vercel project dashboard → Settings → Environment Variables and set:

```env
# Production Environment Variables
NEXT_PUBLIC_AUTH_URL=https://your-backend-domain.com
BACKEND_URL=https://your-backend-domain.com
FRONTEND_URL=https://medistore-three.vercel.app
API_URL=https://your-backend-domain.com
AUTH_URL=https://your-backend-domain.com
```

**⚠️ IMPORTANT:** Replace `https://your-backend-domain.com` with your actual backend URL.

### 2. **Google Cloud Console Configuration**

Update your Google OAuth 2.0 Client ID settings:

#### **Authorized JavaScript Origins:**
```
https://medistore-three.vercel.app
http://localhost:3000
```

#### **Authorized Redirect URIs:**
```
https://medistore-three.vercel.app/api/auth/callback/google
http://localhost:3000/api/auth/callback/google
```

### 3. **Backend Environment Variables**

Your backend service needs these environment variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://medistore-three.vercel.app/api/auth/callback/google

# Frontend Configuration
FRONTEND_URL=https://medistore-three.vercel.app

# CORS Configuration
ALLOWED_ORIGINS=https://medistore-three.vercel.app,http://localhost:3000
```

## 🔧 Environment Configuration

### **Development (.env.local):**
```env
NEXT_PUBLIC_AUTH_URL=http://localhost:8080
BACKEND_URL=http://localhost:8080
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:8080
AUTH_URL=http://localhost:8080
```

### **Production (Vercel Environment Variables):**
```env
NEXT_PUBLIC_AUTH_URL=https://your-backend-domain.com
BACKEND_URL=https://your-backend-domain.com
FRONTEND_URL=https://medistore-three.vercel.app
API_URL=https://your-backend-domain.com
AUTH_URL=https://your-backend-domain.com
```

## 🚀 Deployment Steps

### **1. Set Environment Variables in Vercel:**
```bash
# Using Vercel CLI
vercel env add NEXT_PUBLIC_AUTH_URL
vercel env add BACKEND_URL
vercel env add FRONTEND_URL
vercel env add API_URL
vercel env add AUTH_URL
```

### **2. Redeploy:**
```bash
vercel --prod
```

### **3. Verify Environment Variables:**
```bash
vercel env ls
```

## 🐛 Debugging Tools

### **1. Check Auth Debug Component**
In development, the login form now shows debug information including:
- Current origin
- Auth URL
- Callback URL

### **2. Check Vercel Function Logs**
Go to Vercel Dashboard → Functions → View Function Logs to see OAuth callback logs.

### **3. Test OAuth Flow**
1. Visit `https://medistore-three.vercel.app/login`
2. Click "Sign in with Google"
3. Check browser network tab for any errors
4. Check Vercel function logs for backend communication

## 🔍 Common Issues & Solutions

### **Issue 1: "Redirect URI mismatch"**
**Solution:** Ensure Google Cloud Console redirect URIs exactly match:
```
https://medistore-three.vercel.app/api/auth/callback/google
```

### **Issue 2: "state_mismatch" error**
**Solution:** 
1. Verify all environment variables are set correctly in Vercel
2. Ensure backend and frontend URLs match
3. Check that backend validates state parameter correctly

### **Issue 3: "CORS error"**
**Solution:** Backend must allow requests from:
```javascript
// Backend CORS configuration
app.use(cors({
  origin: ['https://medistore-three.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### **Issue 4: "callback_failed" error**
**Solution:**
1. Verify backend `/api/auth/callback/google` endpoint exists
2. Check backend can process OAuth callback
3. Ensure backend returns proper JSON response

## 📋 Verification Checklist

### **✅ Environment Variables:**
- [ ] All Vercel environment variables are set
- [ ] Backend environment variables are configured
- [ ] No localhost URLs in production environment variables

### **✅ Google Cloud Console:**
- [ ] Authorized JavaScript origins include production URL
- [ ] Authorized redirect URIs include production callback URL
- [ ] Client ID and secret are correct

### **✅ Backend Configuration:**
- [ ] OAuth callback endpoint exists
- [ ] CORS allows production frontend URL
- [ ] State parameter validation works
- [ ] Returns proper JSON response with tokens

### **✅ Testing:**
- [ ] Google login works in production
- [ ] No state_mismatch errors
- [ ] Proper redirect after authentication
- [ ] User session is created correctly

## 🔧 Quick Fix Commands

### **Check current environment:**
```bash
vercel env ls
```

### **Add missing environment variable:**
```bash
vercel env add NEXT_PUBLIC_AUTH_URL production
# Enter: https://your-backend-domain.com
```

### **Redeploy with new environment variables:**
```bash
vercel --prod
```

### **View function logs:**
```bash
vercel logs --follow
```

## 📞 Backend Requirements

Your backend OAuth endpoint should:

### **1. Handle GET request:**
```
GET /api/auth/callback/google?code=...&state=...
```

### **2. Validate state parameter:**
```javascript
if (!state || !isValidState(state)) {
  return res.status(400).json({ error: 'Invalid state parameter' });
}
```

### **3. Return proper response:**
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

## 🎯 Next Steps

1. **Set all environment variables in Vercel**
2. **Update Google Cloud Console redirect URIs**
3. **Configure backend with production URLs**
4. **Redeploy and test**

The state_mismatch error should be resolved once all environment variables are properly configured for production!