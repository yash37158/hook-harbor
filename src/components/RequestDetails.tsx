import React from 'react';
import { WebhookRequest } from './WebhookDebugger';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ReactJson from 'react-json-view';

interface RequestDetailsProps {
  request: WebhookRequest | null;
}

const RequestDetails = ({ request }: RequestDetailsProps) => {
  const { toast } = useToast();

  const copyToClipboard = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast({
      title: "Copied to clipboard",
      description: "The request data has been copied to your clipboard.",
    });
  };

  if (!request) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Select a request to view its details
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold mb-1">
            {request.method} {request.path}
          </h2>
          <div className="text-sm text-muted-foreground">
            {request.timestamp.toLocaleString()}
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => copyToClipboard(request)}>
          <Copy className="h-4 w-4 mr-2" />
          Copy Request
        </Button>
      </div>

      <Tabs defaultValue="body" className="w-full">
        <TabsList>
          <TabsTrigger value="body">Body</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="query">Query Params</TabsTrigger>
        </TabsList>

        <TabsContent value="body" className="mt-4">
          <ReactJson
            src={request.body}
            theme="twilight"
            style={{ backgroundColor: 'transparent' }}
            displayDataTypes={false}
            enableClipboard={false}
          />
        </TabsContent>

        <TabsContent value="headers" className="mt-4">
          <ReactJson
            src={request.headers}
            theme="twilight"
            style={{ backgroundColor: 'transparent' }}
            displayDataTypes={false}
            enableClipboard={false}
          />
        </TabsContent>

        <TabsContent value="query" className="mt-4">
          <ReactJson
            src={request.queryParams}
            theme="twilight"
            style={{ backgroundColor: 'transparent' }}
            displayDataTypes={false}
            enableClipboard={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestDetails;