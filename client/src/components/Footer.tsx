import { Twitter, Facebook } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="mt-16 bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center">
          <a href="/" className="text-3xl font-bold tracking-light">
            LOGO
          </a>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            Ваш надежный партнер в мире покера. Присоединяйтесь к нам для
            незабываемых игр и турниров.
          </p>
          <div className="mt-8 flex space-x-4">
            <Button variant="ghost" size="icon">
              <Facebook />
              <span className="sr-only">Telegram</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter />
              <span className="sr-only">Twitter</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
