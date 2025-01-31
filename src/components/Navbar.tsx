import { Github, Terminal, Code } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Terminal className="h-6 w-6" />
            <Code className="h-6 w-6" />
            <h1 className="text-xl font-mono font-bold">Webhook Debugger</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" asChild>
              <a 
                href="https://github.com/yash-sharma" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;