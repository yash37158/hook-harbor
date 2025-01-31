import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, Trash2, Download, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Get base URL for the current environment
const getBaseUrl = () => {
  if (typeof window === 'undefined') return '';
  
  // For local development
  if (window.location.hostname === 'localhost') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  
  // For deployed environments
  return `${window.location.protocol}//${window.location.hostname}`;
};

const DEFAULT_WEBHOOK_URL = `${getBaseUrl()}/api/webhooks`;

export type WebhookRequest = {
  id: string;
  method: string;
  path: string;
  timestamp: Date;
  headers: Record<string, string>;
  body: any;
  queryParams: Record<string, string>;
};

const WebhookDebugger = () => {
  const [requests, setRequests] = useState<WebhookRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<WebhookRequest | null>(null);
  const [webhookUrl, setWebhookUrl] = useState(DEFAULT_WEBHOOK_URL);
  const [isListening, setIsListening] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!isListening) return;

    // Create EventSource URL based on the current environment
    const eventSourceUrl = `${getBaseUrl()}/api/webhooks/events`;
    const eventSource = new EventSource(eventSourceUrl);
    
    eventSource.onmessage = (event) => {
      try {
        const request = JSON.parse(event.data);
        setRequests(prev => [request, ...prev]);
        toast({
          title: "New webhook received",
          description: `${request.method} request to ${request.path}`,
        });
      } catch (error) {
        console.error('Error parsing webhook data:', error);
        toast({
          title: "Error receiving webhook",
          description: "There was an error processing the incoming webhook",
          variant: "destructive",
        });
      }
    };

    eventSource.onerror = () => {
      console.log('SSE connection error');
      setIsListening(false);
      toast({
        title: "Connection Error",
        description: "Lost connection to webhook server. Click the refresh button to reconnect.",
        variant: "destructive",
      });
    };

    return () => {
      eventSource.close();
    };
  }, [isListening]);

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast({
      title: "URL copied to clipboard",
      description: "Your webhook URL has been copied to the clipboard.",
    });
  };

  const clearRequests = () => {
    setRequests([]);
    setSelectedRequest(null);
    toast({
      title: "Requests cleared",
      description: "All webhook requests have been cleared.",
    });
  };

  const downloadRequests = () => {
    const dataStr = JSON.stringify(requests, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'webhook-requests.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({
      title: "Requests downloaded",
      description: "Your webhook requests have been downloaded as JSON.",
    });
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    toast({
      title: isListening ? "Stopped listening" : "Started listening",
      description: isListening ? "No longer receiving webhook requests." : "Now receiving webhook requests.",
    });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] p-6 flex flex-col gap-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Webhook Testing Guide</AlertTitle>
        <AlertDescription>
          <div className="space-y-2">
            <p>Current webhook URL: <strong>{webhookUrl}</strong></p>
            <p>You can:</p>
            <ul className="list-disc pl-6">
              <li>Use this URL directly for testing in deployed environments</li>
              <li>For local development:
                <ul className="list-disc pl-6 mt-1">
                  <li>Use tools like ngrok to expose your localhost</li>
                  <li>Send requests directly to {webhookUrl}</li>
                  <li>Test with tools like Postman or curl</li>
                </ul>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              {window.location.hostname === 'localhost' ? 
                '⚠️ Local Development Mode: Consider using ngrok for external services.' :
                '✅ Deployed Environment: URL is publicly accessible.'}
            </p>
          </div>
        </AlertDescription>
      </Alert>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Webhook URL</h2>
          <div className="flex items-center gap-2">
            <Input 
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="min-w-[400px] font-mono text-sm"
              placeholder={DEFAULT_WEBHOOK_URL}
            />
            <Button variant="outline" size="icon" onClick={copyWebhookUrl}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={clearRequests}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={downloadRequests}>
            <Download className="h-4 w-4" />
          </Button>
          <Button 
            variant={isListening ? "default" : "outline"} 
            size="icon" 
            onClick={toggleListening}
          >
            <RefreshCw className={`h-4 w-4 ${isListening ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="flex gap-6 flex-1">
        <Card className="w-1/3">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <RequestList
              requests={requests}
              selectedRequest={selectedRequest}
              onSelectRequest={setSelectedRequest}
            />
          </ScrollArea>
        </Card>

        <Card className="flex-1">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <RequestDetails request={selectedRequest} />
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default WebhookDebugger;