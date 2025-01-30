import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WebhookDebugger from '@/components/WebhookDebugger';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <WebhookDebugger />
      <Footer />
    </div>
  );
};

export default Index;