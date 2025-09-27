import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const categories = [
    'Prescription Glasses',
    'Sunglasses', 
    'Contact Lenses',
    'Sports Eyewear',
    'Reading Glasses',
    'Designer Frames'
  ];

  const services = [
    'Eye Examination',
    'Lens Fitting',
    'Frame Repair',
    'Home Delivery',
    'Insurance Claims',
    'Virtual Try-On'
  ];

  return (
    <footer className="bg-gradient-to-t from-primary/5 to-transparent pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-primary">Deepak Opticals</span>
                <span className="text-sm text-muted-foreground">Vision Perfected</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your trusted partner for premium eyewear and optical solutions since 1995. 
              Experience the difference with our expert care and quality products.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="glass-card w-10 h-10 p-0">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="glass-card w-10 h-10 p-0">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="glass-card w-10 h-10 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Products</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <a
                  key={category}
                  href="#products"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <div>123 Vision Street, Optical Plaza</div>
                  <div>Mumbai - 400001</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="text-muted-foreground">
                  +91 98765 43210
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="text-muted-foreground">
                  info@deepakopticals.com
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <div>Mon-Sat: 9:00 AM - 9:00 PM</div>
                  <div>Sunday: 10:00 AM - 7:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass-card p-8 rounded-2xl mb-12">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground">Get the latest offers and eye care tips delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl glass-card border border-glass-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button className="btn-hero">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-glass-border pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">
            © 2024 Deepak Opticals. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
};