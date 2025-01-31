import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, Trash2, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { Badge } from "@/components/ui/badge";

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
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  // Simulated webhook data for testing
  useEffect(() => {
    if (requests.length === 0) {
      const sampleRequest: WebhookRequest = {
        id: uuidv4(),
        method: 'POST',
        path: '/webhook',
        timestamp: new Date(),
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        },
        body: {
          event: 'user.created',
          data: {
            id: 123,
            name: 'John Doe',
            email: 'john@example.com'
          }
        },
        queryParams: {}
      };
      setRequests([sampleRequest]);
      setSelectedRequest(sampleRequest);
    }
  }, []);

  const toggleListening = () => {
    if (!webhookUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a webhook URL before starting to listen.",
        variant: "destructive",
      });
      return;
    }
    setIsListening(!isListening);
    toast({
      title: isListening ? "Stopped Listening" : "Started Listening",
      description: isListening 
        ? "Webhook listener has been stopped." 
        : "Now listening for webhook requests at the specified URL.",
    });
  };

  const copyWebhookUrl = () => {
    if (!webhookUrl) {
      toast({
        title: "No URL to copy",
        description: "Please enter a webhook URL first.",
        variant: "destructive",
      });
      return;
    }
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

  return (
    <div className="min-h-[calc(100vh-8rem)] p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Webhook Debugger</h2>
            <p className="text-sm text-muted-foreground">
              Test and debug your webhook integrations with ease
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={clearRequests}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={downloadRequests}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Webhook URL</h3>
            <Badge 
              variant={isListening ? "default" : "secondary"}
              className="ml-2"
            >
              {isListening ? "Listening" : "Not Listening"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Input 
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="font-mono text-sm"
              placeholder="Enter your webhook URL"
            />
            <Button variant="outline" size="icon" onClick={copyWebhookUrl}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant={isListening ? "destructive" : "default"}
              onClick={toggleListening}
            >
              {isListening ? "Stop" : "Start"}
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex gap-6 flex-1">
        <Card className="w-1/3">
          <ScrollArea className="h-[calc(100vh-24rem)]">
            <RequestList
              requests={requests}
              selectedRequest={selectedRequest}
              onSelectRequest={setSelectedRequest}
            />
          </ScrollArea>
        </Card>

        <Card className="flex-1">
          <ScrollArea className="h-[calc(100vh-24rem)]">
            <RequestDetails request={selectedRequest} />
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default WebhookDebugger;