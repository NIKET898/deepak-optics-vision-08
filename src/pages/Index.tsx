import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ProductShowcase } from '@/components/ProductShowcase';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ProductShowcase />
        <ServicesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
