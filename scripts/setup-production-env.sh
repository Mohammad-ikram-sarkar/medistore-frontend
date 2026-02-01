#!/bin/bash

# Production Environment Setup Script for Vercel
# Run this script to set up all required environment variables for production

echo "🚀 Setting up production environment variables for Vercel..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Please install it first:"
    echo "npm i -g vercel"
    exit 1
fi

echo "📝 Please provide your backend domain (e.g., https://api.yourdomain.com):"
read -p "Backend URL: " BACKEND_URL

if [ -z "$BACKEND_URL" ]; then
    echo "❌ Backend URL is required!"
    exit 1
fi

echo ""
echo "🔧 Setting environment variables in Vercel..."

# Set production environment variables
echo "Setting NEXT_PUBLIC_AUTH_URL..."
echo "$BACKEND_URL" | vercel env add NEXT_PUBLIC_AUTH_URL production

echo "Setting BACKEND_URL..."
echo "$BACKEND_URL" | vercel env add BACKEND_URL production

echo "Setting FRONTEND_URL..."
echo "https://medistore-three.vercel.app" | vercel env add FRONTEND_URL production

echo "Setting API_URL..."
echo "$BACKEND_URL" | vercel env add API_URL production

echo "Setting AUTH_URL..."
echo "$BACKEND_URL" | vercel env add AUTH_URL production

echo ""
echo "✅ Environment variables set successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update Google Cloud Console with these redirect URIs:"
echo "   - https://medistore-three.vercel.app/api/auth/callback/google"
echo "   - http://localhost:3000/api/auth/callback/google"
echo ""
echo "2. Configure your backend with these environment variables:"
echo "   GOOGLE_CLIENT_ID=your_google_client_id"
echo "   GOOGLE_CLIENT_SECRET=your_google_client_secret"
echo "   GOOGLE_REDIRECT_URI=https://medistore-three.vercel.app/api/auth/callback/google"
echo "   FRONTEND_URL=https://medistore-three.vercel.app"
echo ""
echo "3. Deploy to production:"
echo "   vercel --prod"
echo ""
echo "4. Check the deployment:"
echo "   vercel logs --follow"
echo ""
echo "🎉 Setup complete! Your production environment should now work with Google OAuth."