"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function AuthDebug() {
  const { data: session, isPending, error } = authClient.useSession();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'unknown';
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'not set';
  
  return (
    <Card className="mt-4 border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-sm text-orange-800">🔧 Auth Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Session Status */}
        <div className="p-3 bg-white rounded border">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4" />
            <span className="font-medium">Session Status</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Loading:</span>
              <Badge variant={isPending ? "default" : "outline"}>
                {isPending ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Has Session:</span>
              <Badge variant={session ? "default" : "destructive"}>
                {session ? "Yes" : "No"}
              </Badge>
            </div>
            {session && (
              <>
                <div className="flex justify-between">
                  <span>User Name:</span>
                  <Badge variant="outline">{session.user?.name || "N/A"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>User Role:</span>
                  <Badge variant="outline">{(session.user as any)?.role || "N/A"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>User Email:</span>
                  <Badge variant="outline" className="text-xs">{session.user?.email || "N/A"}</Badge>
                </div>
              </>
            )}
            {error && (
              <div className="flex items-start gap-2 p-2 bg-red-50 rounded">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                <div>
                  <span className="text-red-700 font-medium">Error:</span>
                  <p className="text-red-600 text-xs">{error.message || "Unknown error"}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Environment Info */}
        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-medium">Current Origin:</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">
                {currentOrigin}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(currentOrigin)}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Auth URL:</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">
                {authUrl}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(authUrl)}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Callback URL:</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {currentOrigin}/api/auth/callback/google
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`${currentOrigin}/api/auth/callback/google`)}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-orange-200">
          <p className="text-xs text-orange-700">
            <strong>Google Console Setup:</strong><br/>
            Add the callback URL above to your Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs → Authorized redirect URIs
          </p>
        </div>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.location.reload()}
          className="w-full"
        >
          <RefreshCw className="w-3 h-3 mr-2" />
          Refresh Page
        </Button>
      </CardContent>
    </Card>
  );
}