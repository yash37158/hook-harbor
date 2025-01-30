import { Github } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Webhook Debugger</h1>
          </div>
          <div>
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/yash-sharma" target="_blank" rel="noopener noreferrer">
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