import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Glasses, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Cart } from './Cart';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const menuItems = [
    { label: 'Home', href: '/', isLink: true },
    { label: 'Products', href: '/products', isLink: true },
    { label: 'Services', href: '#services', isLink: false },
    { label: 'About', href: '#about', isLink: false },
    { label: 'Contact', href: '#contact', isLink: false },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Glasses className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary">Deepak Opticals</span>
              <span className="text-xs text-muted-foreground">Vision Perfected</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => 
              item.isLink ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium text-foreground hover:text-primary transition-colors animate-fade-in-up animate-delay-${index + 1}00`}
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium text-foreground hover:text-primary transition-colors animate-fade-in-up animate-delay-${index + 1}00`}
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* Auth & Cart */}
          <div className="flex items-center gap-3">
            <Cart />
            {user ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-sm">
                  <User className="w-4 h-4 mr-1" />
                  {user.email?.split('@')[0]}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button className="btn-hero" onClick={() => window.location.href = '/auth'}>
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="glass-card"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden glass-card mt-2 p-4 animate-scale-in">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    {user.email}
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button className="btn-hero w-full" onClick={() => window.location.href = '/auth'}>
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};