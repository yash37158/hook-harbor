import { Heart, Terminal, Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-6 mt-auto backdrop-blur-sm bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <Terminal className="h-4 w-4" />
            <Code className="h-4 w-4" />
          </div>
          <div className="text-center font-mono text-sm text-muted-foreground">
            <span className="text-green-500">$</span> echo "Made with{" "}
            <Heart className="inline-block w-4 h-4 text-red-500" /> by{" "}
            <a
              href="https://github.com/yash-sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Yash Sharma
            </a>"
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="text-green-500">$</span> exit 0
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;