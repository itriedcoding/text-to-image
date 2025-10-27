import React from 'react';
import { cn } from '@/utils/cn.ts';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

const Alert: React.FC<AlertProps> = ({ className, variant = 'default', ...props }) => {
  const baseClasses =
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11';

  const variantClasses = {
    default: 'bg-blue-50 text-blue-800 border-blue-200',
    destructive: 'bg-red-50 text-red-800 border-red-200',
  };

  return (
    <div
      role="alert"
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
};

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle: React.FC<AlertTitleProps> = ({ className, ...props }) => (
  <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
);

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

const AlertDescription: React.FC<AlertDescriptionProps> = ({ className, ...props }) => (
  <div className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
);

export { Alert, AlertTitle, AlertDescription };