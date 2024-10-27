import { User, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full px-4 py-3 bg-background border-b">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-lg font-bold">
          Логотип
        </a>

        {/* Burger menu for mobile screens */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        <nav className="hidden md:flex space-x-2">
          <Link to="/mtt">
            <Button variant="ghost">Турниры</Button>
          </Link>
          <Link to="/heads-up">
            <Button variant="ghost">Один на Один</Button>
          </Link>
          <Link to="/news">
            <Button variant="ghost">Новости</Button>
          </Link>
        </nav>

        <Link to="/login">
          <Button variant="ghost" size="icon">
            <User className="w-6 h-6" />
          </Button>
        </Link>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center ml-8 space-y-2 bg-background p-4 rounded-lg shadow-lg">
          <Link to="/mtt">
            <Button variant="ghost" className="w-full text-center">
              Турниры
            </Button>
          </Link>
          <Link to="/heads-up">
            <Button variant="ghost" className="w-full text-center">
              Один на Один
            </Button>
          </Link>
          <Link to="/news">
            <Button variant="ghost" className="w-full text-center">
              Новости
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
