import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const WEBHOOK_URL = 'https://your-webhook-url.com/webhook';

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
  const { toast } = useToast();

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(WEBHOOK_URL);
    toast({
      title: "URL copied to clipboard",
      description: "Your webhook URL has been copied to the clipboard.",
    });
  };

  return (
    <div className="min-h-screen p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Webhook Debugger</h1>
          <div className="flex items-center gap-2">
            <code className="px-2 py-1 rounded bg-muted">{WEBHOOK_URL}</code>
            <Button variant="outline" size="icon" onClick={copyWebhookUrl}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-6 flex-1">
        <Card className="w-1/3">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <RequestList
              requests={requests}
              selectedRequest={selectedRequest}
              onSelectRequest={setSelectedRequest}
            />
          </ScrollArea>
        </Card>

        <Card className="flex-1">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <RequestDetails request={selectedRequest} />
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default WebhookDebugger;