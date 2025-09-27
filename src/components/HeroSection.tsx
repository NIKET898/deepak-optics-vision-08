import { GlassesModel } from './GlassesModel';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, Shield, Award } from 'lucide-react';

export const HeroSection = () => {
  const features = [
    {
      icon: Eye,
      title: "Clear Vision",
      description: "Premium lenses for perfect clarity"
    },
    {
      icon: Shield,
      title: "Protected",
      description: "UV protection & durable frames"
    },
    {
      icon: Award,
      title: "Quality",
      description: "Award-winning optical solutions"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="floating-delayed absolute bottom-20 right-10 w-48 h-48 bg-blue-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content Side */}
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-6">
            <div className="inline-block glass-card px-4 py-2 rounded-full text-sm font-medium text-primary">
              ✨ Premium Optical Solutions Since 1995
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">Perfect Vision</span>
              <br />
              <span className="text-foreground">Starts Here</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Discover the world through crystal-clear lenses. From designer frames to prescription glasses, 
              we provide premium eyewear solutions tailored to your unique style and vision needs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-200">
            <Button className="btn-hero group">
              Explore Collection
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="btn-glass">
              Book Eye Test
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in-up animate-delay-300">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`glass-card p-4 text-center card-hover animate-fade-in-up animate-delay-${400 + index * 100}`}
              >
                <feature.icon className="w-6 h-6 mx-auto text-primary mb-2" />
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Model Side */}
        <div className="relative animate-scale-in animate-delay-100">
          <div className="glass-card p-8 rounded-3xl">
            <div className="aspect-square">
              <GlassesModel className="w-full h-full" />
            </div>
          </div>
          
          {/* Floating Stats */}
          <div className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl animate-fade-in-up animate-delay-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">25k+</div>
              <div className="text-xs text-muted-foreground">Happy Customers</div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl animate-fade-in-up animate-delay-500">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">28</div>
              <div className="text-xs text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};