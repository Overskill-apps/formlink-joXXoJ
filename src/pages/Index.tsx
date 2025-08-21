import React from 'react';
import { ContactForm } from '@/components/ContactForm';
import { ContactInfo } from '@/components/ContactInfo';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Shield, Zap, Clock } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function Index() {
  const handleFormSubmit = async (data: any) => {
    // In a real app, this would send data to your backend
    console.log('Form submitted:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Track successful submission
    analytics.track('contact_form_success', {
      inquiry_type: data.inquiryType,
      timestamp: new Date().toISOString(),
    });
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Response',
      description: 'Get responses within 24 hours',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Always Available',
      description: 'Submit inquiries anytime, anywhere',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Mail className="w-4 h-4" />
              <span>Professional Contact Forms</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Connect with{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                FormLink
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience seamless communication with our professional contact form solution. 
              Get in touch effortlessly and receive prompt, personalized responses.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center group hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="space-y-16">
          <ContactForm onSubmit={handleFormSubmit} />
          <ContactInfo />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 FormLink. Built with OverSkill - Professional contact forms made simple.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
