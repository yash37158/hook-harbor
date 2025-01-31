import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

const TerminalAnimation = () => {
  const [text, setText] = useState('');
  const fullText = '$ webhook debug --start\n> Initializing debugger...\n> Ready to receive webhooks...';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto bg-black/80 rounded-lg p-4 font-mono text-sm">
      <div className="flex items-center gap-2 mb-2 border-b border-border pb-2">
        <Terminal className="h-4 w-4" />
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <pre className="whitespace-pre-wrap">
        {text}
        <span className="animate-pulse">_</span>
      </pre>
    </div>
  );
};

export default TerminalAnimation;