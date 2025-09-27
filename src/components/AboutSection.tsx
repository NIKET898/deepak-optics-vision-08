import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Mail, Star, Users, Calendar, Award } from 'lucide-react';

export const AboutSection = () => {
  const highlights = [
    {
      year: "1995",
      title: "Founded with Vision",
      description: "Started as a small optical shop with big dreams to serve the community."
    },
    {
      year: "2005",
      title: "Digital Revolution",
      description: "Introduced advanced digital eye testing equipment for precise prescriptions."
    },
    {
      year: "2015",
      title: "Designer Partnership", 
      description: "Partnered with international designer brands to offer premium eyewear."
    },
    {
      year: "2023",
      title: "Online Excellence",
      description: "Launched comprehensive online platform with virtual try-on technology."
    }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["123 Vision Street, Optical Plaza", "Near City Center, Mumbai - 400001"],
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us Now",
      details: ["+91 98765 43210", "+91 22 1234 5678"],
      action: "Call Now"
    },
    {
      icon: Clock,
      title: "Store Hours",
      details: ["Mon-Sat: 9:00 AM - 9:00 PM", "Sunday: 10:00 AM - 7:00 PM"],
      action: "Plan Visit"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["info@deepakopticals.com", "support@deepakopticals.com"],
      action: "Send Email"
    }
  ];

  const reviews = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Excellent service! Found the perfect frames and the eye test was very thorough.",
      location: "Mumbai"
    },
    {
      name: "Rajesh Kumar", 
      rating: 5,
      comment: "Been a customer for 10 years. Always reliable and great quality products.",
      location: "Pune"
    },
    {
      name: "Anita Patel",
      rating: 5,
      comment: "Amazing collection and very knowledgeable staff. Highly recommend!",
      location: "Delhi"
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* About Header */}
        <div className="text-center space-y-6 animate-fade-in-up">
          <div className="inline-block glass-card px-4 py-2 rounded-full text-sm font-medium text-primary">
            Our Story
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">28 Years</span> of Excellence
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From a small neighborhood optical shop to a trusted name in eyewear, Deepak Opticals 
            has been serving families across India with premium quality eyewear, expert eye care, 
            and personalized service that puts your vision first.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8 animate-fade-in-up animate-delay-200">
          <h3 className="text-2xl font-bold text-center mb-12">Our Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`glass-card p-6 rounded-2xl card-hover animate-fade-in-up animate-delay-${300 + index * 100}`}
              >
                <div className="space-y-4">
                  <div className="text-3xl font-bold gradient-text">{milestone.year}</div>
                  <h4 className="text-lg font-bold text-foreground">{milestone.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-8 animate-fade-in-up animate-delay-400">
          <h3 className="text-2xl font-bold text-center mb-12">Get in Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className={`glass-card p-6 rounded-2xl card-hover animate-fade-in-up animate-delay-${500 + index * 100}`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">{info.title}</h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                  <Button variant="outline" className="btn-glass w-full text-xs">
                    {info.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="space-y-8 animate-fade-in-up animate-delay-600">
          <h3 className="text-2xl font-bold text-center mb-12">What Our Customers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={review.name}
                className={`glass-card p-6 rounded-2xl card-hover animate-fade-in-up animate-delay-${700 + index * 100}`}
              >
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Review */}
                  <p className="text-muted-foreground italic leading-relaxed">"{review.comment}"</p>
                  
                  {/* Reviewer */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">{review.name}</div>
                      <div className="text-xs text-muted-foreground">{review.location}</div>
                    </div>
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card p-12 rounded-3xl text-center space-y-6 animate-fade-in-up animate-delay-800">
          <h3 className="text-3xl font-bold">
            Ready to Experience <span className="gradient-text">Perfect Vision</span>?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit our store today for a comprehensive eye examination and discover the perfect eyewear 
            solution tailored just for you. Book your appointment now!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-hero">
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
            <Button variant="outline" className="btn-glass">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};