import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-6 mt-auto">
      <div className="text-center text-sm text-muted-foreground">
        Made with <Heart className="inline-block w-4 h-4 text-red-500" /> by{" "}
        <a
          href="https://github.com/yash-sharma"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:underline"
        >
          Yash Sharma
        </a>
      </div>
    </footer>
  );
};

export default Footer;