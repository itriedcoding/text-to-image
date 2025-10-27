import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

// Fixed: Wrap Card component with React.forwardRef to allow it to accept a ref prop.
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Pass the ref to the underlying div element
    className={cn(
      'rounded-xl border bg-white/30 backdrop-blur-lg text-card-foreground shadow-2xl ' +
        'border-white/20 transform hover:scale-[1.01] transition-transform duration-300', // Added hover effect here
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card'; // Add displayName for better debugging

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader: React.FC<CardHeaderProps> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle: React.FC<CardTitleProps> = ({ className, ...props }) => (
  <h3
    className={cn('font-semibold leading-none tracking-tight text-3xl text-blue-900', className)}
    {...props}
  />
);

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription: React.FC<CardDescriptionProps> = ({ className, ...props }) => (
  <p className={cn('text-sm text-blue-700', className)} {...props} />
);

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent: React.FC<CardContentProps> = ({ className, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter: React.FC<CardFooterProps> = ({ className, ...props }) => (
  <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };