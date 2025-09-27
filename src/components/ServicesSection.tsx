import { Eye, Settings, Truck, Clock, Award, Users } from 'lucide-react';

export const ServicesSection = () => {
  const services = [
    {
      icon: Eye,
      title: "Eye Examination",
      description: "Comprehensive eye tests using latest digital equipment for accurate prescriptions.",
      features: ["Digital Refraction", "Retinal Scanning", "Pressure Testing"]
    },
    {
      icon: Settings,
      title: "Lens Fitting",
      description: "Expert lens fitting and adjustment for perfect comfort and optimal vision.",
      features: ["Precision Fitting", "Progressive Lenses", "Contact Lenses"]
    },
    {
      icon: Truck,
      title: "Home Delivery",
      description: "Free home delivery and pickup service within the city for your convenience.",
      features: ["Same Day Delivery", "Free Pickup", "Installation Service"]
    },
    {
      icon: Clock,
      title: "Quick Service",
      description: "Fast turnaround time for most prescriptions and repairs within 2-4 hours.",
      features: ["Express Service", "While You Wait", "Emergency Repairs"]
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Every product comes with warranty and quality guarantee for complete satisfaction.",
      features: ["1 Year Warranty", "Quality Check", "Satisfaction Guarantee"]
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Personal consultation with certified optometrists for the best eyewear solutions.",
      features: ["Certified Experts", "Personal Advice", "Style Consultation"]
    }
  ];

  const stats = [
    { number: "25,000+", label: "Happy Customers" },
    { number: "28", label: "Years Experience" },
    { number: "500+", label: "Frame Options" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  return (
    <section id="services" className="py-20 px-6 bg-gradient-to-b from-transparent to-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 animate-fade-in-up">
          <div className="inline-block glass-card px-4 py-2 rounded-full text-sm font-medium text-primary">
            Professional Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Complete</span> Optical Care
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond just selling glasses, we provide comprehensive optical care services 
            with the latest technology and expert guidance for your vision needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`glass-card p-8 rounded-2xl card-hover animate-fade-in-up animate-delay-${200 + index * 100}`}
            >
              <div className="space-y-6">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="glass-card p-8 rounded-3xl animate-fade-in-up animate-delay-600">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`text-center animate-fade-in-up animate-delay-${700 + index * 100}`}
              >
                <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};