import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-blue-300 bg-white/50 px-3 py-2 text-sm ' +
            'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ' +
            'placeholder:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ' +
            'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-blue-900',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
