import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  console.log('OAuth callback received:', {
    hasCode: !!code,
    hasState: !!state,
    error,
    origin: request.headers.get('origin'),
    referer: request.headers.get('referer'),
  });

  // Handle OAuth error
  if (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(new URL(`/login?error=oauth_error`, request.url));
  }

  // Handle missing code
  if (!code) {
    console.error('Missing authorization code');
    return NextResponse.redirect(new URL('/login?error=missing_code', request.url));
  }

  try {
    // Get the backend URL from environment with fallback
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:8080';
    
    console.log('Using backend URL:', backendUrl);
    
    // Construct callback URL with all parameters
    const callbackUrl = new URL('/api/auth/callback/google', backendUrl);
    callbackUrl.searchParams.set('code', code);
    if (state) {
      callbackUrl.searchParams.set('state', state);
    }
    
    console.log('Forwarding OAuth callback to backend:', callbackUrl.toString());
    
    const response = await fetch(callbackUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-Frontend/1.0',
        'X-Forwarded-For': request.headers.get('x-forwarded-for') || '',
        'X-Real-IP': request.headers.get('x-real-ip') || '',
        'X-Frontend-Origin': request.headers.get('origin') || '',
      },
    });

    console.log('Backend response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend auth failed: ${response.status} - ${errorText}`);
      
      // Handle specific backend errors
      if (response.status === 400) {
        if (errorText.includes('state')) {
          return NextResponse.redirect(new URL('/login?error=state_mismatch', request.url));
        }
        if (errorText.includes('code')) {
          return NextResponse.redirect(new URL('/login?error=invalid_code', request.url));
        }
      }
      
      throw new Error(`Backend auth failed: ${response.status} - ${errorText}`);
    }

    const authData = await response.json();
    console.log('Backend auth successful:', { 
      hasToken: !!authData.token, 
      hasUser: !!authData.user,
      userRole: authData.user?.role 
    });
    
    // Create response with redirect to auth success page
    const redirectUrl = new URL('/auth-success', request.url);
    const nextResponse = NextResponse.redirect(redirectUrl);

    // Set auth cookies if provided by backend
    if (authData.token) {
      nextResponse.cookies.set('auth-token', authData.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
    }

    if (authData.refreshToken) {
      nextResponse.cookies.set('refresh-token', authData.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    // Set user session data if needed
    if (authData.user) {
      nextResponse.cookies.set('user-session', JSON.stringify(authData.user), {
        httpOnly: false, // Allow client-side access for user data
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
    }

    return nextResponse;

  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(new URL('/login?error=callback_failed', request.url));
  }
}

export async function POST(request: NextRequest) {
  // Handle POST requests if needed
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}