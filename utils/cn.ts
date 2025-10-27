// utils/cn.ts
type ClassValue = string | boolean | null | undefined | { [key: string]: boolean } | ClassValue[];

/**
 * A utility function for conditionally joining Tailwind CSS classes.
 * It's a simplified version inspired by `clsx` and `tailwind-merge` but implemented
 * manually to avoid external dependencies. It handles string, boolean, null, undefined,
 * object (for conditional classes), and array inputs.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  inputs.forEach(input => {
    if (typeof input === 'string' && input.trim() !== '') {
      classes.push(input.trim());
    } else if (typeof input === 'boolean' || input === null || input === undefined) {
      // Ignore boolean, null, undefined
    } else if (Array.isArray(input)) {
      classes.push(cn(...input)); // Recursively handle arrays
    } else if (typeof input === 'object') {
      for (const key in input) {
        // Ensure property belongs to the object and is truthy
        if (Object.prototype.hasOwnProperty.call(input, key) && input[key as keyof typeof input]) {
          classes.push(key.trim());
        }
      }
    }
  });

  // Basic deduplication and merging, not as robust as tailwind-merge but functional.
  const uniqueClasses = Array.from(new Set(classes.filter(Boolean)));
  return uniqueClasses.join(' ');
}