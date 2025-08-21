import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  details: string[];
  action?: {
    label: string;
    href: string;
  };
}

export function ContactInfo() {
  const contactMethods: ContactMethod[] = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      details: ['hello@formlink.com', 'support@formlink.com'],
      action: {
        label: 'Send Email',
        href: 'mailto:hello@formlink.com',
      },
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', 'Mon-Fri, 9am-6pm EST'],
      action: {
        label: 'Call Now',
        href: 'tel:+15551234567',
      },
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      details: ['123 Business Ave', 'Suite 100', 'New York, NY 10001'],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Other Ways to Reach Us</h2>
        <p className="text-muted-foreground">
          Choose the method that works best for you
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactMethods.map((method, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {method.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-foreground">{method.title}</h3>
                  <div className="space-y-1">
                    {method.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                  {method.action && (
                    <a
                      href={method.action.href}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {method.action.label}
                      <MessageCircle className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}