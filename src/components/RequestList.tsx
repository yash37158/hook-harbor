import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { WebhookRequest } from './WebhookDebugger';

interface RequestListProps {
  requests: WebhookRequest[];
  selectedRequest: WebhookRequest | null;
  onSelectRequest: (request: WebhookRequest) => void;
}

const RequestList = ({ requests, selectedRequest, onSelectRequest }: RequestListProps) => {
  if (requests.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No requests received yet. Send a request to your webhook URL to get started.
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {requests.map((request) => (
        <div
          key={request.id}
          className={`p-4 cursor-pointer hover:bg-muted/50 ${
            selectedRequest?.id === request.id ? 'bg-muted' : ''
          }`}
          onClick={() => onSelectRequest(request)}
        >
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant={request.method === 'POST' ? 'default' : 'secondary'}
            >
              {request.method}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(request.timestamp, { addSuffix: true })}
            </span>
          </div>
          <div className="text-sm truncate">{request.path}</div>
        </div>
      ))}
    </div>
  );
};

export default RequestList;