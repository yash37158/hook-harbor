import { Button } from "@/components/ui/button";
import { ArrowRight, Webhook, Shield, Zap, RefreshCcw, AlertCircle } from "lucide-react";
import WebhookDebugger from "@/components/WebhookDebugger";
import TerminalAnimation from "@/components/TerminalAnimation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

const Index = () => {
  const [showDebugger, setShowDebugger] = useState(false);

  const features = [
    {
      icon: <Webhook className="h-10 w-10" />,
      title: "Real-time Monitoring",
      description: "Watch your webhook requests arrive in real-time with automatic updates"
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Secure Testing",
      description: "Test your webhooks in a secure environment with detailed request inspection"
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Instant Feedback",
      description: "Get immediate insights into your webhook payloads and headers"
    },
    {
      icon: <RefreshCcw className="h-10 w-10" />,
      title: "Auto-Refresh",
      description: "Automatic polling ensures you never miss a webhook request"
    }
  ];

  if (showDebugger) {
    return <WebhookDebugger />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-mono font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Webhook Debugger
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-[700px] mx-auto mb-8 font-mono">
          Test, debug, and monitor your webhooks with our powerful real-time debugger tool
        </p>

        {/* Important Note Alert */}
        <Alert className="max-w-[700px] mx-auto mb-8 border-primary/50 bg-primary/10">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-mono">Important Note for Testing</AlertTitle>
          <AlertDescription className="font-mono text-sm mt-2">
            To test the webhook debugger, you can use the JSONPlaceholder API:
            <code className="block bg-background/50 p-2 mt-2 rounded">
              https://jsonplaceholder.typicode.com/posts/
            </code>
            This endpoint provides mock data that simulates real webhook responses, perfect for testing the debugger's functionality.
          </AlertDescription>
        </Alert>

        <div className="mb-12">
          <TerminalAnimation />
        </div>
        <Button 
          size="lg" 
          onClick={() => setShowDebugger(true)}
          className="group font-mono"
        >
          Launch Debugger
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg border bg-card text-card-foreground hover:bg-accent/50 transition-colors font-mono"
            >
              <div className="mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 font-mono">How It Works</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center gap-6 p-6 rounded-lg border bg-card/50">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-mono">
              1
            </div>
            <div className="font-mono">
              <h3 className="font-semibold mb-1">Enter Your Webhook URL</h3>
              <p className="text-muted-foreground">Paste your webhook URL into the debugger to start monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-6 rounded-lg border bg-card/50">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-mono">
              2
            </div>
            <div className="font-mono">
              <h3 className="font-semibold mb-1">Start Listening</h3>
              <p className="text-muted-foreground">Click start to begin receiving and logging webhook requests</p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-6 rounded-lg border bg-card/50">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-mono">
              3
            </div>
            <div className="font-mono">
              <h3 className="font-semibold mb-1">Analyze Requests</h3>
              <p className="text-muted-foreground">View detailed information about each webhook request in real-time</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 font-mono">Ready to Debug Your Webhooks?</h2>
        <Button 
          size="lg" 
          onClick={() => setShowDebugger(true)}
          className="group font-mono"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default Index;