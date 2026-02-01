"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function AuthDebug() {
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