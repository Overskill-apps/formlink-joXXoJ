import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Send, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { toast } from '@/components/ui/sonner';

const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

export function ContactForm({ onSubmit, className = '' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const inquiryType = watch('inquiryType');

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Track form submission
      analytics.trackFormSubmit('contact_form', {
        inquiry_type: data.inquiryType,
        has_phone: !!data.phone,
        has_company: !!data.company,
      });

      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Contact form submission:', data);
      }

      setIsSubmitted(true);
      toast.success('Message sent successfully!', {
        description: 'We\'ll get back to you as soon as possible.',
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message', {
        description: 'Please try again or contact us directly.',
      });
      analytics.trackError(new Error('Contact form submission failed'), { data });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={`form-container max-w-2xl mx-auto ${className}`}>
        <CardContent className="p-12 text-center">
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
              <p className="text-muted-foreground">
                Thank you for reaching out. We've received your message and will get back to you within 24 hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`form-container max-w-2xl mx-auto ${className}`}>
      <CardHeader className="form-header p-8 pb-6">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Get in Touch
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-8 pt-2">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="form-field-group">
          {/* Inquiry Type */}
          <div className="space-y-2">
            <Label htmlFor="inquiryType" className="text-sm font-medium text-foreground">
              What can we help you with? *
            </Label>
            <Select onValueChange={(value) => setValue('inquiryType', value)} value={inquiryType}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="sales">Sales & Pricing</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.inquiryType && (
              <p className="text-sm text-destructive">{errors.inquiryType.message}</p>
            )}
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                <User className="inline w-4 h-4 mr-1" />
                First Name *
              </Label>
              <Input
                id="firstName"
                {...register('firstName')}
                placeholder="John"
                className="h-12"
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                Last Name *
              </Label>
              <Input
                id="lastName"
                {...register('lastName')}
                placeholder="Doe"
                className="h-12"
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                <Mail className="inline w-4 h-4 mr-1" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john@example.com"
                className="h-12"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                <Phone className="inline w-4 h-4 mr-1" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="+1 (555) 123-4567"
                className="h-12"
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium text-foreground">
              Company
            </Label>
            <Input
              id="company"
              {...register('company')}
              placeholder="Your Company Name"
              className="h-12"
              disabled={isSubmitting}
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium text-foreground">
              Subject *
            </Label>
            <Input
              id="subject"
              {...register('subject')}
              placeholder="Brief description of your inquiry"
              className="h-12"
              disabled={isSubmitting}
            />
            {errors.subject && (
              <p className="text-sm text-destructive">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-foreground">
              <MessageSquare className="inline w-4 h-4 mr-1" />
              Message *
            </Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Please provide details about your inquiry..."
              className="min-h-[120px] resize-none"
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}