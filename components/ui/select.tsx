import React from 'react';
import { cn } from '../../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            'flex h-10 w-full rounded-md border border-blue-300 bg-white/50 px-3 py-2 text-sm ' +
              'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ' +
              'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ' +
              'appearance-none pr-8 text-blue-900', // pr-8 to make space for custom arrow
            className
          )}
          ref={ref}
          {...props}
        />
        {/* Custom arrow for select */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-700 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
